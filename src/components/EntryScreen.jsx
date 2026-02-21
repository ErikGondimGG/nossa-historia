import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Comets from "./Comets";

const TITLE = "Nossa História";
const SUBTITLE = "Um ano de você. Um ano de nós.";

// Generate stable star positions
const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  top: `${Math.sin(i * 2.3) * 50 + 50}%`,
  left: `${Math.cos(i * 1.7) * 50 + 50}%`,
  size: (i % 3) + 1,
  delay: (i % 5) * 0.6,
  duration: 2 + (i % 4),
}));

export default function EntryScreen({ audioRef }) {
  const [titleDone, setTitleDone] = useState(false);
  const [subtitleDone, setSubtitleDone] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const titleLetters = TITLE.split("");
  const subtitleLetters = SUBTITLE.split("");

  // Show button after subtitle finishes
  useEffect(() => {
    if (subtitleDone) {
      const t = setTimeout(() => setShowButton(true), 400);
      return () => clearTimeout(t);
    }
  }, [subtitleDone]);

  const handleStart = () => {
    // Start audio
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
    // Smooth scroll to next section
    const next = document.getElementById("timeline-start");
    if (next) next.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-midnight">
      {/* Stars — CSS animation (compositor thread, zero JS overhead) */}
      {STARS.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animation: `twinkle ${star.duration}s ${star.delay}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Radial glow */}
      <div
        className="absolute inset-0 bg-radial-gradient pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Comets */}
      <Comets />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        {/* Animated title */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-gold flex flex-wrap justify-center">
          {titleLetters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              onAnimationComplete={
                i === titleLetters.length - 1
                  ? () => setTitleDone(true)
                  : undefined
              }
              style={{ whiteSpace: letter === " " ? "pre" : "normal" }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </h1>

        {/* Animated subtitle */}
        <AnimatePresence>
          {titleDone && (
            <p className="font-script text-xl sm:text-2xl md:text-3xl text-rose-light flex flex-wrap justify-center">
              {subtitleLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  onAnimationComplete={
                    i === subtitleLetters.length - 1
                      ? () => setSubtitleDone(true)
                      : undefined
                  }
                  style={{ whiteSpace: letter === " " ? "pre" : "normal" }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </p>
          )}
        </AnimatePresence>

        {/* Date badge */}
        <AnimatePresence>
          {subtitleDone && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="font-sans text-sm text-gold/60 tracking-widest uppercase"
            >
              23/02/2025 — 23/02/2026
            </motion.p>
          )}
        </AnimatePresence>

        {/* Start button */}
        <AnimatePresence>
          {showButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleStart}
              className="mt-6 px-10 py-4 rounded-full border-2 border-gold text-gold font-display text-lg tracking-wide hover:bg-gold hover:text-midnight transition-colors duration-300 cursor-pointer"
            >
              Começar nossa história ✨
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-0.5 h-8 bg-gold/50 rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
