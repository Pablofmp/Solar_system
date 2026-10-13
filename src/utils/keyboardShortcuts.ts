// Atalhos de teclado globais
export interface KeyboardShortcuts {
  onTogglePlay: () => void;
  onSpeedUp: () => void;
  onSpeedDown: () => void;
  onReset: () => void;
  onRewind: () => void;
  onToggleOrbits: () => void;
  onToggleLabels: () => void;
  onSelectPlanet: (id: string | null) => void;
  onToggleDarkMode: () => void;
  onToggleCalculator: () => void;
  onToggleComparator: () => void;
  onToggleGraph: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetCamera: () => void;
}

export function setupKeyboardShortcuts(shortcuts: KeyboardShortcuts): () => void {
  const planetKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const planetIds = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

  const handleKeyDown = (e: KeyboardEvent) => {
    // Ignorar se estiver digitando em input
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;

    switch (e.key.toLowerCase()) {
      case ' ':
        e.preventDefault();
        shortcuts.onTogglePlay();
        break;
      case '+':
      case '=':
        shortcuts.onSpeedUp();
        break;
      case '-':
      case '_':
        shortcuts.onSpeedDown();
        break;
      case 'r':
        shortcuts.onReset();
        break;
      case 'b':
        shortcuts.onRewind();
        break;
      case 'o':
        shortcuts.onToggleOrbits();
        break;
      case 'l':
        shortcuts.onToggleLabels();
        break;
      case 'd':
        shortcuts.onToggleDarkMode();
        break;
      case 't':
        shortcuts.onToggleCalculator();
        break;
      case 'c':
        shortcuts.onToggleComparator();
        break;
      case 'g':
        shortcuts.onToggleGraph();
        break;
      case 'escape':
        shortcuts.onSelectPlanet(null);
        break;
      case '0':
        shortcuts.onResetCamera();
        break;
      default:
        // Números 1-9 para selecionar planetas
        const numIndex = planetKeys.indexOf(e.key);
        if (numIndex !== -1) {
          shortcuts.onSelectPlanet(planetIds[numIndex]);
        }
        break;
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}

export const SHORTCUT_HELP = [
  { key: 'Espaço', action: 'Play / Pausa' },
  { key: '+/-', action: 'Velocidade' },
  { key: 'R', action: 'Reset tempo' },
  { key: 'B', action: 'Rebobinar' },
  { key: 'O', action: 'Mostrar órbitas' },
  { key: 'L', action: 'Mostrar nomes' },
  { key: 'D', action: 'Modo escuro/claro' },
  { key: 'T', action: 'Viagem espacial' },
  { key: 'C', action: 'Comparar planetas' },
  { key: 'G', action: 'Gráfico' },
  { key: '0', action: 'Reset câmera' },
  { key: '1-9', action: 'Selecionar planeta' },
  { key: 'Esc', action: 'Fechar painel' },
];
