import { useState } from 'react';
import { planets } from '../data/planets';
import { calculateHohmannTransfer, calculateLaunchWindow, spaceMissions, SpaceMission } from '../physics/spaceTravel';

interface TravelCalculatorProps {
  onClose: () => void;
}

export function TravelCalculator({ onClose }: TravelCalculatorProps) {
  const [departure, setDeparture] = useState('earth');
  const [arrival, setArrival] = useState('mars');
  const [showMissions, setShowMissions] = useState(false);

  const departurePlanet = planets.find((p) => p.id === departure)!;
  const arrivalPlanet = planets.find((p) => p.id === arrival)!;

  const hohmann = calculateHohmannTransfer(departurePlanet, arrivalPlanet);
  const launchWindow = calculateLaunchWindow(departurePlanet, arrivalPlanet);

  const relevantMissions = spaceMissions.filter(
    (m) => m.targetPlanetId === arrival || m.targetPlanetId === departure
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-gray-950/95 border border-gray-700/50 rounded-2xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-300">🚀 Calculadora de Viagem Espacial</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Seleção de planetas */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Partida</label>
            <select
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
            >
              {planets.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.namePT}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Chegada</label>
            <select
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
            >
              {planets.filter((p) => p.id !== departure).map((p) => (
                <option key={p.id} value={p.id}>
                  {p.namePT}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Resultados da transferência de Hohmann */}
        <div className="bg-gray-900/50 rounded-xl p-4 mb-4 border border-gray-800/50">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">📐 Transferência de Hohmann</h3>
          <div className="space-y-2">
            <ResultRow
              label="ΔV₁ (injeção)"
              value={`${hohmann.deltaV1.toFixed(2)} km/s`}
              color="#4da6ff"
            />
            <ResultRow
              label="ΔV₂ (inserção)"
              value={`${hohmann.deltaV2.toFixed(2)} km/s`}
              color="#4da6ff"
            />
            <ResultRow
              label="ΔV total"
              value={`${hohmann.totalDeltaV.toFixed(2)} km/s`}
              color="#ff8844"
              highlight
            />
            <ResultRow
              label="Tempo de viagem"
              value={
                hohmann.transferTime < 365
                  ? `${hohmann.transferTime.toFixed(0)} dias`
                  : `${(hohmann.transferTime / 365.25).toFixed(1)} anos`
              }
              color="#44dd88"
            />
            <ResultRow
              label="Vel. no periélio"
              value={`${hohmann.perihelionVelocity.toFixed(2)} km/s`}
            />
            <ResultRow
              label="Vel. no afélio"
              value={`${hohmann.aphelionVelocity.toFixed(2)} km/s`}
            />
          </div>
        </div>

        {/* Janela de lançamento */}
        <div className="bg-gray-900/50 rounded-xl p-4 mb-4 border border-gray-800/50">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">🎯 Janela de Lançamento</h3>
          <div className="space-y-2">
            <ResultRow
              label="Ângulo de fase"
              value={`${launchWindow.phaseAngle.toFixed(1)}°`}
            />
            <ResultRow
              label="Período sinódico"
              value={`${launchWindow.synodicPeriod.toFixed(0)} dias (${(launchWindow.synodicPeriod / 365.25).toFixed(1)} anos)`}
            />
          </div>
        </div>

        {/* Missões relacionadas */}
        {relevantMissions.length > 0 && (
          <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800/50">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">📡 Missões Espaciais</h3>
            <div className="space-y-2">
              {relevantMissions.map((mission) => (
                <MissionCard key={mission.id} mission={mission} />
              ))}
            </div>
          </div>
        )}

        {/* Comparação com missões reais */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowMissions(!showMissions)}
            className="text-xs text-blue-400 hover:text-blue-300"
          >
            {showMissions ? '▲ Ocultar todas as missões' : '▼ Ver todas as missões'}
          </button>
        </div>

        {showMissions && (
          <div className="mt-3 space-y-2">
            {spaceMissions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ResultRow({
  label,
  value,
  color,
  highlight,
}: {
  label: string;
  value: string;
  color?: string;
  highlight?: boolean;
}) {
  return (
    <div className={`flex justify-between items-center py-1.5 ${highlight ? 'bg-gray-800/50 -mx-2 px-2 rounded' : ''}`}>
      <span className="text-gray-400 text-xs">{label}</span>
      <span className="font-mono text-xs font-medium" style={{ color: color || '#e2e8f0' }}>
        {value}
      </span>
    </div>
  );
}

function MissionCard({ mission }: { mission: SpaceMission }) {
  const statusColors = {
    success: 'text-green-400',
    partial: 'text-yellow-400',
    failed: 'text-red-400',
    ongoing: 'text-blue-400',
  };

  const statusLabels = {
    success: 'Sucesso',
    partial: 'Parcial',
    failed: 'Falhou',
    ongoing: 'Ativa',
  };

  const typeLabels = {
    flyby: 'Sobrevoou',
    orbiter: 'Orbitador',
    lander: 'Aterrissagem',
    rover: 'Rover',
    sample_return: 'Retorno de amostra',
  };

  return (
    <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-white">{mission.name}</p>
          <p className="text-[10px] text-gray-500">
            {mission.agency} • {mission.year} • {typeLabels[mission.type]}
          </p>
        </div>
        <span className={`text-[10px] font-medium ${statusColors[mission.status]}`}>
          {statusLabels[mission.status]}
        </span>
      </div>
      <p className="text-xs text-gray-400 mt-1">{mission.description}</p>
      <div className="flex gap-4 mt-2">
        <span className="text-[10px] text-gray-500">
          🕐 {mission.travelTimeDays} dias
        </span>
        <span className="text-[10px] text-gray-500">
          📏 {mission.distanceTraveled.toLocaleString()} M km
        </span>
      </div>
    </div>
  );
}
