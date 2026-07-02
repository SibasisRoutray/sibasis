import { FadeIn } from "./FadeIn";

const EXPERIENCE = [
  {
    year: "2024 september — Present",
    role: "Software Developer",
    company: "Quotus Software Solutions",
    desc: "Building highly interactive web applications using React, Next.js, and Framer Motion. Integrating Web3 features using Ethers.js and smart contracts. Architecting robust backend solutions using Express and MongoDB. Implemented secure JWT authentication and RESTful APIs for various client projects.",
  },
  // {
  //   year: "2023 — 2024",
  //   role: "Full Stack Web Developer",
  //   company: "Tech Agency",
  //   desc: "Developed and maintained multiple MERN stack applications. Optimized database queries, resulting in 30% faster load times. Implemented secure JWT authentication and RESTful APIs for various client projects.",
  // },
];

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="px-5 sm:px-8 md:px-10 py-10"
      style={{ backgroundColor: "#030207" }}
    >
      <FadeIn y={30}>
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-14 sm:mb-20 md:mb-24"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Experience
        </h2>
      </FadeIn>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {EXPERIENCE.map((e, i) => (
          <FadeIn key={i} delay={i * 0.1} y={30}>
            <div
              className="flex flex-col sm:flex-row gap-4 sm:gap-10 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: "1px solid rgba(215, 226, 234, 0.15)",
                borderBottom:
                  i === EXPERIENCE.length - 1
                    ? "1px solid rgba(215, 226, 234, 0.15)"
                    : "none",
              }}
            >
              <div
                className="font-medium uppercase tracking-wider shrink-0 sm:w-48"
                style={{ color: "#D7E2EA", opacity: 0.6, fontSize: "clamp(0.8rem, 1.2vw, 1rem)" }}
              >
                {e.year}
              </div>
              <div className="flex-1">
                <div
                  className="font-medium uppercase mb-2"
                  style={{ color: "#D7E2EA", fontSize: "clamp(1.1rem, 2.2vw, 2rem)" }}
                >
                  {e.role}
                </div>
                <div
                  className="font-light mb-3"
                  style={{ color: "#D7E2EA", opacity: 0.7, fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)" }}
                >
                  {e.company}
                </div>
                <p
                  className="font-light leading-relaxed max-w-2xl"
                  style={{ color: "#D7E2EA", opacity: 0.55, fontSize: "clamp(0.85rem, 1.4vw, 1.1rem)" }}
                >
                  {e.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
