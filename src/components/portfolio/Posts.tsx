import { motion } from "framer-motion";
import { usePortfolio } from "@/lib/portfolioStore";
import { SectionLabel } from "./About";
import { Calendar } from "lucide-react";

export const Posts = () => {
  const portfolio = usePortfolio();
  const visible = portfolio.visibility?.posts !== false;
  const items = portfolio.posts ?? [];
  if (!visible || items.length === 0) return null;

  // Sort by date desc when parseable, else preserve order
  const sorted = [...items].sort((a, b) => {
    const da = Date.parse(a.date);
    const db = Date.parse(b.date);
    if (isNaN(da) || isNaN(db)) return 0;
    return db - da;
  });

  return (
    <section id="posts" className="py-24 md:py-32 border-t border-hairline">
      <div className="container">
        <SectionLabel index="08" label="Posts" />
        <h2 className="mt-10 font-display text-4xl md:text-5xl font-bold leading-tight max-w-2xl text-balance">
          Notes & <span className="text-gradient-primary">updates.</span>
        </h2>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {sorted.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="border border-hairline bg-card/50 backdrop-blur rounded-sm p-6 md:p-8 hover:border-primary/40 hover:bg-card transition-all duration-500"
            >
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                <Calendar className="h-3 w-3 text-primary" />
                <span>{p.date}</span>
              </div>
              <h3 className="font-display text-2xl font-bold leading-tight">{p.title}</h3>
              <p className="mt-4 text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                {p.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};