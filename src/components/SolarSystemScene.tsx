import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { planets } from '../data/planets';
import { Sun } from './Sun';
import { Planet } from './Planet';

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
    const count = 800;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 25 + Math.random() * 5; // Entre Marte e Júpiter
      const height = (Math.random() - 0.5) * 1.5;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      sizes[i] = Math.random() * 0.08 + 0.02;
    }
    
    return { positions, sizes, count };
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
        size={0.08}
        transparent
        opacity={0.6}
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
        opacity={0.05}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
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
      <ambientLight intensity={0.08} color="#334466" />
      
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

      {/* Cintura de asteroides */}
      <AsteroidBelt />

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
    </>
  );
}
