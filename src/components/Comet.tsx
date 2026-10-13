import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CometData {
  id: string;
  name: string;
  namePT: string;
  semiMajorAxis: number; // UA
  eccentricity: number;
  inclination: number; // graus
  period: number; // anos
  color: string;
}

export const comets: CometData[] = [
  {
    id: 'halley',
    name: "Halley's Comet",
    namePT: 'Cometa de Halley',
    semiMajorAxis: 17.8,
    eccentricity: 0.967,
    inclination: 162,
    period: 75.3,
    color: '#88ccff',
  },
  {
    id: 'hale-bopp',
    name: 'Hale-Bopp',
    namePT: 'Hale-Bopp',
    semiMajorAxis: 186,
    eccentricity: 0.995,
    inclination: 89,
    period: 2533,
    color: '#aaddff',
  },
];

interface CometProps {
  comet: CometData;
  time: number; // em dias
  scale: number; // fator de escala visual
}

export function Comet({ comet, time, scale }: CometProps) {
  const cometRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Points>(null);

  // Converter tempo de dias para anos
  const timeYears = time / 365.25;

  // Calcular posição usando órbita elíptica
  const position = useMemo(() => {
    const a = comet.semiMajorAxis * scale * 3.5; // Escala visual
    const e = comet.eccentricity;
    const T = comet.period;
    const inc = (comet.inclination * Math.PI) / 180;

    // Anomalia média
    const M = ((2 * Math.PI * timeYears) / T) % (2 * Math.PI);

    // Resolver equação de Kepler (simplificado para alta excentricidade)
    let E = M;
    for (let i = 0; i < 10; i++) {
      E = M + e * Math.sin(E);
    }

    // Anomalia verdadeira
    const nu = 2 * Math.atan2(
      Math.sqrt(1 + e) * Math.sin(E / 2),
      Math.sqrt(1 - e) * Math.cos(E / 2)
    );

    // Distância radial
    const r = a * (1 - e * e) / (1 + e * Math.cos(nu));

    // Posição no plano orbital
    const x = r * Math.cos(nu);
    const yOrbital = r * Math.sin(nu);
    const y = yOrbital * Math.cos(inc);
    const z = yOrbital * Math.sin(inc);

    return new THREE.Vector3(x, y, z);
  }, [comet, timeYears, scale]);

  // Criar partículas da cauda
  const tailGeometry = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const t = i / count;
      // Cauda aponta na direção oposta ao Sol
      const tailLength = 3 + Math.random() * 2;
      positions[i * 3] = -position.x * t * tailLength * 0.1 + (Math.random() - 0.5) * 0.3;
      positions[i * 3 + 1] = -position.y * t * tailLength * 0.1 + (Math.random() - 0.5) * 0.3;
      positions[i * 3 + 2] = -position.z * t * tailLength * 0.1 + (Math.random() - 0.5) * 0.3;
      sizes[i] = (1 - t) * 0.15;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [position]);

  useFrame(() => {
    if (cometRef.current) {
      cometRef.current.position.copy(position);
    }
  });

  return (
    <group ref={cometRef}>
      {/* Núcleo do cometa */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color={comet.color} />
      </mesh>

      {/* Brilho ao redor do núcleo */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color={comet.color} transparent opacity={0.3} />
      </mesh>

      {/* Cauda de partículas */}
      <points ref={tailRef} geometry={tailGeometry}>
        <pointsMaterial
          color={comet.color}
          size={0.1}
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Cauda de gás (mais longa e difusa) */}
      <mesh position={[0, 0, 0]}>
        <coneGeometry args={[0.2, 4, 8]} />
        <meshBasicMaterial
          color={comet.color}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
