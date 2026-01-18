// EXIF metadata for photos
export interface Exif {
  camera?: string;
  lens?: string;
  focalLength?: string;
  aperture?: string;
  shutter?: string;
  iso?: string;
}

// Universal type for all media (book, film, photo)
export interface Item {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
  url?: string;
  tags?: string[];
  // Photo-specific (optional)
  location?: string;
  year?: number;
  date?: string;
  exif?: Exif;
  blurDataURL?: string;
}

// Project type for work and side projects
export interface Project {
  title: string;
  description: string;
  url: string;
  period?: string;
  status?: string;
  tags?: string[];
  category?: "work" | "hackathon" | "idea";
}

// Simple todo item
export interface Todo {
  title: string;
  completed?: boolean;
}
