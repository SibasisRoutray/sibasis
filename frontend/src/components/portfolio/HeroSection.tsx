import React, { memo, Fragment, useMemo, useRef, useState } from "react";
import { FadeIn } from "./FadeIn";
import { ContactButton } from "./ContactButton";
import { Magnet } from "./Magnet";
import { FaDownload, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

const navLinks = ["About", "Skills", "Education", "Projects"];

const socialLinks = [
  { icon: FaGithub, href: "#", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/sibasis-routray-1b8bb924b?utm_source=share_via&utm_content=profile&utm_medium=member_android", label: "LinkedIn" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FiMail, href: "#", label: "Email" },
];

// Static styles moved outside component
const heroSectionStyle = { 
  overflowX: "clip" as const, 
  backgroundColor: "#080808" 
};

const meshGradientStyle = {
  background: `
    radial-gradient(circle at 20% 50%, rgba(5, 150, 105, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.06) 0%, transparent 50%),
    radial-gradient(circle at 50% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 30% 30%, rgba(16, 185, 129, 0.03) 0%, transparent 40%)
  `,
  animation: 'meshFloat 20s ease-in-out infinite alternate'
};

const noiseTextureStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
  backgroundSize: '200px 200px'
};

const gridPatternStyle = {
  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
  backgroundSize: '40px 40px'
};

// Custom hook for media queries
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  
  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);
  
  return matches;
};

// Memoized hover card component
const HoverCard = memo(() => {
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isMobile = useMediaQuery('(max-width: 767px)');
  
  const cardData = [
    { label: "Full Name", value: "Sibasis Routray" },
    { label: "Position", value: "Software Developer" },
    { label: "Age", value: "24 yrs" },
    { label: "Education", value: "Master's in Computer Applications" },
  ];

  // Mobile version
  if (isMobile) {
    return (
     <></>
    );
  }

  // Tablet version
  if (isTablet) {
    return (
      <div className="absolute lg:hidden left-1/2 -translate-x-1/2 top-full mt-3 z-20 opacity-0 -translate-y-2 pointer-events-none transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 w-[min(620px,calc(100vw-120px))]">
        <div className="rounded-2xl border px-6 py-5 backdrop-blur-md" style={{ borderColor: "rgba(215,226,234,.15)", background: "rgba(8,8,8,.8)", boxShadow: "0 8px 32px rgba(0,0,0,.3), inset 0 1px 0 rgba(215,226,234,.1)" }}>
          <div className="flex flex-row gap-3.5 text-left">
            {cardData.map((item, index) => (
              <Fragment key={item.label}>
                <div>
                  <span className="text-[10px] uppercase tracking-wider opacity-60 block mb-1" style={{ color: "#D7E2EA" }}>{item.label}</span>
                  <span className="text-sm font-semibold" style={{ color: "#D7E2EA" }}>{item.value}</span>
                </div>
                {index < cardData.length - 1 && <div style={{ height: "1px", background: "rgba(215,226,234,.1)" }} />}
              </Fragment>
            ))}
          </div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45" style={{ top: "-6px", background: "rgba(8,8,8,.8)", borderRight: "1px solid rgba(215,226,234,.15)", borderTop: "1px solid rgba(215,226,234,.15)" }} />
      </div>
    );
  }

  // Desktop version
  return (
    <div className="absolute hidden lg:block z-20 left-full ml-6 top-1/2 -translate-y-1/2 opacity-0 translate-x-3 pointer-events-none transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0 w-60">
      <div className="rounded-2xl border px-6 py-5 backdrop-blur-md" style={{ borderColor: "rgba(215,226,234,.15)", background: "rgba(8,8,8,.8)", boxShadow: "0 8px 32px rgba(0,0,0,.3), inset 0 1px 0 rgba(215,226,234,.1)" }}>
        <div className="flex flex-col gap-4 text-left">
          {cardData.map((item, index) => (
            <Fragment key={item.label}>
              <div>
                <span className="text-[10px] uppercase tracking-wider opacity-60 block mb-1.5" style={{ color: "#D7E2EA" }}>{item.label}</span>
                <span className="text-sm font-semibold" style={{ color: "#D7E2EA" }}>{item.value}</span>
              </div>
              {index < cardData.length - 1 && <div style={{ height: "1px", background: "rgba(215,226,234,.1)" }} />}
            </Fragment>
          ))}
        </div>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rotate-45" style={{ right: "100%", marginRight: "-6px", background: "rgba(8,8,8,.8)", borderTop: "1px solid rgba(215,226,234,.15)", borderLeft: "1px solid rgba(215,226,234,.15)" }} />
    </div>
  );
});

HoverCard.displayName = 'HoverCard';

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Memoized stars - generated once
  const stars = useMemo(
    () =>
      Array.from({ length: 60 }, () => ({
        size: Math.random() * 2 + 0.5,
        left: Math.random() * 100,
        top: Math.random() * 100,
        opacity: Math.random() * 0.3 + 0.1,
        duration: Math.random() * 4 + 2,
        delay: Math.random() * 4,
      })),
    []
  );

  return (
    <section 
      ref={heroRef}
      className="relative h-screen flex flex-col" 
      style={heroSectionStyle}
    >
      {/* Soft Animated Mesh Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-30" style={meshGradientStyle} />
      </div>

      {/* Large Blurred Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] bg-emerald-900/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-900/15 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gray-500/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Additional floating orbs */}
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-teal-900/10 rounded-full blur-3xl pointer-events-none animate-pulse delay-2000" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-emerald-900/8 rounded-full blur-3xl pointer-events-none animate-pulse delay-1500" />

      {/* Fine Noise Texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={noiseTextureStyle} />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={gridPatternStyle} />

      {/* Gentle Parallax Layers */}
      <div 
        className="absolute inset-0 pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          transform: `translateY(${scrollPosition * 0.05}px)`,
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] bg-emerald-500/5 rounded-full blur-2xl" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-2xl" />
      </div>

      {/* Cursor-Reactive Glow */}
      <div 
        className="absolute pointer-events-none transition-all duration-300 ease-out"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(5, 150, 105, 0.06) 0%, rgba(59, 130, 246, 0.04) 40%, transparent 70%)',
          borderRadius: '50%',
          left: `calc(50% + ${mousePosition.x * 200}px)`,
          top: `calc(50% + ${mousePosition.y * 200}px)`,
          transform: 'translate(-50%, -50%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Tiny stars with parallax - now using memoized stars */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          transform: `translateY(${scrollPosition * 0.02}px)`,
        }}
      >
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <FadeIn as="nav" delay={0} y={-20} className="w-full px-6 md:px-10 pt-6 md:pt-8 relative z-30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Navigation Links */}
          <ul className="flex items-center gap-1 sm:gap-2 md:gap-4 lg:gap-6 mx-auto">
            {navLinks.map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  className="relative px-2 sm:px-3 py-2 text-xs sm:text-sm md:text-base lg:text-[1.1rem] font-medium uppercase tracking-wider transition-all duration-300 hover:text-white group"
                  style={{ color: "#9CA3AF" }}
                >
                  {l}
                  <span className="absolute -bottom-0 left-1/2 w-0 h-[2px] bg-gradient-to-r from-gray-400 to-gray-300 transition-all duration-300 group-hover:w-full group-hover:left-0" />
                  <span className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </a>
              </li>
            ))}
          </ul>

          {/* Right side - optional CTA or social */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-full border transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10"
              style={{
                borderColor: "rgba(215, 226, 234, 0.15)",
                color: "#D7E2EA",
              }}
            >
              Let's Talk
            </a>
          </div>
        </div>
      </FadeIn>

      <div className="flex-1 flex flex-col justify-between relative">
        <div className="overflow-hidden mt-6 sm:mt-4 md:-mt-5 px-6 md:px-10 relative ">
          <FadeIn delay={0.15} y={40}>
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[14.5vw] relative">
              Hi, i&apos;m sibasis
            </h1>
          </FadeIn>
        </div>

        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
          className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[550px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-1/3 lg:bottom-0"
        >
          <FadeIn delay={0.6} y={30}>
            {/* Using group for hover - no React state needed */}
            <div className="relative group">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gray-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img
                src="/img7.png"
                alt="Sibasis portrait"
                className="w-full h-auto relative z-10 drop-shadow-2xl"
              />

              {/* Hover Info Cards - now fully controlled by group-hover */}
              <HoverCard />
            </div>
          </FadeIn>
        </Magnet>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 relative z-20 gap-4 md:gap-0">
          <FadeIn delay={0.35} y={20}>
            <div>
              <p
                className="font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
                style={{ color: "#D7E2EA", fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
              >
                a software developer crafting fast, elegant, motion-rich web experiences
              </p>
              
              {/* Social Links - now using memoized array */}
              <div className="flex gap-3 mt-4">
                {socialLinks.map((social, i) => (
                  <FadeIn key={i} delay={0.4 + i * 0.05} y={10}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center border transition-all duration-300 hover:scale-110 hover:border-gray-500/50 hover:bg-gray-500/10"
                      style={{ borderColor: "rgba(215, 226, 234, 0.15)" }}
                    >
                      <social.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: "#D7E2EA" }} />
                    </a>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.5} y={20}>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* Download CV Button */}
              <a
                href="/SibasisRoutray.pdf"
                download
                className="group flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/20"
                style={{
                  borderColor: "rgba(215, 226, 234, 0.2)",
                  background: "rgba(215, 226, 234, 0.05)",
                  color: "#D7E2EA"
                }}
              >
                <FaDownload className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 group-hover:translate-y-0.5" />
                <span className="text-xs sm:text-sm font-medium uppercase tracking-wider">Download CV</span>
              </a>
              
              <ContactButton />
            </div>
          </FadeIn>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes meshFloat {
          0% {
            transform: scale(1) rotate(0deg);
          }
          33% {
            transform: scale(1.05) rotate(2deg);
          }
          66% {
            transform: scale(0.95) rotate(-2deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .delay-1000 {
          animation-delay: 1000ms;
        }
        
        .delay-2000 {
          animation-delay: 2000ms;
        }
        
        .delay-1500 {
          animation-delay: 1500ms;
        }
      `}</style>
    </section>
  );
}