# 🌌 Sistema Solar Interativo 3D - Versão Completa

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![React](https://img.shields.io/badge/React-18.3.1-61dafb)
![Three.js](https://img.shields.io/badge/Three.js-0.160.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6)
![License](https://img.shields.io/badge/license-MIT-green)
![Stars](https://img.shields.io/badge/⭐-Stars-yellow)

**Uma simulação interativa e educativa do Sistema Solar com física realista**

[Instalação](#-instalação) • [Demo](#-demo) • [Funcionalidades](#-funcionalidades) • [Física](#-física-implementada) • [Contribuir](#-contribuir)

</div>

---

Uma simulação interativa e educativa do Sistema Solar com visualização 3D, física realista baseada nas leis de Kepler, Newton e Einstein, dados astronómicos reais da NASA, e uma interface moderna e intuitiva.

## 🚀 Instalação

```bash
# Clonar o repositório
git clone https://github.com/USERNAME/Solar-System_(sistema-solar).git
cd Solar-System_\(sistema-solar\)

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 🎮 Demo

Acede à aplicação em `http://localhost:5173` após executar `npm run dev`.

### Atalhos de Teclado
- **Espaço**: Play / Pausa
- **+/-**: Aumentar / Diminuir velocidade
- **R**: Reset tempo
- **B**: Rebobinar
- **O**: Mostrar/ocultar órbitas
- **L**: Mostrar/ocultar nomes
- **D**: Modo escuro/claro
- **1-9**: Selecionar planeta
- **Esc**: Fechar painel

## ✨ Funcionalidades Implementadas

### 🎨 Visualização 3D Avançada
- **Sol** com shader procedural de superfície turbulenta e corona animada
- **9 planetas** (incluindo Plutão) com texturas procedurais únicas
- **Atmosferas volumétricas** para Terra, Vénus e Júpiter
- **Auroras polares** animadas na Terra
- **Anéis de Saturno** melhorados com Divisão de Cassini
- **Anéis de Urano** verticais
- **Sistema de 11 luas** principais (Lua, luas galileanas, Titã, etc.)
- **Cometas** Halley e Hale-Bopp com caudas animadas
- **Cintura de asteroides** (1000 partículas)
- **Cintura de Kuiper** (500 objetos transneptunianos)
- **Tróianos de Júpiter** nos pontos L4 e L5
- **Vento solar** subtil (200 partículas)
- **8000 estrelas** de fundo
- **Mini-mapa** interativo com vista superior

### ⚛️ Física Realista Completa
- **Leis de Kepler**:
  - Órbitas elípticas com excentricidades reais
  - Equação de Kepler resolvida por Newton-Raphson
  - 2ª Lei: Velocidades orbitais variáveis
  - 3ª Lei: T² ∝ a³ verificada
  
- **Relatividade Geral**:
  - Precessão relativística do periélio (43″/século para Mercúrio)
  - Dilatação temporal gravitacional
  - Velocidade de escape
  - Raio de Schwarzschild
  
- **Mecânica Orbital**:
  - Inclinação orbital de cada planeta
  - Rotação axial (incluindo retrógrada)
  - Transferência de Hohmann
  - Janelas de lançamento
  - Períodos sinódicos
  
- **N-Body Simplificado**:
  - Interações gravitacionais entre corpos
  - Integrador de Verlet
  - Conservação de energia
  - Centro de massa do sistema

### 🎮 Interatividade Completa
- **Atalhos de teclado** (Espaço, +/-, R, B, O, L, D, T, C, G, 1-9, Esc)
- **Controlos de simulação**: play/pause, velocidade (0.1x a 500x), rebobinar
- **Toggle de órbitas e nomes**
- **Seletor rápido** de planetas
- **Câmera orbital** (zoom, rotação, pan)
- **Mini-mapa** clicável
- **Modo escuro/claro**

### 📊 Ferramentas Educativas
- **Calculadora de Viagem Espacial**:
  - Transferência de Hohmann
  - Delta-V necessário
  - Tempo de viagem
  - Janelas de lançamento
  - 10+ missões espaciais históricas
  
- **Comparador de Planetas**:
  - Comparação lado a lado
  - Razões de diâmetro, massa, distância, período, gravidade, temperatura
  - Barras de progresso visuais
  
- **Calculadora de Peso**:
  - Quanto pesarias em cada planeta?
  - Suporte para kg e lbs
  - Grid visual de todos os planetas
  
- **Gráficos em Tempo Real** (Recharts):
  - Distância ao Sol vs tempo
  - Velocidade orbital vs tempo
  - Eixos duplos
  - Tooltips elegantes
  
- **Tour Guiado Interativo**:
  - 12 passos educativos
  - Navegação passo-a-passo
  - Informações detalhadas de cada planeta
  - Barra de progresso
  
- **Quiz Educativo**:
  - 10 perguntas sobre astronomia
  - Sistema de pontuação
  - Explicações detalhadas
  - Feedback visual
  
- **Exportação de Dados**:
  - Screenshot PNG
  - Dados completos em JSON
  - Tabela CSV para Excel
  - Metadados de simulação

### 📡 Dados Astronómicos Reais
- Diâmetros, massas, distâncias, períodos orbitais (NASA)
- Excentricidades, inclinações, temperaturas médias
- Número de luas, gravidade superficial, velocidades de escape
- Parâmetros gravitacionais
- Dados de missões espaciais históricas
- 9 planetas + Plutão
- 11 luas principais
- 10+ missões espaciais

### 🌐 Internacionalização
- Suporte a 4 idiomas: Português, Inglês, Espanhol, Francês
- Sistema de traduções expansível
- Unidades configuráveis

### 🎨 Interface Moderna e Elegante
- Design minimalista com gradientes subtis
- Tipografia leve (font-light)
- Backdrop blur em todos os painéis
- Animações suaves (cubic-bezier)
- Responsivo e intuitivo
- Modo escuro/claro
- Acessibilidade básica

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Sun.tsx                    # Sol com shaders
│   ├── Planet.tsx                 # Planetas com física orbital
│   ├── Moon.tsx                   # Sistema de luas
│   ├── Comet.tsx                  # Cometas com cauda
│   ├── Atmosphere.tsx             # Atmosferas volumétricas e auroras
│   ├── CelestialObjects.tsx       # Cintura de Kuiper e Tróianos
│   ├── SolarEffects.tsx           # Vento solar
│   ├── SolarSystemScene.tsx       # Cena 3D principal
│   ├── InfoPanel.tsx              # Painel de informações
│   ├── Controls.tsx               # Controlos de UI
│   ├── TravelCalculator.tsx       # Calculadora de viagens
│   ├── PlanetComparator.tsx       # Comparador de planetas
│   ├── WeightCalculator.tsx       # Calculadora de peso
│   ├── RealTimeGraph.tsx          # Gráficos em tempo real
│   ├── TourGuide.tsx              # Tour guiado
│   ├── Quiz.tsx                   # Quiz educativo
│   ├── MiniMap.tsx                # Mini-mapa
│   ├── ShortcutsModal.tsx         # Modal de atalhos
│   └── ExportData.tsx             # Exportação de dados
├── data/
│   ├── planets.ts                 # Dados dos 9 planetas
│   └── moons.ts                   # Dados das 11 luas
├── physics/
│   ├── orbitalMechanics.ts        # Motor de física orbital
│   ├── spaceTravel.ts             # Cálculos de viagem espacial
│   └── nbody.ts                   # Simulação N-body
├── utils/
│   ├── keyboardShortcuts.ts       # Sistema de atalhos
│   └── i18n.ts                    # Internacionalização
├── App.tsx                        # Componente principal
└── index.css                      # Estilos globais
```

## ⌨️ Atalhos de Teclado

| Tecla | Ação |
|-------|------|
| Espaço | Play / Pausa |
| + / - | Aumentar / Diminuir velocidade |
| R | Reset tempo |
| B | Rebobinar |
| O | Mostrar/ocultar órbitas |
| L | Mostrar/ocultar nomes |
| D | Modo escuro/claro |
| T | Abrir calculadora de viagem |
| C | Abrir comparador |
| G | Abrir gráfico |
| 1-9 | Selecionar planeta |
| Esc | Fechar painel |
| 0 | Reset câmera |

## 🔬 Física Implementada

### Equação de Kepler
```
M = E - e·sin(E)
```
Resolvida por Newton-Raphson.

### Órbita Elíptica
```
r = a(1 - e²) / (1 + e·cos(ν))
```

### Precessão Relativística
```
Δω = 6πGM / (a(1-e²)c²) por órbita
```

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

### N-Body (Verlet)
```
x(t+dt) = x(t) + v(t)·dt + 0.5·a(t)·dt²
v(t+dt) = v(t) + 0.5·(a(t) + a(t+dt))·dt
```

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework UI
- **Three.js** - Renderização 3D
- **React Three Fiber** - React renderer para Three.js
- **React Three Drei** - Helpers para R3F
- **Recharts** - Gráficos modernos
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Vite** - Build tool

## 📊 Estatísticas do Projeto

- **1247 módulos** compilados
- **20+ componentes** React
- **9 planetas** com dados reais da NASA
- **11 luas** principais
- **2 cometas** com órbitas reais
- **1500+ objetos** (asteroides + Kuiper + Tróianos)
- **10+ missões** espaciais documentadas
- **200 partículas** de vento solar
- **8000 estrelas** de fundo
- **10 perguntas** no quiz
- **12 passos** no tour guiado
- **4 idiomas** suportados
- **15+ atalhos** de teclado

## 🚀 Melhorias Futuras Possíveis

### Física Avançada
- [ ] Interação N-body completa com todos os corpos
- [ ] Efeito Yarkovsky
- [ ] Precessão de Lense-Thirring
- [ ] Efeitos de maré completos
- [ ] Ressonâncias orbitais (Io-Europa-Ganimedes)
- [ ] Assistência gravitacional simulada

### Visualização
- [ ] Texturas de alta resolução da NASA
- [ ] Sombras realistas
- [ ] Nuvem de Oort
- [ ] Via Láctea como fundo
- [ ] Nebulosas

### Educação
- [ ] Tour guiado com narração áudio
- [ ] Simulador de manobras orbitais
- [ ] Glossário interativo
- [ ] Vídeos educativos

### UX/UI
- [ ] Acessibilidade completa (ARIA, screen readers)
- [ ] Responsividade mobile otimizada
- [ ] Modo VR/AR (WebXR)
- [ ] Partilhar configurações via URL

### Performance
- [ ] Instanced meshes para asteroides
- [ ] LOD (Level of Detail)
- [ ] Web Workers para cálculos
- [ ] Code splitting dinâmico

## 📚 Referências

- NASA Planetary Fact Sheets
- International Astronomical Union (IAU)
- JPL Horizons System
- "Fundamentals of Astrodynamics" - Bate, Mueller, White
- "Gravity" - Poisson, Will

## 🎓 Conceitos Físicos Demonstrados

1. ✅ Leis de Kepler do Movimento Planetário
2. ✅ Lei da Gravitação Universal de Newton
3. ✅ Teoria da Relatividade Geral de Einstein
4. ✅ Mecânica Orbital e Manobras de Hohmann
5. ✅ Dilatação Temporal Gravitacional
6. ✅ Precessão do Periélio
7. ✅ Conservação do Momento Angular
8. ✅ Energia Orbital Específica
9. ✅ Pontos de Lagrange
10. ✅ Cintura de Kuiper e Objetos Transneptunianos
11. ✅ Tróianos de Júpiter
12. ✅ Simulação N-body (simplificada)

## 🌟 Destaques

- **Precisão**: Dados astronómicos reais da NASA
- **Educativo**: Tour guiado, quiz, explicações detalhadas
- **Interativo**: Múltiplas ferramentas, atalhos de teclado
- **Visual**: Gráficos modernos, mini-mapa, atmosferas
- **Física**: Implementação completa das leis de Kepler e relatividade
- **Moderno**: Interface elegante, modo escuro/claro
- **Completo**: 9 planetas, luas, cometas, asteroides, Kuiper
- **Exportável**: Screenshots, JSON, CSV

## 🤝 Contribuir

Contribuições são bem-vindas! Consulta o [Guia de Contribuição](CONTRIBUTING.md) para detalhes.

### Áreas Prioritárias
- 🎨 Texturas de alta resolução da NASA
- 🔬 Interação N-body completa
- 🎓 Mais conteúdo educativo
- 🌐 Traduções adicionais
- ⚡ Otimizações de performance

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## 📚 Referências

- [NASA Planetary Fact Sheets](https://nssdc.gsfc.nasa.gov/planetary/factsheet/)
- [International Astronomical Union](https://www.iau.org/)
- [JPL Horizons System](https://ssd.jpl.nasa.gov/horizons/)
- "Fundamentals of Astrodynamics" - Bate, Mueller, White
- "Gravity" - Poisson, Will

## 📞 Contacto

- 📧 Abre uma [Issue](../../issues) para bugs
- 💬 Participa nas [Discussions](../../discussions)
- 🔧 Submete um [Pull Request](../../pulls)

---

<div align="center">

**Desenvolvido com ❤️ para educação científica**

**Versão 2.0 - Completa**

⭐ Se gostaste do projeto, considera dar uma estrela!

[⬆ Voltar ao topo](#-sistema-solar-interativo-3d---versão-completa)

</div>
