import { Quote, Star } from "lucide-react";
import { FadeIn } from "./FadeIn";
import styled from 'styled-components';

const TESTIMONIALS = [
  {
    quote:
      "Sibasis delivered a lightning-fast React frontend that exceeded our expectations. The animations felt native and the code was clean and well-structured.",
    name: "Ananya Rao",
    role: "Product Manager, Nexora",
    rating: 5,
    avatar: "AR",
  },
  {
    quote:
      "One of the most reliable frontend developers I've worked with. Great eye for detail, strong TypeScript skills, and always ships on time.",
    name: "Rahul Mehta",
    role: "CTO, Solaris Digital",
    rating: 5,
    avatar: "RM",
  },
  {
    quote:
      "From API integration to polished UI, Sibasis owned the entire frontend. Our conversion rate jumped after the redesign he built.",
    name: "Emily Chen",
    role: "Founder, Aura Labs",
    rating: 5,
    avatar: "EC",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ backgroundColor: "#030207" }}
    >
      <FadeIn y={30}>
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-14 sm:mb-20 md:mb-24"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Testimonials
        </h2>
      </FadeIn>

      <StyledWrapper className="max-w-7xl mx-auto grid gap-6 sm:gap-8 lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <FadeIn key={i} delay={i * 0.1} y={30}>
            <div className="card hover:scale-[1.02] transition-transform duration-300 ease-in-out">
              <div className="bg" />
              <div className="blob" />
              
              {/* Content */}
              <div className="content">
                {/* Rating stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      fill={index < t.rating ? "#9CA3AF" : "none"}
                      style={{ 
                        color: index < t.rating ? "#9CA3AF" : "rgba(75, 85, 99, 0.3)",
                        strokeWidth: 1.5,
                      }}
                    />
                  ))}
                </div>

                {/* Quote icon */}
                <div className="relative">
                  <Quote 
                    size={24} 
                    style={{ color: "#6B7280", opacity: 0.3 }} 
                    className="absolute -top-1 -left-1"
                  />
                  <blockquote
                    className="font-light leading-relaxed pl-6 relative z-10 text-gray-300"
                    style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)" }}
                  >
                    “{t.quote}”
                  </blockquote>
                </div>

                <figcaption className="flex items-center gap-4 mt-2 pt-4 border-t border-gray-800/50">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold"
                    style={{
                      background: "linear-gradient(135deg, rgba(75, 85, 99, 0.4), rgba(30, 30, 30, 0.8))",
                      color: "#9CA3AF",
                      border: "1px solid rgba(75, 85, 99, 0.2)",
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="font-medium truncate text-gray-200"
                      style={{ fontSize: "clamp(0.9rem, 1.1vw, 1rem)" }}
                    >
                      {t.name}
                    </div>
                    <div
                      className="font-light truncate text-gray-500"
                      style={{ fontSize: "clamp(0.75rem, 0.9vw, 0.85rem)" }}
                    >
                      {t.role}
                    </div>
                  </div>
                </figcaption>
              </div>
            </div>
          </FadeIn>
        ))}
      </StyledWrapper>
    </section>
  );
}

const StyledWrapper = styled.div`
  .card {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 280px;
    border-radius: 14px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 40px -10px rgba(5, 150, 105, 0.15);
  }

  .bg {
    position: absolute;
    top: 5px;
    left: 5px;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    z-index: 2;
    background: #000;
    backdrop-filter: blur(24px);
    border-radius: 10px;
    overflow: hidden;
    outline: 1px solid rgba(16, 185, 129, 0.3);
  }

  .blob {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #059669;
    opacity: 0.8;
    filter: blur(15px);
    animation: blob-bounce 5s infinite ease;
  }

  .content {
    position: relative;
    z-index: 3;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    gap: 0.5rem;
  }

  @keyframes blob-bounce {
    0% {
      transform: translate(-100%, -100%) translate3d(0, 0, 0);
    }
    25% {
      transform: translate(-100%, -100%) translate3d(100%, 0, 0);
    }
    50% {
      transform: translate(-100%, -100%) translate3d(100%, 100%, 0);
    }
    75% {
      transform: translate(-100%, -100%) translate3d(0, 100%, 0);
    }
    100% {
      transform: translate(-100%, -100%) translate3d(0, 0, 0);
    }
  }

  /* Responsive - keeping your exact style */
  @media (max-width: 1024px) {
    .content {
      padding: 1.25rem;
    }
  }

  @media (max-width: 768px) {
    .card {
      min-height: 250px;
    }
    .content {
      padding: 1rem;
    }
    .blob {
      width: 120px;
      height: 120px;
    }
  }

  @media (max-width: 640px) {
    .card {
      min-height: 230px;
    }
    .content {
      padding: 0.875rem;
    }
    .blob {
      width: 100px;
      height: 100px;
      filter: blur(10px);
    }
  }
`;