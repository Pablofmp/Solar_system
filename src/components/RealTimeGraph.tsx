import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PlanetData } from '../data/planets';

interface RealTimeGraphProps {
  planet: PlanetData;
  data: {
    time: number;
    distance: number;
    velocity: number;
  }[];
  onClose: () => void;
}

export function RealTimeGraph({ planet, data, onClose }: RealTimeGraphProps) {
  // Formatar tempo para exibição
  const formatTime = (time: number) => {
    if (time < 365) return `${time.toFixed(0)}d`;
    return `${(time / 365.25).toFixed(1)}a`;
  };

  return (
    <div className="fixed bottom-20 left-4 z-40 bg-gray-950/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-5 w-[540px] shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="text-2xl">📊</span>
          Dados em Tempo Real
        </h3>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
        >
          ✕
        </button>
      </div>

      <div className="mb-3">
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-8 h-8 rounded-full"
            style={{
              background: `radial-gradient(circle at 35% 35%, ${planet.color}, ${planet.emissiveColor})`,
              boxShadow: `0 0 10px ${planet.color}44`,
            }}
          />
          <div>
            <p className="text-sm font-medium" style={{ color: planet.color }}>
              {planet.namePT}
            </p>
            <p className="text-xs text-gray-500">{planet.name}</p>
          </div>
        </div>
      </div>

      {/* Gráfico moderno */}
      <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800/30">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <defs>
              <linearGradient id="colorDistance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4da6ff" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4da6ff" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorVelocity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff8844" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ff8844" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a4a" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              tickFormatter={formatTime}
              stroke="#666"
              fontSize={11}
              label={{ value: 'Tempo', position: 'insideBottom', offset: -5, fill: '#888', fontSize: 11 }}
            />
            <YAxis 
              yAxisId="left"
              stroke="#4da6ff"
              fontSize={11}
              label={{ value: 'Distância (M km)', angle: -90, position: 'insideLeft', fill: '#4da6ff', fontSize: 11 }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              stroke="#ff8844"
              fontSize={11}
              label={{ value: 'Velocidade (km/s)', angle: 90, position: 'insideRight', fill: '#ff8844', fontSize: 11 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1a1a2e',
                border: '1px solid #333',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              labelFormatter={formatTime}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="distance"
              stroke="#4da6ff"
              strokeWidth={2}
              dot={false}
              name="Distância ao Sol (M km)"
              activeDot={{ r: 4, fill: '#4da6ff' }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="velocity"
              stroke="#ff8844"
              strokeWidth={2}
              dot={false}
              name="Velocidade Orbital (km/s)"
              activeDot={{ r: 4, fill: '#ff8844' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Estatísticas atuais */}
      {data.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-blue-950/30 border border-blue-800/30 rounded-lg p-3">
            <p className="text-xs text-blue-400 mb-1">Distância Atual</p>
            <p className="text-lg font-bold text-blue-300">
              {data[data.length - 1].distance.toFixed(1)}
              <span className="text-xs text-blue-400 ml-1">M km</span>
            </p>
          </div>
          <div className="bg-orange-950/30 border border-orange-800/30 rounded-lg p-3">
            <p className="text-xs text-orange-400 mb-1">Velocidade Atual</p>
            <p className="text-lg font-bold text-orange-300">
              {data[data.length - 1].velocity.toFixed(2)}
              <span className="text-xs text-orange-400 ml-1">km/s</span>
            </p>
          </div>
        </div>
      )}

      <p className="text-[10px] text-gray-500 mt-3 text-center">
        Gráfico mostra a variação da distância e velocidade orbital ao longo do tempo
      </p>
    </div>
  );
}
