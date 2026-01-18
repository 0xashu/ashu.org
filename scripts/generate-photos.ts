import fs from "fs";
import path from "path";
import ExifReader from "exifreader";

const PHOTOS_DIR = path.join(process.cwd(), "public/photographs");
const METADATA_FILE = path.join(PHOTOS_DIR, "metadata.json");
const OUTPUT_FILE = path.join(process.cwd(), "app/data/photos.ts");

type Exif = {
  camera?: string;
  lens?: string;
  focalLength?: string;
  aperture?: string;
  shutter?: string;
  iso?: string;
};

type MetadataOverride = {
  title?: string;
  date?: string;
  location?: string;
  exif?: Exif;
};

type MetadataConfig = Record<string, MetadataOverride>;

function loadMetadataConfig(): MetadataConfig {
  try {
    if (fs.existsSync(METADATA_FILE)) {
      const content = fs.readFileSync(METADATA_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch {
    // ignore
  }
  return {};
}

function slugToTitle(slug: string): string {
  return slug
    .replace(/\.[^/.]+$/, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatShutter(value: number): string {
  if (value >= 1) return `${value}s`;
  return `1/${Math.round(1 / value)}s`;
}

function formatDate(dateStr: string): string {
  const [datePart] = dateStr.split(" ");
  const [year, month] = datePart.split(":");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function formatCoordinates(lat: number, lng: number): string {
  const latDir = lat >= 0 ? "N" : "S";
  const lngDir = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(4)}°${latDir}, ${Math.abs(lng).toFixed(4)}°${lngDir}`;
}

function extractExif(imagePath: string): {
  exif: Exif;
  date?: string;
  location?: string;
} {
  try {
    const buffer = fs.readFileSync(imagePath);
    const tags = ExifReader.load(buffer);

    const make = tags.Make?.description;
    const model = tags.Model?.description;
    let camera: string | undefined;
    if (make && model) {
      camera = model.startsWith(make)
        ? model
        : `${make} ${model}`.replace(/\s+/g, " ").trim();
    } else {
      camera = model;
    }

    let location: string | undefined;
    const lat = tags.GPSLatitude?.description;
    const lng = tags.GPSLongitude?.description;
    if (lat !== undefined && lng !== undefined) {
      location = formatCoordinates(Number(lat), Number(lng));
    }

    const focalLength = tags.FocalLength?.description;
    const fNumber = tags.FNumber?.description;
    const exposureTime = tags.ExposureTime?.description;
    const iso = tags.ISOSpeedRatings?.description;
    const dateTime = tags.DateTimeOriginal?.description;

    return {
      exif: {
        camera,
        lens: tags.LensModel?.description,
        focalLength: focalLength
          ? `${Math.round(Number(focalLength))}mm`
          : undefined,
        aperture: fNumber ? `f/${fNumber}` : undefined,
        shutter: exposureTime ? formatShutter(Number(exposureTime)) : undefined,
        iso: iso ? String(iso) : undefined,
      },
      date: dateTime ? formatDate(dateTime) : undefined,
      location,
    };
  } catch {
    return { exif: {} };
  }
}

function generatePhotos() {
  const photos: Array<{
    id: string;
    title: string;
    imageUrl: string;
    year: number;
    date?: string;
    location?: string;
    exif?: Exif;
  }> = [];

  const metadataConfig = loadMetadataConfig();

  const years = fs
    .readdirSync(PHOTOS_DIR)
    .filter((item) => {
      const itemPath = path.join(PHOTOS_DIR, item);
      return fs.statSync(itemPath).isDirectory() && /^\d{4}$/.test(item);
    })
    .sort((a, b) => Number(b) - Number(a));

  for (const year of years) {
    const yearPath = path.join(PHOTOS_DIR, year);
    const files = fs
      .readdirSync(yearPath)
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .sort();

    for (const file of files) {
      const id = file.replace(/\.[^/.]+$/, "");
      const imagePath = path.join(yearPath, file);
      const extracted = extractExif(imagePath);
      const override = metadataConfig[`${year}/${id}`] || {};

      const exif = override.exif || extracted.exif;
      const hasExif = Object.values(exif).some((v) => v !== undefined);

      photos.push({
        id,
        title: override.title || slugToTitle(file),
        imageUrl: `/photographs/${year}/${file}`,
        year: Number(year),
        date: override.date || extracted.date,
        location: override.location || extracted.location,
        exif: hasExif ? exif : undefined,
      });
    }
  }

  return photos;
}

function main() {
  console.log("Generating photos data...");
  const photos = generatePhotos();

  const output = `import type { Item } from "../types";

export const photos: Item[] = ${JSON.stringify(photos, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, output);
  console.log(`Generated ${photos.length} photos → app/data/photos.ts`);
}

main();
