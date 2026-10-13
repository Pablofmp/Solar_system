// Texturas procedurais para planetas usando shaders
// Cada planeta tem características visuais únicas baseadas em dados reais

export const planetShaders = {
  // Júpiter - bandas horizontais e Grande Mancha Vermelha
  jupiter: {
    uniforms: {
      time: { value: 0 },
      color1: { value: '#d4a574' },
      color2: { value: '#8b6f47' },
      color3: { value: '#f4d59c' },
      spotColor: { value: '#cc4422' },
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
      uniform vec3 spotColor;
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
      
      void main() {
        // Bandas horizontais
        float bands = sin(vUv.y * 30.0 + noise(vUv * 5.0) * 2.0) * 0.5 + 0.5;
        float turbulence = noise(vUv * vec2(20.0, 5.0) + time * 0.05);
        
        vec3 color = mix(color1, color2, bands);
        color = mix(color, color3, turbulence * 0.3);
        
        // Grande Mancha Vermelha
        vec2 spotCenter = vec2(0.6, 0.55);
        float spotDist = distance(vUv, spotCenter);
        float spot = smoothstep(0.12, 0.08, spotDist);
        color = mix(color, spotColor, spot * 0.7);
        
        // Limb darkening
        float rim = 1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0));
        color *= 1.0 - rim * 0.3;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  },

  // Terra - continentes, oceanos e nuvens
  earth: {
    uniforms: {
      time: { value: 0 },
      oceanColor: { value: '#1a4d80' },
      landColor: { value: '#2d5a3d' },
      desertColor: { value: '#8b7355' },
      iceColor: { value: '#e8f4f8' },
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
      uniform vec3 oceanColor;
      uniform vec3 landColor;
      uniform vec3 desertColor;
      uniform vec3 iceColor;
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
        for (int i = 0; i < 5; i++) {
          value += amplitude * noise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }
      
      void main() {
        // Continentes
        float continent = fbm(vUv * 8.0 + vec2(1.5, 0.8));
        float landMask = smoothstep(0.48, 0.52, continent);
        
        // Desertos (perto do equador)
        float desertMask = smoothstep(0.3, 0.4, abs(vUv.y - 0.5)) * landMask;
        
        // Calotas polares
        float polarMask = smoothstep(0.15, 0.05, vUv.y) + smoothstep(0.85, 0.95, vUv.y);
        
        vec3 color = oceanColor;
        color = mix(color, landColor, landMask);
        color = mix(color, desertColor, desertMask * 0.6);
        color = mix(color, iceColor, polarMask);
        
        // Nuvens (camada superior)
        float clouds = fbm(vUv * 12.0 + time * 0.02);
        clouds = smoothstep(0.55, 0.7, clouds);
        color = mix(color, vec3(1.0), clouds * 0.4);
        
        // Atmosfera (borda azul)
        float rim = 1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0));
        color = mix(color, vec3(0.3, 0.5, 1.0), pow(rim, 3.0) * 0.5);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  },

  // Marte - superfície vermelha com crateras e calotas polares
  mars: {
    uniforms: {
      time: { value: 0 },
      baseColor: { value: '#c1440e' },
      darkColor: { value: '#8b3a1f' },
      lightColor: { value: '#e07040' },
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
      uniform vec3 baseColor;
      uniform vec3 darkColor;
      uniform vec3 lightColor;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
      }
      
      void main() {
        float n = noise(vUv * 15.0);
        float detail = noise(vUv * 40.0);
        
        vec3 color = mix(baseColor, darkColor, n);
        color = mix(color, lightColor, detail * 0.3);
        
        // Calotas polares
        float polar = smoothstep(0.12, 0.05, vUv.y) + smoothstep(0.88, 0.95, vUv.y);
        color = mix(color, vec3(0.95, 0.95, 0.98), polar * 0.7);
        
        // Olympus Mons (mancha escura)
        float olympus = smoothstep(0.08, 0.0, distance(vUv, vec2(0.35, 0.45)));
        color = mix(color, darkColor * 0.8, olympus * 0.5);
        
        // Limb darkening
        float rim = 1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0));
        color *= 1.0 - rim * 0.4;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  },

  // Saturno - bandas suaves
  saturn: {
    uniforms: {
      time: { value: 0 },
      color1: { value: '#f4d59c' },
      color2: { value: '#c8a86e' },
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
      varying vec2 vUv;
      varying vec3 vNormal;
      
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      
      void main() {
        float bands = sin(vUv.y * 25.0 + hash(floor(vUv * 10.0)) * 0.5) * 0.5 + 0.5;
        vec3 color = mix(color1, color2, bands);
        
        float rim = 1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0));
        color *= 1.0 - rim * 0.3;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  },
};
