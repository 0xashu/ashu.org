import type { Metadata } from "next";

const TITLE = "Ashu @ SHANGHAI WAIC｜ AIDC 与算电协同";
const DESCRIPTION =
  "Nonce 管理全球 5% Bitcoin 算力，主要服务北美上市矿企。欢迎 Coffee Chat 或线上闲聊。";
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
