import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { usePortfolio } from "@/lib/portfolioStore";
import { SectionLabel } from "./About";
import { ArrowUpRight, Calendar, Expand } from "lucide-react";
import { useLightbox } from "./Lightbox";

export const Projects = () => {
  const portfolio = usePortfolio();
  const { open } = useLightbox();
  const [filter, setFilter] = useState("All");
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(portfolio.projects.map((p) => p.category)))],
    [portfolio.projects]
  );
  const projects = portfolio.projects.filter((p) => filter === "All" || p.category === filter);
  const projectImages = projects
    .filter((p) => p.image)
    .map((p) => ({ src: p.image as string, alt: p.title, caption: p.title }));

  return (
    <section id="projects" className="py-24 md:py-32 border-t border-hairline">
      <div className="container">
        <SectionLabel index="05" label="Selected work" />

        <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight max-w-2xl text-balance">
            Dashboards & analyses that <span className="text-gradient-primary">moved the needle.</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-3 py-1.5 rounded-sm font-mono text-[10px] uppercase tracking-widest transition border ${
                  filter === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-hairline text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`group relative border border-hairline bg-card/50 backdrop-blur rounded-sm overflow-hidden hover:border-primary/40 hover:bg-card transition-all duration-500 ${
                p.featured ? "md:col-span-2" : ""
              }`}
            >
              {p.image && (
                <button
                  type="button"
                  onClick={() => {
                    const idx = projectImages.findIndex((im) => im.src === p.image);
                    open(projectImages, idx >= 0 ? idx : 0);
                  }}
                  aria-label={`Open ${p.title} preview`}
                  className={`group/img relative block w-full overflow-hidden border-b border-hairline cursor-zoom-in ${p.featured ? "aspect-[21/9]" : "aspect-[16/9]"}`}
                >
                  <img
                    src={p.image}
                    alt={`${p.title} preview`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent pointer-events-none" />
                  <span className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-sm border border-hairline bg-background/70 backdrop-blur opacity-0 group-hover/img:opacity-100 transition text-foreground">
                    <Expand className="h-3.5 w-3.5" />
                  </span>
                </button>
              )}
              <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                    <span className="text-primary">{p.category}</span>
                    <span className="h-px w-8 bg-border" />
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" /> {p.period}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.subtitle}</p>
                </div>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${p.title}`}
                    className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-sm border border-hairline text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/10 transition group-hover:rotate-0"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed">{p.description}</p>

              <div className={`mt-6 grid gap-2 ${p.featured ? "md:grid-cols-2" : ""}`}>
                {p.highlights.map((h, j) => (
                  <div
                    key={j}
                    className="flex gap-2.5 text-xs text-muted-foreground border-l border-primary/40 pl-3 py-1"
                  >
                    <span className="font-mono text-primary">{String(j + 1).padStart(2, "0")}</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {p.tools.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm bg-secondary text-foreground/80 border border-hairline"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {p.featured && (
                <div className="absolute top-6 right-6 font-mono text-[9px] uppercase tracking-widest text-primary border border-primary/40 px-2 py-0.5 rounded-sm bg-primary/10 z-10">
                  ★ Featured
                </div>
              )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
