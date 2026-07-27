import type { Metadata } from "next";

const TITLE = "Ashu / HK Money Frontier 2026";
const DESCRIPTION =
  "Mining ops experience meeting AIDC — happy to connect at Money Frontier";
const URL = "https://ashu.org/hk";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Ashu",
    type: "website",
    locale: "en_HK",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function HkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
