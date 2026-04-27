import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import { usePortfolio } from "@/lib/portfolioStore";
import { SectionLabel } from "./About";
import { useLightbox } from "./Lightbox";

export const CustomSections = () => {
  const portfolio = usePortfolio();
  const { open } = useLightbox();
  const visible = portfolio.visibility?.customSections !== false;
  const items = portfolio.customSections ?? [];
  if (!visible || items.length === 0) return null;

  const images = items
    .filter((s) => s.image)
    .map((s) => ({ src: s.image as string, alt: s.title, caption: s.title }));

  return (
    <section id="more" className="py-24 md:py-32 border-t border-hairline">
      <div className="container">
        <SectionLabel index="06" label="More" />
        <div className="mt-12 space-y-16">
          {items.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`grid gap-8 lg:gap-12 items-center ${
                s.image ? "lg:grid-cols-12" : ""
              }`}
            >
              {s.image && (
                <div className={`${i % 2 === 0 ? "lg:col-span-5" : "lg:col-span-5 lg:order-2"}`}>
                  <button
                    type="button"
                    onClick={() => {
                      const idx = images.findIndex((im) => im.src === s.image);
                      open(images, idx >= 0 ? idx : 0);
                    }}
                    aria-label={`Open ${s.title} image preview`}
                    className="group relative block w-full overflow-hidden rounded-sm border border-hairline bg-card/50 aspect-[4/3] cursor-zoom-in"
                  >
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-sm border border-hairline bg-background/70 backdrop-blur opacity-0 group-hover:opacity-100 transition text-foreground">
                      <Expand className="h-3.5 w-3.5" />
                    </span>
                  </button>
                </div>
              )}
              <div className={s.image ? "lg:col-span-7" : ""}>
                <h3 className="font-display text-3xl md:text-4xl font-bold leading-tight text-balance">
                  {s.title}
                </h3>
                <p className="mt-5 text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                  {s.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
