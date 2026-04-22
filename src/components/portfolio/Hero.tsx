import { motion } from "framer-motion";
import { portfolio } from "@/lib/portfolio";
import { ArrowDown, MapPin, Sparkles } from "lucide-react";

export const Hero = () => {
  const { hero, stats } = portfolio;

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
      <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="container relative">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-hairline bg-card/50 backdrop-blur px-3 py-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {hero.availability}
          </span>
        </motion.div>

        {/* Name + role */}
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12 items-end">
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4"
            >
              01 / Hello, I'm
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] font-bold text-balance"
            >
              {hero.name.split(" ")[0]}
              <br />
              <span className="text-gradient-primary">{hero.name.split(" ").slice(1).join(" ")}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-widest text-muted-foreground"
            >
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                {hero.role}
              </span>
              <span className="h-px w-8 bg-border" />
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" />
                {hero.location}
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-4"
          >
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-balance border-l-2 border-primary pl-5">
              {hero.tagline}
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-sm bg-gradient-primary px-5 py-3 font-mono text-xs uppercase tracking-wider text-primary-foreground shadow-glow transition hover:scale-[1.02]"
              >
                See work
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-sm border border-hairline px-5 py-3 font-mono text-xs uppercase tracking-wider text-foreground hover:border-primary hover:text-primary transition"
              >
                Get in touch
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px border border-hairline rounded-sm overflow-hidden bg-border"
        >
          {stats.map((s, i) => (
            <div key={s.label} className="bg-card p-6 group hover:bg-secondary transition-colors">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                0{i + 1}
              </div>
              <div className="font-display text-3xl md:text-4xl font-bold text-gradient-primary">
                {s.value}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
