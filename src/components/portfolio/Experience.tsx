import { motion } from "framer-motion";
import { portfolio } from "@/lib/portfolio";
import { SectionLabel } from "./About";

export const Experience = () => {
  return (
    <section id="experience" className="py-24 md:py-32 border-t border-hairline">
      <div className="container">
        <SectionLabel index="04" label="Trajectory" />
        <h2 className="mt-10 font-display text-4xl md:text-5xl font-bold leading-tight max-w-3xl text-balance">
          From frontline operations to <span className="text-gradient-primary">analytical impact.</span>
        </h2>

        <div className="mt-16 relative">
          {/* Vertical line */}
          <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-12">
            {portfolio.experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`relative grid md:grid-cols-2 gap-8 ${
                  i % 2 === 0 ? "" : "md:[&>*:first-child]:col-start-2"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-2 md:left-1/2 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-glow ring-4 ring-background" />

                <div className={`pl-10 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-primary">
                    {exp.period}
                  </div>
                  <h3 className="mt-2 font-display text-xl md:text-2xl font-bold">{exp.role}</h3>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {exp.company} · {exp.location}
                  </div>
                </div>

                <div className={`pl-10 md:pl-0 ${i % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
                  <ul className="space-y-2.5 text-sm text-muted-foreground">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2.5">
                        <span className="text-primary mt-1 text-[10px]">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
