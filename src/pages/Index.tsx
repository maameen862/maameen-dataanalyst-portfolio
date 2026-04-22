import { useEffect } from "react";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Contact, Footer } from "@/components/portfolio/Contact";
import { usePortfolio } from "@/lib/portfolioStore";

const Index = () => {
  const portfolio = usePortfolio();
  useEffect(() => {
    document.title = `${portfolio.hero.name} — ${portfolio.hero.role} Portfolio`;
    const meta = document.querySelector('meta[name="description"]') ?? (() => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
      return m;
    })();
    meta.setAttribute(
      "content",
      `${portfolio.hero.name} — ${portfolio.hero.role} based in Hyderabad. SQL, Power BI, Tableau, Looker dashboards that drive decisions.`
    );

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;

    // JSON-LD
    const ldId = "portfolio-jsonld";
    document.getElementById(ldId)?.remove();
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.id = ldId;
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: portfolio.hero.name,
      jobTitle: portfolio.hero.role,
      email: portfolio.contact.email,
      telephone: portfolio.contact.phone,
      address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressCountry: "IN" },
      sameAs: portfolio.socials
        .filter((s) => s.url.startsWith("http"))
        .map((s) => s.url),
    });
    document.head.appendChild(ld);
  }, [portfolio]);

  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
