import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import { usePortfolio } from "@/lib/portfolioStore";
import { SectionLabel } from "./About";
import { useLightbox, type LightboxImage } from "./Lightbox";

export const Gallery = () => {
  const portfolio = usePortfolio();
  const { open } = useLightbox();
  const visible = portfolio.visibility?.gallery !== false;
  const items = portfolio.gallery ?? [];
  const layout = portfolio.galleryLayout ?? "masonry";
  if (!visible || items.length === 0) return null;

  const lightboxItems: LightboxImage[] = items.map((img, i) => ({
    src: img.url,
    alt: img.caption ?? `Gallery image ${i + 1}`,
    caption: img.caption,
  }));

  const containerClass =
    layout === "masonry"
      ? "mt-12 columns-2 md:columns-3 gap-4 [column-fill:_balance]"
      : layout === "grid"
        ? "mt-12 grid grid-cols-2 md:grid-cols-3 gap-4"
        : "mt-12 max-w-3xl mx-auto flex flex-col gap-6";

  const figureBaseClass =
    layout === "masonry"
      ? "mb-4 break-inside-avoid"
      : layout === "stack"
        ? ""
        : "";

  const imgClass =
    layout === "grid"
      ? "w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
      : "w-full h-auto block transition-transform duration-700 group-hover:scale-[1.03]";

  return (
    <section id="gallery" className="py-24 md:py-32 border-t border-hairline">
      <div className="container">
        <SectionLabel index="07" label="Gallery" />
        <h2 className="mt-10 font-display text-4xl md:text-5xl font-bold leading-tight max-w-2xl text-balance">
          A look <span className="text-gradient-primary">behind the dashboards.</span>
        </h2>

        <div className={containerClass}>
          {items.map((img, i) => (
            <motion.figure
              key={img.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.04 }}
              className={`${figureBaseClass} group relative overflow-hidden rounded-sm border border-hairline bg-card/40 cursor-zoom-in`}
            >
              <button
                type="button"
                onClick={() => open(lightboxItems, i)}
                aria-label={`Open ${img.caption ?? `gallery image ${i + 1}`} in preview`}
                className="block w-full text-left"
              >
                {layout === "grid" ? (
                  <div className="relative aspect-square">
                    <img
                      src={img.url}
                      alt={img.caption ?? `Gallery image ${i + 1}`}
                      loading="lazy"
                      className={imgClass}
                    />
                  </div>
                ) : (
                  <img
                    src={img.url}
                    alt={img.caption ?? `Gallery image ${i + 1}`}
                    loading="lazy"
                    className={imgClass}
                  />
                )}
                <span className="absolute top-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-sm border border-hairline bg-background/70 backdrop-blur opacity-0 group-hover:opacity-100 transition text-foreground">
                  <Expand className="h-3.5 w-3.5" />
                </span>
                {img.caption && (
                  <figcaption className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-background/95 via-background/80 to-transparent p-3 font-mono text-[10px] uppercase tracking-widest text-foreground/90">
                    {img.caption}
                  </figcaption>
                )}
              </button>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};
