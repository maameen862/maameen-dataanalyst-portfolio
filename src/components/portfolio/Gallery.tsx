import { motion } from "framer-motion";
import { usePortfolio } from "@/lib/portfolioStore";
import { SectionLabel } from "./About";

export const Gallery = () => {
  const portfolio = usePortfolio();
  const visible = portfolio.visibility?.gallery !== false;
  const items = portfolio.gallery ?? [];
  if (!visible || items.length === 0) return null;

  return (
    <section id="gallery" className="py-24 md:py-32 border-t border-hairline">
      <div className="container">
        <SectionLabel index="07" label="Gallery" />
        <h2 className="mt-10 font-display text-4xl md:text-5xl font-bold leading-tight max-w-2xl text-balance">
          A look <span className="text-gradient-primary">behind the dashboards.</span>
        </h2>

        <div className="mt-12 columns-2 md:columns-3 gap-4 [column-fill:_balance]">
          {items.map((img, i) => (
            <motion.figure
              key={img.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.04 }}
              className="mb-4 break-inside-avoid group relative overflow-hidden rounded-sm border border-hairline bg-card/40"
            >
              <img
                src={img.url}
                alt={img.caption ?? `Gallery image ${i + 1}`}
                loading="lazy"
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.03]"
              />
              {img.caption && (
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-background/95 via-background/80 to-transparent p-3 font-mono text-[10px] uppercase tracking-widest text-foreground/90">
                  {img.caption}
                </figcaption>
              )}
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};