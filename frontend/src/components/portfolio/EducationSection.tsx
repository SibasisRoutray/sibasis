import { FadeIn } from "./FadeIn";

const EDUCATION = [
  {
    year: "2022 — 2024",
    degree: "Masters in Computer Applications",
    school: "GITA Autonomous College, Bhubaneswar",
    mark: "CGPA: 8.6/10",
    desc: "Coursework in data structures, algorithms, web technologies, and databases. Built full-stack projects with the MERN stack.",
  },
  {
    year: "2019 — 2022",
    degree: "Bachelors in Mathematics",
    school: "Utkala University",
    mark: "CGPA: 8.2/10",
    desc: "Studied core mathematical concepts including algebra, calculus, statistics, and discrete mathematics, strengthening analytical and critical thinking abilities.",
  },
  // {
  //   year: "2023 — Present",
  //   degree: "Self-taught Frontend",
  //   school: "Online / Community",
  //   desc: "Continuous learning through docs, open source, and shipping side projects with React, TypeScript, and Motion.",
  // },
];

export function EducationSection() {
  return (
    <section
      id="education"
      className="px-5 sm:px-8 md:px-10 py-10"
      style={{ backgroundColor: "#030207" }}
    >
      <FadeIn y={30}>
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-14 sm:mb-20 md:mb-24"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Education
        </h2>
      </FadeIn>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {EDUCATION.map((e, i) => (
          <FadeIn key={i} delay={i * 0.1} y={30}>
            <div
              className="flex flex-col sm:flex-row gap-4 sm:gap-10 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: "1px solid rgba(215, 226, 234, 0.15)",
                borderBottom:
                  i === EDUCATION.length - 1
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
                  {e.degree}
                </div>
                <div
                  className="font-medium uppercase mb-2"
                  style={{ color: "#D7E2EA", fontSize: "clamp(1.1rem, 2.2vw, 2rem)" }}
                >
                  {e.mark}
                </div>
                <div
                  className="font-light mb-3"
                  style={{ color: "#D7E2EA", opacity: 0.7, fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)" }}
                >
                  {e.school}
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
