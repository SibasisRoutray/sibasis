export function ContactButton() {
  return (
    <a href="#contact">
      <button
        className="rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base text-white font-medium uppercase tracking-widest hover:scale-105 transition-transform duration-300"
        style={{
          background: "linear-gradient(123deg, #011D13 7%, #064E3B 37%, #047857 72%, #059669 100%)",
          boxShadow: "0px 4px 4px rgba(6, 78, 59, 0.4), 4px 4px 12px #064E3B inset",
          outline: "2px solid rgba(255, 255, 255, 0.5)",
          outlineOffset: "-3px",
        }}
      >
        Contact Me
      </button>
    </a>
  );
}
