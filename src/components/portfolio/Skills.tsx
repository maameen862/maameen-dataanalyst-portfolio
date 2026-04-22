import { motion } from "framer-motion";
import { portfolio } from "@/lib/portfolio";
import { SectionLabel } from "./About";

export const Skills = () => {
  return (
    <section id="skills" className="py-24 md:py-32 border-t border-hairline relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-50 pointer-events-none" />
      <div className="container relative">
        <SectionLabel index="03" label="Toolkit" />

        <div className="mt-10 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight text-balance">
              The stack I use to <span className="text-gradient-primary">ship insights.</span>
            </h2>
            <p className="mt-6 text-muted-foreground">
              Every tool below is rated by hands-on production use — not tutorials. Bars represent
              fluency level across recent dashboards & analyses.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-5">
            {portfolio.skills.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-display text-base font-semibold text-foreground">
                    {s.name}
                  </span>
                  <span className="font-mono text-xs text-primary">{s.level}<span className="text-muted-foreground">/100</span></span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.05, ease: [0.65, 0, 0.35, 1] }}
                    className="h-full bg-gradient-primary shadow-glow"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
