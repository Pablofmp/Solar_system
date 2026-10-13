import { useState } from 'react';
import { planets, PlanetData } from '../data/planets';
import { comparePlanets } from '../physics/spaceTravel';

interface PlanetComparatorProps {
  onClose: () => void;
}

export function PlanetComparator({ onClose }: PlanetComparatorProps) {
  const [planet1Id, setPlanet1Id] = useState('earth');
  const [planet2Id, setPlanet2Id] = useState('jupiter');

  const planet1 = planets.find((p) => p.id === planet1Id)!;
  const planet2 = planets.find((p) => p.id === planet2Id)!;
  const comparison = comparePlanets(planet1, planet2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-gray-950/95 border border-gray-700/50 rounded-2xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-purple-300">⚖️ Comparador de Planetas</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Seleção */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <select
            value={planet1Id}
            onChange={(e) => setPlanet1Id(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
          >
            {planets.map((p) => (
              <option key={p.id} value={p.id}>{p.namePT}</option>
            ))}
          </select>
          <select
            value={planet2Id}
            onChange={(e) => setPlanet2Id(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
          >
            {planets.map((p) => (
              <option key={p.id} value={p.id}>{p.namePT}</option>
            ))}
          </select>
        </div>

        {/* Visualização lado a lado */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <PlanetCard planet={planet1} />
          <PlanetCard planet={planet2} />
        </div>

        {/* Comparação detalhada */}
        <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800/50">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">📊 Comparação</h3>
          <div className="space-y-3">
            <ComparisonRow
              label="Diâmetro"
              value1={`${planet1.realDiameter.toLocaleString()} km`}
              value2={`${planet2.realDiameter.toLocaleString()} km`}
              ratio={comparison.ratios.diameter}
              color1={planet1.color}
              color2={planet2.color}
            />
            <ComparisonRow
              label="Massa"
              value1={`${planet1.realMass} × 10²⁴ kg`}
              value2={`${planet2.realMass} × 10²⁴ kg`}
              ratio={comparison.ratios.mass}
              color1={planet1.color}
              color2={planet2.color}
            />
            <ComparisonRow
              label="Distância ao Sol"
              value1={`${planet1.distanceFromSun} M km`}
              value2={`${planet2.distanceFromSun} M km`}
              ratio={comparison.ratios.distance}
              color1={planet1.color}
              color2={planet2.color}
            />
            <ComparisonRow
              label="Período orbital"
              value1={`${planet1.orbitalPeriod} dias`}
              value2={`${planet2.orbitalPeriod} dias`}
              ratio={comparison.ratios.period}
              color1={planet1.color}
              color2={planet2.color}
            />
            <ComparisonRow
              label="Gravidade"
              value1={`${planet1.surfaceGravity} m/s²`}
              value2={`${planet2.surfaceGravity} m/s²`}
              ratio={comparison.ratios.gravity}
              color1={planet1.color}
              color2={planet2.color}
            />
            <ComparisonRow
              label="Temperatura"
              value1={`${planet1.meanTemperature}°C`}
              value2={`${planet2.meanTemperature}°C`}
              ratio={comparison.ratios.temperature}
              color1={planet1.color}
              color2={planet2.color}
            />
          </div>
        </div>

        {/* Facto interessante */}
        <div className="mt-4 bg-purple-950/30 border border-purple-800/30 rounded-lg p-3">
          <p className="text-purple-300 text-xs">
            💡 {planet1.namePT} é {comparison.ratios.diameter.toFixed(2)}× maior em diâmetro e{' '}
            {comparison.ratios.mass.toFixed(2)}× mais massivo que {planet2.namePT}.
          </p>
        </div>
      </div>
    </div>
  );
}

function PlanetCard({ planet }: { planet: PlanetData }) {
  return (
    <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-800/30 text-center">
      <div
        className="w-20 h-20 rounded-full mx-auto mb-3"
        style={{
          background: `radial-gradient(circle at 35% 35%, ${planet.color}, ${planet.emissiveColor})`,
          boxShadow: `0 0 20px ${planet.color}44`,
        }}
      />
      <h3 className="text-lg font-bold" style={{ color: planet.color }}>
        {planet.namePT}
      </h3>
      <p className="text-gray-500 text-xs mb-2">{planet.name}</p>
      <p className="text-gray-400 text-xs leading-relaxed">{planet.description}</p>
    </div>
  );
}

function ComparisonRow({
  label,
  value1,
  value2,
  ratio,
  color1,
  color2,
}: {
  label: string;
  value1: string;
  value2: string;
  ratio: number;
  color1: string;
  color2: string;
}) {
  const barWidth1 = ratio >= 1 ? 100 : (1 / ratio) * 100;
  const barWidth2 = ratio >= 1 ? ratio * 100 : 100;
  const maxBar = Math.max(barWidth1, barWidth2);

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-gray-400 text-xs">{label}</span>
        <span className="text-[10px] text-gray-500">
          {ratio >= 1 ? `${ratio.toFixed(2)}×` : `${(1/ratio).toFixed(2)}×`}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-xs font-medium mb-1" style={{ color: color1 }}>
            {value1}
          </p>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${(barWidth1 / maxBar) * 100}%`,
                backgroundColor: color1,
              }}
            />
          </div>
        </div>
        <div>
          <p className="text-xs font-medium mb-1 text-right" style={{ color: color2 }}>
            {value2}
          </p>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all ml-auto"
              style={{
                width: `${(barWidth2 / maxBar) * 100}%`,
                backgroundColor: color2,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
