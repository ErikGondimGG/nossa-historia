import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Chapter({ chapter }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Subtle parallax on image
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const isLeft = chapter.align === 'left'

  // Split text into paragraphs
  const paragraphs = chapter.text.split('\n\n').filter(Boolean)

  return (
    <section
      ref={ref}
      className={`relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br ${chapter.color}`}
    >
      {/* Decorative corner accent */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-10">
        <div className="absolute inset-0 border-l-2 border-t-2 border-gold rounded-tl-3xl" />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
        <div className="absolute inset-0 border-r-2 border-b-2 border-gold rounded-br-3xl" />
      </div>

      <div className={`container mx-auto px-6 md:px-12 py-20 flex flex-col ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-16`}>
        {/* Image with parallax */}
        <div className="w-full md:w-1/2 relative overflow-hidden rounded-2xl shadow-2xl aspect-[4/3]">
          <motion.div
            style={{ y: imageY }}
            className="absolute inset-[-10%] w-[120%] h-[120%]"
          >
            <img
              src={chapter.image}
              alt={chapter.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Placeholder gradient when image missing
                e.target.style.display = 'none'
                e.target.parentElement.style.background = 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(192,64,128,0.2))'
              }}
            />
          </motion.div>
          {/* Placeholder shown if no image */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-gold/30 text-6xl font-display">{chapter.id}</span>
          </div>
        </div>

        {/* Text content */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          {/* Date */}
          <motion.p
            initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="font-sans text-sm tracking-widest uppercase text-gold/70"
          >
            {chapter.date}
          </motion.p>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic ${chapter.textColor}`}
          >
            {chapter.title}
          </motion.h2>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px w-24 bg-gold origin-left"
          />

          {/* Paragraphs */}
          <div className="flex flex-col gap-4">
            {paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.25 + i * 0.12 }}
                className="font-script text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed"
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Music note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-sans text-xs text-white/40 mt-4 tracking-wide"
          >
            ♪ {chapter.music}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
