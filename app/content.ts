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
      name: "ETHGlobal New York",
      description: "",
      url: "#",
      type: "hackathon",
    },
    {
      name: "ETHGlobal San Francisco",
      description: "",
      url: "#",
      type: "hackathon",
    },
    {
      name: "WANG XIANG Hackathon 01",
      description: "",
      url: "#",
      type: "hackathon",
    },
    {
      name: "Todo Item 1",
      description: "",
      url: "#",
      type: "todo",
    },
    {
      name: "Todo Item 2",
      description: "",
      url: "#",
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
