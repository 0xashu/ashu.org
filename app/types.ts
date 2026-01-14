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
  type: "hackathon" | "todo";
  url?: string;
  status?: string;
  period?: string;
  tags?: string[];
  completed?: boolean;
}

export interface ReadingItem {
  id: string;
  title: string;
  author: string;
  cover?: string;
  url?: string;
  description?: string;
}

export interface PhotographItem {
  id: string;
  title: string;
  image: string;
  year: number;
  date?: string;
  location?: string;
  description?: string;
  tags?: string[];
  camera?: string;
  lens?: string;
  focalLength?: string;
  aperture?: string;
  shutter?: string;
  iso?: string;
  blurDataURL?: string;
}

export interface MovieItem {
  id: string;
  title: string;
  director: string;
  cover: string;
  description?: string;
  url?: string;
  tags?: string[];
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
  movies: MovieItem[];
  social: SocialLink[];
}
