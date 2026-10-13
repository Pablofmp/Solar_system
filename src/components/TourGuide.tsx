import { useState } from 'react';
import { planets } from '../data/planets';

interface TourGuideProps {
  onClose: () => void;
  onNavigateToPlanet: (planetId: string) => void;
}

interface TourStep {
  planetId: string | 'sun' | 'intro' | 'conclusion';
  title: string;
  content: string;
  highlight: string;
}

const tourSteps: TourStep[] = [
  {
    planetId: 'intro',
    title: '🌌 Bem-vindo ao Sistema Solar',
    content: 'Vamos explorar o nosso sistema solar! Este tour guiado vai mostrar-te os planetas, luas e fenómenos fascinantes. Clica em "Próximo" para começar.',
    highlight: 'Sistema Solar',
  },
  {
    planetId: 'sun',
    title: '☀️ O Sol - Nossa Estrela',
    content: 'O Sol é uma estrela anã amarela com 4.6 mil milhões de anos. Contém 99.86% de toda a massa do sistema solar. A sua luz demora 8 minutos a chegar à Terra!',
    highlight: 'Sol',
  },
  {
    planetId: 'mercury',
    title: '☿ Mercúrio - O Mensageiro',
    content: 'O menor planeta e o mais próximo do Sol. Um dia em Mercúrio dura 59 dias terrestres! Tem a maior precessão relativística do periélio: 43″/século.',
    highlight: 'Mercúrio',
  },
  {
    planetId: 'venus',
    title: '♀ Vénus - A Estrela da Manhã',
    content: 'O planeta mais quente (464°C) devido ao efeito de estufa extremo. Gira ao contrário dos outros planetas (rotação retrógrada). Um dia venusiano é mais longo que o seu ano!',
    highlight: 'Vénus',
  },
  {
    planetId: 'earth',
    title: '🌍 Terra - O Nosso Lar',
    content: 'O único planeta conhecido com vida. Tem água líquida, atmosfera rica em oxigénio e um campo magnético protetor. A Lua estabiliza a sua inclinação axial.',
    highlight: 'Terra',
  },
  {
    planetId: 'mars',
    title: '♂ Marte - O Planeta Vermelho',
    content: 'Tem o maior vulcão do sistema solar (Olympus Mons, 21.9 km) e um sistema de cânions gigantes (Valles Marineris). Vários rovers exploram a sua superfície.',
    highlight: 'Marte',
  },
  {
    planetId: 'jupiter',
    title: '♃ Júpiter - O Gigante',
    content: 'O maior planeta, com massa 318× a da Terra. A Grande Mancha Vermelha é uma tempestade maior que a Terra! Tem 95 luas conhecidas, incluindo as 4 galileanas.',
    highlight: 'Júpiter',
  },
  {
    planetId: 'saturn',
    title: '♄ Saturno - O Senhor dos Anéis',
    content: 'Famoso pelos seus magníficos anéis de gelo e rocha. É tão pouco denso (0.687 g/cm³) que flutuaria na água! Titã, a sua maior lua, tem lagos de metano líquido.',
    highlight: 'Saturno',
  },
  {
    planetId: 'uranus',
    title: '♅ Urano - O Gigante Deitado',
    content: 'Gira praticamente de lado (inclinação axial de 97.77°). Foi o primeiro planeta descoberto com telescópio (1781). Tem 28 luas e anéis ténues.',
    highlight: 'Urano',
  },
  {
    planetId: 'neptune',
    title: '♆ Neptuno - O Planeta Azul',
    content: 'O mais distante, com ventos de 2100 km/h (os mais fortes do sistema solar). Foi previsto matematicamente antes de ser observado (1846). Tritão orbita na direção oposta!',
    highlight: 'Neptuno',
  },
  {
    planetId: 'pluto',
    title: '🔭 Plutão - O Planeta Anão',
    content: 'Reclassificado em 2006. Tem um coração de gelo nitrogenado e 5 luas. A New Horizons sobrevoou-o em 2015, revelando montanhas de gelo e planícies.',
    highlight: 'Plutão',
  },
  {
    planetId: 'conclusion',
    title: '🎉 Fim do Tour!',
    content: 'Parabéns! Exploraste todo o sistema solar. Agora podes usar as ferramentas para calcular viagens espaciais, comparar planetas e ver gráficos em tempo real. Continua a explorar!',
    highlight: 'Conclusão',
  },
];

export function TourGuide({ onClose, onNavigateToPlanet }: TourGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const step = tourSteps[currentStep];

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      
      const nextPlanetId = tourSteps[nextStep].planetId;
      if (nextPlanetId !== 'intro' && nextPlanetId !== 'conclusion') {
        onNavigateToPlanet(nextPlanetId);
      }
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      
      const prevPlanetId = tourSteps[prevStep].planetId;
      if (prevPlanetId !== 'intro' && prevPlanetId !== 'conclusion') {
        onNavigateToPlanet(prevPlanetId);
      }
    }
  };

  const planet = step.planetId !== 'sun' && step.planetId !== 'intro' && step.planetId !== 'conclusion'
    ? planets.find(p => p.id === step.planetId)
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-gray-950/98 border border-gray-700/50 rounded-3xl p-8 max-w-lg w-full shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎓</span>
            <div>
              <h2 className="text-xl font-light text-white">{step.title}</h2>
              <p className="text-xs text-gray-500 font-light">
                Passo {currentStep + 1} de {tourSteps.length}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
          >
            ✕
          </button>
        </div>

        {/* Imagem do planeta */}
        {planet && (
          <div className="flex justify-center mb-6">
            <div
              className="w-32 h-32 rounded-full"
              style={{
                background: `radial-gradient(circle at 35% 35%, ${planet.color}, ${planet.emissiveColor})`,
                boxShadow: `0 0 40px ${planet.color}44`,
              }}
            />
          </div>
        )}

        {/* Conteúdo */}
        <div className="bg-gray-900/50 rounded-2xl p-5 mb-6 border border-gray-800/30">
          <p className="text-gray-300 text-sm leading-relaxed font-light">
            {step.content}
          </p>
        </div>

        {/* Barra de progresso */}
        <div className="mb-6">
          <div className="flex gap-1">
            {tourSteps.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all ${
                  i <= currentStep ? 'bg-blue-500' : 'bg-gray-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Botões de navegação */}
        <div className="flex gap-3">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex-1 bg-gray-800/80 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed text-white py-3 rounded-xl transition-all font-light"
          >
            ← Anterior
          </button>
          <button
            onClick={handleNext}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white py-3 rounded-xl transition-all font-light"
          >
            {currentStep === tourSteps.length - 1 ? 'Concluir' : 'Próximo →'}
          </button>
        </div>
      </div>
    </div>
  );
}
