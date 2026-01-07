export interface NavItem {
  label: string;
  href: string;
}

export interface WorkingItem {
  company: string;
  description: string;
  period: string;
  status?: string;
  url: string;
  tags?: string[];
}

export interface IdeaItem {
  name: string;
  description: string;
  url: string;
  type: "hackathon" | "todo";
  status?: string;
  date?: string;
  tags?: string[];
}

export interface ReadingItem {
  title: string;
  author: string;
  cover?: string;
  url?: string;
  description?: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface SiteContent {
  name: string;
  title: string;
  intro: string;
  nav: NavItem[];
  working: WorkingItem[];
  ideas: IdeaItem[];
  reading: ReadingItem[];
  social: SocialLink[];
}
