import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Componente do Sol com efeitos de lente gravitacional e corona
export function Sun({ onClick }: { onClick?: () => void }) {
  const sunRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Shader para a superfície do Sol (turbulência)
  const sunMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#FDB813') },
        color2: { value: new THREE.Color('#FF6600') },
        color3: { value: new THREE.Color('#FF2200') },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        // Simplex noise simplificado
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }
        
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
        }
        
        float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < 5; i++) {
            value += amplitude * noise(p);
            p *= 2.0;
            amplitude *= 0.5;
          }
          return value;
        }
        
        void main() {
          vec2 uv = vUv * 4.0;
          float n = fbm(uv + time * 0.1);
          float n2 = fbm(uv * 2.0 - time * 0.15);
          
          vec3 color = mix(color1, color2, n);
          color = mix(color, color3, n2 * 0.3);
          
          // Efeito de limb darkening
          float rim = 1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0));
          color = mix(color, color3 * 0.5, rim * rim * 0.5);
          
          // Brilho
          float brightness = 1.0 + n * 0.3;
          gl_FragColor = vec4(color * brightness, 1.0);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    sunMaterial.uniforms.time.value = time;
    
    if (sunRef.current) {
      sunRef.current.rotation.y = time * 0.05;
    }
    
    // Pulsação da corona
    if (coronaRef.current) {
      const scale = 1.0 + Math.sin(time * 0.5) * 0.02;
      coronaRef.current.scale.setScalar(scale);
    }
    
    if (glowRef.current) {
      const glowScale = 1.0 + Math.sin(time * 0.3) * 0.05;
      glowRef.current.scale.setScalar(glowScale);
    }
  });

  return (
    <group>
      {/* Sol principal */}
      <mesh ref={sunRef} material={sunMaterial} onClick={onClick}>
        <sphereGeometry args={[3, 64, 64]} />
      </mesh>

      {/* Corona solar */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshBasicMaterial
          color="#FF8800"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Brilho exterior */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[4.5, 32, 32]} />
        <meshBasicMaterial
          color="#FF4400"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Efeito de lente gravitacional (distorção visual) */}
      <mesh>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial
          color="#FFaa00"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Luz pontual do Sol */}
      <pointLight
        color="#FFF5E0"
        intensity={3}
        distance={200}
        decay={0.5}
      />
      <pointLight
        color="#FF8800"
        intensity={1.5}
        distance={100}
        decay={1}
      />
    </group>
  );
}
