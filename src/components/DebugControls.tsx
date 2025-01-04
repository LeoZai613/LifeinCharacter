import React from 'react';
import { useDebugCharacterStore } from '../stores/debugCharacterStore';
import type { CharacterStats } from '../types/character';

export const DebugControls: React.FC = () => {
  const { character, updateStats, gainExperience, updateBattleTokens, updateHealth } = useDebugCharacterStore();

  const handleStatChange = (stat: keyof CharacterStats, value: number) => {
    updateStats({ [stat]: value });
  };

  const handleAddExperience = (amount: number) => {
    gainExperience(amount);
  };

  const handleAddBattleTokens = (amount: number) => {
    updateBattleTokens(amount);
  };

  const handleHealthChange = (amount: number) => {
    updateHealth(amount);
  };

  return (
    <div className="fixed left-4 top-20 z-50 bg-gray-800 text-white p-4 rounded-lg shadow-lg w-64">
      <h3 className="text-lg font-bold mb-4">Debug Controls</h3>
      
      {/* Stats Controls */}
      <div className="space-y-2 mb-4">
        <h4 className="text-sm font-semibold text-gray-300">Stats</h4>
        {Object.entries(character.stats).map(([stat, value]) => (
          <div key={stat} className="flex items-center justify-between">
            <span className="capitalize">{stat}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleStatChange(stat as keyof CharacterStats, value - 1)}
                className="px-2 py-1 bg-red-600 rounded hover:bg-red-700"
              >
                -
              </button>
              <span className="w-8 text-center">{value}</span>
              <button
                onClick={() => handleStatChange(stat as keyof CharacterStats, value + 1)}
                className="px-2 py-1 bg-green-600 rounded hover:bg-green-700"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Experience Controls */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-300 mb-2">Experience</h4>
        <div className="flex gap-2">
          <button
            onClick={() => handleAddExperience(10)}
            className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
          >
            +10 XP
          </button>
          <button
            onClick={() => handleAddExperience(50)}
            className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
          >
            +50 XP
          </button>
          <button
            onClick={() => handleAddExperience(100)}
            className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
          >
            +100 XP
          </button>
        </div>
      </div>

      {/* Health Controls */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-300 mb-2">Health</h4>
        <div className="flex gap-2">
          <button
            onClick={() => handleHealthChange(-10)}
            className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
          >
            -10 HP
          </button>
          <button
            onClick={() => handleHealthChange(10)}
            className="px-3 py-1 bg-green-600 rounded hover:bg-green-700"
          >
            +10 HP
          </button>
        </div>
      </div>

      {/* Battle Tokens */}
      <div>
        <h4 className="text-sm font-semibold text-gray-300 mb-2">Battle Tokens</h4>
        <div className="flex gap-2">
          <button
            onClick={() => handleAddBattleTokens(1)}
            className="px-3 py-1 bg-purple-600 rounded hover:bg-purple-700"
          >
            +1 Token
          </button>
          <button
            onClick={() => handleAddBattleTokens(5)}
            className="px-3 py-1 bg-purple-600 rounded hover:bg-purple-700"
          >
            +5 Tokens
          </button>
        </div>
      </div>
    </div>
  );
};
