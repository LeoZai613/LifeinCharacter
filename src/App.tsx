import React from 'react';
import { CharacterDashboard } from './components/CharacterDashboard';
import { CharacterQuiz } from './components/CharacterQuiz';
import { Auth } from './components/Auth';
import { useUserStore } from './stores/userStore';
import type { CharacterStats } from './types/character';

function App() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);
  const setCharacter = useUserStore((state) => state.setCharacter);
  const logout = useUserStore((state) => state.logout);

  const handleQuizComplete = (stats: CharacterStats) => {
    setCharacter(stats);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!isAuthenticated ? (
        <Auth />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Life In Character</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                Welcome, {user?.username}!
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Logout
              </button>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto space-y-6">
            {!user?.character ? (
              <CharacterQuiz onComplete={handleQuizComplete} />
            ) : (
              <CharacterDashboard />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;