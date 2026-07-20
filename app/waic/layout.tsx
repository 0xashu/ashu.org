import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ashu · WAIC",
  description:
    "我们正在经营 Nonce —— 管理全球 5% Bitcoin 算力，主要服务北美上市的矿企，在分布式数据中心和算电协同上拥有多年经验。",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Ashu · WAIC",
    description:
      "我们正在经营 Nonce —— 管理全球 5% Bitcoin 算力，主要服务北美上市的矿企，在分布式数据中心和算电协同上拥有多年经验。",
    url: "https://ashu.org/waic",
  },
};

export default function WaicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
