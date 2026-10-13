import { planets, SUN_DATA } from '../data/planets';
import { moons } from '../data/moons';
import { spaceMissions } from '../physics/spaceTravel';

interface ExportDataProps {
  onClose: () => void;
  simTime: number;
}

export function ExportData({ onClose, simTime }: ExportDataProps) {
  const exportToJSON = () => {
    const data = {
      metadata: {
        exportDate: new Date().toISOString(),
        simulationTime: simTime,
        version: '1.0.0',
      },
      sun: SUN_DATA,
      planets: planets.map((p) => ({
        ...p,
      })),
      moons: moons,
      missions: spaceMissions,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sistema-solar-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToCSV = () => {
    const headers = [
      'Nome',
      'Nome (PT)',
      'Diâmetro (km)',
      'Massa (x10²⁴ kg)',
      'Distância ao Sol (M km)',
      'Excentricidade',
      'Período Orbital (dias)',
      'Inclinação Orbital (°)',
      'Inclinação Axial (°)',
      'Período de Rotação (h)',
      'Gravidade Superficial (m/s²)',
      'Velocidade de Escape (km/s)',
      'Temperatura Média (°C)',
      'Número de Luas',
    ];

    const rows = planets.map((p) => [
      p.name,
      p.namePT,
      p.realDiameter,
      p.realMass,
      p.distanceFromSun,
      p.eccentricity,
      p.orbitalPeriod,
      p.orbitalInclination,
      p.axialTilt,
      p.rotationPeriod,
      p.surfaceGravity,
      p.escapeVelocity,
      p.meanTemperature,
      p.numberOfMoons,
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `planetas-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportScreenshot = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `sistema-solar-${Date.now()}.png`;
      a.click();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gray-950/98 border border-gray-700/50 rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-light text-white">💾 Exportar Dados</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <button
            onClick={exportScreenshot}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white py-4 rounded-xl transition-all font-light flex items-center justify-center gap-3"
          >
            <span className="text-2xl">📸</span>
            <div className="text-left">
              <p className="font-medium">Capturar Screenshot</p>
              <p className="text-xs opacity-80">Guardar imagem PNG da visualização atual</p>
            </div>
          </button>

          <button
            onClick={exportToJSON}
            className="w-full bg-gray-800/80 hover:bg-gray-700 text-white py-4 rounded-xl transition-all font-light flex items-center justify-center gap-3 border border-gray-700/30"
          >
            <span className="text-2xl">📋</span>
            <div className="text-left">
              <p className="font-medium">Exportar JSON</p>
              <p className="text-xs text-gray-400">Dados completos em formato JSON</p>
            </div>
          </button>

          <button
            onClick={exportToCSV}
            className="w-full bg-gray-800/80 hover:bg-gray-700 text-white py-4 rounded-xl transition-all font-light flex items-center justify-center gap-3 border border-gray-700/30"
          >
            <span className="text-2xl">📊</span>
            <div className="text-left">
              <p className="font-medium">Exportar CSV</p>
              <p className="text-xs text-gray-400">Tabela de dados para Excel/Sheets</p>
            </div>
          </button>
        </div>

        <div className="mt-6 bg-blue-950/30 rounded-xl p-4 border border-blue-800/30">
          <p className="text-blue-300/90 text-xs font-light">
            💡 Os ficheiros exportados incluem todos os dados astronómicos, físicos e de simulação.
          </p>
        </div>
      </div>
    </div>
  );
}
