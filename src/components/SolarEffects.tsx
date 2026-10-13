import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Vento solar - partículas emanando do Sol
export function SolarWind() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 500;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Posição inicial próxima ao Sol
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3.5 + Math.random() * 2;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Velocidade radial (afastando do Sol)
      const speed = 0.05 + Math.random() * 0.1;
      velocities[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
      velocities[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
      velocities[i * 3 + 2] = Math.cos(phi) * speed;
    }

    return { positions, velocities };
  }, []);

  useFrame(() => {
    if (!particlesRef.current) return;

    const posAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];

      // Resetar partículas que saem do campo de visão
      const dist = Math.sqrt(
        posArray[i * 3] ** 2 +
        posArray[i * 3 + 1] ** 2 +
        posArray[i * 3 + 2] ** 2
      );

      if (dist > 80) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 3.5;

        posArray[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        posArray[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        posArray[i * 3 + 2] = r * Math.cos(phi);
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffaa44"
        size={0.08}
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

// Efeito de lente gravitacional ao redor do Sol
export function GravitationalLensing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group>
      {/* Anel de Einstein (efeito visual) */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4.5, 0.05, 16, 64]} />
        <meshBasicMaterial
          color="#ffcc66"
          transparent
          opacity={0.15}
        />
      </mesh>
      
      {/* Distorção visual */}
      <mesh>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial
          color="#ffaa00"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// Campo magnético da Terra (visualização simplificada)
export function MagneticField({ visible }: { visible: boolean }) {
  const linesRef = useRef<THREE.Group>(null);

  const fieldLines = useMemo(() => {
    const lines: THREE.BufferGeometry[] = [];
    const numLines = 8;
    const pointsPerLine = 32;

    for (let i = 0; i < numLines; i++) {
      const angle = (i / numLines) * Math.PI * 2;
      const points: THREE.Vector3[] = [];

      for (let j = 0; j <= pointsPerLine; j++) {
        const t = j / pointsPerLine;
        const theta = t * Math.PI;
        const r = 1.5 + Math.sin(theta) * 0.8;
        
        const x = r * Math.sin(theta) * Math.cos(angle);
        const y = r * Math.cos(theta);
        const z = r * Math.sin(theta) * Math.sin(angle);
        
        points.push(new THREE.Vector3(x, y, z));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      lines.push(geometry);
    }

    return lines;
  }, []);

  if (!visible) return null;

  return (
    <group ref={linesRef}>
      {fieldLines.map((geo, i) => (
        <primitive
          key={i}
          object={new THREE.Line(
            geo,
            new THREE.LineBasicMaterial({ color: '#4488ff', transparent: true, opacity: 0.3 })
          )}
        />
      ))}
    </group>
  );
}
