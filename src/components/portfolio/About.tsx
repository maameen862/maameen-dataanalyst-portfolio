import { motion } from "framer-motion";
import { usePortfolio } from "@/lib/portfolioStore";
import { useLightbox } from "./Lightbox";

export const About = () => {
  const portfolio = usePortfolio();
  const { open } = useLightbox();
  const certImages = portfolio.certifications
    .filter((c) => c.image)
    .map((c) => ({ src: c.image as string, alt: c.name, caption: c.name }));
  return (
    <section id="about" className="py-24 md:py-32 border-t border-hairline">
      <div className="container">
        <SectionLabel index="02" label="About" />
        <div className="mt-10 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight text-balance">
              I don't just visualize data —{" "}
              <span className="text-gradient-primary">I interrogate it.</span>
            </h2>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed">{portfolio.about}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="border border-hairline bg-card/50 backdrop-blur p-6 rounded-sm">
              <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-4">
                — What I do
              </div>
              <ul className="space-y-4 text-sm">
                {[
                  "Build executive Power BI / Tableau / Looker dashboards",
                  "Write performant SQL across multi-table joins",
                  "Translate raw business questions into measurable KPIs",
                  "Surface risks & opportunities — not just charts",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="font-mono text-primary mt-0.5">→</span>
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-px border border-hairline bg-border rounded-sm overflow-hidden">
              {portfolio.certifications.map((c, i) => (
                <div key={c.id} className="bg-card p-4 flex flex-col gap-3">
                  {c.image && (
                    <button
                      type="button"
                      onClick={() => {
                        const idx = certImages.findIndex((im) => im.src === c.image);
                        open(certImages, idx >= 0 ? idx : 0);
                      }}
                      aria-label={`Open ${c.name} certificate preview`}
                      className="aspect-[4/3] overflow-hidden rounded-sm border border-hairline bg-secondary/40 cursor-zoom-in group"
                    >
                      <img
                        src={c.image}
                        alt={`${c.name} certificate`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </button>
                  )}
                  <div>
                    <div className="font-mono text-[10px] text-primary">CERT 0{i + 1}</div>
                    <div className="mt-2 text-[11px] leading-snug text-muted-foreground">
                      {c.name.split("—")[0].trim()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const SectionLabel = ({ index, label }: { index: string; label: string }) => (
  <div className="flex items-center gap-4">
    <span className="font-mono text-xs text-primary">{index}</span>
    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
      {label}
    </span>
    <span className="h-px flex-1 bg-border" />
  </div>
);
