import type { SiteContent } from "./types";

export const siteContent: SiteContent = {
  name: "Ashu",
  title: "Hello, I'm Ashu",
  intro:
    "A brief introduction about yourself. What you do, what you're passionate about, and what drives you. Keep it concise and authentic.",

  nav: [
    { label: "Working", href: "#working" },
    { label: "Projects", href: "#projects" },
  ],

  working: [
    {
      company: "Nonce",
      url: "https://nonce.app",
      description: "A bitcoin mining tool for 10% hashrate.",
      period: "2025 - Now",
    },
    {
      company: "Mest",
      url: "https://mest.io",
      status: "Acquired",
      description: "All stories about smart money.",
      period: "2022 - 2024",
    },
    {
      company: "imToken",
      url: "https://token.im",
      status: "B Series",
      description: "An ethereum wallet for 20M+ users.",
      period: "2016 - 2022",
    },
  ],

  projects: [
    {
      name: "Project Name",
      description: "A brief description of the project and what it does.",
      url: "#",
    },
    {
      name: "Another Project",
      description: "Description of another project you've worked on.",
      url: "#",
    },
    {
      name: "Open Source Work",
      description: "Contributions to open source or community projects.",
      url: "#",
    },
  ],

  social: [
    { label: "Email", url: "mailto:your@email.com" },
    { label: "Twitter", url: "https://twitter.com/yourusername" },
    { label: "GitHub", url: "https://github.com/yourusername" },
  ],
};
