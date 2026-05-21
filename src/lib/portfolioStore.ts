import { useEffect, useSyncExternalStore } from "react";
import { z } from "zod";
import seed from "@/data/portfolio.json";
import type { Portfolio } from "@/lib/portfolio";

const STORAGE_KEY = "portfolio:data:v1";
const EVENT = "portfolio:updated";

// Allow only safe URL protocols (http/https/mailto/tel) and relative URLs.
// Blocks javascript:, data:, vbscript:, etc. to prevent stored XSS via imports.
const safeUrl = z.string().refine(
  (val) => {
    if (!val) return true;
    // Relative URLs / fragments / paths are fine
    if (val.startsWith("/") || val.startsWith("#") || val.startsWith("?")) return true;
    // Allow inline image data URIs (used by admin file uploads).
    if (val.startsWith("data:image/")) return true;
    if (val.startsWith("data:application/pdf")) return true;
    try {
      const u = new URL(val);
      return ["http:", "https:", "mailto:", "tel:"].includes(u.protocol);
    } catch {
      // Not a parseable absolute URL — accept as plain text fallback only if no colon
      return !val.includes(":");
    }
  },
  { message: "URL must use http(s), mailto, or tel protocol" }
);

const SocialSchema = z.object({
  id: z.string(),
  label: z.string().max(100),
  url: safeUrl.max(2048),
  icon: z.string().max(50),
});

const StatSchema = z.object({
  label: z.string().max(100),
  value: z.string().max(100),
});

const SkillSchema = z.object({
  id: z.string(),
  name: z.string().max(100),
  level: z.number().min(0).max(100),
});

const ExperienceSchema = z.object({
  id: z.string(),
  role: z.string().max(200),
  company: z.string().max(200),
  period: z.string().max(100),
  location: z.string().max(200),
  bullets: z.array(z.string().max(1000)),
});

const ProjectSchema = z.object({
  id: z.string(),
  title: z.string().max(200),
  subtitle: z.string().max(300),
  period: z.string().max(100),
  description: z.string().max(2000),
  highlights: z.array(z.string().max(500)),
  tools: z.array(z.string().max(100)),
  link: safeUrl.max(2048),
  category: z.string().max(100),
  featured: z.boolean(),
  image: safeUrl.max(3_000_000).optional().or(z.literal("")),
  images: z.array(safeUrl.max(3_000_000)).optional(),
});

const CertificationSchema = z.object({
  id: z.string(),
  name: z.string().max(300),
  image: safeUrl.max(3_000_000).optional().or(z.literal("")),
});

const CustomSectionSchema = z.object({
  id: z.string(),
  title: z.string().max(200),
  body: z.string().max(5000),
  image: safeUrl.max(3_000_000).optional().or(z.literal("")),
});

const GalleryImageSchema = z.object({
  id: z.string(),
  url: safeUrl.max(3_000_000),
  caption: z.string().max(300).optional().or(z.literal("")),
});

const PostSchema = z.object({
  id: z.string(),
  title: z.string().max(300),
  date: z.string().max(50),
  body: z.string().max(5000),
});

const VisibilitySchema = z.object({
  customSections: z.boolean(),
  gallery: z.boolean(),
  posts: z.boolean(),
});

const PortfolioSchema = z.object({
  hero: z.object({
    name: z.string().max(200),
    role: z.string().max(200),
    tagline: z.string().max(500),
    location: z.string().max(200),
    availability: z.string().max(300),
  }),
  about: z.string().max(5000),
  resumeFile: z.string().max(10_000_000),
  contact: z.object({
    email: z.string().email().max(255),
    phone: z.string().max(50),
  }),
  socials: z.array(SocialSchema),
  stats: z.array(StatSchema),
  skills: z.array(SkillSchema),
  experience: z.array(ExperienceSchema),
  projects: z.array(ProjectSchema),
  certifications: z.array(CertificationSchema),
  customSections: z.array(CustomSectionSchema).optional(),
  gallery: z.array(GalleryImageSchema).optional(),
  galleryLayout: z.enum(["masonry", "grid", "stack"]).optional(),
  posts: z.array(PostSchema).optional(),
  visibility: VisibilitySchema.optional(),
});

const readFromStorage = (): Portfolio => {
  if (typeof window === "undefined") return seed as Portfolio;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed as Portfolio;
    const parsed = JSON.parse(raw);
    // Validate stored data too — defends against tampered localStorage
    const result = PortfolioSchema.safeParse(parsed);
    if (!result.success) return seed as Portfolio;
    return result.data as Portfolio;
  } catch {
    return seed as Portfolio;
  }
};

let cache: Portfolio = readFromStorage();

const subscribe = (cb: () => void) => {
  const handler = () => {
    cache = readFromStorage();
    cb();
  };
  window.addEventListener(EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT, handler);
    window.removeEventListener("storage", handler);
  };
};

const getSnapshot = () => cache;
const getServerSnapshot = () => seed as Portfolio;

export const usePortfolio = (): Portfolio =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

export const savePortfolio = (next: Portfolio) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  cache = next;
  window.dispatchEvent(new Event(EVENT));
};

export const resetPortfolio = () => {
  localStorage.removeItem(STORAGE_KEY);
  cache = seed as Portfolio;
  window.dispatchEvent(new Event(EVENT));
};

export const exportPortfolio = () => {
  const blob = new Blob([JSON.stringify(cache, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "portfolio.json";
  a.click();
  URL.revokeObjectURL(url);
};

export const importPortfolio = async (file: File) => {
  const text = await file.text();
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    throw new Error("Invalid JSON file. Please check the file contents.");
  }
  const result = PortfolioSchema.safeParse(raw);
  if (!result.success) {
    const first = result.error.issues[0];
    const path = first?.path.join(".") || "(root)";
    throw new Error(`Invalid portfolio data at "${path}": ${first?.message ?? "schema mismatch"}`);
  }
  savePortfolio(result.data as Portfolio);
};

export const usePortfolioEffect = (cb: (p: Portfolio) => void) => {
  const p = usePortfolio();
  useEffect(() => cb(p), [p, cb]);
};
