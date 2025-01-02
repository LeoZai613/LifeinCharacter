import { create } from 'zustand';
import type { Character, CharacterStats, Habit } from '../types/character';

interface User {
  email: string;
  username: string;
  password: string;
  character: Character | null;
}

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string, username: string) => boolean;
  logout: () => void;
  setCharacter: (stats: CharacterStats) => void;
  addHabit: (habit: Omit<Habit, 'id' | 'completed' | 'streak'>) => void;
  completeHabit: (habitId: string) => void;
}

const createInitialCharacter = (stats: CharacterStats): Character => ({
  id: Date.now().toString(),
  name: 'Adventurer',
  race: 'Human',
  class: 'Fighter',
  level: 1,
  experience: 0,
  experienceToNextLevel: 100,
  health: {
    current: 50,
    max: 50,
  },
  mana: {
    current: 30,
    max: 30,
  },
  stats,
  battleTokens: 0,
  habits: [],
  dailies: [],
  todos: []
});

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,

  signup: (email: string, password: string, username: string) => {
    // Check if user exists in localStorage
    const existingUser = localStorage.getItem(email);
    if (existingUser) {
      return false;
    }

    // Create new user
    const newUser: User = {
      email,
      password,
      username,
      character: null,
    };

    // Save to localStorage
    localStorage.setItem(email, JSON.stringify(newUser));

    // Update store
    set({ user: newUser, isAuthenticated: true });
    return true;
  },

  login: (email: string, password: string) => {
    // Get user from localStorage
    const userJson = localStorage.getItem(email);
    if (!userJson) {
      return false;
    }

    const storedUser: User = JSON.parse(userJson);
    if (storedUser.password !== password) {
      return false;
    }

    // Update store
    set({ user: storedUser, isAuthenticated: true });
    return true;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  setCharacter: (stats: CharacterStats) => {
    set((state) => {
      if (!state.user) return state;

      const updatedUser = {
        ...state.user,
        character: createInitialCharacter(stats),
      };

      // Update localStorage
      localStorage.setItem(updatedUser.email, JSON.stringify(updatedUser));

      return { user: updatedUser };
    });
  },

  addHabit: (habit) => {
    set((state) => {
      if (!state.user?.character) return state;

      const newHabit: Habit = {
        id: Date.now().toString(),
        completed: false,
        streak: 0,
        ...habit,
      };

      const updatedUser = {
        ...state.user,
        character: {
          ...state.user.character,
          habits: [...state.user.character.habits, newHabit],
        },
      };

      // Update localStorage
      localStorage.setItem(updatedUser.email, JSON.stringify(updatedUser));

      return { user: updatedUser };
    });
  },

  completeHabit: (habitId) => {
    set((state) => {
      if (!state.user?.character) return state;

      const updatedHabits = state.user.character.habits.map(habit =>
        habit.id === habitId
          ? { 
              ...habit, 
              completed: true,
              streak: habit.streak + 1,
            }
          : habit
      );

      const updatedUser = {
        ...state.user,
        character: {
          ...state.user.character,
          habits: updatedHabits,
          experience: state.user.character.experience + 10, // Add XP for completing habit
        },
      };

      // Update localStorage
      localStorage.setItem(updatedUser.email, JSON.stringify(updatedUser));

      return { user: updatedUser };
    });
  },
}));
