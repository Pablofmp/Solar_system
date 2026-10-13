// Sistema de luas principais do Sistema Solar
// Dados reais das luas mais importantes

export interface MoonData {
  id: string;
  name: string;
  namePT: string;
  parentPlanetId: string;
  diameter: number; // km
  distanceFromParent: number; // km
  orbitalPeriod: number; // dias
  color: string;
  description: string;
  visualRadius: number;
  visualOrbitRadius: number;
}

export const moons: MoonData[] = [
  // Lua da Terra
  {
    id: 'moon',
    name: 'Moon',
    namePT: 'Lua',
    parentPlanetId: 'earth',
    diameter: 3474,
    distanceFromParent: 384400,
    orbitalPeriod: 27.3,
    color: '#c8c8c8',
    description: 'O único satélite natural da Terra. A sua gravidade causa as marés.',
    visualRadius: 0.15,
    visualOrbitRadius: 1.5,
  },
  // Luas de Marte
  {
    id: 'phobos',
    name: 'Phobos',
    namePT: 'Fobos',
    parentPlanetId: 'mars',
    diameter: 22.2,
    distanceFromParent: 9376,
    orbitalPeriod: 0.319,
    color: '#8b7355',
    description: 'A maior lua de Marte. Está a aproximar-se do planeta e será destruída em ~50 milhões de anos.',
    visualRadius: 0.05,
    visualOrbitRadius: 0.8,
  },
  {
    id: 'deimos',
    name: 'Deimos',
    namePT: 'Deimos',
    parentPlanetId: 'mars',
    diameter: 12.4,
    distanceFromParent: 23460,
    orbitalPeriod: 1.263,
    color: '#a0886e',
    description: 'A menor lua de Marte. Tem uma órbita muito regular.',
    visualRadius: 0.04,
    visualOrbitRadius: 1.1,
  },
  // Luas Galileanas de Júpiter
  {
    id: 'io',
    name: 'Io',
    namePT: 'Io',
    parentPlanetId: 'jupiter',
    diameter: 3643,
    distanceFromParent: 421700,
    orbitalPeriod: 1.769,
    color: '#f4d03f',
    description: 'O corpo mais vulcanicamente ativo do Sistema Solar, com mais de 400 vulcões ativos.',
    visualRadius: 0.18,
    visualOrbitRadius: 3.0,
  },
  {
    id: 'europa',
    name: 'Europa',
    namePT: 'Europa',
    parentPlanetId: 'jupiter',
    diameter: 3122,
    distanceFromParent: 671034,
    orbitalPeriod: 3.551,
    color: '#d4c5a9',
    description: 'Tem um oceano subterrâneo de água líquida. Um dos melhores candidatos para vida extraterrestre.',
    visualRadius: 0.16,
    visualOrbitRadius: 3.8,
  },
  {
    id: 'ganymede',
    name: 'Ganymede',
    namePT: 'Ganimedes',
    parentPlanetId: 'jupiter',
    diameter: 5268,
    distanceFromParent: 1070412,
    orbitalPeriod: 7.155,
    color: '#a89f91',
    description: 'A maior lua do Sistema Solar, maior que Mercúrio. Tem campo magnético próprio.',
    visualRadius: 0.22,
    visualOrbitRadius: 4.6,
  },
  {
    id: 'callisto',
    name: 'Callisto',
    namePT: 'Calisto',
    parentPlanetId: 'jupiter',
    diameter: 4821,
    distanceFromParent: 1882709,
    orbitalPeriod: 16.689,
    color: '#6b5d4f',
    description: 'A superfície mais craterada do Sistema Solar. Pode ter um oceano subterrâneo.',
    visualRadius: 0.2,
    visualOrbitRadius: 5.5,
  },
  // Luas de Saturno
  {
    id: 'titan',
    name: 'Titan',
    namePT: 'Titã',
    parentPlanetId: 'saturn',
    diameter: 5150,
    distanceFromParent: 1221870,
    orbitalPeriod: 15.945,
    color: '#d4a574',
    description: 'A única lua com atmosfera densa. Tem lagos de metano líquido na superfície.',
    visualRadius: 0.22,
    visualOrbitRadius: 3.5,
  },
  {
    id: 'enceladus',
    name: 'Enceladus',
    namePT: 'Encélado',
    parentPlanetId: 'saturn',
    diameter: 504,
    distanceFromParent: 237948,
    orbitalPeriod: 1.37,
    color: '#f0f0f0',
    description: 'Tem gêiseres que ejectam água para o espaço, alimentando o anel E de Saturno.',
    visualRadius: 0.1,
    visualOrbitRadius: 2.8,
  },
  // Luas de Urano
  {
    id: 'titania',
    name: 'Titania',
    namePT: 'Titânia',
    parentPlanetId: 'uranus',
    diameter: 1578,
    distanceFromParent: 435910,
    orbitalPeriod: 8.706,
    color: '#b8b8b8',
    description: 'A maior lua de Urano. Tem cânions gigantescos na superfície.',
    visualRadius: 0.14,
    visualOrbitRadius: 2.5,
  },
  // Luas de Neptuno
  {
    id: 'triton',
    name: 'Triton',
    namePT: 'Tritão',
    parentPlanetId: 'neptune',
    diameter: 2707,
    distanceFromParent: 354759,
    orbitalPeriod: -5.877, // Órbita retrógrada!
    color: '#d4c5d4',
    description: 'Orbita na direção oposta (retrógrada). Provavelmente um objeto capturado da Cintura de Kuiper.',
    visualRadius: 0.16,
    visualOrbitRadius: 2.5,
  },
];
