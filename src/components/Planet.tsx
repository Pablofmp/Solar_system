import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PlanetData } from '../data/planets';
import { calculatePositionWithPrecession, degToRad } from '../physics/orbitalMechanics';
import { Atmosphere, Auroras, EnhancedSaturnRings } from './Atmosphere';

interface PlanetProps {
  planet: PlanetData;
  time: number;
  isSelected: boolean;
  onClick: () => void;
  showOrbit: boolean;
  showLabels: boolean;
}

// Criar órbita elíptica como uma curva 3D
function createOrbitLine(planet: PlanetData, segments: number = 256): THREE.Line {
  const points: THREE.Vector3[] = [];
  const a = planet.visualOrbitRadius;
  const e = planet.eccentricity;
  const i = degToRad(planet.orbitalInclination);

  for (let j = 0; j <= segments; j++) {
    const theta = (j / segments) * Math.PI * 2;
    const r = a * (1 - e * e) / (1 + e * Math.cos(theta));
    
    const x = r * Math.cos(theta);
    const yOrbital = r * Math.sin(theta);
    const y = yOrbital * Math.cos(i);
    const z = yOrbital * Math.sin(i);
    
    points.push(new THREE.Vector3(x, z, y)); // Swap Y/Z for Three.js
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: planet.color,
    transparent: true,
    opacity: 0.2,
  });
  
  return new THREE.Line(geometry, material);
}

// Criar textura de label
function createLabelTexture(text: string): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, 256, 64);
  ctx.font = 'bold 26px Arial, sans-serif';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 128, 32);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Componente dos anéis de Saturno
function SaturnRings({ radius }: { radius: number }) {
  return (
    <group rotation={[Math.PI / 2.5, 0, 0]}>
      {/* Anel principal */}
      <mesh>
        <ringGeometry args={[radius * 1.4, radius * 2.0, 64]} />
        <meshPhongMaterial
          color="#c8a86e"
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
          emissive="#4a3a20"
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* Anel exterior */}
      <mesh>
        <ringGeometry args={[radius * 2.1, radius * 2.5, 64]} />
        <meshPhongMaterial
          color="#a08850"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export function Planet({ planet, time, isSelected, onClick, showOrbit, showLabels }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const orbitLineRef = useRef<THREE.Line | null>(null);
  const [hovered, setHovered] = useState(false);
  const labelTexture = useMemo(() => createLabelTexture(planet.namePT), [planet.namePT]);

  // Criar linha da órbita uma vez
  const orbitLine = useMemo(() => {
    const line = createOrbitLine(planet);
    orbitLineRef.current = line;
    return line;
  }, [planet]);

  // Atualizar opacidade da órbita quando selecionado
  useEffect(() => {
    if (orbitLineRef.current) {
      const mat = orbitLineRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = isSelected ? 0.7 : 0.2;
      mat.needsUpdate = true;
    }
  }, [isSelected]);

  useFrame(() => {
    if (!groupRef.current) return;

    // Calcular posição com precessão relativística
    const pos = calculatePositionWithPrecession(planet, time);
    
    // Aplicar posição (swap Y/Z para Three.js coordinate system)
    groupRef.current.position.set(pos.x, pos.z, pos.y);

    // Rotação própria do planeta
    if (meshRef.current) {
      const rotSpeed = planet.rotationPeriod !== 0 ? 1 / Math.abs(planet.rotationPeriod) : 0;
      const direction = planet.rotationPeriod < 0 ? -1 : 1;
      meshRef.current.rotation.y += rotSpeed * direction * 0.02;
    }
  });

  // Material do planeta
  const planetMaterial = useMemo(() => {
    return new THREE.MeshPhongMaterial({
      color: planet.color,
      emissive: planet.emissiveColor,
      emissiveIntensity: 0.15,
      shininess: 20,
      specular: new THREE.Color('#444444'),
    });
  }, [planet]);

  const visualSize = planet.visualRadius;

  return (
    <>
      {/* Linha da órbita */}
      {showOrbit && <primitive object={orbitLine} />}

      {/* Grupo do planeta */}
      <group ref={groupRef}>
        {/* Esfera do planeta */}
        <mesh
          ref={meshRef}
          material={planetMaterial}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = 'auto';
          }}
        >
          <sphereGeometry args={[visualSize, 32, 32]} />
        </mesh>

        {/* Atmosfera da Terra */}
        {planet.id === 'earth' && (
          <>
            <Atmosphere radius={visualSize} color="#4da6ff" opacity={0.4} />
            <Auroras radius={visualSize} visible={true} />
          </>
        )}

        {/* Atmosfera de Vénus */}
        {planet.id === 'venus' && (
          <Atmosphere radius={visualSize} color="#e8cda0" opacity={0.5} />
        )}

        {/* Atmosfera de Titã (se fosse um planeta) */}
        {planet.id === 'jupiter' && (
          <Atmosphere radius={visualSize} color="#d4a574" opacity={0.2} />
        )}

        {/* Anéis de Saturno melhorados */}
        {planet.id === 'saturn' && <EnhancedSaturnRings radius={visualSize} />}

        {/* Anéis de Urano (verticais) */}
        {planet.id === 'uranus' && (
          <group rotation={[0, 0, Math.PI / 2.2]}>
            <mesh>
              <ringGeometry args={[visualSize * 1.5, visualSize * 1.8, 32]} />
              <meshBasicMaterial color="#7de8e8" transparent opacity={0.3} side={THREE.DoubleSide} />
            </mesh>
          </group>
        )}

        {/* Indicador de seleção/hover */}
        {(isSelected || hovered) && (
          <mesh>
            <sphereGeometry args={[visualSize * 1.4, 16, 16]} />
            <meshBasicMaterial
              color={planet.color}
              transparent
              opacity={0.12}
              wireframe
            />
          </mesh>
        )}

        {/* Label do planeta */}
        {showLabels && (
          <sprite position={[0, visualSize + 1.0, 0]} scale={[3.5, 0.9, 1]}>
            <spriteMaterial
              map={labelTexture}
              transparent
              opacity={isSelected || hovered ? 1 : 0.6}
              depthTest={false}
            />
          </sprite>
        )}
      </group>
    </>
  );
}
