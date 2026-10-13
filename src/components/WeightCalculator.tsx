import { useState } from 'react';
import { planets } from '../data/planets';

interface WeightCalculatorProps {
  onClose: () => void;
}

export function WeightCalculator({ onClose }: WeightCalculatorProps) {
  const [weight, setWeight] = useState(70); // kg na Terra
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');

  // Converter para kg se necessário
  const weightInKg = unit === 'lbs' ? weight * 0.453592 : weight;

  // Calcular peso em cada planeta
  const planetWeights = planets.map((planet) => {
    const gravityRatio = planet.surfaceGravity / 9.81; // comparado à Terra
    const weightOnPlanet = weightInKg * gravityRatio;
    return {
      ...planet,
      weight: weightOnPlanet,
      gravityRatio,
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gray-950/98 border border-gray-700/50 rounded-3xl p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-light text-green-300">⚖️ Calculadora de Peso</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
          >
            ✕
          </button>
        </div>

        {/* Input de peso */}
        <div className="bg-gradient-to-br from-green-950/30 to-blue-950/30 rounded-2xl p-6 mb-6 border border-green-800/20">
          <label className="text-sm text-gray-400 mb-3 block font-light">
            O teu peso na Terra
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="flex-1 bg-gray-900/80 border border-gray-700/50 rounded-xl px-4 py-3 text-white text-lg font-light focus:outline-none focus:border-green-500/50 transition-all"
              min="0"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as 'kg' | 'lbs')}
              className="bg-gray-900/80 border border-gray-700/50 rounded-xl px-4 py-3 text-white font-light focus:outline-none focus:border-green-500/50 transition-all"
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
          <p className="text-xs text-gray-500 mt-2 font-light">
            {unit === 'kg' ? 'quilogramas' : 'libras'} (massa)
          </p>
        </div>

        {/* Grid de planetas */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {planetWeights.map((planet) => (
            <div
              key={planet.id}
              className="bg-gray-900/50 rounded-xl p-4 border border-gray-800/30 hover:border-gray-700/50 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-8 h-8 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, ${planet.color}, ${planet.emissiveColor})`,
                    boxShadow: `0 0 8px ${planet.color}44`,
                  }}
                />
                <div>
                  <p className="text-sm font-medium" style={{ color: planet.color }}>
                    {planet.namePT}
                  </p>
                  <p className="text-[10px] text-gray-500 font-light">
                    g = {planet.surfaceGravity} m/s²
                  </p>
                </div>
              </div>
              <p className="text-lg font-light text-white">
                {planet.weight.toFixed(1)}
                <span className="text-xs text-gray-400 ml-1">{unit}</span>
              </p>
              <p className="text-xs text-gray-500 font-light">
                {planet.gravityRatio.toFixed(2)}× Terra
              </p>
            </div>
          ))}
        </div>

        {/* Curiosidade */}
        <div className="mt-6 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-xl p-4 border border-green-800/20">
          <p className="text-green-300/90 text-sm font-light">
            💡 O teu peso muda porque a gravidade superficial é diferente em cada planeta. 
            Em Júpiter pesarias {(planetWeights.find(p => p.id === 'jupiter')?.weight || 0).toFixed(1)} {unit}, 
            quase 2.5× mais que na Terra!
          </p>
        </div>
      </div>
    </div>
  );
}
