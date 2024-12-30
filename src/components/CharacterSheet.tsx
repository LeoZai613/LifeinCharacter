import React from 'react';
import { Shield, Sword, Brain, Heart, Eye, MessageCircle } from 'lucide-react';
import type { Character } from '../types/character';

interface CharacterSheetProps {
  character: Character;
}

const StatDisplay = ({ 
  label, 
  value, 
  icon: Icon 
}: { 
  label: string; 
  value: number; 
  icon: React.ElementType;
}) => (
  <div className="flex items-center gap-2 p-3 bg-white/10 rounded-lg">
    <Icon className="w-5 h-5 text-yellow-400" />
    <div>
      <div className="text-sm text-gray-300">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  </div>
);

export function CharacterSheet({ character }: CharacterSheetProps) {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-xl">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-1">{character.name}</h2>
        <div className="text-gray-400">
          Level {character.level} {character.race} {character.class}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatDisplay label="Strength" value={character.stats.strength} icon={Sword} />
        <StatDisplay label="Dexterity" value={character.stats.dexterity} icon={Shield} />
        <StatDisplay label="Constitution" value={character.stats.constitution} icon={Heart} />
        <StatDisplay label="Intelligence" value={character.stats.intelligence} icon={Brain} />
        <StatDisplay label="Wisdom" value={character.stats.wisdom} icon={Eye} />
        <StatDisplay label="Charisma" value={character.stats.charisma} icon={MessageCircle} />
      </div>

      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
        <div>
          <div className="text-sm text-gray-400">Experience</div>
          <div className="text-lg font-semibold">{character.experience} XP</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Battle Tokens</div>
          <div className="text-lg font-semibold">{character.battleTokens} 🎲</div>
        </div>
      </div>
    </div>
  );
}