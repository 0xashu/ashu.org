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
}

export interface ProjectItem {
  name: string;
  description: string;
  url: string;
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
  projects: ProjectItem[];
  social: SocialLink[];
}
