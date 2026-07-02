// ScrollToTop.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
  onClick={scrollToTop}
  className="fixed bottom-8 right-8 z-50 group bg-transparent rounded-full"
  initial={{ opacity: 0, scale: 0.7, y: 30 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.7, y: 30 }}
  transition={{
    type: "spring",
    stiffness: 260,
    damping: 20,
  }}
  whileHover={{
    scale: 1.08,
    rotate: -4,
  }}
  whileTap={{ scale: 0.92 }}
>
  {/* Glow */}
  <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

  {/* Gradient Border */}
  <div className="relative p-[1px] rounded-full bg-gradient-to-br from-emerald-400/70 via-cyan-400/50 to-white/20">
    {/* Button */}
    <div
      className="
        w-14
        h-14
        rounded-full
        flex
        items-center
        justify-center
        backdrop-blur-xl
        transition-all
        duration-300
      "
      style={{
        background: "rgba(10,10,10,.85)",
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 18V6M12 6L7 11M12 6L17 11"
          stroke="#D7E2EA"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </div>
</motion.button>
      )}
    </AnimatePresence>
  );
}