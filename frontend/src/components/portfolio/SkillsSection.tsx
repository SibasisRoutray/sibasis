import { useEffect, useRef, useState } from "react";
import { FadeIn } from "./FadeIn";
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiEthereum,
  SiSolidity,
  SiWeb3Dotjs,
  SiGit,
  SiGithub,
  SiDocker,
  SiPostman,
  SiVercel,
  SiGraphql,
} from "react-icons/si";
import { 
  FaCube, 
  FaNetworkWired, 
  FaDatabase,
  FaRocket,
  FaCode,
  FaBolt,
  FaGlobe,
  FaTools,
  FaBook,
  FaUserGraduate,
  FaProjectDiagram,
  FaCheckCircle,
  FaLightbulb,
  FaServer,
  FaCloud,
  FaShieldAlt,
  FaPalette,
  FaMobileAlt,
  FaBrain,
  FaClock,
} from "react-icons/fa";
import { FiZap, FiTool, FiBox } from "react-icons/fi";
import { VscCode } from "react-icons/vsc";
import { MdStorage, MdSecurity, MdDevices, MdDesignServices } from "react-icons/md";
import { GiBrain, GiRocket } from "react-icons/gi";

const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

export function SkillsSection() {
  const { ref: sectionRef } = useScrollAnimation();

  const themeColors = {
    frontend: { border: "rgba(5, 150, 105, 0.4)", glow: "rgba(5, 150, 105, 0.15)", text: "#10b981" },
    backend: { border: "rgba(34, 197, 94, 0.4)", glow: "rgba(34, 197, 94, 0.15)", text: "#22c55e" },
    web3: { border: "rgba(59, 130, 246, 0.4)", glow: "rgba(59, 130, 246, 0.15)", text: "#3b82f6" },
    tools: { border: "rgba(16, 185, 129, 0.4)", glow: "rgba(16, 185, 129, 0.15)", text: "#34d399" },
    exploring: { border: "rgba(249, 115, 22, 0.4)", glow: "rgba(249, 115, 22, 0.15)", text: "#f97316" }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative px-4 sm:px-8 lg:px-16 py-16 sm:py-24 overflow-hidden text-white min-h-screen flex flex-col justify-center"
      style={{ backgroundColor: "#030207" }}
    >
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <FadeIn y={30}>
          <div className="text-center mb-14 sm:mb-20 md:mb-24 relative">
            <h2
              className="font-black uppercase leading-none tracking-tighter mb-4 relative"
              style={{ 
                fontSize: "clamp(2.5rem, 10vw, 120px)",
                background: "linear-gradient(135deg, #FFFFFF 0%, #9CA3AF 50%, #4B5563 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Skills
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
              Technologies and tools I use to build modern, scalable and engaging digital experiences.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} y={30} className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12 border-b border-gray-800 pb-8">
          <div>
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-gray-400 bg-gray-500/10 border border-gray-500/20 rounded-full px-3 py-1">
              <FaRocket className="w-3 h-3" />
              <span>Always learning. Always building.</span>
              <span>→</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-6 min-w-[300px] sm:min-w-[450px]">
            <div className="stat-card bg-[#0b0813] border border-gray-800 p-4 rounded-xl flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                <FaRocket className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-black">2</div>
                <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">Years Exp</div>
              </div>
            </div>
            <div className="stat-card bg-[#0b0813] border border-gray-800 p-4 rounded-xl flex items-center gap-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                <FaCode className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-black">10+</div>
                <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">Projects</div>
              </div>
            </div>
            <div className="stat-card bg-[#0b0813] border border-gray-800 p-4 rounded-xl flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                <FaBolt className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-black">15+</div>
                <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">Techs</div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          <FadeIn 
            delay={0.2} y={30}
            className="skill-category-card skill-card-frontend md:col-span-5 rounded-2xl p-6 transition-all duration-300 bg-[#07050d] border hover:shadow-2xl"
            style={{ borderColor: themeColors.frontend.border, boxShadow: `0 0 20px ${themeColors.frontend.glow}` }}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase flex items-center gap-2">
                 FRONTEND
                </h3>
                <p className="text-xs text-gray-500 mt-1">Building responsive and interactive user interfaces</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mt-8">
              {[
                { name: "React", icon: SiReact, color: "#61DAFB" },
                { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
                { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
                { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
                { name: "Redux", icon: SiRedux, color: "#764ABC" },
                { name: "Zustand", icon: FiZap, color: "#ffffff" },
                { name: "TanStack", icon: FaDatabase, color: "#FF4154" },
              ].map((it) => (
                <div 
                  key={it.name} 
                  className="tech-item bg-[#0e0b16] rounded-xl p-3 flex flex-col items-center justify-center gap-2"
                >
                  <it.icon className="w-7 h-7 object-contain" style={{ color: it.color }} />
                  <span className="text-[10px] text-gray-400 text-center truncate w-full font-medium">{it.name}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn 
            delay={0.3} y={30}
            className="skill-category-card skill-card-backend md:col-span-4 rounded-2xl p-6 transition-all duration-300 bg-[#050806] border hover:shadow-2xl"
            style={{ borderColor: themeColors.backend.border, boxShadow: `0 0 20px ${themeColors.backend.glow}` }}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase flex items-center gap-2">
                  BACKEND
                </h3>
                <p className="text-xs text-gray-500 mt-1">Building robust and scalable server-side apps</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-8">
              {[
                { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
                { name: "Express", icon: SiExpress, color: "#ffffff" },
                { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
                { name: "REST APIs", icon: FaNetworkWired, color: "#ffffff" },
                { name: "JWT Auth", icon: MdSecurity, color: "#ffffff" },
                { name: "Socket.io", icon: FaCube, color: "#ffffff" },
              ].map((it) => (
                <div 
                  key={it.name} 
                  className="tech-item bg-[#0b0e0c] rounded-xl p-3 flex flex-col items-center justify-center gap-2"
                >
                  <it.icon className="w-7 h-7 object-contain" style={{ color: it.color }} />
                  <span className="text-[10px] text-gray-400 text-center truncate w-full font-medium">{it.name}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn 
            delay={0.4} y={30}
            className="skill-category-card skill-card-web3 md:col-span-3 rounded-2xl p-6 transition-all duration-300 bg-[#04060c] border hover:shadow-2xl"
            style={{ borderColor: themeColors.web3.border, boxShadow: `0 0 20px ${themeColors.web3.glow}` }}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase flex items-center gap-2">
                  WEB3
                </h3>
                <p className="text-xs text-gray-500 mt-1">Building decentralized systems</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-8">
              {[
                { name: "Ethereum", icon: SiEthereum, color: "#627EEA" },
                { name: "Solidity", icon: SiSolidity, color: "#ffffff" },
                { name: "Web3.js", icon: SiWeb3Dotjs, color: "#F16822" },
                { name: "Polkadot", icon: FaCube, color: "#E6007A" },
              ].map((it) => (
                <div 
                  key={it.name} 
                  className="tech-item bg-[#070b14] rounded-xl p-3 flex flex-col items-center justify-center gap-1.5"
                >
                  <it.icon className="w-6 h-6 object-contain" style={{ color: it.color }} />
                  <span className="text-[10px] text-gray-400 text-center truncate w-full font-medium">{it.name}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn 
            delay={0.5} y={30}
            className="skill-category-card skill-card-tools md:col-span-7 rounded-2xl p-6 transition-all duration-300 bg-[#0d050a] border hover:shadow-2xl"
            style={{ borderColor: themeColors.tools.border, boxShadow: `0 0 20px ${themeColors.tools.glow}` }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase flex items-center gap-2">
                  TOOLS
                </h3>
                <p className="text-xs text-gray-500 mt-1">Essential tools that speed up development and deployment</p>
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 mt-6">
              {[
                { name: "Git", icon: SiGit, color: "#F05032" },
                { name: "GitHub", icon: SiGithub, color: "#ffffff" },
                { name: "VS Code", icon: VscCode, color: "#007ACC" },
                { name: "Docker", icon: SiDocker, color: "#2496ED" },
                { name: "Postman", icon: SiPostman, color: "#FF6C37" },
                { name: "Vercel", icon: SiVercel, color: "#ffffff" },
                { name: "Figma", icon: FiTool, color: "#F24E1E" },
              ].map((it) => (
                <div 
                  key={it.name} 
                  className="tech-item bg-[#12070f] rounded-xl p-3 flex flex-col items-center justify-center gap-2"
                >
                  <it.icon className="w-6 h-6 object-contain" style={{ color: it.color }} />
                  <span className="text-[9px] text-gray-400 text-center truncate w-full font-medium">{it.name}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn 
            delay={0.6} y={30}
            className="skill-category-card skill-card-exploring md:col-span-5 rounded-2xl p-6 transition-all duration-300 bg-[#0d0705] border hover:shadow-2xl"
            style={{ borderColor: themeColors.exploring.border, boxShadow: `0 0 20px ${themeColors.exploring.glow}` }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase flex items-center gap-2">
                  EXPLORING
                </h3>
                <p className="text-xs text-gray-500 mt-1">Technologies I'm currently learning</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
                { name: "AI Tools", icon: FaBrain, color: "#ffffff" },
              ].map((it) => (
                <div 
                  key={it.name} 
                  className="tech-item bg-[#140a07] rounded-xl px-3 py-2.5 flex items-center gap-2"
                >
                  <it.icon className="w-5 h-5 object-contain" style={{ color: it.color }} />
                  <span className="text-[10px] text-gray-400 font-medium truncate">{it.name}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.7} y={30} className="mt-8 bg-[#0b0813] border border-gray-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-bold tracking-widest text-gray-400 uppercase flex items-center gap-2">
            Core Competencies
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "Clean Code", 
              "Problem Solving", 
              "Responsive Design", 
              "Performance Optimization", 
              "UI/UX Principles", 
              "Agile Workflow"
            ].map((comp) => (
              <span 
                key={comp} 
                className="competency-tag text-xs px-3 py-1 rounded-full bg-gray-900/60 border border-gray-800 text-gray-300 font-medium flex items-center gap-1.5"
              >
                {comp}
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.8} y={30} className="text-center mt-12 text-sm italic text-gray-500">
          <FaLightbulb className="inline-block w-4 h-4 mr-2 text-gray-400" />
          “ The best way to predict the future is to <span className="text-gray-400 font-semibold not-italic">build it.</span> ”
        </FadeIn>
      </div>

      <style>{`
        .stat-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .stat-card:hover {
          transform: scale(1.05);
          border-color: rgba(59, 130, 246, 0.3);
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.1);
        }
        
        .stat-card:nth-child(2):hover {
          border-color: rgba(6, 182, 212, 0.3);
          box-shadow: 0 0 30px rgba(6, 182, 212, 0.1);
        }
        
        .stat-card:nth-child(3):hover {
          border-color: rgba(16, 185, 129, 0.3);
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.1);
        }
        
        .tech-item {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
        }
        
        .tech-item:hover {
          transform: scale(1.1) translateY(-4px);
          background: rgba(5, 150, 105, 0.1);
          box-shadow: 0 0 30px rgba(5, 150, 105, 0.15);
        }
        
        .tech-item:hover svg {
          transform: scale(1.15);
          opacity: 1 !important;
        }
        
        .tech-item:hover span {
          color: white;
        }
        
        .skill-card-backend .tech-item:hover {
          background: rgba(34, 197, 94, 0.1);
          box-shadow: 0 0 30px rgba(34, 197, 94, 0.15);
        }
        
        .skill-card-web3 .tech-item:hover {
          background: rgba(59, 130, 246, 0.1);
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.15);
        }
        
        .skill-card-tools .tech-item:hover {
          background: rgba(16, 185, 129, 0.1);
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.15);
        }
        
        .skill-card-exploring .tech-item:hover {
          background: rgba(249, 115, 22, 0.1);
          box-shadow: 0 0 30px rgba(249, 115, 22, 0.15);
        }
        
        .competency-tag {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
        }
        
        .competency-tag:hover {
          transform: scale(1.05);
          background: rgba(75, 85, 99, 0.4);
          border-color: rgba(107, 114, 128, 0.5);
        }
        
        .skill-category-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .skill-category-card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5) !important;
        }
        
        .skill-card-frontend:hover {
          border-color: rgba(5, 150, 105, 0.6) !important;
        }
        
        .skill-card-backend:hover {
          border-color: rgba(34, 197, 94, 0.6) !important;
        }
        
        .skill-card-web3:hover {
          border-color: rgba(59, 130, 246, 0.6) !important;
        }
        
        .skill-card-tools:hover {
          border-color: rgba(16, 185, 129, 0.6) !important;
        }
        
        .skill-card-exploring:hover {
          border-color: rgba(249, 115, 22, 0.6) !important;
        }
        
        .tech-item svg {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .tech-item span {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .stat-card .p-2 {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .stat-card:hover .p-2 {
          background: rgba(59, 130, 246, 0.2);
        }
        
        .stat-card:nth-child(2):hover .p-2 {
          background: rgba(6, 182, 212, 0.2);
        }
        
        .stat-card:nth-child(3):hover .p-2 {
          background: rgba(16, 185, 129, 0.2);
        }
        
        /* Floating animation for tech items */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        
        .tech-item:hover {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}