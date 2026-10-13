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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gray-950/98 border border-gray-700/50 rounded-3xl p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-light text-blue-300">🚀 Viagem Espacial</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
          >
            ✕
          </button>
        </div>

        {/* Seleção de planetas */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-xs text-gray-400 mb-2 block font-light">Partida</label>
            <select
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className="w-full bg-gray-900/80 border border-gray-700/50 rounded-xl px-4 py-3 text-sm text-white font-light focus:outline-none focus:border-blue-500/50 transition-all"
            >
              {planets.map((p) => (
                <option key={p.id} value={p.id}>{p.namePT}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-2 block font-light">Chegada</label>
            <select
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              className="w-full bg-gray-900/80 border border-gray-700/50 rounded-xl px-4 py-3 text-sm text-white font-light focus:outline-none focus:border-blue-500/50 transition-all"
            >
              {planets.filter((p) => p.id !== departure).map((p) => (
                <option key={p.id} value={p.id}>{p.namePT}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Resultados */}
        <div className="bg-gradient-to-br from-blue-950/30 to-purple-950/30 rounded-2xl p-5 mb-4 border border-blue-800/20">
          <h3 className="text-sm font-medium text-gray-300 mb-4">📐 Transferência de Hohmann</h3>
          <div className="space-y-3">
            <ResultRow label="ΔV₁ (injeção)" value={`${hohmann.deltaV1.toFixed(2)} km/s`} />
            <ResultRow label="ΔV₂ (inserção)" value={`${hohmann.deltaV2.toFixed(2)} km/s`} />
            <ResultRow label="ΔV total" value={`${hohmann.totalDeltaV.toFixed(2)} km/s`} highlight />
            <ResultRow
              label="Tempo de viagem"
              value={hohmann.transferTime < 365 ? `${hohmann.transferTime.toFixed(0)} dias` : `${(hohmann.transferTime / 365.25).toFixed(1)} anos`}
              highlight
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-950/30 to-blue-950/30 rounded-2xl p-5 mb-4 border border-green-800/20">
          <h3 className="text-sm font-medium text-gray-300 mb-4">🎯 Janela de Lançamento</h3>
          <div className="space-y-3">
            <ResultRow label="Ângulo de fase" value={`${launchWindow.phaseAngle.toFixed(1)}°`} />
            <ResultRow label="Período sinódico" value={`${launchWindow.synodicPeriod.toFixed(0)} dias`} />
          </div>
        </div>

        {/* Missões */}
        {relevantMissions.length > 0 && (
          <div className="bg-gray-900/50 rounded-2xl p-5 border border-gray-800/30">
            <h3 className="text-sm font-medium text-gray-300 mb-4">📡 Missões Relacionadas</h3>
            <div className="space-y-3">
              {relevantMissions.map((mission) => (
                <MissionCard key={mission.id} mission={mission} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 text-center">
          <button
            onClick={() => setShowMissions(!showMissions)}
            className="text-sm text-blue-400 hover:text-blue-300 font-light transition-all"
          >
            {showMissions ? '▲ Ocultar todas as missões' : '▼ Ver todas as missões'}
          </button>
        </div>

        {showMissions && (
          <div className="mt-4 space-y-3">
            {spaceMissions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ResultRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`flex justify-between items-center py-2 px-3 rounded-lg ${highlight ? 'bg-gray-800/50' : ''}`}>
      <span className="text-gray-400 text-sm font-light">{label}</span>
      <span className={`font-medium text-sm ${highlight ? 'text-blue-300' : 'text-gray-200'}`}>
        {value}
      </span>
    </div>
  );
}

function MissionCard({ mission }: { mission: SpaceMission }) {
  const statusColors = {
    success: 'text-green-400 bg-green-950/30',
    partial: 'text-yellow-400 bg-yellow-950/30',
    failed: 'text-red-400 bg-red-950/30',
    ongoing: 'text-blue-400 bg-blue-950/30',
  };

  const statusLabels = {
    success: 'Sucesso',
    partial: 'Parcial',
    failed: 'Falhou',
    ongoing: 'Ativa',
  };

  return (
    <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30 hover:border-gray-600/50 transition-all">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-sm font-medium text-white">{mission.name}</p>
          <p className="text-xs text-gray-500 font-light">
            {mission.agency} • {mission.year}
          </p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[mission.status]}`}>
          {statusLabels[mission.status]}
        </span>
      </div>
      <p className="text-xs text-gray-400 font-light mb-3">{mission.description}</p>
      <div className="flex gap-4 text-xs text-gray-500 font-light">
        <span>🕐 {mission.travelTimeDays} dias</span>
        <span>📏 {mission.distanceTraveled.toLocaleString()} M km</span>
      </div>
    </div>
  );
}
