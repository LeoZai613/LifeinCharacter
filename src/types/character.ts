export interface CharacterStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface BaseTask {
  id: string;
  name: string;
  description: string;
  difficulty: 'trivial' | 'easy' | 'medium' | 'hard';
  completed: boolean;
  lastCompleted: string | null;
  associatedStat: keyof CharacterStats;
  streak: number;
  history: {
    completedAt: string;
    streak: number;
  }[];
}

export interface Habit extends BaseTask {
  type: 'habit';
  schedule?: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
}

export interface Daily extends BaseTask {
  type: 'daily';
  schedule: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
}

export interface Todo extends BaseTask {
  type: 'todo';
  dueDate?: string;
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
  dailies: Daily[];
  todos: Todo[];
}