import { PlanetData, SUN_DATA } from '../data/planets';
import {
  orbitalVelocity,
  gravitationalTimeDilation,
  escapeVelocityFromSun,
  gravitationalForce,
  schwarzschildRadius,
} from '../physics/orbitalMechanics';

interface InfoPanelProps {
  planet: PlanetData | null;
  currentDistance: number; // distância atual ao Sol em milhões de km
  currentVelocity: number; // velocidade atual em km/s
  onClose: () => void;
}

export function InfoPanel({ planet, currentDistance, currentVelocity, onClose }: InfoPanelProps) {
  if (!planet) return null;

  const timeDilation = gravitationalTimeDilation(planet.distanceFromSun * 1e6);
  const timeDilationMicros = (1 - timeDilation) * 1e6; // microssegundos por segundo
  const escapeVel = escapeVelocityFromSun(planet.distanceFromSun * 1e6);
  const gravForce = gravitationalForce(planet, planet.distanceFromSun * 1e6);
  const rs = schwarzschildRadius();

  const formatNum = (n: number, decimals: number = 2): string => {
    if (Math.abs(n) >= 1e15) return n.toExponential(2);
    if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(decimals) + ' M';
    if (Math.abs(n) >= 1e3) return (n / 1e3).toFixed(decimals) + 'k';
    return n.toFixed(decimals);
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-gray-950/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-5 max-w-sm w-[340px] shadow-2xl animate-fadeIn overflow-y-auto max-h-[85vh]">
      {/* Header */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
      >
        ✕
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-14 h-14 rounded-full flex-shrink-0 shadow-lg"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${planet.color}, ${planet.emissiveColor})`,
            boxShadow: `0 0 20px ${planet.color}44`,
          }}
        />
        <div>
          <h2 className="text-xl font-bold" style={{ color: planet.color }}>
            {planet.namePT}
          </h2>
          <p className="text-gray-500 text-xs">{planet.name}</p>
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-3 leading-relaxed">{planet.description}</p>
      
      <div className="bg-gray-800/50 rounded-lg p-3 mb-4 border border-gray-700/30">
        <p className="text-yellow-300/80 text-xs italic">💡 {planet.funFact}</p>
      </div>

      {/* Dados Físicos */}
      <div className="space-y-1">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">📐 Propriedades Físicas</h3>
        
        <InfoRow label="Diâmetro" value={`${planet.realDiameter.toLocaleString('pt-PT')} km`} />
        <InfoRow label="Massa" value={`${planet.realMass} × 10²⁴ kg`} />
        <InfoRow label="Gravidade superficial" value={`${planet.surfaceGravity} m/s²`} />
        <InfoRow label="Velocidade de escape" value={`${planet.escapeVelocity} km/s`} />
        <InfoRow label="Temperatura média" value={`${planet.meanTemperature}°C`} />
        <InfoRow label="Luas" value={`${planet.numberOfMoons}`} />
      </div>

      {/* Dados Orbitais */}
      <div className="space-y-1 mt-4">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">🌍 Dados Orbitais (Kepler)</h3>
        
        <InfoRow label="Distância ao Sol" value={`${planet.distanceFromSun.toLocaleString('pt-PT')} M km`} />
        <InfoRow label="Distância atual" value={`${currentDistance.toFixed(1)} M km`} color="#4da6ff" />
        <InfoRow label="Excentricidade" value={`${planet.eccentricity}`} />
        <InfoRow label="Período orbital" value={`${planet.orbitalPeriod.toLocaleString('pt-PT')} dias (${(planet.orbitalPeriod / 365.25).toFixed(2)} anos)`} />
        <InfoRow label="Velocidade orbital" value={`${currentVelocity.toFixed(2)} km/s`} color="#4da6ff" />
        <InfoRow label="Inclinação orbital" value={`${planet.orbitalInclination}°`} />
        <InfoRow label="Inclinação axial" value={`${planet.axialTilt}°`} />
        <InfoRow label="Rotação" value={`${Math.abs(planet.rotationPeriod).toFixed(1)}h ${planet.rotationPeriod < 0 ? '(retrógrada)' : ''}`} />
      </div>

      {/* Física Relativística */}
      <div className="space-y-1 mt-4">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">⚛️ Relatividade Geral</h3>
        
        <InfoRow
          label="Precessão periélio"
          value={`${planet.perihelionPrecession}″/século`}
          color="#ff8844"
        />
        <InfoRow
          label="Dilatação temporal"
          value={`-${timeDilationMicros.toFixed(3)} μs/s`}
          color="#ff8844"
        />
        <InfoRow
          label="Vel. escape do Sol"
          value={`${escapeVel.toFixed(1)} km/s`}
        />
        <InfoRow
          label="Força gravitacional"
          value={`${formatNum(gravForce)} N`}
        />
      </div>

      {/* Curiosidades relativísticas */}
      {planet.id === 'mercury' && (
        <div className="mt-4 bg-orange-950/30 border border-orange-800/30 rounded-lg p-3">
          <p className="text-orange-300 text-xs">
            🔬 <strong>Relatividade Geral:</strong> A precessão anómala de 43″/século do periélio de Mercúrio foi uma das primeiras confirmações da Teoria da Relatividade Geral de Einstein (1915).
          </p>
        </div>
      )}
      {planet.id === 'earth' && (
        <div className="mt-4 bg-blue-950/30 border border-blue-800/30 rounded-lg p-3">
          <p className="text-blue-300 text-xs">
            🔬 <strong>Dilatação temporal:</strong> Os satélites GPS precisam corrigir efeitos relativísticos — o tempo passa {(timeDilationMicros * 1000).toFixed(1)} ns/s mais devagar devido à gravidade solar.
          </p>
        </div>
      )}

      {/* Raio de Schwarzschild */}
      <div className="mt-3 text-center">
        <p className="text-gray-600 text-[10px]">
          Raio de Schwarzschild do Sol: {(rs / 1000).toFixed(2)} km
        </p>
      </div>
    </div>
  );
}

function InfoRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-gray-800/50">
      <span className="text-gray-400 text-xs">{label}</span>
      <span className="font-medium text-xs" style={{ color: color || '#e2e8f0' }}>
        {value}
      </span>
    </div>
  );
}

// Painel do Sol
export function SunInfoPanel({ onClose }: { onClose: () => void }) {
  const rs = schwarzschildRadius();
  
  return (
    <div className="fixed top-4 right-4 z-50 bg-gray-950/95 backdrop-blur-xl border border-yellow-700/30 rounded-2xl p-5 max-w-sm w-[340px] shadow-2xl animate-fadeIn">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
      >
        ✕
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-14 h-14 rounded-full flex-shrink-0"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #FDB813, #FF4500)',
            boxShadow: '0 0 30px #FF660066',
          }}
        />
        <div>
          <h2 className="text-xl font-bold text-yellow-400">{SUN_DATA.namePT}</h2>
          <p className="text-gray-500 text-xs">Estrela G2V</p>
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-4">{SUN_DATA.description}</p>

      <div className="space-y-1">
        <InfoRow label="Diâmetro" value="1.392.700 km" />
        <InfoRow label="Massa" value="1.989 × 10³⁰ kg" />
        <InfoRow label="Temperatura superficial" value="5.778 K" />
        <InfoRow label="Luminosidade" value="3.828 × 10²⁶ W" />
        <InfoRow label="Raio de Schwarzschild" value={`${(rs / 1000).toFixed(2)} km`} color="#ff8844" />
        <InfoRow label="Idade" value="~4.6 mil milhões de anos" />
      </div>

      <div className="mt-4 bg-yellow-950/30 border border-yellow-800/30 rounded-lg p-3">
        <p className="text-yellow-300 text-xs">
          💡 {SUN_DATA.funFact}
        </p>
      </div>
    </div>
  );
}
