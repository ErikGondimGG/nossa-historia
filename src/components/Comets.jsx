/*
  Cada cometa = dois divs:
  - Wrapper: posição + rotate(-25deg) estático
  - Inner:   animação comet (translateX + clip-path)

  left: 100% coloca a CABEÇA (borda esquerda) exatamente na borda direita da tela.
  transformOrigin: left center gira em torno da cabeça, então a cauda vai para
  cima e para a direita (fora da tela).

  Delays negativos: a animação começa "já em andamento", na fase de pausa
  (53%-100%), então o cometa está invisível ao carregar a página.
  clip-path: inset(0 100% 0 0) garante que esteja clipado nessa fase.

  Cálculo dos delays:
    Comet 1 (15s): delay -8s  → começa em  8/15 = 53% → fase de pausa ✓
    Comet 2 (19s): delay -12s → começa em 12/19 = 63% → fase de pausa ✓
    Comet 3 (17s): delay -10s → começa em 10/17 = 59% → fase de pausa ✓
*/

const COMETS = [
  { top: '8%',  delay: '-8s',  duration: '15s' },
  { top: '20%', delay: '-12s', duration: '19s' },
  { top: '13%', delay: '-10s', duration: '17s' },
]

export default function Comets() {
  return (
    <>
      {COMETS.map((c, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: c.top,
            left: '100%',
            transform: 'rotate(-25deg)',
            transformOrigin: 'left center',
          }}
        >
          <div
            style={{
              width: 'min(220px, 40vw)',
              height: 2,
              /* cabeça branca (esquerda), cauda transparente (direita) */
              background:
                'linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 35%, transparent 100%)',
              borderRadius: 999,
              boxShadow: '0 0 6px 1px rgba(255,255,255,0.25)',
              animation: `comet ${c.duration} linear ${c.delay} infinite`,
              willChange: 'transform, clip-path',
            }}
          />
        </div>
      ))}
    </>
  )
}
