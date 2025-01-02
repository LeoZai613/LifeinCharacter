import React from 'react';
import type { Habit } from '../types/character';
import { CheckCircle, Circle, Flame, Calendar } from 'lucide-react';

interface HabitTrackerProps {
  habits: Habit[];
  onComplete: (habitId: string) => void;
}

export function HabitTracker({ habits, onComplete }: HabitTrackerProps) {
  const getDifficultyColor = (difficulty: Habit['difficulty']) => {
    switch (difficulty) {
      case 'trivial': return 'bg-gray-500/20 text-gray-300';
      case 'easy': return 'bg-green-500/20 text-green-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'hard': return 'bg-red-500/20 text-red-300';
    }
  };

  const getStreakBonus = (streak: number) => {
    const multiplier = Math.min(1 + (streak * 0.1), 2.0);
    return `${Math.round(multiplier * 100)}%`;
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Daily Quests</h2>
      <div className="space-y-4">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className={`flex items-center justify-between p-4 rounded-lg ${
              habit.completed ? 'bg-green-900/20' : 'bg-white/5'
            } transition-all duration-200 hover:bg-white/10`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{habit.name}</h3>
                {habit.streak > 0 && (
                  <div className="flex items-center gap-1 text-orange-400">
                    <Flame className="w-4 h-4" />
                    <span className="text-sm">{habit.streak}</span>
                  </div>
                )}
              </div>
              
              <p className="text-sm text-gray-400">{habit.description}</p>
              
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(habit.difficulty)}`}>
                  {habit.difficulty}
                </span>
                <span className="text-xs text-gray-400">
                  Affects {habit.associatedStat}
                </span>
                {habit.streak > 0 && (
                  <span className="text-xs text-orange-400">
                    Bonus: {getStreakBonus(habit.streak)}
                  </span>
                )}
              </div>

              {habit.schedule && (
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {Object.entries(habit.schedule)
                      .filter(([_, active]) => active)
                      .map(([day]) => day.charAt(0).toUpperCase())
                      .join(', ')}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => onComplete(habit.id)}
              className={`ml-4 p-2 rounded-full transition-colors ${
                habit.completed
                  ? 'bg-green-500/20 text-green-400'
                  : 'hover:bg-white/10 text-gray-400'
              }`}
              disabled={habit.completed}
            >
              {habit.completed ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}