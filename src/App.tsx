import React from 'react';
import { CharacterDashboard } from './components/CharacterDashboard';
import { CharacterQuiz } from './components/CharacterQuiz';
import { Auth } from './components/Auth';
import { DebugMode } from './components/DebugMode';
import { useUserStore } from './stores/userStore';
import { useDebugCharacterStore } from './stores/debugCharacterStore';
import type { CharacterStats } from './types/character';

function App() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);
  const setCharacter = useUserStore((state) => state.setCharacter);
  const logout = useUserStore((state) => state.logout);
  const debugStore = useDebugCharacterStore();

  const handleQuizComplete = (stats: CharacterStats) => {
    setCharacter(stats);
  };

  // Use debug character if in debug mode
  const character = debugStore.isDebugMode ? debugStore.character : user?.character;
  const showCharacterCreation = !debugStore.isDebugMode && !user?.character;

  return (
    <div className="min-h-screen bg-gray-100">
      {!isAuthenticated && !debugStore.isDebugMode ? (
        <Auth />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Life In Character</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                {debugStore.isDebugMode ? 'Debug Mode' : `Welcome, ${user?.username}!`}
              </span>
              {!debugStore.isDebugMode && (
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto space-y-6">
            {showCharacterCreation ? (
              <CharacterQuiz onComplete={handleQuizComplete} />
            ) : (
              <CharacterDashboard />
            )}
          </div>
        </div>
      )}
      <DebugMode />
    </div>
  );
}

export default App;