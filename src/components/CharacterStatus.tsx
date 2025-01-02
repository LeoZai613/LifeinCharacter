import React from 'react';
import { Character } from '../types/character';

interface CharacterStatusProps {
  character: Character;
}

export const CharacterStatus: React.FC<CharacterStatusProps> = ({ character }) => {
  const getHealthPercentage = () => {
    return (character.health.current / character.health.max) * 100;
  };

  const getManaPercentage = () => {
    return (character.mana.current / character.mana.max) * 100;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="space-y-4">
        {/* Health Bar */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Health</span>
            <span className="text-sm text-gray-600">
              {character.health.current}/{character.health.max}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-red-600 h-2.5 rounded-full"
              style={{ width: `${getHealthPercentage()}%` }}
            ></div>
          </div>
        </div>

        {/* Mana Bar */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Mana</span>
            <span className="text-sm text-gray-600">
              {character.mana.current}/{character.mana.max}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${getManaPercentage()}%` }}
            ></div>
          </div>
        </div>

        {/* Character Info */}
        <div className="pt-2 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Level:</span>{' '}
              <span className="font-medium">{character.level}</span>
            </div>
            <div>
              <span className="text-gray-500">Class:</span>{' '}
              <span className="font-medium">{character.class}</span>
            </div>
            <div>
              <span className="text-gray-500">Race:</span>{' '}
              <span className="font-medium">{character.race}</span>
            </div>
            <div>
              <span className="text-gray-500">XP:</span>{' '}
              <span className="font-medium">
                {character.experience}/{character.experienceToNextLevel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
