import { FadeIn } from "./FadeIn";
import { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import { X } from "lucide-react";

export function ContactSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      <section
        id="contact"
        className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 flex flex-col items-center justify-center text-center"
        style={{ backgroundColor: "#030207" }}
      >
        <FadeIn y={30}>
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-8"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            Let's Talk
          </h2>
        </FadeIn>
        <FadeIn delay={0.1} y={30}>
          <p
            className="max-w-2xl mx-auto mb-12 font-light"
            style={{ color: "#D7E2EA", opacity: 0.7, fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
          >
            Got a project in mind or looking for a developer who understands both the MERN stack and Web3?
            Let's build something extraordinary together.
          </p>
        </FadeIn>
        <FadeIn delay={0.2} y={30}>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-4 rounded-full px-8 py-4 sm:px-10 sm:py-5 font-bold uppercase tracking-wider transition-transform hover:scale-105"
            style={{
              backgroundColor: "#D7E2EA",
              color: "#0C0C0C",
              fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
            }}
          >
            Get In Touch
          </button>
        </FadeIn>
        <FadeIn delay={0.3} y={30}>
          <div className="flex gap-6 sm:gap-8 mt-16 sm:mt-20" style={{ color: "#D7E2EA" }}>
            <a href="#" className="uppercase tracking-widest text-xs opacity-60 hover:opacity-100 transition-opacity">GitHub</a>
            <a href="https://www.linkedin.com/in/sibasis-routray-1b8bb924b?utm_source=share_via&utm_content=profile&utm_medium=member_android" className="uppercase tracking-widest text-xs opacity-60 hover:opacity-100 transition-opacity">LinkedIn</a>
            <a href="#" className="uppercase tracking-widest text-xs opacity-60 hover:opacity-100 transition-opacity">Twitter</a>
          </div>
        </FadeIn>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative animate-modal-pop w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-4 -right-4 z-50 p-3 rounded-full transition-all duration-300 hover:bg-white/10 hover:scale-110"
              style={{ 
                color: "#D7E2EA",
                backgroundColor: "rgba(12, 12, 12, 0.9)",
                border: "1px solid rgba(215, 226, 234, 0.1)",
              }}
            >
              <X size={28} />
            </button>
            
            <div className="transform scale-100">
              <ContactForm />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalPop {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(30px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-modal-pop {
          animation: modalPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* Custom scrollbar for modal */
        .fixed.inset-0::-webkit-scrollbar {
          width: 6px;
        }
        
        .fixed.inset-0::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .fixed.inset-0::-webkit-scrollbar-thumb {
          background: rgba(215, 226, 234, 0.3);
          border-radius: 3px;
        }
        
        .fixed.inset-0::-webkit-scrollbar-thumb:hover {
          background: rgba(215, 226, 234, 0.5);
        }
      `}</style>
    </>
  );
}