import { useRef, useEffect } from 'react';
import { PlanetData } from '../data/planets';

interface RealTimeGraphProps {
  planet: PlanetData;
  data: {
    time: number;
    distance: number;
    velocity: number;
  }[];
}

export function RealTimeGraph({ planet, data }: RealTimeGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;

    // Limpar canvas
    ctx.fillStyle = '#0a0a2e';
    ctx.fillRect(0, 0, width, height);

    // Calcular escalas
    const times = data.map((d) => d.time);
    const distances = data.map((d) => d.distance);
    const velocities = data.map((d) => d.velocity);

    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);
    const minDist = Math.min(...distances) * 0.95;
    const maxDist = Math.max(...distances) * 1.05;
    const minVel = Math.min(...velocities) * 0.95;
    const maxVel = Math.max(...velocities) * 1.05;

    // Desenhar grid
    ctx.strokeStyle = '#1a1a4a';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i * (height - 2 * padding)) / 5;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Eixos
    ctx.strokeStyle = '#4a4a8a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Labels dos eixos
    ctx.fillStyle = '#888';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Tempo (dias)', width / 2, height - 10);
    
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Distância / Velocidade', 0, 0);
    ctx.restore();

    // Função para converter dados para coordenadas do canvas
    const toCanvasX = (time: number) => {
      return padding + ((time - minTime) / (maxTime - minTime)) * (width - 2 * padding);
    };
    const toCanvasY = (value: number, min: number, max: number) => {
      return height - padding - ((value - min) / (max - min)) * (height - 2 * padding);
    };

    // Desenhar distância (linha azul)
    ctx.strokeStyle = '#4da6ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((d, i) => {
      const x = toCanvasX(d.time);
      const y = toCanvasY(d.distance, minDist, maxDist);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Desenhar velocidade (linha laranja)
    ctx.strokeStyle = '#ff8844';
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((d, i) => {
      const x = toCanvasX(d.time);
      const y = toCanvasY(d.velocity, minVel, maxVel);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Legenda
    ctx.fillStyle = '#4da6ff';
    ctx.fillRect(width - 120, 10, 10, 10);
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'left';
    ctx.fillText('Distância (M km)', width - 105, 19);

    ctx.fillStyle = '#ff8844';
    ctx.fillRect(width - 120, 25, 10, 10);
    ctx.fillStyle = '#fff';
    ctx.fillText('Velocidade (km/s)', width - 105, 34);

    // Valores atuais
    if (data.length > 0) {
      const current = data[data.length - 1];
      ctx.fillStyle = '#4da6ff';
      ctx.font = 'bold 11px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`${current.distance.toFixed(1)} M km`, padding + 5, padding + 15);
      
      ctx.fillStyle = '#ff8844';
      ctx.fillText(`${current.velocity.toFixed(2)} km/s`, padding + 5, padding + 30);
    }
  }, [data, planet]);

  return (
    <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800/50">
      <h3 className="text-sm font-semibold text-gray-300 mb-2">
        📊 Dados em Tempo Real - {planet.namePT}
      </h3>
      <canvas
        ref={canvasRef}
        width={500}
        height={250}
        className="w-full rounded-lg"
      />
      <p className="text-[10px] text-gray-500 mt-2 text-center">
        Gráfico mostra a variação da distância ao Sol e velocidade orbital ao longo do tempo
      </p>
    </div>
  );
}
