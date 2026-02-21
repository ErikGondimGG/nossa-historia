import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { finale } from "../data/finale";
import Comets from "./Comets";

const PHRASE = "Tem uma última coisa que não cabia na tela…";

// Static — computed once, never recreated on re-render
const FINALE_STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  top: `${Math.sin(i * 2.1) * 50 + 50}%`,
  left: `${Math.cos(i * 1.9) * 50 + 50}%`,
  size: (i % 2) + 1,
  delay: i * 0.3,
  duration: 2 + (i % 3),
}));

function LetterByLetter({ text, onDone }) {
  // Group by word so the browser wraps at word boundaries on mobile
  const words = text.split(" ");
  let charCount = 0;

  return (
    <span className="flex flex-wrap justify-center gap-x-[0.28em] leading-snug">
      {words.map((word, wi) => {
        const wordStart = charCount;
        charCount += word.length + 1; // +1 for the space
        const isLastWord = wi === words.length - 1;

        return (
          <span key={wi} className="inline-flex">
            {word.split("").map((letter, li) => (
              <motion.span
                key={li}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (wordStart + li) * 0.045, duration: 0.2 }}
                onAnimationComplete={
                  isLastWord && li === word.length - 1 ? onDone : undefined
                }
              >
                {letter}
              </motion.span>
            ))}
          </span>
        );
      })}
    </span>
  );
}

// 4-pointed star sparkle path centered at (cx, cy)
function starPath(cx, cy, R = 9, r = 2.5) {
  const pts = []
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4 - Math.PI / 2
    const radius = i % 2 === 0 ? R : r
    pts.push(`${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`)
  }
  return pts.join(" ")
}

// Wedding rings SVG
function Rings({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 60 }}
          className="relative flex justify-center items-center"
          style={{ height: "200px" }}
        >
          {/* Silver glow behind rings */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div
              className="w-48 h-48 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(210,220,235,0.35) 0%, transparent 70%)",
              }}
            />
          </div>

          <svg
            width="240"
            height="160"
            viewBox="0 0 240 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter:
                "drop-shadow(0 0 18px rgba(200,215,230,0.7)) drop-shadow(0 0 36px rgba(180,200,220,0.4))",
            }}
          >
            {/* Left ring — silver */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "85px 80px" }}
            >
              <circle
                cx="85"
                cy="80"
                r="55"
                stroke="url(#silverGradLeft)"
                strokeWidth="14"
                fill="none"
              />
              {/* Diamond on left ring */}
              <polygon
                points="85,22 95,35 85,48 75,35"
                fill="url(#diamondGrad)"
                opacity="0.95"
              />
            </motion.g>

            {/* Right ring — silver */}
            <motion.g
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "155px 80px" }}
            >
              <circle
                cx="155"
                cy="80"
                r="55"
                stroke="url(#silverGradRight)"
                strokeWidth="14"
                fill="none"
              />
              {/* Diamond on right ring */}
              <polygon
                points="155,22 165,35 155,48 145,35"
                fill="url(#diamondGrad)"
                opacity="0.95"
              />
            </motion.g>

            {/* Sparkle — top left, 4-pointed star */}
            <motion.polygon
              points={starPath(28, 28)}
              fill="#fff"
              animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: 0.8 }}
              style={{ transformOrigin: "28px 28px" }}
            />

            {/* Sparkle — top right, 4-pointed star */}
            <motion.polygon
              points={starPath(212, 22, 8, 2)}
              fill="#fff"
              animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: 0.2 }}
              style={{ transformOrigin: "212px 22px" }}
            />

            {/* Sparkle — bottom center, smaller */}
            <motion.polygon
              points={starPath(120, 148, 6, 1.5)}
              fill="#c8dce8"
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            />

            <defs>
              <linearGradient
                id="silverGradLeft"
                x1="30"
                y1="25"
                x2="140"
                y2="135"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#f0f4f8" />
                <stop offset="25%" stopColor="#c8d8e8" />
                <stop offset="55%" stopColor="#8faabf" />
                <stop offset="80%" stopColor="#b8cdd8" />
                <stop offset="100%" stopColor="#e4eef4" />
              </linearGradient>
              <linearGradient
                id="silverGradRight"
                x1="100"
                y1="25"
                x2="210"
                y2="135"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#e4eef4" />
                <stop offset="25%" stopColor="#b8cdd8" />
                <stop offset="55%" stopColor="#8faabf" />
                <stop offset="80%" stopColor="#c8d8e8" />
                <stop offset="100%" stopColor="#f0f4f8" />
              </linearGradient>
              <linearGradient
                id="diamondGrad"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#d0eeff" />
                <stop offset="100%" stopColor="#90c8f0" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function GrandFinale() {
  const [step, setStep] = useState(0);
  // step 0: waiting for viewport
  // step 1: showing phrase letter by letter
  // step 2: phrase done, showing rings after delay
  // step 3: showing rings + ring message
  // step 4: showing personal message
  // step 5: showing button
  // step 6: black screen

  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView && step === 0) setStep(1);
  }, [inView, step]);

  const handlePhraseDone = () => {
    setTimeout(() => setStep(2), 500);
    setTimeout(() => setStep(3), 2000);
    setTimeout(() => setStep(4), 3500);
    setTimeout(() => setStep(5), 5000);
  };

  const handleFinalClick = () => {
    setStep(6);
  };

  const messageParagraphs = finale.message.split("\n\n").filter(Boolean);

  if (step === 6) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="fixed inset-0 bg-black flex items-center justify-center z-50"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 16, duration: 1 }}
          className="font-display text-4xl text-white text-center"
        >
          {finale.reveal_text}
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.section
      className="min-h-screen bg-midnight flex flex-col items-center justify-center py-20 px-6 relative overflow-x-hidden overflow-y-auto"
      onViewportEnter={() => setInView(true)}
      viewport={{ amount: 0.3 }}
    >
      {/* Comets — clipped to section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Comets />
      </div>

      {/* Background stars — CSS animation (compositor thread) */}
      {FINALE_STARS.map((star) => (
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

      <div className="relative z-10 flex flex-col items-center gap-10 max-w-2xl w-full text-center">
        {/* Step 1+: Intro phrase */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-display text-xl sm:text-2xl md:text-3xl italic text-white w-full"
            >
              {step === 1 ? (
                <LetterByLetter text={PHRASE} onDone={handlePhraseDone} />
              ) : (
                <span className="flex flex-wrap justify-center gap-x-[0.28em] leading-snug">
                  {PHRASE.split(" ").map((w, i) => (
                    <span key={i}>{w}</span>
                  ))}
                </span>
              )}
            </motion.h2>
          )}
        </AnimatePresence>

        {/* Step 2+: Rings */}
        <Rings visible={step >= 2} />

        {/* Ring message */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-script text-xl text-gold"
            >
              {finale.ring_message}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Personal message */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="bg-midnight-light/80 border border-gold/20 rounded-2xl p-5 md:p-8 backdrop-blur-sm text-left"
            >
              {messageParagraphs.map((para, i) => (
                <p
                  key={i}
                  className="font-script text-lg text-white/90 leading-relaxed mb-4 last:mb-0"
                >
                  {para}
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final button */}
        <AnimatePresence>
          {step >= 5 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleFinalClick}
              className="px-10 py-4 rounded-full bg-gold text-midnight font-display text-lg font-bold tracking-wide hover:bg-gold-light transition-colors duration-300 cursor-pointer shadow-lg"
              style={{ boxShadow: "0 0 30px rgba(212,175,55,0.4)" }}
            >
              {finale.button_text}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
