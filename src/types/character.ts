export interface CharacterStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export type TaskDifficulty = 'trivial' | 'easy' | 'medium' | 'hard';
export type TaskFrequency = 'daily' | 'weekly' | 'monthly';

interface BaseTask {
  id: string;
  name: string;
  description: string;
  difficulty: TaskDifficulty;
  associatedStat: keyof CharacterStats;
}

export interface Habit extends BaseTask {
  type: 'habit';
  positive: boolean;
  negative: boolean;
  count: number;
}

export interface Daily extends BaseTask {
  type: 'daily';
  frequency: TaskFrequency;
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

export interface Todo extends BaseTask {
  type: 'todo';
  completed: boolean;
  dueDate?: string;
  checklist?: {
    id: string;
    text: string;
    completed: boolean;
  }[];
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