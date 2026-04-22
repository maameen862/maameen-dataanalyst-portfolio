import { useEffect, useSyncExternalStore } from "react";
import seed from "@/data/portfolio.json";
import type { Portfolio } from "@/lib/portfolio";

const STORAGE_KEY = "portfolio:data:v1";
const EVENT = "portfolio:updated";

const readFromStorage = (): Portfolio => {
  if (typeof window === "undefined") return seed as Portfolio;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed as Portfolio;
    return JSON.parse(raw) as Portfolio;
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
  const parsed = JSON.parse(text) as Portfolio;
  savePortfolio(parsed);
};

export const usePortfolioEffect = (cb: (p: Portfolio) => void) => {
  const p = usePortfolio();
  useEffect(() => cb(p), [p, cb]);
};
