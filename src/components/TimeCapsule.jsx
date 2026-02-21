import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function TimeCapsule() {
  const [shaking, setShaking] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    setShaking(true);
    setShowMessage(true);
    setTimeout(() => setShaking(false), 600);
    setTimeout(() => setShowMessage(false), 2500);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-midnight to-midnight-light flex flex-col items-center justify-center py-20 px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="font-sans text-xs tracking-widest uppercase text-gold/60 mb-3">
          Para o futuro
        </p>
        <h2 className="font-display text-4xl md:text-5xl italic text-gold">
          Cápsula do Tempo
        </h2>
        <p className="font-script text-xl text-rose-light mt-3">
          Uma mensagem guardada com carinho
        </p>
        <div className="mx-auto mt-4 h-px w-24 bg-gold/50" />
      </motion.div>

      {/* Envelope SVG */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative cursor-pointer select-none"
        onClick={handleClick}
        animate={
          shaking
            ? {
                x: [-8, 8, -6, 6, -4, 4, 0],
                transition: { duration: 0.5 },
              }
            : {}
        }
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-3xl blur-2xl bg-gold/10 scale-110" />

        <svg
          width="280"
          height="200"
          viewBox="0 0 280 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 drop-shadow-2xl"
        >
          {/* Envelope body */}
          <rect
            x="10"
            y="40"
            width="260"
            height="150"
            rx="12"
            fill="#2d1a3a"
            stroke="#d4af37"
            strokeWidth="2"
          />

          {/* Envelope flap (closed) */}
          <path
            d="M10 52 L140 120 L270 52 L270 40 Q270 28 258 28 L22 28 Q10 28 10 40 Z"
            fill="#3d1f4a"
            stroke="#d4af37"
            strokeWidth="2"
          />

          {/* Bottom fold lines */}
          <path
            d="M10 190 L90 120 M270 190 L190 120"
            stroke="#d4af37"
            strokeWidth="1.5"
            strokeOpacity="0.5"
          />

          {/* Wax seal */}
          <circle
            cx="140"
            cy="105"
            r="28"
            fill="#4a0e2e"
            stroke="#d4af37"
            strokeWidth="2.5"
          />
          <circle
            cx="140"
            cy="105"
            r="22"
            fill="none"
            stroke="#d4af37"
            strokeWidth="1"
            strokeOpacity="0.5"
          />

          {/* Heart in seal */}
          <path
            d="M140 116 C140 116 124 106 124 97 C124 92 128 88 132 88 C135 88 138 90 140 93 C142 90 145 88 148 88 C152 88 156 92 156 97 C156 106 140 116 140 116Z"
            fill="#d4af37"
          />

          {/* Lock icon above envelope */}
          <g transform="translate(116, 8)">
            {/* Lock body */}
            <rect
              x="4"
              y="14"
              width="40"
              height="30"
              rx="6"
              fill="#4a0e2e"
              stroke="#d4af37"
              strokeWidth="2"
            />
            {/* Lock shackle */}
            <path
              d="M12 14 L12 8 Q12 0 24 0 Q36 0 36 8 L36 14"
              fill="none"
              stroke="#d4af37"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Keyhole */}
            <circle cx="24" cy="26" r="5" fill="#d4af37" />
            <rect x="22" y="29" width="4" height="8" rx="2" fill="#d4af37" />
          </g>
        </svg>
      </motion.div>

      {/* Hint text */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="font-sans text-sm text-white/40 mt-8 text-center"
      >
        Clique no envelope para tentar abrir
      </motion.p>

      {/* Locked message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mt-6 px-8 py-4 bg-wine/80 border border-gold/30 rounded-2xl backdrop-blur-sm"
          >
            <p className="font-script text-xl text-gold text-center">
              Ainda não…
            </p>
            <p className="font-sans text-xs text-white/50 text-center mt-1">
              Esse segredo é para o futuro
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative text */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="font-script text-lg text-white/30 mt-12 text-center max-w-sm"
      >
        "Guardado com cuidado para quando precisarmos lembrar de tudo que
        somos."
      </motion.p>
    </section>
  );
}
