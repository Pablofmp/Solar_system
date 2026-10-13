import { useState } from 'react';
import { planets } from '../data/planets';

interface QuizProps {
  onClose: () => void;
}

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    question: 'Qual é o maior planeta do sistema solar?',
    options: ['Saturno', 'Júpiter', 'Urano', 'Neptuno'],
    correct: 1,
    explanation: 'Júpiter é o maior planeta, com massa 318× a da Terra e diâmetro de 142.984 km.',
  },
  {
    question: 'Qual planeta tem a maior excentricidade orbital?',
    options: ['Marte', 'Mercúrio', 'Plutão', 'Vénus'],
    correct: 2,
    explanation: 'Plutão tem excentricidade de 0.2488, a mais alta entre os planetas (anões). Mercúrio vem em segundo com 0.2056.',
  },
  {
    question: 'Qual planeta gira ao contrário (rotação retrógrada)?',
    options: ['Marte', 'Terra', 'Vénus', 'Júpiter'],
    correct: 2,
    explanation: 'Vénus tem rotação retrógrada (gira no sentido oposto). Urano também tem inclinação axial extrema de 97.77°.',
  },
  {
    question: 'Qual é a precessão relativística do periélio de Mercúrio?',
    options: ['10″/século', '43″/século', '100″/século', '1″/século'],
    correct: 1,
    explanation: 'A precessão anómala de 43″/século de Mercúrio foi uma das primeiras confirmações da Relatividade Geral de Einstein.',
  },
  {
    question: 'Quantas luas tem Júpiter?',
    options: ['16', '63', '95', '146'],
    correct: 2,
    explanation: 'Júpiter tem 95 luas conhecidas, incluindo as 4 galileanas: Io, Europa, Ganimedes e Calisto.',
  },
  {
    question: 'Qual planeta tem os ventos mais fortes?',
    options: ['Júpiter', 'Saturno', 'Urano', 'Neptuno'],
    correct: 3,
    explanation: 'Neptuno tem ventos de até 2100 km/h, os mais fortes do sistema solar.',
  },
  {
    question: 'Qual é a temperatura média de Vénus?',
    options: ['50°C', '200°C', '464°C', '1000°C'],
    correct: 2,
    explanation: 'Vénus tem temperatura média de 464°C devido ao efeito de estufa extremo (96% CO₂ na atmosfera).',
  },
  {
    question: 'Qual planeta foi descoberto matematicamente antes de ser observado?',
    options: ['Urano', 'Neptuno', 'Plutão', 'Mercúrio'],
    correct: 1,
    explanation: 'Neptuno foi previsto por Urbain Le Verrier em 1846 e observado logo depois, confirmando a lei da gravitação.',
  },
  {
    question: 'Qual é o menor planeta do sistema solar?',
    options: ['Marte', 'Mercúrio', 'Plutão', 'Vénus'],
    correct: 1,
    explanation: 'Mercúrio é o menor planeta (4.879 km de diâmetro). Plutão é menor (2.377 km) mas é classificado como planeta anão.',
  },
  {
    question: 'Qual planeta tem a maior inclinação axial?',
    options: ['Terra', 'Marte', 'Urano', 'Neptuno'],
    correct: 2,
    explanation: 'Urano tem inclinação axial de 97.77°, girando praticamente de lado. As suas estações duram 21 anos!',
  },
];

export function Quiz({ onClose }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === question.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    const percentage = (score / questions.length) * 100;
    let message = '';
    let emoji = '';
    
    if (percentage === 100) {
      message = 'Perfeito! És um verdadeiro astrónomo!';
      emoji = '🏆';
    } else if (percentage >= 80) {
      message = 'Excelente! Conhecimento impressionante!';
      emoji = '🌟';
    } else if (percentage >= 60) {
      message = 'Muito bom! Continua a aprender!';
      emoji = '👍';
    } else if (percentage >= 40) {
      message = 'Bom esforço! Tenta outra vez!';
      emoji = '📚';
    } else {
      message = 'Continua a explorar o sistema solar!';
      emoji = '🚀';
    }

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="bg-gray-950/98 border border-gray-700/50 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
          <div className="text-6xl mb-4">{emoji}</div>
          <h2 className="text-2xl font-light text-white mb-2">Quiz Concluído!</h2>
          <p className="text-4xl font-bold text-blue-400 mb-2">
            {score}/{questions.length}
          </p>
          <p className="text-gray-400 mb-4 font-light">{message}</p>
          
          <div className="flex gap-3">
            <button
              onClick={handleRestart}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl transition-all font-light"
            >
              Tentar Novamente
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white py-3 rounded-xl transition-all font-light"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gray-950/98 border border-gray-700/50 rounded-3xl p-8 max-w-lg w-full shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-light text-white">🧠 Quiz Astronómico</h2>
            <p className="text-xs text-gray-500 font-light">
              Pergunta {currentQuestion + 1} de {questions.length} • Pontuação: {score}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
          >
            ✕
          </button>
        </div>

        {/* Barra de progresso */}
        <div className="mb-6">
          <div className="flex gap-1">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all ${
                  i < currentQuestion ? 'bg-green-500' : i === currentQuestion ? 'bg-blue-500' : 'bg-gray-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Pergunta */}
        <div className="bg-gray-900/50 rounded-2xl p-5 mb-6 border border-gray-800/30">
          <p className="text-white text-lg font-light">{question.question}</p>
        </div>

        {/* Opções */}
        <div className="space-y-3 mb-6">
          {question.options.map((option, i) => {
            let buttonClass = 'bg-gray-900/50 border-gray-800/30 text-gray-300 hover:bg-gray-800/50';
            
            if (showResult) {
              if (i === question.correct) {
                buttonClass = 'bg-green-950/50 border-green-500/50 text-green-300';
              } else if (i === selectedAnswer && i !== question.correct) {
                buttonClass = 'bg-red-950/50 border-red-500/50 text-red-300';
              } else {
                buttonClass = 'bg-gray-900/30 border-gray-800/30 text-gray-500';
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-xl border transition-all font-light ${buttonClass}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Explicação */}
        {showResult && (
          <div className="bg-blue-950/30 rounded-xl p-4 mb-6 border border-blue-800/30">
            <p className="text-blue-300/90 text-sm font-light">
              💡 {question.explanation}
            </p>
          </div>
        )}

        {/* Botão próximo */}
        {showResult && (
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white py-3 rounded-xl transition-all font-light"
          >
            {currentQuestion === questions.length - 1 ? 'Ver Resultado' : 'Próxima Pergunta →'}
          </button>
        )}
      </div>
    </div>
  );
}
