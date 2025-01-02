import React from 'react';
import { useUserStore } from '../stores/userStore';
import { CheckCircle, Circle, Flame, Calendar, Sword, Shield, Heart, Brain, Eye, MessageCircle } from 'lucide-react';

export function CharacterDashboard() {
  const user = useUserStore((state) => state.user);
  const character = user?.character;

  const getStatIcon = (stat: string) => {
    const icons = {
      strength: Sword,
      dexterity: Shield,
      constitution: Heart,
      intelligence: Brain,
      wisdom: Eye,
      charisma: MessageCircle
    };
    const Icon = icons[stat as keyof typeof icons];
    return Icon ? <Icon className="w-5 h-5" /> : null;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'trivial': return 'bg-gray-700 text-gray-300';
      case 'easy': return 'bg-green-900/40 text-green-300';
      case 'medium': return 'bg-yellow-900/40 text-yellow-300';
      case 'hard': return 'bg-red-900/40 text-red-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const getStreakBonus = (streak: number) => {
    const multiplier = Math.min(1 + (streak * 0.1), 2.0);
    return `${Math.round(multiplier * 100)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Character Stats Panel */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-xl text-gray-100">
        <h2 className="text-3xl font-bold mb-2">{character?.name || 'Adventurer'}</h2>
        <p className="text-gray-400 mb-6">
          Level {character?.level || 1} {character?.race || 'Human'} {character?.class || 'Fighter'}
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          {character?.stats && Object.entries(character.stats).map(([stat, value]) => (
            <div key={stat} className="bg-gray-800 p-4 rounded-lg flex items-start gap-3">
              {getStatIcon(stat)}
              <div>
                <div className="text-gray-400 text-sm">
                  {stat.charAt(0).toUpperCase() + stat.slice(1)}
                </div>
                <div className="text-2xl font-bold">{value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-gray-400 text-sm">Experience</div>
            <div className="text-xl font-bold">{character?.experience || 0} XP</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-gray-400 text-sm">Battle Tokens</div>
            <div className="text-xl font-bold flex items-center gap-2">
              {character?.battleTokens || 0}
              <div className="w-5 h-5 bg-gray-600 rounded-full"/>
            </div>
          </div>
        </div>
      </div>

      {/* Habits Panel */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-xl text-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Daily Quests</h2>
          <button
            onClick={() => {/* TODO: Add new habit */}}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Add Quest
          </button>
        </div>

        {(!character?.habits || character.habits.length === 0) ? (
          <div className="text-center py-8 text-gray-400">
            No quests yet. Add one to begin your journey!
          </div>
        ) : (
          <div className="space-y-4">
            {character.habits.map(habit => (
              <div
                key={habit.id}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  habit.completed ? 'bg-green-900/20' : 'bg-gray-800 hover:bg-gray-700'
                }`}
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
                  onClick={() => {/* TODO: Complete habit */}}
                  disabled={habit.completed}
                  className={`ml-4 p-2 rounded-full transition-colors ${
                    habit.completed
                      ? 'bg-green-500/20 text-green-400'
                      : 'hover:bg-gray-600 text-gray-400'
                  }`}
                >
                  {habit.completed ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
