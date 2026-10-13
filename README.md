# 🌌 Sistema Solar Interativo 3D

Uma simulação interativa e educativa do Sistema Solar com visualização 3D, física realista baseada nas leis de Kepler, Newton e Einstein, e dados astronómicos reais da NASA.

## ✨ Funcionalidades Implementadas

### 🎨 Visualização 3D
- **Sol** com shader procedural de superfície turbulenta e corona animada
- **8 planetas** com texturas procedurais únicas (Júpiter com bandas, Terra com continentes, Marte com crateras)
- **Anéis de Saturno e Urano** com geometria realista
- **Sistema de luas** principais (Lua, luas galileanas de Júpiter, Titã, etc.)
- **Cometas** com cauda animada (Halley, Hale-Bopp)
- **Cintura de asteroides** entre Marte e Júpiter
- **Vento solar** visualizado com partículas
- **Efeito de lente gravitacional** ao redor do Sol
- **Campo de estrelas** de fundo com 8000+ estrelas
- **Controlos de câmera** orbital (zoom, rotação, pan)

### ⚛️ Física Realista
- **Leis de Kepler**:
  - Órbitas elípticas com excentricidades reais
  - Equação de Kepler resolvida por Newton-Raphson
  - 2ª Lei: Velocidades orbitais variáveis (áreas iguais em tempos iguais)
  - 3ª Lei: T² ∝ a³ verificada para todos os planetas
  
- **Relatividade Geral**:
  - Precessão relativística do periélio (43″/século para Mercúrio)
  - Dilatação temporal gravitacional
  - Velocidade de escape do Sol
  - Raio de Schwarzschild
  
- **Mecânica Orbital**:
  - Inclinação orbital de cada planeta
  - Rotação axial (incluindo rotação retrógrada de Vénus e Urano)
  - Transferência de Hohmann (manobras orbitais)
  - Janelas de lançamento
  - Períodos sinódicos

### 📊 Dados Astronómicos Reais
- Diâmetros, massas, distâncias, períodos orbitais (NASA)
- Excentricidades, inclinações, temperaturas médias
- Número de luas, gravidade superficial, velocidades de escape
- Parâmetros gravitacionais
- Dados de missões espaciais históricas

### 🎮 Interatividade
- **Clique em qualquer planeta** para ver informações detalhadas
- **Controlos de simulação**: play/pause, velocidade (0.1x a 500x)
- **Toggle de órbitas e nomes**
- **Seletor rápido** de planetas
- **Calculadora de viagens espaciais** (transferência de Hohmann)
- **Comparador de planetas** lado a lado
- **Gráficos em tempo real** (velocidade e distância vs tempo)
- **Painel de informações** com dados físicos, orbitais e relativísticos

### 🚀 Ferramentas Educativas
- **Calculadora de Viagem Espacial**:
  - Cálculo de transferência de Hohmann
  - Delta-V necessário (ΔV₁, ΔV₂, total)
  - Tempo de viagem
  - Janelas de lançamento
  - Ângulos de fase
  
- **Comparador de Planetas**:
  - Comparação visual lado a lado
  - Razões de diâmetro, massa, distância, período, gravidade, temperatura
  - Barras de progresso visuais
  
- **Gráficos em Tempo Real**:
  - Distância ao Sol vs tempo
  - Velocidade orbital vs tempo
  - Atualização automática durante simulação
  
- **Missões Espaciais**:
  - 10+ missões históricas (Voyager, Cassini, Curiosity, etc.)
  - Tempo de viagem, distância percorrida
  - Status e descrições

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Sun.tsx                 # Sol com shaders
│   ├── Planet.tsx              # Planetas com física orbital
│   ├── Moon.tsx                # Sistema de luas
│   ├── Comet.tsx               # Cometas com cauda
│   ├── SolarEffects.tsx        # Vento solar, lente gravitacional
│   ├── SolarSystemScene.tsx    # Cena 3D principal
│   ├── InfoPanel.tsx           # Painel de informações
│   ├── Controls.tsx            # Controlos de UI
│   ├── TravelCalculator.tsx    # Calculadora de viagens
│   ├── PlanetComparator.tsx    # Comparador de planetas
│   └── RealTimeGraph.tsx       # Gráficos em tempo real
├── data/
│   ├── planets.ts              # Dados dos planetas
│   └── moons.ts                # Dados das luas
├── physics/
│   ├── orbitalMechanics.ts     # Motor de física orbital
│   └── spaceTravel.ts          # Cálculos de viagem espacial
├── shaders/
│   └── planetShaders.ts        # Shaders procedurais
├── App.tsx                     # Componente principal
└── index.css                   # Estilos globais
```

## 🔬 Física Implementada

### Equação de Kepler
```
M = E - e·sin(E)
```
Resolvida por Newton-Raphson para encontrar a anomalia excêntrica E.

### Órbita Elíptica
```
r = a(1 - e²) / (1 + e·cos(ν))
```
Onde ν é a anomalia verdadeira.

### Precessão Relativística
```
Δω = 6πGM / (a(1-e²)c²) por órbita
```
Para Mercúrio: ~43 arcsegundos/século.

### Dilatação Temporal
```
τ = t·√(1 - 2GM/(rc²))
```

### Transferência de Hohmann
```
ΔV₁ = |v_transfer1 - v1|
ΔV₂ = |v2 - v_transfer2|
T = π·√(a³/GM)
```

## 🚀 Melhorias Futuras Possíveis

### Física Avançada
- [ ] Interação gravitacional N-body entre planetas
- [ ] Efeitos de maré
- [ ] Precessão de Lense-Thirring (frame-dragging)
- [ ] Efeito Yarkovsky
- [ ] Perturbações gravitacionais
- [ ] Ressonâncias orbitais

### Visualização
- [ ] Texturas de alta resolução (NASA)
- [ ] Sombras realistas
- [ ] Atmosferas (Terra, Vénus, Titã)
- [ ] Auroras polares
- [ ] Anéis mais detalhados
- [ ] Cometas adicionais
- [ ] Objetos da Cintura de Kuiper
- [ ] Nuvem de Oort

### Educação
- [ ] Tour guiado interativo
- [ ] Quiz educativo
- [ ] Linha do tempo histórica
- [ ] Simulador de manobras orbitais
- [ ] Calculadora de gravidade superficial
- [ ] Visualização de forças
- [ ] Explicações passo-a-passo

### Performance
- [ ] Instanced meshes para asteroides
- [ ] LOD (Level of Detail)
- [ ] Otimização de shaders
- [ ] Web Workers para cálculos
- [ ] Code splitting

### UX/UI
- [ ] Modo escuro/claro
- [ ] Acessibilidade (teclado, screen readers)
- [ ] Responsividade mobile melhorada
- [ ] Animações de transição
- [ ] Modo VR/AR (WebXR)
- [ ] Exportar dados/simulações
- [ ] Partilhar configurações

### Dados
- [ ] Integração com APIs da NASA
- [ ] Dados em tempo real de missões
- [ ] Imagens de missões espaciais
- [ ] Vídeos educativos
- [ ] Áudio (sons do espaço)

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework UI
- **Three.js** - Renderização 3D
- **React Three Fiber** - React renderer para Three.js
- **React Three Drei** - Helpers para R3F
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Vite** - Build tool

## 📚 Referências

- NASA Planetary Fact Sheets
- International Astronomical Union (IAU)
- "Fundamentals of Astrodynamics" - Bate, Mueller, White
- "Gravity" - Poisson, Will
- "An Introduction to Mechanics of Celestial Bodies" - Brovarskiy

## 🎓 Conceitos Físicos Demonstrados

1. **Leis de Kepler do Movimento Planetário**
2. **Lei da Gravitação Universal de Newton**
3. **Teoria da Relatividade Geral de Einstein**
4. **Mecânica Orbital e Manobras de Hohmann**
5. **Dilatação Temporal Gravitacional**
6. **Precessão do Periélio**
7. **Conservação do Momento Angular**
8. **Energia Orbital Específica**

## 🌟 Destaques

- **Precisão**: Dados astronómicos reais da NASA
- **Educativo**: Explicações detalhadas de cada conceito físico
- **Interativo**: Múltiplas ferramentas de exploração
- **Visual**: Gráficos em tempo real e visualizações 3D
- **Física**: Implementação completa das leis de Kepler e relatividade

## 📝 Licença

Projeto educativo criado para demonstração de conceitos de física orbital e astronomia.

---

**Desenvolvido com ❤️ para educação científica**
