import type { SiteContent } from "./types";
import { readingList } from "./reading/data";
import { movieList } from "./movies/data";

export const siteContent: SiteContent = {
  name: "Ashu",
  title: "Hello, I'm Ashu",
  intro: "A product manager, designer, and coder sometimes.",

  nav: [
    { label: "Working", href: "#working" },
    { label: "Ideas", href: "#ideas" },
    { label: "Movies", href: "/movies" },
    { label: "Reading", href: "/reading" },
    { label: "Photographs", href: "/photographs" },
  ],

  working: [
    {
      company: "Nonce",
      url: "https://nonce.app",
      description: "A Bitcoin mining tool with 5% global hashrate.",
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
      description: "An Ethereum wallet with over 20M users.",
      period: "2016 - 2022",
      tags: ["Cofounder", "Multi-Chain Wallet", "DeFi", "Mobile"],
    },
  ],

  ideas: [
    {
      name: "0xcell",
      description: "A Game of Life by Circle CCTP V2.",
      url: "https://x.com/ashu_mest/status/1957246524313719009",
      tags: ["Hackathon", "ETHGlobal New York 2025", "USDC", "Solana"],
      type: "hackathon",
    },
    {
      name: "Unihook",
      description: "Liquidity aggregation for Uniswap V4 hooks.",
      url: "https://x.com/ashu_mest/status/1848173031589584911",
      tags: ["Hackathon", "ETHGlobal San Francisco 2024", "Uniswap V4"],
      type: "hackathon",
    },
    {
      name: "Time4Value",
      description: "A payment system via bonding curves and yield farming.",
      url: "https://v2ex.com/t/1061427",
      tags: ["Payment", "Bonding Curve", "AAVE"],
      type: "hackathon",
    },
    {
      name: "CarbonVote",
      description: "Vote for or against the Hard Fork with your Ether.",
      url: "https://vitalik.eth.limo/general/2017/12/17/voting.html",
      tags: ["Ethereum", "Hard Fork", "Voting"],
      type: "hackathon",
    },
    {
      name: "Nevermore",
      description: "A social credit system on the blockchain.",
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

  movies: movieList,

  social: [
    { label: "Email", url: "hi@ashu.org" },
    { label: "Twitter", url: "https://x.com/0xashu" },
    { label: "GitHub", url: "https://github.com/0xashu" },
  ],
};
