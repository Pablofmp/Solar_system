import { useRef, useEffect } from 'react';
import { planets } from '../data/planets';
import { calculatePositionWithPrecession } from '../physics/orbitalMechanics';

interface MiniMapProps {
  time: number;
  selectedPlanetId: string | null;
  onPlanetSelect: (id: string) => void;
}

export function MiniMap({ time, selectedPlanetId, onPlanetSelect }: MiniMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 1.5; // Escala para caber no mini-mapa

    // Limpar
    ctx.fillStyle = '#0a0a2e';
    ctx.fillRect(0, 0, width, height);

    // Desenhar órbitas
    ctx.strokeStyle = '#1a1a4a';
    ctx.lineWidth = 0.5;
    planets.forEach((planet) => {
      const radius = planet.visualOrbitRadius * scale;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Desenhar Sol
    ctx.fillStyle = '#FDB813';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
    ctx.fill();

    // Desenhar planetas
    planets.forEach((planet) => {
      const pos = calculatePositionWithPrecession(planet, time);
      const x = centerX + pos.x * scale;
      const y = centerY + pos.y * scale;
      const radius = Math.max(2, planet.visualRadius * 1.5);

      const isSelected = planet.id === selectedPlanetId;

      // Halo se selecionado
      if (isSelected) {
        ctx.strokeStyle = planet.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, radius + 3, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Planeta
      ctx.fillStyle = planet.color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [time, selectedPlanetId]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 1.5;

    // Encontrar planeta mais próximo
    let closestId: string | null = null;
    let closestDist = Infinity;

    planets.forEach((planet) => {
      const pos = calculatePositionWithPrecession(planet, time);
      const px = centerX + pos.x * scale;
      const py = centerY + pos.y * scale;
      const dist = Math.sqrt((x - px) ** 2 + (y - py) ** 2);

      if (dist < 15 && dist < closestDist) {
        closestDist = dist;
        closestId = planet.id;
      }
    });

    if (closestId) {
      onPlanetSelect(closestId);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-30">
      <div className="bg-gray-900/90 backdrop-blur rounded-xl border border-gray-700/30 p-2 shadow-lg">
        <canvas
          ref={canvasRef}
          width={180}
          height={180}
          onClick={handleClick}
          className="cursor-pointer rounded-lg"
          title="Mini-mapa - Clique para selecionar planetas"
        />
        <p className="text-[9px] text-gray-500 text-center mt-1 font-light">
          Vista superior
        </p>
      </div>
    </div>
  );
}
