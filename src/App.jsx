import { lazy, Suspense, useRef } from 'react'
import EntryScreen from './components/EntryScreen'
import Chapter from './components/Chapter'
import ReasonsGrid from './components/ReasonsGrid'
import TimeCapsule from './components/TimeCapsule'
import GrandFinale from './components/GrandFinale'
import { chapters } from './data/chapters'

// Leaflet is ~150 KB — only load when user reaches the section
const MapSection = lazy(() => import('./components/MapSection'))

function MapFallback() {
  return (
    <div className="min-h-screen bg-midnight flex items-center justify-center">
      <p className="font-script text-2xl text-gold animate-pulse">
        Carregando mapa…
      </p>
    </div>
  )
}

export default function App() {
  const audioRef = useRef(null)

  return (
    <div className="font-sans bg-midnight text-white">
      <audio
        ref={audioRef}
        src="/audio/musica.mp3"
        loop
        preload="none"
        style={{ display: 'none' }}
      />

      <EntryScreen audioRef={audioRef} />

      <div id="timeline-start" />

      {chapters.map((chapter) => (
        <Chapter key={chapter.id} chapter={chapter} />
      ))}

      <Suspense fallback={<MapFallback />}>
        <MapSection />
      </Suspense>

      <ReasonsGrid />

      <TimeCapsule />

      <GrandFinale />
    </div>
  )
}
