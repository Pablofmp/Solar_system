// Simulação N-body simplificada
// Calcula interações gravitacionais entre planetas (não apenas com o Sol)

import { PlanetData, G, SOLAR_MASS } from '../data/planets';

interface Body {
  id: string;
  mass: number; // kg
  position: { x: number; y: number; z: number }; // metros
  velocity: { x: number; y: number; z: number }; // m/s
}

// Converter dados dos planetas para corpos N-body
export function planetsToBodies(planets: PlanetData[], time: number): Body[] {
  return planets.map((planet) => {
    // Posição simplificada (órbita circular)
    const angle = (2 * Math.PI * time) / planet.orbitalPeriod;
    const r = planet.distanceFromSun * 1e9; // converter para metros
    
    return {
      id: planet.id,
      mass: planet.realMass * 1e24, // kg
      position: {
        x: r * Math.cos(angle),
        y: 0,
        z: r * Math.sin(angle),
      },
      velocity: {
        x: 0,
        y: 0,
        z: 0,
      },
    };
  });
}

// Calcular aceleração gravitacional em um corpo devido a todos os outros
export function calculateAcceleration(
  body: Body,
  allBodies: Body[]
): { x: number; y: number; z: number } {
  let ax = 0, ay = 0, az = 0;

  allBodies.forEach((other) => {
    if (other.id === body.id) return;

    const dx = other.position.x - body.position.x;
    const dy = other.position.y - body.position.y;
    const dz = other.position.z - body.position.z;
    
    const r2 = dx * dx + dy * dy + dz * dz;
    const r = Math.sqrt(r2);
    
    // Lei da gravitação: F = G * m1 * m2 / r²
    // Aceleração: a = F / m = G * M / r²
    const a = (G * other.mass) / r2;
    
    ax += a * (dx / r);
    ay += a * (dy / r);
    az += a * (dz / r);
  });

  return { x: ax, y: ay, z: az };
}

// Integrador de Verlet (mais estável que Euler)
export function verletStep(
  bodies: Body[],
  dt: number // passo de tempo em segundos
): Body[] {
  return bodies.map((body) => {
    const acc = calculateAcceleration(body, bodies);
    
    // Atualizar posição: x(t+dt) = x(t) + v(t)*dt + 0.5*a(t)*dt²
    const newX = body.position.x + body.velocity.x * dt + 0.5 * acc.x * dt * dt;
    const newY = body.position.y + body.velocity.y * dt + 0.5 * acc.y * dt * dt;
    const newZ = body.position.z + body.velocity.z * dt + 0.5 * acc.z * dt * dt;
    
    // Calcular nova aceleração
    const newBody = {
      ...body,
      position: { x: newX, y: newY, z: newZ },
    };
    const newAcc = calculateAcceleration(newBody, bodies);
    
    // Atualizar velocidade: v(t+dt) = v(t) + 0.5*(a(t) + a(t+dt))*dt
    const newVx = body.velocity.x + 0.5 * (acc.x + newAcc.x) * dt;
    const newVy = body.velocity.y + 0.5 * (acc.y + newAcc.y) * dt;
    const newVz = body.velocity.z + 0.5 * (acc.z + newAcc.z) * dt;
    
    return {
      ...newBody,
      velocity: { x: newVx, y: newVy, z: newVz },
    };
  });
}

// Calcular energia total do sistema (cinética + potencial)
export function calculateTotalEnergy(bodies: Body[]): number {
  let kinetic = 0;
  let potential = 0;

  bodies.forEach((body, i) => {
    // Energia cinética: K = 0.5 * m * v²
    const v2 = body.velocity.x ** 2 + body.velocity.y ** 2 + body.velocity.z ** 2;
    kinetic += 0.5 * body.mass * v2;

    // Energia potencial: U = -G * m1 * m2 / r
    bodies.forEach((other, j) => {
      if (j <= i) return;
      const dx = other.position.x - body.position.x;
      const dy = other.position.y - body.position.y;
      const dz = other.position.z - body.position.z;
      const r = Math.sqrt(dx * dx + dy * dy + dz * dz);
      potential -= (G * body.mass * other.mass) / r;
    });
  });

  return kinetic + potential;
}

// Calcular centro de massa do sistema
export function calculateCenterOfMass(bodies: Body[]): { x: number; y: number; z: number } {
  let totalMass = 0;
  let cx = 0, cy = 0, cz = 0;

  bodies.forEach((body) => {
    totalMass += body.mass;
    cx += body.mass * body.position.x;
    cy += body.mass * body.position.y;
    cz += body.mass * body.position.z;
  });

  return {
    x: cx / totalMass,
    y: cy / totalMass,
    z: cz / totalMass,
  };
}
