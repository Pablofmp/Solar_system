import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Atmosfera volumétrica para planetas
export function Atmosphere({ 
  radius, 
  color, 
  opacity = 0.3,
  visible = true 
}: { 
  radius: number; 
  color: string; 
  opacity?: number;
  visible?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(color) },
        opacity: { value: opacity },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float opacity;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          // Efeito de borda mais brilhante
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(color, intensity * opacity);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
  }, [color, opacity]);

  if (!visible) return null;

  return (
    <mesh ref={meshRef} material={atmosphereMaterial}>
      <sphereGeometry args={[radius * 1.15, 32, 32]} />
    </mesh>
  );
}

// Auroras polares (simplificado)
export function Auroras({ 
  radius, 
  visible = false 
}: { 
  radius: number; 
  visible?: boolean;
}) {
  const auroraRef = useRef<THREE.Points>(null);

  const { positions, count } = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Distribuir nos polos
      const isNorth = Math.random() > 0.5;
      const angle = Math.random() * Math.PI * 2;
      const r = radius * (0.3 + Math.random() * 0.2);
      const height = isNorth ? radius * 0.9 : -radius * 0.9;

      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = height + (Math.random() - 0.5) * 0.2;
      positions[i * 3 + 2] = Math.sin(angle) * r;
    }

    return { positions, count };
  }, [radius]);

  useFrame((state) => {
    if (auroraRef.current) {
      auroraRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  if (!visible) return null;

  return (
    <points ref={auroraRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00ff88"
        size={0.05}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Anéis de Saturno melhorados
export function EnhancedSaturnRings({ radius }: { radius: number }) {
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.02;
    }
  });

  return (
    <group ref={ringsRef} rotation={[Math.PI / 2.5, 0, 0]}>
      {/* Anel A (exterior) */}
      <mesh>
        <ringGeometry args={[radius * 1.8, radius * 2.2, 64]} />
        <meshPhongMaterial
          color="#d4b896"
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
          emissive="#4a3a20"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Anel B (principal) */}
      <mesh>
        <ringGeometry args={[radius * 1.4, radius * 1.75, 64]} />
        <meshPhongMaterial
          color="#c8a86e"
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
          emissive="#5a4a30"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Anel C (interior, mais ténue) */}
      <mesh>
        <ringGeometry args={[radius * 1.2, radius * 1.38, 64]} />
        <meshPhongMaterial
          color="#a08850"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Divisão de Cassini (espaço entre anéis) */}
      <mesh>
        <ringGeometry args={[radius * 1.75, radius * 1.8, 64]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
