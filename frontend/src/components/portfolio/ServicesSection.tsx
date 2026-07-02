import { FadeIn } from "./FadeIn";

const SERVICES = [
  {
    n: "01",
    name: "Web App Development",
    desc: "Building responsive, production-ready single-page and full-stack apps with React, TypeScript, and modern tooling.",
  },
  {
    n: "02",
    name: "UI Engineering",
    desc: "Turning Figma designs into pixel-perfect, accessible interfaces using Tailwind CSS and reusable component systems.",
  },
  {
    n: "03",
    name: "Motion & Interactions",
    desc: "Adding delightful micro-interactions, scroll animations, and page transitions with Framer Motion / Motion.",
  },
  {
    n: "04",
    name: "API & Backend Integration",
    desc: "Connecting frontends to REST and GraphQL APIs with Node.js, Express, and MongoDB — including auth and data modeling.",
  },
  {
    n: "05",
    name: "Performance & SEO",
    desc: "Optimizing Core Web Vitals, bundle size, and on-page SEO so products load fast and rank well.",
  },
  {
  n: "06",
  name: "Web3 & Blockchain",
  desc: "Developing Web3 applications with wallet integration, smart contracts, token interactions, and decentralized blockchain ecosystems.",
},
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <h2
        className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{ color: "#0C0C0C", fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Services
      </h2>


      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {SERVICES.map((s, i) => (
          <FadeIn key={s.n} delay={i * 0.1}>
            <div
              className="flex items-start gap-6 sm:gap-10 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: "1px solid rgba(12, 12, 12, 0.15)",
                borderBottom:
                  i === SERVICES.length - 1
                    ? "1px solid rgba(12, 12, 12, 0.15)"
                    : "none",
              }}
            >
              <div
                className="font-black leading-none"
                style={{
                  color: "#0C0C0C",
                  fontSize: "clamp(3rem, 10vw, 140px)",
                }}
              >
                {s.n}
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <div
                  className="font-medium uppercase"
                  style={{
                    color: "#0C0C0C",
                    fontSize: "clamp(1rem, 2.2vw, 2.1rem)",
                  }}
                >
                  {s.name}
                </div>
                <p
                  className="font-light leading-relaxed max-w-2xl"
                  style={{
                    color: "#0C0C0C",
                    opacity: 0.6,
                    fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)",
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
