import { create } from 'zustand';
import type { Character, CharacterStats, Habit, Daily } from '../types/character';

const DEFAULT_CHARACTER: Character = {
  id: 'debug-character',
  name: 'Debug Character',
  race: 'Human',
  class: 'Fighter',
  level: 1,
  experience: 0,
  experienceToNextLevel: 100,
  battleTokens: 0,
  stats: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  },
  health: {
    current: 100,
    max: 100,
  },
  mana: {
    current: 50,
    max: 50,
  },
  habits: [],
  dailies: [],
  todos: [],
};

interface DebugCharacterStore {
  character: Character;
  isDebugMode: boolean;
  resetCharacter: () => void;
  updateStats: (stats: Partial<CharacterStats>) => void;
  addHabit: (habit: Omit<Habit, 'id' | 'type' | 'count'>) => void;
  addDaily: (daily: Omit<Daily, 'id' | 'type' | 'completed' | 'streak'>) => void;
  completeDaily: (dailyId: string) => void;
  toggleHabit: (habitId: string, positive: boolean) => void;
  gainExperience: (amount: number) => void;
  levelUp: () => void;
  updateBattleTokens: (amount: number) => void;
  updateHealth: (amount: number) => void;
  updateMana: (amount: number) => void;
}

export const useDebugCharacterStore = create<DebugCharacterStore>((set) => ({
  character: DEFAULT_CHARACTER,
  isDebugMode: false,

  resetCharacter: () => set({ character: { ...DEFAULT_CHARACTER } }),

  updateStats: (stats) => set((state) => ({
    character: {
      ...state.character,
      stats: {
        ...state.character.stats,
        ...stats,
      },
    },
  })),

  addHabit: (habit) => set((state) => ({
    character: {
      ...state.character,
      habits: [
        ...state.character.habits,
        {
          id: `debug-habit-${crypto.randomUUID()}`,
          type: 'habit',
          count: 0,
          ...habit,
        },
      ],
    },
  })),

  addDaily: (daily) => set((state) => ({
    character: {
      ...state.character,
      dailies: [
        ...state.character.dailies,
        {
          id: `debug-daily-${crypto.randomUUID()}`,
          type: 'daily',
          completed: false,
          streak: 0,
          ...daily,
        },
      ],
    },
  })),

  completeDaily: (dailyId) => set((state) => {
    const daily = state.character.dailies.find(d => d.id === dailyId);
    if (!daily) return state;

    return {
      character: {
        ...state.character,
        dailies: state.character.dailies.map(d =>
          d.id === dailyId
            ? { ...d, completed: true, streak: d.streak + 1 }
            : d
        ),
      },
    };
  }),

  toggleHabit: (habitId, positive) => set((state) => {
    const habit = state.character.habits.find(h => h.id === habitId);
    if (!habit) return state;

    return {
      character: {
        ...state.character,
        habits: state.character.habits.map(h =>
          h.id === habitId
            ? { ...h, count: h.count + (positive ? 1 : -1) }
            : h
        ),
      },
    };
  }),

  gainExperience: (amount) => set((state) => {
    const newExperience = state.character.experience + amount;
    if (newExperience >= state.character.experienceToNextLevel) {
      return {
        character: {
          ...state.character,
          level: state.character.level + 1,
          experience: newExperience - state.character.experienceToNextLevel,
          experienceToNextLevel: Math.floor(state.character.experienceToNextLevel * 1.5),
        },
      };
    }
    return {
      character: {
        ...state.character,
        experience: newExperience,
      },
    };
  }),

  levelUp: () => set((state) => ({
    character: {
      ...state.character,
      level: state.character.level + 1,
      experience: 0,
      experienceToNextLevel: Math.floor(state.character.experienceToNextLevel * 1.5),
    },
  })),

  updateBattleTokens: (amount) => set((state) => ({
    character: {
      ...state.character,
      battleTokens: state.character.battleTokens + amount,
    },
  })),

  updateHealth: (amount) => set((state) => ({
    character: {
      ...state.character,
      health: {
        ...state.character.health,
        current: Math.min(
          state.character.health.max,
          Math.max(0, state.character.health.current + amount)
        ),
      },
    },
  })),

  updateMana: (amount) => set((state) => ({
    character: {
      ...state.character,
      mana: {
        ...state.character.mana,
        current: Math.min(
          state.character.mana.max,
          Math.max(0, state.character.mana.current + amount)
        ),
      },
    },
  })),
}));
