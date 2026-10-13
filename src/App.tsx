import { useState, useRef, useCallback, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { SolarSystemScene } from './components/SolarSystemScene';
import { InfoPanel, SunInfoPanel } from './components/InfoPanel';
import { Controls } from './components/Controls';
import { TravelCalculator } from './components/TravelCalculator';
import { PlanetComparator } from './components/PlanetComparator';
import { RealTimeGraph } from './components/RealTimeGraph';
import { WeightCalculator } from './components/WeightCalculator';
import { TourGuide } from './components/TourGuide';
import { Quiz } from './components/Quiz';
import { MiniMap } from './components/MiniMap';
import { ShortcutsModal } from './components/ShortcutsModal';
import { ExportData } from './components/ExportData';
import { planets } from './data/planets';
import { calculatePositionWithPrecession, orbitalVelocity } from './physics/orbitalMechanics';
import { setupKeyboardShortcuts } from './utils/keyboardShortcuts';

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
  const [showTravelCalc, setShowTravelCalc] = useState(false);
  const [showComparator, setShowComparator] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [showWeightCalc, setShowWeightCalc] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [showExport, setShowExport] = useState(false);
  const [currentPlanetData, setCurrentPlanetData] = useState<{
    distance: number;
    velocity: number;
  } | null>(null);
  
  const [graphData, setGraphData] = useState<{ time: number; distance: number; velocity: number }[]>([]);

  const selectedPlanet = selectedPlanetId
    ? planets.find((p) => p.id === selectedPlanetId) || null
    : null;

  useEffect(() => {
    if (selectedPlanet) {
      const pos = calculatePositionWithPrecession(selectedPlanet, simTime);
      const distance = selectedPlanet.distanceFromSun * (pos.r / selectedPlanet.visualOrbitRadius);
      const velocity = orbitalVelocity(distance * 1e6, selectedPlanet.distanceFromSun * 1e6);
      setCurrentPlanetData({ distance, velocity });

      if (showGraph) {
        setGraphData((prev) => {
          const newData = [...prev, { time: simTime, distance, velocity }];
          if (newData.length > 100) newData.shift();
          return newData;
        });
      }
    }
  }, [selectedPlanet, simTime, showGraph]);

  useEffect(() => {
    setGraphData([]);
  }, [selectedPlanetId]);

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

  // Atalhos de teclado
  useEffect(() => {
    const cleanup = setupKeyboardShortcuts({
      onTogglePlay: () => setIsPlaying(!isPlaying),
      onSpeedUp: () => setSpeed(s => Math.min(s * 2, 500)),
      onSpeedDown: () => setSpeed(s => Math.max(s / 2, 0.1)),
      onReset: () => setSimTime(0),
      onRewind: () => setSimTime(t => Math.max(0, t - 100)),
      onToggleOrbits: () => setShowOrbits(o => !o),
      onToggleLabels: () => setShowLabels(l => !l),
      onSelectPlanet: handlePlanetClick,
      onToggleDarkMode: () => setDarkMode(d => !d),
      onToggleCalculator: () => setShowTravelCalc(t => !t),
      onToggleComparator: () => setShowComparator(c => !c),
      onToggleGraph: () => setShowGraph(g => !g),
      onZoomIn: () => {},
      onZoomOut: () => {},
      onResetCamera: () => {},
    });
    return cleanup;
  }, [isPlaying, handlePlanetClick]);

  const formatTime = (days: number): string => {
    if (days < 1) return `${(days * 24).toFixed(1)}h`;
    if (days < 365) return `${days.toFixed(0)} dias`;
    const years = days / 365.25;
    if (years < 100) return `${years.toFixed(1)} anos`;
    return `${(years / 100).toFixed(1)} séculos`;
  };

  return (
    <div className={`w-full h-screen overflow-hidden relative ${darkMode ? 'bg-black' : 'bg-gray-100'}`}>
      {/* Header elegante */}
      <header className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
        <div className={`pt-5 pb-10 px-6 ${darkMode ? 'bg-gradient-to-b from-black/80 to-transparent' : 'bg-gradient-to-b from-white/80 to-transparent'}`}>
          <div className="max-w-7xl mx-auto flex items-start justify-between">
            <div>
              <h1 className={`text-3xl font-light tracking-wide ${darkMode ? 'text-white/90' : 'text-gray-900'}`}>
                Sistema Solar
                <span className="text-orange-400 font-normal ml-2">Interativo</span>
              </h1>
              <p className={`text-sm mt-1 font-light ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Explore o nosso sistema solar com física realista
              </p>
            </div>
            
            {/* Botões de ferramentas */}
            <div className="flex gap-2 pointer-events-auto flex-wrap justify-end">
              <ToolButton icon="🚀" label="Viagem" onClick={() => setShowTravelCalc(true)} color="blue" />
              <ToolButton icon="⚖️" label="Comparar" onClick={() => setShowComparator(true)} color="purple" />
              <ToolButton icon="🏋️" label="Peso" onClick={() => setShowWeightCalc(true)} color="green" />
              <ToolButton icon="🎓" label="Tour" onClick={() => setShowTour(true)} color="yellow" />
              <ToolButton icon="🧠" label="Quiz" onClick={() => setShowQuiz(true)} color="pink" />
              <ToolButton icon="⌨️" label="Atalhos" onClick={() => setShowShortcuts(true)} color="gray" />
              <ToolButton icon="💾" label="Exportar" onClick={() => setShowExport(true)} color="gray" />
              {selectedPlanet && (
                <ToolButton icon="📊" label="Gráfico" onClick={() => setShowGraph(!showGraph)} color="green" active={showGraph} />
              )}
              <ToolButton icon={darkMode ? '☀️' : '🌙'} label="" onClick={() => setDarkMode(!darkMode)} color="gray" />
            </div>
          </div>
        </div>
      </header>

      {/* Canvas 3D */}
      <Canvas
        camera={{ position: [0, 40, 60], fov: 60, near: 0.1, far: 1000 }}
        style={{ background: darkMode ? '#000008' : '#1a1a2e' }}
      >
        <TimeUpdater isPlaying={isPlaying} speed={speed} onTimeUpdate={setSimTime} />
        <SolarSystemScene
          time={simTime}
          selectedPlanetId={selectedPlanetId}
          onPlanetClick={handlePlanetClick}
          showOrbits={showOrbits}
          showLabels={showLabels}
        />
        <OrbitControls enablePan enableZoom enableRotate minDistance={5} maxDistance={200} zoomSpeed={0.8} rotateSpeed={0.5} />
      </Canvas>

      {/* Painel de Informações */}
      {selectedPlanet && currentPlanetData && (
        <InfoPanel planet={selectedPlanet} currentDistance={currentPlanetData.distance} currentVelocity={currentPlanetData.velocity} onClose={handleCloseInfo} />
      )}
      {showSunInfo && <SunInfoPanel onClose={handleCloseInfo} />}

      {/* Gráfico moderno */}
      {showGraph && selectedPlanet && graphData.length > 0 && (
        <RealTimeGraph planet={selectedPlanet} data={graphData} onClose={() => setShowGraph(false)} />
      )}

      {/* Mini-mapa */}
      {showMiniMap && <MiniMap time={simTime} selectedPlanetId={selectedPlanetId} onPlanetSelect={handlePlanetClick} />}

      {/* Controlos elegantes */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className={`pt-10 pb-4 px-6 ${darkMode ? 'bg-gradient-to-t from-black/90 to-transparent' : 'bg-gradient-to-t from-white/90 to-transparent'}`}>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center mb-3">
              <div className={`backdrop-blur rounded-full px-4 py-1.5 border flex items-center gap-3 ${darkMode ? 'bg-gray-900/80 border-gray-700/30' : 'bg-white/80 border-gray-300/30'}`}>
                <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`} />
                <span className={`text-sm font-light ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {formatTime(simTime)}
                </span>
              </div>
            </div>
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
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>

      {/* Modais */}
      {showTravelCalc && <TravelCalculator onClose={() => setShowTravelCalc(false)} />}
      {showComparator && <PlanetComparator onClose={() => setShowComparator(false)} />}
      {showWeightCalc && <WeightCalculator onClose={() => setShowWeightCalc(false)} />}
      {showTour && <TourGuide onClose={() => setShowTour(false)} onNavigateToPlanet={handlePlanetClick} />}
      {showQuiz && <Quiz onClose={() => setShowQuiz(false)} />}
      {showShortcuts && <ShortcutsModal onClose={() => setShowShortcuts(false)} />}
      {showExport && <ExportData onClose={() => setShowExport(false)} simTime={simTime} />}

      {/* Indicador de planeta selecionado */}
      {selectedPlanet && (
        <div className="fixed top-24 left-6 z-30 pointer-events-none">
          <div className={`backdrop-blur rounded-xl px-4 py-3 border ${darkMode ? 'bg-gray-900/70 border-gray-700/30' : 'bg-white/70 border-gray-300/30'}`}>
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full"
                style={{
                  background: `radial-gradient(circle at 35% 35%, ${selectedPlanet.color}, ${selectedPlanet.emissiveColor})`,
                  boxShadow: `0 0 8px ${selectedPlanet.color}44`,
                }}
              />
              <div>
                <p className="text-sm font-medium" style={{ color: selectedPlanet.color }}>
                  {selectedPlanet.namePT}
                </p>
                <div className="flex gap-3 text-[10px] text-gray-500">
                  <span>e = {selectedPlanet.eccentricity}</span>
                  <span>T = {selectedPlanet.orbitalPeriod}d</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}

function ToolButton({ icon, label, onClick, color, active = false }: { 
  icon: string; label: string; onClick: () => void; color: string; active?: boolean 
}) {
  const colorClasses: Record<string, string> = {
    blue: active ? 'bg-blue-500/30 border-blue-500/50 text-blue-300' : 'bg-gray-800/50 border-gray-700/30 text-gray-300 hover:bg-blue-500/20',
    purple: active ? 'bg-purple-500/30 border-purple-500/50 text-purple-300' : 'bg-gray-800/50 border-gray-700/30 text-gray-300 hover:bg-purple-500/20',
    green: active ? 'bg-green-500/30 border-green-500/50 text-green-300' : 'bg-gray-800/50 border-gray-700/30 text-gray-300 hover:bg-green-500/20',
    yellow: active ? 'bg-yellow-500/30 border-yellow-500/50 text-yellow-300' : 'bg-gray-800/50 border-gray-700/30 text-gray-300 hover:bg-yellow-500/20',
    pink: active ? 'bg-pink-500/30 border-pink-500/50 text-pink-300' : 'bg-gray-800/50 border-gray-700/30 text-gray-300 hover:bg-pink-500/20',
    gray: 'bg-gray-800/50 border-gray-700/30 text-gray-300 hover:bg-gray-700/50',
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl border backdrop-blur transition-all text-sm ${colorClasses[color]}`}
    >
      <span className="text-base">{icon}</span>
      {label && <span className="font-light hidden md:inline">{label}</span>}
    </button>
  );
}

export default App;
