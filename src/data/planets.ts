// Dados astronômicos reais dos planetas do Sistema Solar
// Baseado em dados da NASA e IAU

export interface PlanetData {
  id: string;
  name: string;
  namePT: string;
  // Propriedades físicas reais
  realDiameter: number; // km
  realMass: number; // kg (x10^24)
  distanceFromSun: number; // milhões de km (semi-eixo maior)
  eccentricity: number; // excentricidade orbital (0 = círculo, 1 = parábola)
  orbitalPeriod: number; // dias terrestres
  orbitalInclination: number; // graus em relação à eclíptica
  axialTilt: number; // graus
  rotationPeriod: number; // horas (dia sideral)
  // Propriedades visuais
  color: string;
  emissiveColor: string;
  description: string;
  funFact: string;
  // Dados para física
  perihelionPrecession: number; // arcsegundos/século (precessão relativística)
  gravitationalParameter: number; // km³/s²
  escapeVelocity: number; // km/s
  surfaceGravity: number; // m/s²
  meanTemperature: number; // °C
  numberOfMoons: number;
  ringSystem: boolean;
  // Escala visual (ajustada para visualização)
  visualRadius: number;
  visualOrbitRadius: number;
}

// Constantes físicas
export const G = 6.674e-11; // Constante gravitacional (m³/kg·s²)
export const C = 299792458; // Velocidade da luz (m/s)
export const SOLAR_MASS = 1.989e30; // kg
export const AU = 149597870.7; // km (unidade astronômica)

export const SUN_DATA = {
  name: 'Sol',
  namePT: 'Sol',
  realDiameter: 1392700, // km
  realMass: 1.989e30, // kg
  surfaceTemperature: 5778, // K
  color: '#FDB813',
  emissiveColor: '#FF6600',
  luminosity: 3.828e26, // Watts
  description: 'A nossa estrela, uma anã amarela de tipo G2V que contém 99.86% de toda a massa do Sistema Solar.',
  funFact: 'A luz do Sol demora cerca de 8 minutos e 20 segundos a chegar à Terra.',
};

export const planets: PlanetData[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    namePT: 'Mercúrio',
    realDiameter: 4879,
    realMass: 0.330,
    distanceFromSun: 57.9,
    eccentricity: 0.2056, // Maior excentricidade entre os planetas
    orbitalPeriod: 87.97,
    orbitalInclination: 7.0,
    axialTilt: 0.034,
    rotationPeriod: 1407.6,
    color: '#8c7e6d',
    emissiveColor: '#3d3530',
    description: 'O menor planeta e o mais próximo do Sol. A sua superfície é semelhante à da Lua, coberta de crateras.',
    funFact: 'Mercúrio tem a maior precessão relativística do periélio: 43 arcsegundos/século, previsto por Einstein.',
    perihelionPrecession: 42.98, // arcsegundos/século (excesso relativístico)
    gravitationalParameter: 22032,
    escapeVelocity: 4.3,
    surfaceGravity: 3.7,
    meanTemperature: 167,
    numberOfMoons: 0,
    ringSystem: false,
    visualRadius: 0.3,
    visualOrbitRadius: 8,
  },
  {
    id: 'venus',
    name: 'Venus',
    namePT: 'Vénus',
    realDiameter: 12104,
    realMass: 4.867,
    distanceFromSun: 108.2,
    eccentricity: 0.0068, // Órbita quase circular
    orbitalPeriod: 224.7,
    orbitalInclination: 3.39,
    axialTilt: 177.4, // Rotação retrógrada!
    rotationPeriod: -5832.5, // Negativo = retrógrada
    color: '#e8cda0',
    emissiveColor: '#6b5a3a',
    description: 'O planeta mais quente devido ao efeito de estufa extremo. A sua atmosfera é 96% CO₂.',
    funFact: 'Vénus gira ao contrário dos outros planetas (rotação retrógrada) e um dia venusiano é mais longo que o seu ano.',
    perihelionPrecession: 8.62,
    gravitationalParameter: 324859,
    escapeVelocity: 10.36,
    surfaceGravity: 8.87,
    meanTemperature: 464,
    numberOfMoons: 0,
    ringSystem: false,
    visualRadius: 0.6,
    visualOrbitRadius: 12,
  },
  {
    id: 'earth',
    name: 'Earth',
    namePT: 'Terra',
    realDiameter: 12756,
    realMass: 5.972,
    distanceFromSun: 149.6,
    eccentricity: 0.0167,
    orbitalPeriod: 365.25,
    orbitalInclination: 0.0, // Referência
    axialTilt: 23.44,
    rotationPeriod: 23.93,
    color: '#4da6ff',
    emissiveColor: '#1a4d80',
    description: 'O nosso lar! O único planeta conhecido com vida, água líquida e uma atmosfera rica em oxigénio.',
    funFact: 'A Terra é o único planeta cujo nome não deriva da mitologia greco-romana.',
    perihelionPrecession: 3.84,
    gravitationalParameter: 398600,
    escapeVelocity: 11.19,
    surfaceGravity: 9.81,
    meanTemperature: 15,
    numberOfMoons: 1,
    ringSystem: false,
    visualRadius: 0.65,
    visualOrbitRadius: 16,
  },
  {
    id: 'mars',
    name: 'Mars',
    namePT: 'Marte',
    realDiameter: 6792,
    realMass: 0.642,
    distanceFromSun: 227.9,
    eccentricity: 0.0934,
    orbitalPeriod: 687.0,
    orbitalInclination: 1.85,
    axialTilt: 25.19,
    rotationPeriod: 24.62,
    color: '#e07040',
    emissiveColor: '#6b3020',
    description: 'O planeta vermelho, com o maior vulcão do sistema solar (Olympus Mons, 21.9 km) e um sistema de cânions gigantes.',
    funFact: 'Marte tem as estações do ano mais semelhantes às da Terra devido à sua inclinação axial similar.',
    perihelionPrecession: 1.36,
    gravitationalParameter: 42828,
    escapeVelocity: 5.03,
    surfaceGravity: 3.72,
    meanTemperature: -65,
    numberOfMoons: 2,
    ringSystem: false,
    visualRadius: 0.45,
    visualOrbitRadius: 21,
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    namePT: 'Júpiter',
    realDiameter: 142984,
    realMass: 1898,
    distanceFromSun: 778.6,
    eccentricity: 0.0489,
    orbitalPeriod: 4332.59,
    orbitalInclination: 1.31,
    axialTilt: 3.13,
    rotationPeriod: 9.93, // O dia mais curto!
    color: '#d4a574',
    emissiveColor: '#5a4030',
    description: 'O maior planeta, uma gigante gasosa com massa 318× a da Terra. A Grande Mancha Vermelha é uma tempestade maior que a Terra.',
    funFact: 'Júpiter tem o dia mais curto de todos os planetas (9h55m) e mais de 90 luas conhecidas.',
    perihelionPrecession: 0.06,
    gravitationalParameter: 126686534,
    escapeVelocity: 59.5,
    surfaceGravity: 24.79,
    meanTemperature: -110,
    numberOfMoons: 95,
    ringSystem: true, // Anéis muito ténues
    visualRadius: 2.0,
    visualOrbitRadius: 32,
  },
  {
    id: 'saturn',
    name: 'Saturn',
    namePT: 'Saturno',
    realDiameter: 120536,
    realMass: 568.3,
    distanceFromSun: 1433.5,
    eccentricity: 0.0565,
    orbitalPeriod: 10759.22,
    orbitalInclination: 2.49,
    axialTilt: 26.73,
    rotationPeriod: 10.66,
    color: '#f4d59c',
    emissiveColor: '#7a6a4e',
    description: 'Famoso pelos seus magníficos anéis compostos de partículas de gelo e rocha, com extensão de 282.000 km mas apenas 10m de espessura.',
    funFact: 'Saturno é tão pouco denso (0.687 g/cm³) que flutuaria na água se existisse um oceano suficientemente grande!',
    perihelionPrecession: 0.01,
    gravitationalParameter: 37939592,
    escapeVelocity: 35.5,
    surfaceGravity: 10.44,
    meanTemperature: -140,
    numberOfMoons: 146,
    ringSystem: true,
    visualRadius: 1.7,
    visualOrbitRadius: 42,
  },
  {
    id: 'uranus',
    name: 'Uranus',
    namePT: 'Urano',
    realDiameter: 51118,
    realMass: 86.81,
    distanceFromSun: 2872.5,
    eccentricity: 0.0457,
    orbitalPeriod: 30688.5,
    orbitalInclination: 0.77,
    axialTilt: 97.77, // Quase de lado!
    rotationPeriod: -17.24, // Retrógrada
    color: '#7de8e8',
    emissiveColor: '#2a6060',
    description: 'Um gigante de gelo que gira praticamente de lado. A sua inclinação axial de 97.77° faz com que as estações durem 21 anos.',
    funFact: 'Urano foi o primeiro planeta descoberto com telescópio, por William Herschel em 1781.',
    perihelionPrecession: 0.002,
    gravitationalParameter: 5793951,
    escapeVelocity: 21.3,
    surfaceGravity: 8.87,
    meanTemperature: -195,
    numberOfMoons: 28,
    ringSystem: true,
    visualRadius: 1.1,
    visualOrbitRadius: 52,
  },
  {
    id: 'neptune',
    name: 'Neptune',
    namePT: 'Neptuno',
    realDiameter: 49528,
    realMass: 102.4,
    distanceFromSun: 4495.1,
    eccentricity: 0.0113,
    orbitalPeriod: 60182.0,
    orbitalInclination: 1.77,
    axialTilt: 28.32,
    rotationPeriod: 16.11,
    color: '#4466ff',
    emissiveColor: '#1a2a6b',
    description: 'O planeta mais distante, com os ventos mais fortes do sistema solar (até 2100 km/h). Foi previsto matematicamente antes de ser observado.',
    funFact: 'Neptuno foi descoberto em 1846 após ser previsto matematicamente por Urbain Le Verrier, confirmando a lei da gravitação universal.',
    perihelionPrecession: 0.0006,
    gravitationalParameter: 6836529,
    escapeVelocity: 23.5,
    surfaceGravity: 11.15,
    meanTemperature: -200,
    numberOfMoons: 16,
    ringSystem: true,
    visualRadius: 1.05,
    visualOrbitRadius: 60,
  },
  {
    id: 'pluto',
    name: 'Pluto',
    namePT: 'Plutão',
    realDiameter: 2377,
    realMass: 0.01303,
    distanceFromSun: 5906.4,
    eccentricity: 0.2488,
    orbitalPeriod: 90560,
    orbitalInclination: 17.16,
    axialTilt: 122.53,
    rotationPeriod: -153.3,
    color: '#c8b8a8',
    emissiveColor: '#5a5048',
    description: 'Planeta anão na Cintura de Kuiper. Tem uma lua grande, Caronte, e um coração de gelo nitrogenado.',
    funFact: 'Plutão foi reclassificado como planeta anão em 2006. A New Horizons sobrevoou-o em 2015.',
    perihelionPrecession: 0.0001,
    gravitationalParameter: 871,
    escapeVelocity: 1.21,
    surfaceGravity: 0.62,
    meanTemperature: -230,
    numberOfMoons: 5,
    ringSystem: false,
    visualRadius: 0.35,
    visualOrbitRadius: 72,
  },
];
