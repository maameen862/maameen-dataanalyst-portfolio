import { useEffect, useState } from "react";
import { usePortfolio } from "@/lib/portfolioStore";

const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const Nav = () => {
  const portfolio = usePortfolio();
  const [active, setActive] = useState("about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const initials = portfolio.hero.name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-hairline" : ""
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="font-display text-lg font-bold tracking-tight">
            <span className="text-gradient-primary">{initials}</span>
            <span className="text-foreground">.</span>
          </span>
          <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {portfolio.hero.role}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`relative px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                active === s.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
              {active === s.id && (
                <span className="absolute inset-x-3 bottom-1 h-px bg-primary" />
              )}
            </a>
          ))}
        </nav>

        <a
          href={portfolio.resumeFile}
          download
          className="group inline-flex items-center gap-2 rounded-sm border border-primary/40 bg-primary/10 px-3 py-2 text-xs font-mono uppercase tracking-wider text-primary transition hover:bg-primary hover:text-primary-foreground"
        >
          <span>Resume</span>
          <span className="transition-transform group-hover:translate-y-0.5">↓</span>
        </a>
      </div>
    </header>
  );
};
