import React, { useState } from 'react';
import { CharacterSheet } from './components/CharacterSheet';
import { HabitTracker } from './components/HabitTracker';
import { CharacterQuiz } from './components/CharacterQuiz';
import type { Character, Habit, CharacterStats } from './types/character';

// Initial character data without stats
const createCharacter = (stats: CharacterStats): Character => ({
  id: '1',
  name: 'Adventurer',
  race: 'Human',
  class: 'Fighter',
  level: 1,
  experience: 0,
  stats,
  battleTokens: 0,
  habits: [
    {
      id: '1',
      name: 'Morning Workout',
      description: 'Complete a 30-minute strength training session',
      frequency: 'daily',
      difficulty: 'medium',
      associatedStat: 'strength',
      completed: false,
      streak: 0
    },
    {
      id: '2',
      name: 'Meditation',
      description: 'Practice mindfulness for 10 minutes',
      frequency: 'daily',
      difficulty: 'easy',
      associatedStat: 'wisdom',
      completed: false,
      streak: 0
    },
    {
      id: '3',
      name: 'Coding Challenge',
      description: 'Solve one programming puzzle',
      frequency: 'daily',
      difficulty: 'hard',
      associatedStat: 'intelligence',
      completed: false,
      streak: 0
    }
  ]
});

function App() {
  const [character, setCharacter] = useState<Character | null>(null);

  const handleQuizComplete = (stats: CharacterStats) => {
    setCharacter(createCharacter(stats));
  };

  const handleHabitComplete = (habitId: string) => {
    if (!character) return;

    setCharacter(prev => {
      if (!prev) return prev;
      
      const updatedHabits = prev.habits.map(habit =>
        habit.id === habitId ? { ...habit, completed: true } : habit
      );

      const earnedToken = Math.random() < 0.2;
      
      return {
        ...prev,
        habits: updatedHabits,
        experience: prev.experience + 10,
        battleTokens: prev.battleTokens + (earnedToken ? 1 : 0)
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center mb-8">Life In Character</h1>
        
        {!character ? (
          <CharacterQuiz onComplete={handleQuizComplete} />
        ) : (
          <>
            <CharacterSheet character={character} />
            <HabitTracker 
              habits={character.habits}
              onComplete={handleHabitComplete}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;