import { useState } from 'react'
import { motion } from 'framer-motion'
import { reasons } from '../data/reasons'

function FlipCard({ reason, index }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="cursor-pointer"
      style={{ perspective: '1000px', height: 'clamp(140px, 30vw, 180px)' }}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%' }}
      >
        {/* Front */}
        <div
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-wine to-rose-dark border border-rose-dark/50 shadow-lg"
        >
          <span className="text-3xl mb-2">{reason.front.split(' ')[0]}</span>
          <span className="font-display text-2xl text-gold font-bold">
            {reason.front.split(' ')[1]}
          </span>
          <span className="font-sans text-xs text-white/40 mt-2">Toque para revelar</span>
        </div>

        {/* Back */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-midnight to-midnight-light border border-gold/30 shadow-lg p-4"
        >
          <p className="font-script text-lg text-white/90 text-center leading-relaxed">
            {reason.back}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ReasonsGrid() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-wine to-midnight py-20 px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="font-sans text-xs tracking-widest uppercase text-gold/60 mb-3">Com amor</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl italic text-gold">
          Por que eu te amo
        </h2>
        <p className="font-script text-xl text-rose-light mt-3">
          {reasons.length} razões entre infinitas
        </p>
        <div className="mx-auto mt-4 h-px w-24 bg-gold/50" />
        <p className="font-sans text-sm text-white/50 mt-4">
          Toque nos cards para revelar ✨
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {reasons.map((reason, i) => (
          <FlipCard key={reason.id} reason={reason} index={i} />
        ))}
      </div>
    </section>
  )
}
