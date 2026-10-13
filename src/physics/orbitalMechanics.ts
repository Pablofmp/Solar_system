// Motor de física do Sistema Solar
// Implementa as Leis de Kepler, Mecânica Newtoniana e efeitos da Relatividade Geral

import { PlanetData, C, G, SOLAR_MASS, AU } from '../data/planets';

// Converter graus para radianos
export const degToRad = (deg: number): number => (deg * Math.PI) / 180;

// Resolver a Equação de Kepler: M = E - e*sin(E)
// Usa o método de Newton-Raphson para encontrar E (anomalia excêntrica)
export function solveKeplerEquation(
  meanAnomaly: number, // M - anomalia média (radianos)
  eccentricity: number, // e - excentricidade
  tolerance: number = 1e-8,
  maxIterations: number = 100
): number {
  // Estimativa inicial
  let E = meanAnomaly;
  
  for (let i = 0; i < maxIterations; i++) {
    // Método de Newton-Raphson
    const dE = (E - eccentricity * Math.sin(E) - meanAnomaly) / (1 - eccentricity * Math.cos(E));
    E -= dE;
    if (Math.abs(dE) < tolerance) break;
  }
  
  return E;
}

// Converter anomalia excêntrica (E) em anomalia verdadeira (ν)
// ν = 2 * atan2(sqrt(1+e) * sin(E/2), sqrt(1-e) * cos(E/2))
export function eccentricToTrueAnomaly(E: number, e: number): number {
  return 2 * Math.atan2(
    Math.sqrt(1 + e) * Math.sin(E / 2),
    Math.sqrt(1 - e) * Math.cos(E / 2)
  );
}

// Calcular a distância radial do foco (Sol) ao planeta
// r = a(1 - e²) / (1 + e*cos(ν))
export function orbitalRadius(semiMajorAxis: number, e: number, trueAnomaly: number): number {
  const p = semiMajorAxis * (1 - e * e); // semi-latus rectum
  return p / (1 + e * Math.cos(trueAnomaly));
}

// Calcular posição 3D do planeta na órbita
export function calculateOrbitalPosition(
  planet: PlanetData,
  time: number, // tempo em dias
  scale: number = 1
): { x: number; y: number; z: number; r: number; trueAnomaly: number } {
  const a = planet.visualOrbitRadius * scale; // semi-eixo maior visual
  const e = planet.eccentricity;
  const T = planet.orbitalPeriod; // período orbital em dias
  
  // Inclinação orbital convertida para radianos
  const i = degToRad(planet.orbitalInclination);
  
  // Anomalia média: M = 2π * t / T
  const M = (2 * Math.PI * time) / T;
  
  // Resolver equação de Kepler para obter anomalia excêntrica
  const E = solveKeplerEquation(M, e);
  
  // Converter para anomalia verdadeira
  const nu = eccentricToTrueAnomaly(E, e);
  
  // Distância radial
  const r = orbitalRadius(a, e, nu);
  
  // Posição no plano orbital
  const xOrbital = r * Math.cos(nu);
  const yOrbital = r * Math.sin(nu);
  
  // Aplicar inclinação orbital (rotação em torno do eixo X)
  const x = xOrbital;
  const y = yOrbital * Math.cos(i);
  const z = yOrbital * Math.sin(i);
  
  return { x, y, z, r, trueAnomaly: nu };
}

// Precessão relativística do periélio (efeito da Relatividade Geral)
// Δω = 6πGM / (a(1-e²)c²) por órbita
// Para Mercúrio: ~43 arcsegundos/século
export function relativisticPrecession(
  planet: PlanetData,
  time: number // dias
): number {
  // Usar o valor observado diretamente (arcsegundos/século)
  const precessionPerCentury = planet.perihelionPrecession;
  
  // Converter para radianos/dia
  const arcsecPerDay = precessionPerCentury / (365.25 * 100);
  const radPerDay = degToRad(arcsecPerDay / 3600);
  
  return radPerDay * time;
}

// Aplicar precessão à posição orbital
export function calculatePositionWithPrecession(
  planet: PlanetData,
  time: number,
  scale: number = 1
): { x: number; y: number; z: number; r: number; trueAnomaly: number } {
  const pos = calculateOrbitalPosition(planet, time, scale);
  
  // Aplicar precessão do periélio (rotação do argumento do periélio)
  const omega = relativisticPrecession(planet, time);
  
  // Rotacionar a posição em torno do eixo Z (precessão no plano orbital)
  const cosOmega = Math.cos(omega);
  const sinOmega = Math.sin(omega);
  
  const xPrecessed = pos.x * cosOmega - pos.y * sinOmega;
  const yPrecessed = pos.x * sinOmega + pos.y * cosOmega;
  
  return {
    x: xPrecessed,
    y: yPrecessed,
    z: pos.z,
    r: pos.r,
    trueAnomaly: pos.trueAnomaly,
  };
}

// Velocidade orbital (2ª Lei de Kepler - conservação do momento angular)
// v = sqrt(GM * (2/r - 1/a))
export function orbitalVelocity(r: number, semiMajorAxis: number): number {
  const GM = G * SOLAR_MASS; // m³/s²
  const rMeters = r * 1000; // converter km para m
  const aMeters = semiMajorAxis * 1000;
  
  const vSquared = GM * (2 / rMeters - 1 / aMeters);
  return Math.sqrt(Math.max(0, vSquared)) / 1000; // converter para km/s
}

// Dilatação temporal gravitacional (Relatividade Geral)
// τ = t * sqrt(1 - 2GM/(rc²))
// Retorna o fator de dilatação (quanto o tempo passa mais devagar)
export function gravitationalTimeDilation(r_km: number): number {
  const r = r_km * 1000; // metros
  const GM = G * SOLAR_MASS;
  const factor = 1 - (2 * GM) / (r * C * C);
  return Math.sqrt(Math.max(0, factor));
}

// Deflexão da luz pelo Sol (lente gravitacional)
// θ = 4GM / (rc²) radianos
export function lightDeflection(impactParameter_km: number): number {
  const b = impactParameter_km * 1000; // metros
  const GM = G * SOLAR_MASS;
  return (4 * GM) / (b * C * C);
}

// Energia orbital específica
// ε = -GM / (2a)
export function specificOrbitalEnergy(semiMajorAxis_km: number): number {
  const a = semiMajorAxis_km * 1000; // metros
  const GM = G * SOLAR_MASS;
  return -GM / (2 * a);
}

// Calcular a velocidade de escape do Sol a uma distância r
export function escapeVelocityFromSun(r_km: number): number {
  const r = r_km * 1000;
  const GM = G * SOLAR_MASS;
  return Math.sqrt(2 * GM / r) / 1000; // km/s
}

// 3ª Lei de Kepler: T² = (4π²/GM) * a³
// Verificar consistência dos dados
export function verifyKeplerThirdLaw(planet: PlanetData): { theoretical: number; actual: number; error: number } {
  const a = planet.distanceFromSun * 1e9; // metros
  const GM = G * SOLAR_MASS;
  
  // Período teórico em segundos
  const T_theoretical = Math.sqrt((4 * Math.PI * Math.PI * a * a * a) / GM);
  const T_theoretical_days = T_theoretical / 86400;
  
  return {
    theoretical: T_theoretical_days,
    actual: planet.orbitalPeriod,
    error: Math.abs(T_theoretical_days - planet.orbitalPeriod) / planet.orbitalPeriod * 100,
  };
}

// Calcular força gravitacional entre o Sol e um planeta
export function gravitationalForce(planet: PlanetData, r_km: number): number {
  const r = r_km * 1000;
  const m = planet.realMass * 1e24; // kg
  const F = (G * SOLAR_MASS * m) / (r * r);
  return F; // Newtons
}

// Raio de Schwarzschild do Sol
// rs = 2GM/c²
export function schwarzschildRadius(): number {
  return (2 * G * SOLAR_MASS) / (C * C); // metros
}
