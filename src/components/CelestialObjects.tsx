import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Objetos da Cintura de Kuiper (KBOs)
export function KuiperBelt() {
  const beltRef = useRef<THREE.Points>(null);
  
  const { positions, count } = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 75 + Math.random() * 25; // Além de Plutão
      const height = (Math.random() - 0.5) * 8; // Mais disperso
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    
    return { positions, count };
  }, []);

  useFrame((state) => {
    if (beltRef.current) {
      beltRef.current.rotation.y = state.clock.getElapsedTime() * 0.0005;
    }
  });

  return (
    <points ref={beltRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#6688aa"
        size={0.15}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

// Tróianos de Júpiter (pontos L4 e L5)
export function JupiterTrojans() {
  const trojansRef = useRef<THREE.Group>(null);
  
  const { l4Positions, l5Positions, count } = useMemo(() => {
    const count = 100;
    const l4Positions = new Float32Array(count * 3);
    const l5Positions = new Float32Array(count * 3);
    
    const jupiterOrbitRadius = 32;
    const jupiterAngle = 0; // Ângulo atual de Júpiter (simplificado)
    
    // L4 está 60° à frente de Júpiter
    const l4Angle = jupiterAngle + Math.PI / 3;
    // L5 está 60° atrás de Júpiter
    const l5Angle = jupiterAngle - Math.PI / 3;
    
    for (let i = 0; i < count; i++) {
      const spread = 0.3; // Dispersão angular
      const radiusSpread = 2; // Dispersão radial
      
      // L4
      const l4a = l4Angle + (Math.random() - 0.5) * spread;
      const l4r = jupiterOrbitRadius + (Math.random() - 0.5) * radiusSpread;
      l4Positions[i * 3] = Math.cos(l4a) * l4r;
      l4Positions[i * 3 + 1] = (Math.random() - 0.5) * 1;
      l4Positions[i * 3 + 2] = Math.sin(l4a) * l4r;
      
      // L5
      const l5a = l5Angle + (Math.random() - 0.5) * spread;
      const l5r = jupiterOrbitRadius + (Math.random() - 0.5) * radiusSpread;
      l5Positions[i * 3] = Math.cos(l5a) * l5r;
      l5Positions[i * 3 + 1] = (Math.random() - 0.5) * 1;
      l5Positions[i * 3 + 2] = Math.sin(l5a) * l5r;
    }
    
    return { l4Positions, l5Positions, count };
  }, []);

  return (
    <group ref={trojansRef}>
      {/* L4 - à frente de Júpiter */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={l4Positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#88aacc"
          size={0.1}
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
      
      {/* L5 - atrás de Júpiter */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={l5Positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#88aacc"
          size={0.1}
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// Pontos de Lagrange (visualização)
export function LagrangePoints({ visible }: { visible: boolean }) {
  if (!visible) return null;

  const jupiterOrbitRadius = 32;
  const jupiterAngle = 0; // Simplificado
  
  // Calcular posições dos pontos L1-L5
  const l1 = { x: jupiterOrbitRadius - 3, y: 0, z: 0 };
  const l2 = { x: jupiterOrbitRadius + 3, y: 0, z: 0 };
  const l3 = { x: -jupiterOrbitRadius, y: 0, z: 0 };
  const l4 = {
    x: jupiterOrbitRadius * Math.cos(jupiterAngle + Math.PI / 3),
    y: 0,
    z: jupiterOrbitRadius * Math.sin(jupiterAngle + Math.PI / 3),
  };
  const l5 = {
    x: jupiterOrbitRadius * Math.cos(jupiterAngle - Math.PI / 3),
    y: 0,
    z: jupiterOrbitRadius * Math.sin(jupiterAngle - Math.PI / 3),
  };

  const points = [
    { pos: l1, label: 'L1' },
    { pos: l2, label: 'L2' },
    { pos: l3, label: 'L3' },
    { pos: l4, label: 'L4' },
    { pos: l5, label: 'L5' },
  ];

  return (
    <group>
      {points.map((point, i) => (
        <group key={i} position={[point.pos.x, point.pos.y, point.pos.z]}>
          <mesh>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial color="#ffaa00" transparent opacity={0.6} />
          </mesh>
          <sprite scale={[2, 0.5, 1]}>
            <spriteMaterial transparent opacity={0.8} color="#ffaa00">
              <canvasTexture
                attach="map"
                image={createLabelCanvas(point.label)}
              />
            </spriteMaterial>
          </sprite>
        </group>
      ))}
    </group>
  );
}

function createLabelCanvas(text: string): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 32;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, 128, 32);
  ctx.font = 'bold 20px Arial';
  ctx.fillStyle = '#ffaa00';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 64, 16);
  return canvas;
}
