import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MoonData } from '../data/moons';

interface MoonProps {
  moon: MoonData;
  parentPosition: THREE.Vector3;
  time: number;
}

export function Moon({ moon, parentPosition, time }: MoonProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;

    // Calcular posição orbital da lua
    const angle = (2 * Math.PI * time) / Math.abs(moon.orbitalPeriod);
    const direction = moon.orbitalPeriod < 0 ? -1 : 1; // Suportar órbitas retrógradas
    
    const x = Math.cos(angle * direction) * moon.visualOrbitRadius;
    const z = Math.sin(angle * direction) * moon.visualOrbitRadius;

    // Posicionar em relação ao planeta pai
    groupRef.current.position.set(
      parentPosition.x + x,
      parentPosition.y,
      parentPosition.z + z
    );

    // Rotação própria
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[moon.visualRadius, 16, 16]} />
        <meshPhongMaterial
          color={moon.color}
          emissive={moon.color}
          emissiveIntensity={0.05}
          shininess={10}
        />
      </mesh>
    </group>
  );
}

// Componente para renderizar todas as luas de um planeta
interface MoonSystemProps {
  parentPlanetId: string;
  parentPosition: THREE.Vector3;
  time: number;
  moons: MoonData[];
}

export function MoonSystem({ parentPlanetId, parentPosition, time, moons }: MoonSystemProps) {
  const planetMoons = useMemo(
    () => moons.filter((m) => m.parentPlanetId === parentPlanetId),
    [moons, parentPlanetId]
  );

  return (
    <>
      {planetMoons.map((moon) => (
        <Moon key={moon.id} moon={moon} parentPosition={parentPosition} time={time} />
      ))}
    </>
  );
}
