import { motion } from "framer-motion";
import { usePortfolio } from "@/lib/portfolioStore";
import { SectionLabel } from "./About";

export const CustomSections = () => {
  const portfolio = usePortfolio();
  const visible = portfolio.visibility?.customSections !== false;
  const items = portfolio.customSections ?? [];
  if (!visible || items.length === 0) return null;

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
                  <div className="relative overflow-hidden rounded-sm border border-hairline bg-card/50 aspect-[4/3]">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
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