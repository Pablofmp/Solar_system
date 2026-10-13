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
  currentDistance: number;
  currentVelocity: number;
  onClose: () => void;
}

export function InfoPanel({ planet, currentDistance, currentVelocity, onClose }: InfoPanelProps) {
  if (!planet) return null;

  const timeDilation = gravitationalTimeDilation(planet.distanceFromSun * 1e6);
  const timeDilationMicros = (1 - timeDilation) * 1e6;
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
    <div className="fixed top-24 right-6 z-50 bg-gray-950/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 max-w-sm w-[360px] shadow-2xl animate-fadeIn overflow-y-auto max-h-[calc(100vh-120px)]">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-800/80 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
      >
        ✕
      </button>

      <div className="flex items-center gap-4 mb-5">
        <div
          className="w-16 h-16 rounded-full flex-shrink-0 shadow-lg"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${planet.color}, ${planet.emissiveColor})`,
            boxShadow: `0 0 25px ${planet.color}44`,
          }}
        />
        <div>
          <h2 className="text-2xl font-light" style={{ color: planet.color }}>
            {planet.namePT}
          </h2>
          <p className="text-gray-500 text-sm font-light">{planet.name}</p>
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-4 leading-relaxed font-light">{planet.description}</p>
      
      <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-xl p-4 mb-5 border border-yellow-800/20">
        <p className="text-yellow-300/90 text-xs italic font-light">💡 {planet.funFact}</p>
      </div>

      {/* Secções */}
      <Section title="📐 Propriedades Físicas">
        <InfoRow label="Diâmetro" value={`${planet.realDiameter.toLocaleString('pt-PT')} km`} />
        <InfoRow label="Massa" value={`${planet.realMass} × 10²⁴ kg`} />
        <InfoRow label="Gravidade" value={`${planet.surfaceGravity} m/s²`} />
        <InfoRow label="Vel. escape" value={`${planet.escapeVelocity} km/s`} />
        <InfoRow label="Temperatura" value={`${planet.meanTemperature}°C`} />
        <InfoRow label="Luas" value={`${planet.numberOfMoons}`} />
      </Section>

      <Section title="🌍 Dados Orbitais">
        <InfoRow label="Distância ao Sol" value={`${planet.distanceFromSun.toLocaleString('pt-PT')} M km`} />
        <InfoRow label="Distância atual" value={`${currentDistance.toFixed(1)} M km`} highlight />
        <InfoRow label="Excentricidade" value={`${planet.eccentricity}`} />
        <InfoRow label="Período orbital" value={`${planet.orbitalPeriod.toLocaleString('pt-PT')} dias`} />
        <InfoRow label="Velocidade orbital" value={`${currentVelocity.toFixed(2)} km/s`} highlight />
        <InfoRow label="Inclinação" value={`${planet.orbitalInclination}°`} />
        <InfoRow label="Rotação" value={`${Math.abs(planet.rotationPeriod).toFixed(1)}h`} />
      </Section>

      <Section title="⚛️ Relatividade Geral">
        <InfoRow label="Precessão periélio" value={`${planet.perihelionPrecession}″/século`} />
        <InfoRow label="Dilatação temporal" value={`-${timeDilationMicros.toFixed(3)} μs/s`} />
        <InfoRow label="Vel. escape do Sol" value={`${escapeVel.toFixed(1)} km/s`} />
        <InfoRow label="Força gravitacional" value={`${formatNum(gravForce)} N`} />
      </Section>

      <div className="mt-4 text-center">
        <p className="text-gray-600 text-[10px] font-light">
          Raio de Schwarzschild do Sol: {(rs / 1000).toFixed(2)} km
        </p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">{title}</h3>
      <div className="space-y-0.5">
        {children}
      </div>
    </div>
  );
}

function InfoRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`flex justify-between items-center py-1.5 px-2 rounded-lg ${highlight ? 'bg-blue-950/20' : ''}`}>
      <span className="text-gray-400 text-xs font-light">{label}</span>
      <span className={`font-medium text-xs ${highlight ? 'text-blue-300' : 'text-gray-200'}`}>
        {value}
      </span>
    </div>
  );
}

export function SunInfoPanel({ onClose }: { onClose: () => void }) {
  const rs = schwarzschildRadius();
  
  return (
    <div className="fixed top-24 right-6 z-50 bg-gray-950/95 backdrop-blur-xl border border-yellow-700/30 rounded-2xl p-6 max-w-sm w-[360px] shadow-2xl animate-fadeIn">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-800/80 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
      >
        ✕
      </button>

      <div className="flex items-center gap-4 mb-5">
        <div
          className="w-16 h-16 rounded-full flex-shrink-0"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #FDB813, #FF4500)',
            boxShadow: '0 0 30px #FF660066',
          }}
        />
        <div>
          <h2 className="text-2xl font-light text-yellow-400">{SUN_DATA.namePT}</h2>
          <p className="text-gray-500 text-sm font-light">Estrela G2V</p>
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-4 font-light">{SUN_DATA.description}</p>

      <Section title="📊 Dados">
        <InfoRow label="Diâmetro" value="1.392.700 km" />
        <InfoRow label="Massa" value="1.989 × 10³⁰ kg" />
        <InfoRow label="Temperatura" value="5.778 K" />
        <InfoRow label="Luminosidade" value="3.828 × 10²⁶ W" />
        <InfoRow label="Raio de Schwarzschild" value={`${(rs / 1000).toFixed(2)} km`} />
        <InfoRow label="Idade" value="~4.6 mil milhões de anos" />
      </Section>

      <div className="mt-4 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-xl p-4 border border-yellow-800/20">
        <p className="text-yellow-300/90 text-xs italic font-light">💡 {SUN_DATA.funFact}</p>
      </div>
    </div>
  );
}
