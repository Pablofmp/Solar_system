import { SHORTCUT_HELP } from '../utils/keyboardShortcuts';

interface ShortcutsModalProps {
  onClose: () => void;
}

export function ShortcutsModal({ onClose }: ShortcutsModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gray-950/98 border border-gray-700/50 rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-light text-white">⌨️ Atalhos de Teclado</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2">
          {SHORTCUT_HELP.map((shortcut, i) => (
            <div key={i} className="flex justify-between items-center py-2 px-3 rounded-lg bg-gray-900/30">
              <span className="text-gray-300 text-sm font-light">{shortcut.action}</span>
              <kbd className="px-3 py-1 rounded-lg bg-gray-800 border border-gray-700 text-xs text-gray-300 font-mono">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-950/30 rounded-xl p-4 border border-blue-800/30">
          <p className="text-blue-300/90 text-xs font-light">
            💡 Dica: Use os atalhos para uma navegação mais rápida e eficiente pelo sistema solar!
          </p>
        </div>
      </div>
    </div>
  );
}
