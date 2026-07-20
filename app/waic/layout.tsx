import type { Metadata } from "next";

const TITLE = "Ashu / SHANGHAI WAIC";
const DESCRIPTION = "熟悉算力与能源管理，寻找 AIDC 机会，欢迎认识新朋友";
const URL = "https://ashu.org/waic";

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
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function WaicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
