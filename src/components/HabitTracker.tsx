import React from 'react';
import type { Habit } from '../types/character';
import { CheckCircle, Circle } from 'lucide-react';

interface HabitTrackerProps {
  habits: Habit[];
  onComplete: (habitId: string) => void;
}

export function HabitTracker({ habits, onComplete }: HabitTrackerProps) {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Daily Quests</h2>
      <div className="space-y-4">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className={`flex items-center justify-between p-4 rounded-lg ${
              habit.completed ? 'bg-green-900/20' : 'bg-white/5'
            }`}
          >
            <div className="flex-1">
              <h3 className="font-semibold">{habit.name}</h3>
              <p className="text-sm text-gray-400">{habit.description}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-1 rounded ${
                  habit.difficulty === 'easy' ? 'bg-green-500/20 text-green-300' :
                  habit.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {habit.difficulty}
                </span>
                <span className="text-xs text-gray-400">
                  Affects {habit.associatedStat}
                </span>
              </div>
            </div>
            <button
              onClick={() => onComplete(habit.id)}
              className="ml-4 p-2 rounded-full hover:bg-white/10 transition-colors"
              disabled={habit.completed}
            >
              {habit.completed ? (
                <CheckCircle className="w-6 h-6 text-green-400" />
              ) : (
                <Circle className="w-6 h-6 text-gray-400" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}