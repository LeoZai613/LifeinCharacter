import React from 'react';
import { useDebugCharacterStore } from '../stores/debugCharacterStore';

export const DebugMode: React.FC = () => {
  const debugStore = useDebugCharacterStore();
  const isDebugMode = debugStore.isDebugMode;

  const toggleDebugMode = () => {
    debugStore.isDebugMode = !debugStore.isDebugMode;
    if (debugStore.isDebugMode) {
      debugStore.resetCharacter();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleDebugMode}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          isDebugMode
            ? 'bg-purple-600 text-white hover:bg-purple-700'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {isDebugMode ? 'Debug Mode: ON' : 'Debug Mode: OFF'}
      </button>
    </div>
  );
};
