import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { MarqueeSection } from "@/components/portfolio/MarqueeSection";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { ServicesSection } from "@/components/portfolio/ServicesSection";
import { EducationSection } from "@/components/portfolio/EducationSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { TestimonialsSection } from "@/components/portfolio/TestimonialsSection";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import ContactForm from "@/components/portfolio/ContactForm";
import { ScrollToTop } from "@/components/portfolio/ScrollToTop";
import Loader from "@/components/portfolio/Loader";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sibasis — Software Developer" },
      {
        name: "description",
        content:
          "Sibasis — Software Developer building fast, elegant, motion-rich web experiences with React, TypeScript, Tailwind, and MongoDB.",
      },
      { property: "og:title", content: "Sibasis — Software Developer" },
      {
        property: "og:description",
        content:
          "Portfolio of Sibasis — Software Developer specializing in React, TypeScript, Tailwind, Motion, and the MERN stack.",
      },
    ],
  }),
  component: Index,
});

function Index() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);



  return (

    <>
    <AnimatePresence mode="wait">
      {loading && <Loader />}
    </AnimatePresence>

    {!loading && (
       <main 
      style={{ backgroundColor: "#0C0C0C", overflowX: "clip" }} 
      className="flex flex-col"
    >
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        
        /* Smooth scroll for all anchor links */
        * {
          scroll-behavior: smooth;
        }
        
        /* Optional: Custom scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0C0C0C;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
      <HeroSection />
       <ScrollToTop />
      <MarqueeSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ServicesSection />
      <EducationSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />
    </main>


    )}
    </>
   
  );
}