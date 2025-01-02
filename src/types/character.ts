export interface CharacterStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  difficulty: 'trivial' | 'easy' | 'medium' | 'hard';
  associatedStat: keyof CharacterStats;
  completed: boolean;
  streak: number;
  schedule?: {
    monday?: boolean;
    tuesday?: boolean;
    wednesday?: boolean;
    thursday?: boolean;
    friday?: boolean;
    saturday?: boolean;
    sunday?: boolean;
  };
}

export interface Character {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  experience: number;
  experienceToNextLevel: number;
  health: {
    current: number;
    max: number;
  };
  mana: {
    current: number;
    max: number;
  };
  stats: CharacterStats;
  battleTokens: number;
  habits: Habit[];
  dailies: any[];
  todos: any[];
}