import type { Project, Todo } from "../types";

export const site = {
  name: "Ashu",
  title: "Hello, I'm Ashu",
  intro: "A product manager, designer, and coder sometimes.",
  birthday: "2025-09-11T00:00:00-04:00",

  nav: [
    { label: "Working", href: "#working" },
    { label: "Ideas", href: "#ideas" },
    { label: "Films", href: "/films" },
    { label: "Reading", href: "/reading" },
    { label: "Photographs", href: "/photographs" },
  ],

  social: [
    { label: "Email", url: "hi@ashu.org" },
    { label: "Twitter", url: "https://x.com/ashu_mest" },
    { label: "GitHub", url: "https://github.com/0xashu" },
  ],
};

export const projects: Project[] = [
  {
    title: "Nonce",
    url: "https://nonce.app",
    description: "A Bitcoin mining tool with 5% global hashrate.",
    period: "2025 - Now",
    tags: ["Mining", "AI First", "SaaS"],
    category: "work",
  },
  {
    title: "Mest",
    url: "https://mest.io",
    status: "Acquired",
    description: "All stories about smart money.",
    period: "2022 - 2024",
    tags: ["Smart Money", "SocialFi"],
    category: "work",
  },
  {
    title: "imToken",
    url: "https://token.im",
    status: "B Series",
    description: "An Ethereum wallet with over 20M users.",
    period: "2016 - 2022",
    tags: ["Multi-Chain Wallet", "DeFi"],
    category: "work",
  },
  {
    title: "0xcell",
    description: "A Game of Life by Circle CCTP V2.",
    url: "https://x.com/ashu_mest/status/1957246524313719009",
    tags: ["Hackathon", "New York 2025", "USDC", "Solana"],
    category: "hackathon",
  },
  {
    title: "Unihook",
    description: "Liquidity aggregation for Uniswap V4 hooks.",
    url: "https://x.com/ashu_mest/status/1848173031589584911",
    tags: ["Hackathon", "San Francisco 2024", "Uniswap V4"],
    category: "hackathon",
  },
  {
    title: "Time4Value",
    description: "A payment system via bonding curves.",
    url: "https://v2ex.com/t/1061427",
    tags: ["idea", "Payment", "Bonding Curve", "AAVE"],
    category: "idea",
  },
  {
    title: "CarbonVote",
    description: "Vote for the hard fork with your Ether.",
    url: "https://vitalik.eth.limo/general/2017/12/17/voting.html",
    tags: ["idea", "Ethereum", "Hard Fork", "Voting"],
    category: "idea",
  },
  {
    title: "Nevermore",
    description: "A social credit system on the blockchain.",
    url: "https://github.com/janx/nevermore",
    tags: ["Hackathon", "Shanghai 2016", "Blockchain"],
    category: "hackathon",
  },
];

export const todos: Todo[] = [
  { title: "♟️ 1000 Elo on Chess.com" },
  { title: "🏸 CBAF Level 3 on badminton" },
];
