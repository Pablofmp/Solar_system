// Calculadora de Viagens Espaciais
// Baseada em transferência de Hohmann e física orbital

import { planets, PlanetData, G, SOLAR_MASS, AU } from '../data/planets';

// Transferência de Hohmann - manobra orbital mais eficiente entre duas órbitas circulares
export interface HohmannTransfer {
  deltaV1: number; // km/s - primeira queima (injeção)
  deltaV2: number; // km/s - segunda queima (inserção)
  totalDeltaV: number; // km/s
  transferTime: number; // dias
  semiMajorAxisTransfer: number; // UA - semi-eixo maior da órbita de transferência
  perihelionVelocity: number; // km/s
  aphelionVelocity: number; // km/s
}

export function calculateHohmannTransfer(
  departure: PlanetData,
  arrival: PlanetData
): HohmannTransfer {
  const r1 = departure.distanceFromSun * 1e6; // km -> m
  const r2 = arrival.distanceFromSun * 1e6;
  
  const GM = G * SOLAR_MASS; // m³/s²
  
  // Semi-eixo maior da órbita de transferência
  const aTransfer = (r1 + r2) / 2;
  
  // Velocidades orbitais circulares
  const v1 = Math.sqrt(GM / r1); // velocidade na órbita de partida
  const v2 = Math.sqrt(GM / r2); // velocidade na órbita de chegada
  
  // Velocidades na órbita de transferência (vis-viva)
  const vTransfer1 = Math.sqrt(GM * (2 / r1 - 1 / aTransfer)); // no periélio
  const vTransfer2 = Math.sqrt(GM * (2 / r2 - 1 / aTransfer)); // no afélio
  
  // Delta-V necessário
  const deltaV1 = Math.abs(vTransfer1 - v1);
  const deltaV2 = Math.abs(v2 - vTransfer2);
  
  // Tempo de transferência (metade do período da órbita elíptica)
  const T = Math.PI * Math.sqrt(Math.pow(aTransfer, 3) / GM); // segundos
  const transferTimeDays = T / 86400;
  
  return {
    deltaV1: deltaV1 / 1000, // converter para km/s
    deltaV2: deltaV2 / 1000,
    totalDeltaV: (deltaV1 + deltaV2) / 1000,
    transferTime: transferTimeDays,
    semiMajorAxisTransfer: aTransfer / (AU * 1000), // UA
    perihelionVelocity: vTransfer1 / 1000,
    aphelionVelocity: vTransfer2 / 1000,
  };
}

// Calcular janela de lançamento (ângulo de fase)
export function calculateLaunchWindow(
  departure: PlanetData,
  arrival: PlanetData
): { phaseAngle: number; synodicPeriod: number } {
  // Períodos em dias
  const T1 = departure.orbitalPeriod;
  const T2 = arrival.orbitalPeriod;
  
  // Período sinódico
  const synodicPeriod = Math.abs(1 / (1 / T1 - 1 / T2));
  
  // Ângulo de fase necessário para transferência de Hohmann
  const aTransfer = (departure.distanceFromSun + arrival.distanceFromSun) / 2;
  const transferTime = Math.PI * Math.sqrt(
    Math.pow(aTransfer * 1e9, 3) / (G * SOLAR_MASS)
  ) / 86400; // dias
  
  // Ângulo que o planeta de chegada percorre durante a transferência
  const arrivalAngle = (360 * transferTime) / T2;
  
  // Ângulo de fase = 180° - ângulo de chegada
  const phaseAngle = 180 - arrivalAngle;
  
  return { phaseAngle, synodicPeriod };
}

// Comparar planetas lado a lado
export interface PlanetComparison {
  planet1: PlanetData;
  planet2: PlanetData;
  ratios: {
    diameter: number;
    mass: number;
    distance: number;
    period: number;
    gravity: number;
    temperature: number;
  };
}

export function comparePlanets(p1: PlanetData, p2: PlanetData): PlanetComparison {
  return {
    planet1: p1,
    planet2: p2,
    ratios: {
      diameter: p1.realDiameter / p2.realDiameter,
      mass: p1.realMass / p2.realMass,
      distance: p1.distanceFromSun / p2.distanceFromSun,
      period: p1.orbitalPeriod / p2.orbitalPeriod,
      gravity: p1.surfaceGravity / p2.surfaceGravity,
      temperature: (p1.meanTemperature + 273.15) / (p2.meanTemperature + 273.15),
    },
  };
}

// Missões espaciais históricas
export interface SpaceMission {
  id: string;
  name: string;
  agency: string;
  year: number;
  targetPlanetId: string;
  type: 'flyby' | 'orbiter' | 'lander' | 'rover' | 'sample_return';
  status: 'success' | 'partial' | 'failed' | 'ongoing';
  description: string;
  travelTimeDays: number;
  distanceTraveled: number; // milhões de km
}

export const spaceMissions: SpaceMission[] = [
  {
    id: 'voyager1',
    name: 'Voyager 1',
    agency: 'NASA',
    year: 1977,
    targetPlanetId: 'jupiter',
    type: 'flyby',
    status: 'ongoing',
    description: 'A sonda mais distante da Terra. Ultrapassou a heliosfera em 2012.',
    travelTimeDays: 688,
    distanceTraveled: 23800,
  },
  {
    id: 'voyager2',
    name: 'Voyager 2',
    agency: 'NASA',
    year: 1977,
    targetPlanetId: 'neptune',
    type: 'flyby',
    status: 'ongoing',
    description: 'Única sonda a visitar Urano e Neptuno. Também ultrapassou a heliosfera.',
    travelTimeDays: 4950,
    distanceTraveled: 4495,
  },
  {
    id: 'cassini',
    name: 'Cassini-Huygens',
    agency: 'NASA/ESA',
    year: 1997,
    targetPlanetId: 'saturn',
    type: 'orbiter',
    status: 'success',
    description: 'Orbitou Saturno por 13 anos. A sonda Huygens pousou em Titã.',
    travelTimeDays: 2524,
    distanceTraveled: 3545,
  },
  {
    id: 'curiosity',
    name: 'Curiosity (MSL)',
    agency: 'NASA',
    year: 2011,
    targetPlanetId: 'mars',
    type: 'rover',
    status: 'ongoing',
    description: 'Rover que explora a cratera Gale. Descobriu moléculas orgânicas.',
    travelTimeDays: 253,
    distanceTraveled: 228,
  },
  {
    id: 'perseverance',
    name: 'Perseverance',
    agency: 'NASA',
    year: 2020,
    targetPlanetId: 'mars',
    type: 'rover',
    status: 'ongoing',
    description: 'Rover com helicóptero Ingenuity. Procura sinais de vida antiga.',
    travelTimeDays: 203,
    distanceTraveled: 228,
  },
  {
    id: 'junoo',
    name: 'Juno',
    agency: 'NASA',
    year: 2011,
    targetPlanetId: 'jupiter',
    type: 'orbiter',
    status: 'ongoing',
    description: 'Estuda a atmosfera, campo magnético e interior de Júpiter.',
    travelTimeDays: 1882,
    distanceTraveled: 778,
  },
  {
    id: 'newhorizons',
    name: 'New Horizons',
    agency: 'NASA',
    year: 2006,
    targetPlanetId: 'neptune',
    type: 'flyby',
    status: 'ongoing',
    description: 'Primeira missão a Plutão (2015). Agora explora a Cintura de Kuiper.',
    travelTimeDays: 3462,
    distanceTraveled: 7500,
  },
  {
    id: 'messenger',
    name: 'MESSENGER',
    agency: 'NASA',
    year: 2004,
    targetPlanetId: 'mercury',
    type: 'orbiter',
    status: 'success',
    description: 'Primeira sonda a orbitar Mercúrio. Mapeou toda a superfície.',
    travelTimeDays: 2406,
    distanceTraveled: 7900,
  },
  {
    id: 'galileo',
    name: 'Galileo',
    agency: 'NASA',
    year: 1989,
    targetPlanetId: 'jupiter',
    type: 'orbiter',
    status: 'success',
    description: 'Orbitou Júpiter por 8 anos. Descobriu oceano subterrâneo em Europa.',
    travelTimeDays: 2191,
    distanceTraveled: 778,
  },
  {
    id: 'magellan',
    name: 'Magellan',
    agency: 'NASA',
    year: 1989,
    targetPlanetId: 'venus',
    type: 'orbiter',
    status: 'success',
    description: 'Mapeou 98% da superfície de Vénus usando radar.',
    travelTimeDays: 516,
    distanceTraveled: 108,
  },
];
