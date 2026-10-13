import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { planets } from '../data/planets';
import { moons } from '../data/moons';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { MoonSystem } from './Moon';
import { Comet, comets } from './Comet';
import { SolarWind } from './SolarEffects';
import { KuiperBelt, JupiterTrojans } from './CelestialObjects';
import { calculatePositionWithPrecession } from '../physics/orbitalMechanics';

interface SolarSystemSceneProps {
  time: number;
  selectedPlanetId: string | null;
  onPlanetClick: (id: string | null) => void;
  showOrbits: boolean;
  showLabels: boolean;
}

// Campo de asteroides entre Marte e Júpiter
function AsteroidBelt() {
  const asteroidsRef = useRef<THREE.Points>(null);
  
  const asteroidData = useMemo(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 25 + Math.random() * 5; // Entre Marte e Júpiter
      const height = (Math.random() - 0.5) * 1.5;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    
    return { positions, count };
  }, []);

  useFrame((state) => {
    if (asteroidsRef.current) {
      asteroidsRef.current.rotation.y = state.clock.getElapsedTime() * 0.002;
    }
  });

  return (
    <points ref={asteroidsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={asteroidData.count}
          array={asteroidData.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#888888"
        size={0.06}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

// Grid de referência do plano eclíptico
function EclipticPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
      <ringGeometry args={[5, 70, 64]} />
      <meshBasicMaterial
        color="#1a1a4a"
        transparent
        opacity={0.04}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Componente para gerir posições dos planetas (para luas)
function PlanetPositions({ time, children }: { time: number; children: (positions: Map<string, THREE.Vector3>) => React.ReactNode }) {
  const positions = useMemo(() => {
    const posMap = new Map<string, THREE.Vector3>();
    planets.forEach((planet) => {
      const pos = calculatePositionWithPrecession(planet, time);
      posMap.set(planet.id, new THREE.Vector3(pos.x, pos.z, pos.y));
    });
    return posMap;
  }, [time]);

  return <>{children(positions)}</>;
}

export function SolarSystemScene({
  time,
  selectedPlanetId,
  onPlanetClick,
  showOrbits,
  showLabels,
}: SolarSystemSceneProps) {
  return (
    <>
      {/* Iluminação ambiente */}
      <ambientLight intensity={0.06} color="#334466" />
      
      {/* Fundo de estrelas */}
      <Stars
        radius={200}
        depth={100}
        count={8000}
        factor={4}
        saturation={0.2}
        fade
        speed={0.5}
      />

      {/* Plano eclíptico */}
      <EclipticPlane />

      {/* Sol */}
      <Sun onClick={() => onPlanetClick(null)} />

      {/* Vento solar subtil */}
      <SolarWind />

      {/* Cintura de asteroides */}
      <AsteroidBelt />

      {/* Cintura de Kuiper */}
      <KuiperBelt />

      {/* Tróianos de Júpiter */}
      <JupiterTrojans />

      {/* Cometas */}
      {comets.map((comet) => (
        <Comet key={comet.id} comet={comet} time={time} scale={1} />
      ))}

      {/* Planetas */}
      {planets.map((planet) => (
        <Planet
          key={planet.id}
          planet={planet}
          time={time}
          isSelected={selectedPlanetId === planet.id}
          onClick={() => onPlanetClick(planet.id)}
          showOrbit={showOrbits}
          showLabels={showLabels}
        />
      ))}

      {/* Sistema de luas */}
      <PlanetPositions time={time}>
        {(positions) => (
          <>
            {planets.map((planet) => {
              const planetMoons = moons.filter((m) => m.parentPlanetId === planet.id);
              if (planetMoons.length === 0) return null;
              const pos = positions.get(planet.id) || new THREE.Vector3();
              return (
                <MoonSystem
                  key={`moons-${planet.id}`}
                  parentPlanetId={planet.id}
                  parentPosition={pos}
                  time={time}
                  moons={moons}
                />
              );
            })}
          </>
        )}
      </PlanetPositions>
    </>
  );
}
