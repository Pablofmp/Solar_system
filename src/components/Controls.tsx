import { planets } from '../data/planets';

interface ControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  showOrbits: boolean;
  onToggleOrbits: () => void;
  showLabels: boolean;
  onToggleLabels: () => void;
  selectedPlanetId: string | null;
  onPlanetSelect: (id: string | null) => void;
  elapsedTime: number; // em dias
}

export function Controls({
  isPlaying,
  onTogglePlay,
  speed,
  onSpeedChange,
  showOrbits,
  onToggleOrbits,
  showLabels,
  onToggleLabels,
  selectedPlanetId,
  onPlanetSelect,
  elapsedTime,
}: ControlsProps) {
  const speedOptions = [0.1, 0.5, 1, 5, 10, 50, 100, 500];
  
  const formatElapsed = (days: number): string => {
    if (days < 365) return `${days.toFixed(0)} dias`;
    const years = days / 365.25;
    if (years < 100) return `${years.toFixed(1)} anos`;
    return `${(years / 100).toFixed(1)} séculos`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-950/90 backdrop-blur-xl border-t border-gray-700/40">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Play/Pause e tempo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onTogglePlay}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center hover:from-blue-400 hover:to-purple-500 transition-all shadow-lg hover:shadow-blue-500/20 hover:scale-105"
              title={isPlaying ? 'Pausar simulação' : 'Iniciar simulação'}
            >
              {isPlaying ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </button>
            <div>
              <span className="text-sm text-gray-300 font-medium">
                {isPlaying ? '▶ Simulando' : '⏸ Pausado'}
              </span>
              <p className="text-[10px] text-gray-500">
                Tempo: {formatElapsed(elapsedTime)}
              </p>
            </div>
          </div>

          {/* Velocidade */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 hidden md:block">Velocidade:</span>
            <div className="flex items-center gap-0.5 flex-wrap">
              {speedOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => onSpeedChange(s)}
                  className={`px-2 py-1 rounded text-[10px] font-mono font-medium transition-all ${
                    speed === s
                      ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30'
                      : 'bg-gray-800/60 text-gray-400 hover:bg-gray-700/60 hover:text-gray-200'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-2">
            <ToggleButton
              active={showOrbits}
              onClick={onToggleOrbits}
              label="Órbitas"
            />
            <ToggleButton
              active={showLabels}
              onClick={onToggleLabels}
              label="Nomes"
            />
          </div>

          {/* Seletor rápido de planetas */}
          <div className="flex items-center gap-1">
            {planets.map((planet) => (
              <button
                key={planet.id}
                onClick={() => onPlanetSelect(selectedPlanetId === planet.id ? null : planet.id)}
                className={`w-5 h-5 rounded-full transition-all hover:scale-150 ${
                  selectedPlanetId === planet.id ? 'ring-2 ring-white scale-125' : ''
                }`}
                style={{
                  backgroundColor: planet.color,
                  boxShadow: selectedPlanetId === planet.id ? `0 0 8px ${planet.color}` : 'none',
                }}
                title={planet.namePT}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
        active
          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
          : 'bg-gray-800/40 text-gray-500 border border-gray-700/30 hover:text-gray-300'
      }`}
    >
      {active ? '✓' : '○'} {label}
    </button>
  );
}
