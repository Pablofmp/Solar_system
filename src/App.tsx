import { useState, useEffect, useRef, useCallback } from 'react';

interface PlanetData {
  name: string;
  namePT: string;
  color: string;
  size: number; // visual size in px
  realDiameter: number; // km
  distanceFromSun: number; // million km
  orbitalPeriod: number; // Earth days
  orbitRadius: number; // visual orbit radius in px
  description: string;
  emoji: string;
}

const planets: PlanetData[] = [
  {
    name: 'Mercury',
    namePT: 'Mercúrio',
    color: '#b5b5b5',
    size: 8,
    realDiameter: 4879,
    distanceFromSun: 57.9,
    orbitalPeriod: 88,
    orbitRadius: 60,
    description: 'O menor planeta do sistema solar e o mais próximo do Sol.',
    emoji: '☿',
  },
  {
    name: 'Venus',
    namePT: 'Vénus',
    color: '#e8cda0',
    size: 12,
    realDiameter: 12104,
    distanceFromSun: 108.2,
    orbitalPeriod: 225,
    orbitRadius: 90,
    description: 'O planeta mais quente do sistema solar, com uma atmosfera densa de CO₂.',
    emoji: '♀',
  },
  {
    name: 'Earth',
    namePT: 'Terra',
    color: '#4da6ff',
    size: 13,
    realDiameter: 12756,
    distanceFromSun: 149.6,
    orbitalPeriod: 365,
    orbitRadius: 125,
    description: 'O nosso lar! O único planeta conhecido com vida.',
    emoji: '🌍',
  },
  {
    name: 'Mars',
    namePT: 'Marte',
    color: '#e07040',
    size: 10,
    realDiameter: 6792,
    distanceFromSun: 227.9,
    orbitalPeriod: 687,
    orbitRadius: 165,
    description: 'O planeta vermelho, com a maior montanha do sistema solar (Olympus Mons).',
    emoji: '♂',
  },
  {
    name: 'Jupiter',
    namePT: 'Júpiter',
    color: '#d4a574',
    size: 28,
    realDiameter: 142984,
    distanceFromSun: 778.6,
    orbitalPeriod: 4333,
    orbitRadius: 220,
    description: 'O maior planeta do sistema solar, uma gigante gasosa com a Grande Mancha Vermelha.',
    emoji: '♃',
  },
  {
    name: 'Saturn',
    namePT: 'Saturno',
    color: '#f4d59c',
    size: 24,
    realDiameter: 120536,
    distanceFromSun: 1433.5,
    orbitalPeriod: 10759,
    orbitRadius: 280,
    description: 'Famoso pelos seus magníficos anéis de gelo e rocha.',
    emoji: '♄',
  },
  {
    name: 'Uranus',
    namePT: 'Urano',
    color: '#7de8e8',
    size: 18,
    realDiameter: 51118,
    distanceFromSun: 2872.5,
    orbitalPeriod: 30687,
    orbitRadius: 335,
    description: 'Um gigante de gelo que gira de lado, com uma inclinação axial de 98°.',
    emoji: '♅',
  },
  {
    name: 'Neptune',
    namePT: 'Neptuno',
    color: '#4466ff',
    size: 17,
    realDiameter: 49528,
    distanceFromSun: 4495.1,
    orbitalPeriod: 60190,
    orbitRadius: 385,
    description: 'O planeta mais distante, com ventos que atingem 2100 km/h.',
    emoji: '♆',
  },
];

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [angles, setAngles] = useState<number[]>(planets.map(() => Math.random() * Math.PI * 2));
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const animate = useCallback(
    (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (isPlaying) {
        setAngles((prev) =>
          prev.map((angle, i) => {
            const orbitalSpeed = (2 * Math.PI) / (planets[i].orbitalPeriod * 2);
            return angle + orbitalSpeed * delta * speed * 0.05;
          })
        );
      }

      animationRef.current = requestAnimationFrame(animate);
    },
    [isPlaying, speed]
  );

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  const getPlanetPosition = (index: number) => {
    const orbitRadius = planets[index].orbitRadius;
    const angle = angles[index];
    const x = Math.cos(angle) * orbitRadius;
    const y = Math.sin(angle) * orbitRadius * 0.4; // elliptical perspective
    return { x, y };
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString('pt-PT');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a2e] via-[#0d0d3a] to-[#000011] text-white overflow-hidden relative">
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 200 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: Math.random() * 5 + 's',
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 text-center pt-6 pb-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
          🌌 Sistema Solar Interativo
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Clique num planeta para saber mais • Explore o nosso sistema solar
        </p>
      </header>

      {/* Solar System Visualization */}
      <div className="relative flex items-center justify-center" style={{ height: 'calc(100vh - 200px)', minHeight: '500px' }}>
        <div ref={containerRef} className="relative" style={{ width: '800px', height: '800px' }}>
          {/* Sun */}
          <div
            className="absolute rounded-full cursor-pointer transition-transform hover:scale-110"
            style={{
              width: '50px',
              height: '50px',
              background: 'radial-gradient(circle, #fff700 0%, #ff8c00 50%, #ff4500 100%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 40px #ff8c00, 0 0 80px #ff6600, 0 0 120px #ff4500',
            }}
            onClick={() => setSelectedPlanet(null)}
            title="Sol"
          >
            <div className="absolute inset-0 rounded-full animate-pulse" style={{
              background: 'radial-gradient(circle, rgba(255,255,0,0.3) 0%, transparent 70%)',
            }} />
          </div>

          {/* Orbit paths */}
          {planets.map((planet, i) => (
            <div
              key={`orbit-${i}`}
              className="absolute rounded-full border border-white/10"
              style={{
                width: planet.orbitRadius * 2 + 'px',
                height: planet.orbitRadius * 2 * 0.4 + 'px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}

          {/* Planets */}
          {planets.map((planet, i) => {
            const pos = getPlanetPosition(i);
            const isSelected = selectedPlanet?.name === planet.name;
            return (
              <div
                key={planet.name}
                className="absolute cursor-pointer transition-all duration-200"
                style={{
                  width: planet.size + 'px',
                  height: planet.size + 'px',
                  top: `calc(50% + ${pos.y}px)`,
                  left: `calc(50% + ${pos.x}px)`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: pos.y > 0 ? 20 : 5,
                }}
                onClick={() => setSelectedPlanet(planet)}
              >
                {/* Planet body */}
                <div
                  className={`w-full h-full rounded-full transition-all duration-300 ${
                    isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent' : ''
                  }`}
                  style={{
                    background: `radial-gradient(circle at 35% 35%, ${planet.color}, ${planet.color}88, ${planet.color}44)`,
                    boxShadow: isSelected
                      ? `0 0 15px ${planet.color}, 0 0 30px ${planet.color}66`
                      : `0 0 5px ${planet.color}66`,
                  }}
                />
                {/* Saturn rings */}
                {planet.name === 'Saturn' && (
                  <div
                    className="absolute"
                    style={{
                      width: planet.size * 1.8 + 'px',
                      height: planet.size * 0.4 + 'px',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%) rotateX(75deg)',
                      border: `2px solid ${planet.color}88`,
                      borderRadius: '50%',
                    }}
                  />
                )}
                {/* Planet label */}
                <div
                  className="absolute text-xs text-white/70 whitespace-nowrap pointer-events-none"
                  style={{
                    top: planet.size + 4 + 'px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '10px',
                  }}
                >
                  {planet.namePT}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Panel */}
      {selectedPlanet && (
        <div className="fixed top-4 right-4 z-50 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-xl p-5 max-w-sm w-[320px] shadow-2xl animate-fadeIn">
          <button
            onClick={() => setSelectedPlanet(null)}
            className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-full flex-shrink-0"
              style={{
                background: `radial-gradient(circle at 35% 35%, ${selectedPlanet.color}, ${selectedPlanet.color}88, ${selectedPlanet.color}44)`,
                boxShadow: `0 0 20px ${selectedPlanet.color}66`,
              }}
            />
            <div>
              <h2 className="text-xl font-bold" style={{ color: selectedPlanet.color }}>
                {selectedPlanet.namePT}
              </h2>
              <p className="text-gray-400 text-xs">{selectedPlanet.name}</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">{selectedPlanet.description}</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
              <span className="text-gray-400 text-sm">📏 Diâmetro</span>
              <span className="font-semibold text-sm">{formatNumber(selectedPlanet.realDiameter)} km</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
              <span className="text-gray-400 text-sm">☀️ Distância ao Sol</span>
              <span className="font-semibold text-sm">{formatNumber(selectedPlanet.distanceFromSun)} M km</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
              <span className="text-gray-400 text-sm">🔄 Período Orbital</span>
              <span className="font-semibold text-sm">
                {formatNumber(selectedPlanet.orbitalPeriod)} dias
                {selectedPlanet.orbitalPeriod > 365 && (
                  <span className="text-gray-400 text-xs ml-1">
                    ({(selectedPlanet.orbitalPeriod / 365.25).toFixed(1)} anos)
                  </span>
                )}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-400 text-sm">📊 Tamanho relativo</span>
              <div className="flex items-center gap-2">
                <div className="h-2 rounded-full" style={{
                  width: `${Math.min((selectedPlanet.realDiameter / 142984) * 100, 100)}px`,
                  backgroundColor: selectedPlanet.color,
                }} />
                <span className="text-xs text-gray-400">
                  {((selectedPlanet.realDiameter / 12756) * 100).toFixed(0)}% da Terra
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-900/90 backdrop-blur-md border-t border-gray-700/50 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          {/* Play/Pause */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center hover:from-blue-400 hover:to-purple-500 transition-all shadow-lg"
              title={isPlaying ? 'Pausar' : 'Reproduzir'}
            >
              {isPlaying ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </button>
            <span className="text-sm text-gray-300">
              {isPlaying ? '▶ A reproduzir' : '⏸ Em pausa'}
            </span>
          </div>

          {/* Speed Control */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Velocidade:</span>
            <div className="flex items-center gap-1">
              {[0.25, 0.5, 1, 2, 5, 10].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                    speed === s
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Planet quick select */}
          <div className="flex items-center gap-1">
            {planets.map((planet) => (
              <button
                key={planet.name}
                onClick={() => setSelectedPlanet(selectedPlanet?.name === planet.name ? null : planet)}
                className={`w-6 h-6 rounded-full transition-all hover:scale-125 ${
                  selectedPlanet?.name === planet.name ? 'ring-2 ring-white scale-125' : ''
                }`}
                style={{
                  backgroundColor: planet.color,
                  boxShadow: selectedPlanet?.name === planet.name ? `0 0 8px ${planet.color}` : 'none',
                }}
                title={planet.namePT}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
