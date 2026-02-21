import { motion } from "framer-motion";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { places } from "../data/places";

// Custom gold marker icon
const goldIcon = L.divIcon({
  className: "",
  html: `<div style="
    width: 32px;
    height: 32px;
    background: radial-gradient(circle, #e8c84a, #d4af37);
    border: 2px solid #1a1a2e;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 0 2px 12px rgba(212,175,55,0.6);
  "></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -36],
});

// Calculate map center from places
const centerLat = places.reduce((sum, p) => sum + p.lat, 0) / places.length;
const centerLng = places.reduce((sum, p) => sum + p.lng, 0) / places.length;

// Inner component — has access to map instance via useMap
function MapController({ target, markerRefs }) {
  const map = useMap();

  useEffect(() => {
    if (!target) return;
    map.flyTo([target.lat, target.lng], 15, { duration: 1.4 });

    // Open popup after fly animation settles
    const timer = setTimeout(() => {
      const ref = markerRefs.current[target.id];
      if (ref) ref.openPopup();
    }, 1500);

    return () => clearTimeout(timer);
  }, [target, map, markerRefs]);

  return null;
}

export default function MapSection() {
  const [target, setTarget] = useState(null);
  const markerRefs = useRef({});

  const handlePlaceClick = (place) => {
    setTarget({ ...place, _ts: Date.now() }); // _ts forces re-trigger for same place
  };

  return (
    <section className="relative min-h-screen bg-midnight flex flex-col items-center justify-center py-20 px-6">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <p className="font-sans text-xs tracking-widest uppercase text-gold/60 mb-3">
          Capítulo Especial
        </p>
        <h2 className="font-display text-4xl md:text-5xl italic text-gold">
          Nossos Lugares
        </h2>
        <p className="font-script text-xl text-rose-light mt-3">
          Os cenários da nossa história
        </p>
        <div className="mx-auto mt-4 h-px w-24 bg-gold/50" />
      </motion.div>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-gold/20"
        style={{ height: "clamp(300px, 55vw, 500px)" }}
      >
        <MapContainer
          center={[centerLat, centerLng]}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {places.map((place) => (
            <Marker
              key={place.id}
              position={[place.lat, place.lng]}
              icon={goldIcon}
              ref={(el) => { markerRefs.current[place.id] = el; }}
            >
              <Popup>
                <div className="min-w-[200px] max-w-[260px]">
                  {place.image && (
                    <div className="w-full h-32 overflow-hidden rounded-t-lg mb-2 -mx-3 -mt-3">
                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-full h-full object-cover pt-1"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    </div>
                  )}
                  <strong
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      color: "#d4af37",
                      fontSize: "1rem",
                    }}
                  >
                    {place.name}
                  </strong>
                  <p
                    style={{
                      fontFamily: '"Dancing Script", cursive',
                      fontSize: "0.95rem",
                      marginTop: "4px",
                      color: "#fff",
                    }}
                  >
                    {place.message}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}

          <MapController target={target} markerRefs={markerRefs} />
        </MapContainer>
      </motion.div>

      {/* Place list */}
      <div className="flex flex-wrap justify-center gap-3 mt-8 max-w-5xl w-full">
        {places.map((place, i) => (
          <motion.button
            key={place.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            onClick={() => handlePlaceClick(place)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-sans cursor-pointer transition-colors duration-200 ${
              target?.id === place.id
                ? "border-gold bg-gold/10 text-gold"
                : "border-gold/30 bg-midnight-light text-gold/80 hover:border-gold hover:text-gold"
            }`}
          >
            <span className="text-gold">♡</span>
            {place.name}
          </motion.button>
        ))}
      </div>
    </section>
  );
}
