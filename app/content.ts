import type { SiteContent } from "./types";
import { readingList } from "./reading/data";

export const siteContent: SiteContent = {
  name: "Ashu",
  title: "Hello, I'm Ashu",
  intro: "A product manager, designer, and coder sometimes.",

  nav: [
    { label: "Working", href: "#working" },
    { label: "Ideas", href: "#ideas" },
    { label: "Reading", href: "/reading" },
  ],

  working: [
    {
      company: "Nonce",
      url: "https://nonce.app",
      description: "A bitcoin mining tool for 10% hashrate.",
      period: "2025 - Now",
      tags: ["Cofounder", "Mining", "AI First", "SaaS"],
    },
    {
      company: "Mest",
      url: "https://mest.io",
      status: "Acquired",
      description: "All stories about smart money.",
      period: "2022 - 2024",
      tags: ["Cofounder", "Smart Money", "Data Analytics", "SocialFi"],
    },
    {
      company: "imToken",
      url: "https://token.im",
      status: "B Series",
      description: "An ethereum wallet for 20M+ users.",
      period: "2016 - 2022",
      tags: ["Cofounder", "Multi-Chain Wallet", "DeFi", "Mobile"],
    },
  ],

  ideas: [
    {
      name: "0xcell",
      description: "A Game of Life by Circle CCTP V2",
      url: "https://x.com/ashu_mest/status/1957246524313719009",
      tags: ["Hackathon", "ETHGlobal New York 2025", "USDC", "Solana"],
      type: "hackathon",
    },
    {
      name: "Unihook",
      description: "Liquidity Aggregation for Uniswap V4 Hook.",
      url: "https://x.com/ashu_mest/status/1848173031589584911",
      tags: ["Hackathon", "ETHGlobal San Francisco 2024", "Uniswap V4"],
      type: "hackathon",
    },
    {
      name: "Nervermore",
      description: "Social Credit System on Blockchain.",
      url: "https://github.com/janx/nevermore",
      tags: ["Hackathon", "WanXiang Shanghai 2016", "Blockchain"],
      type: "hackathon",
    },
    {
      name: "♟️ 1000 Elo on Chess.com",
      description: "",
      type: "todo",
    },
    {
      name: "🏸 CBAF Level 3 on badminton",
      description: "",
      type: "todo",
    },
  ],

  reading: readingList,

  social: [
    { label: "Email", url: "hi@ashu.org" },
    { label: "Twitter", url: "https://x.com/0xashu" },
    { label: "GitHub", url: "https://github.com/0xashu" },
  ],
};
