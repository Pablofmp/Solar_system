import { useState, useRef, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { SolarSystemScene } from './components/SolarSystemScene';
import { InfoPanel, SunInfoPanel } from './components/InfoPanel';
import { Controls } from './components/Controls';
import { planets, PlanetData } from './data/planets';
import { calculatePositionWithPrecession, orbitalVelocity } from './physics/orbitalMechanics';

// Componente interno que atualiza o tempo de simulação
function TimeUpdater({
  isPlaying,
  speed,
  onTimeUpdate,
}: {
  isPlaying: boolean;
  speed: number;
  onTimeUpdate: (time: number) => void;
}) {
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (isPlaying) {
      // delta em segundos, converter para dias de simulação
      // 1 segundo real = speed dias de simulação
      timeRef.current += delta * speed;
      onTimeUpdate(timeRef.current);
    }
  });

  return null;
}

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(5);
  const [simTime, setSimTime] = useState(0);
  const [selectedPlanetId, setSelectedPlanetId] = useState<string | null>(null);
  const [showSunInfo, setShowSunInfo] = useState(false);
  const [showOrbits, setShowOrbits] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [currentPlanetData, setCurrentPlanetData] = useState<{
    distance: number;
    velocity: number;
  } | null>(null);

  const selectedPlanet = selectedPlanetId
    ? planets.find((p) => p.id === selectedPlanetId) || null
    : null;

  // Atualizar dados do planeta selecionado
  useEffect(() => {
    if (selectedPlanet) {
      const pos = calculatePositionWithPrecession(selectedPlanet, simTime);
      const distance = selectedPlanet.distanceFromSun * (pos.r / selectedPlanet.visualOrbitRadius);
      const velocity = orbitalVelocity(distance * 1e6, selectedPlanet.distanceFromSun * 1e6);
      setCurrentPlanetData({ distance, velocity });
    }
  }, [selectedPlanet, simTime]);

  const handlePlanetClick = useCallback((id: string | null) => {
    if (id === null) {
      setSelectedPlanetId(null);
      setShowSunInfo(true);
    } else {
      setSelectedPlanetId(id);
      setShowSunInfo(false);
    }
  }, []);

  const handleCloseInfo = useCallback(() => {
    setSelectedPlanetId(null);
    setShowSunInfo(false);
  }, []);

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-30 p-4 pointer-events-none">
        <div className="max-w-6xl mx-auto flex items-start justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-200 via-orange-300 to-yellow-200 bg-clip-text text-transparent">
              🌌 Sistema Solar Interativo
            </h1>
            <p className="text-gray-400 text-xs md:text-sm mt-1 max-w-md">
              Simulação 3D com mecânica orbital de Kepler, precessão relativística e dados astronómicos reais
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end gap-1 text-right">
            <div className="bg-gray-900/80 backdrop-blur rounded-lg px-3 py-1.5 border border-gray-700/30">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">Leis Físicas</p>
              <p className="text-xs text-gray-300">Kepler • Newton • Einstein</p>
            </div>
          </div>
        </div>
      </header>

      {/* Canvas 3D */}
      <Canvas
        camera={{
          position: [0, 40, 60],
          fov: 60,
          near: 0.1,
          far: 1000,
        }}
        style={{ background: '#000005' }}
      >
        <TimeUpdater
          isPlaying={isPlaying}
          speed={speed}
          onTimeUpdate={setSimTime}
        />
        
        <SolarSystemScene
          time={simTime}
          selectedPlanetId={selectedPlanetId}
          onPlanetClick={handlePlanetClick}
          showOrbits={showOrbits}
          showLabels={showLabels}
        />

        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          minDistance={5}
          maxDistance={200}
          zoomSpeed={0.8}
          rotateSpeed={0.5}
          autoRotate={false}
        />
      </Canvas>

      {/* Painel de Informações */}
      {selectedPlanet && currentPlanetData && (
        <InfoPanel
          planet={selectedPlanet}
          currentDistance={currentPlanetData.distance}
          currentVelocity={currentPlanetData.velocity}
          onClose={handleCloseInfo}
        />
      )}
      {showSunInfo && <SunInfoPanel onClose={handleCloseInfo} />}

      {/* Controlos */}
      <Controls
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        speed={speed}
        onSpeedChange={setSpeed}
        showOrbits={showOrbits}
        onToggleOrbits={() => setShowOrbits(!showOrbits)}
        showLabels={showLabels}
        onToggleLabels={() => setShowLabels(!showLabels)}
        selectedPlanetId={selectedPlanetId}
        onPlanetSelect={handlePlanetClick}
        elapsedTime={simTime}
      />

      {/* Indicador de física */}
      <div className="fixed top-4 left-4 z-30 space-y-2 pointer-events-none">
        <div className="bg-gray-900/70 backdrop-blur rounded-lg px-3 py-2 border border-gray-700/30">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`} />
            <span className="text-xs text-gray-300">
              {isPlaying ? `${speed}x` : 'Pausado'}
            </span>
          </div>
          <p className="text-[10px] text-gray-500 mt-1">
            t = {simTime < 365 ? `${simTime.toFixed(0)}d` : `${(simTime / 365.25).toFixed(1)}a`}
          </p>
        </div>
        
        {selectedPlanet && (
          <div className="bg-gray-900/70 backdrop-blur rounded-lg px-3 py-2 border border-gray-700/30">
            <p className="text-[10px] text-gray-500">e = {selectedPlanet.eccentricity}</p>
            <p className="text-[10px] text-gray-500">T = {selectedPlanet.orbitalPeriod}d</p>
            <p className="text-[10px] text-gray-500">i = {selectedPlanet.orbitalInclination}°</p>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
