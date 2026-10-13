import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Sol simplificado e elegante - sem efeitos "Tesla"
export function Sun({ onClick }: { onClick?: () => void }) {
  const sunRef = useRef<THREE.Mesh>(null);

  // Shader limpo e natural para a superfície do Sol
  const sunMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#FDB813') },
        color2: { value: new THREE.Color('#FF8C00') },
        color3: { value: new THREE.Color('#FF6B00') },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
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
          for (int i = 0; i < 4; i++) {
            value += amplitude * noise(p);
            p *= 2.0;
            amplitude *= 0.5;
          }
          return value;
        }
        
        void main() {
          vec2 uv = vUv * 3.0;
          float n = fbm(uv + time * 0.08);
          
          vec3 color = mix(color1, color2, n);
          color = mix(color, color3, n * 0.2);
          
          // Limb darkening suave
          float rim = 1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0));
          color = mix(color, color3 * 0.7, rim * rim * 0.3);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    sunMaterial.uniforms.time.value = time;
    
    if (sunRef.current) {
      sunRef.current.rotation.y = time * 0.03;
    }
  });

  return (
    <group>
      {/* Sol principal */}
      <mesh ref={sunRef} material={sunMaterial} onClick={onClick}>
        <sphereGeometry args={[3, 64, 64]} />
      </mesh>

      {/* Glow suave e natural */}
      <mesh>
        <sphereGeometry args={[3.3, 32, 32]} />
        <meshBasicMaterial
          color="#FF8C00"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Luz do Sol */}
      <pointLight
        color="#FFF5E0"
        intensity={2.5}
        distance={200}
        decay={0.5}
      />
    </group>
  );
}
