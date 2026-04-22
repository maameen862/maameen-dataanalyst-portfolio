import data from "@/data/portfolio.json";

export type Social = { id: string; label: string; url: string; icon: string };
export type Stat = { label: string; value: string };
export type Skill = { id: string; name: string; level: number };
export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
};
export type Project = {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  highlights: string[];
  tools: string[];
  link: string;
  category: string;
  featured: boolean;
};
export type Certification = { id: string; name: string };

export type Portfolio = {
  hero: {
    name: string;
    role: string;
    tagline: string;
    location: string;
    availability: string;
  };
  about: string;
  resumeFile: string;
  contact: { email: string; phone: string };
  socials: Social[];
  stats: Stat[];
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
};

export const portfolio = data as Portfolio;
