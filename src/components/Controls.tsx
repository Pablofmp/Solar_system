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
  elapsedTime: number;
  darkMode?: boolean;
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
}: ControlsProps) {
  const speedOptions = [0.5, 1, 5, 10, 50, 100];

  return (
    <div className="flex items-center justify-between gap-6">
      {/* Play/Pause */}
      <div className="flex items-center gap-3">
        <button
          onClick={onTogglePlay}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center hover:from-blue-400 hover:to-purple-500 transition-all shadow-lg hover:shadow-blue-500/30 hover:scale-105"
          title={isPlaying ? 'Pausar' : 'Reproduzir'}
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>
      </div>

      {/* Velocidade */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 font-light">Velocidade</span>
        <div className="flex items-center gap-1 bg-gray-900/50 rounded-xl px-2 py-1.5 border border-gray-800/30">
          {speedOptions.map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                speed === s
                  ? 'bg-blue-500/80 text-white shadow-md'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
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

      {/* Seletor de planetas */}
      <div className="flex items-center gap-1.5 bg-gray-900/50 rounded-xl px-3 py-2 border border-gray-800/30">
        {planets.map((planet) => (
          <button
            key={planet.id}
            onClick={() => onPlanetSelect(selectedPlanetId === planet.id ? null : planet.id)}
            className={`w-6 h-6 rounded-full transition-all hover:scale-125 ${
              selectedPlanetId === planet.id ? 'ring-2 ring-white/80 scale-110' : ''
            }`}
            style={{
              backgroundColor: planet.color,
              boxShadow: selectedPlanetId === planet.id ? `0 0 12px ${planet.color}` : 'none',
            }}
            title={planet.namePT}
          />
        ))}
      </div>
    </div>
  );
}

function ToggleButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-light transition-all border ${
        active
          ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
          : 'bg-gray-900/50 text-gray-400 border-gray-800/30 hover:text-gray-200 hover:bg-gray-800/50'
      }`}
    >
      {active ? '✓' : '○'} {label}
    </button>
  );
}
