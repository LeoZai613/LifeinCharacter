import { create } from 'zustand';
import type { Character, CharacterStats } from '../types/character';

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
    const newUser = {
      email,
      username,
      password,
      character: null
    };

    // Save to localStorage
    localStorage.setItem(email, JSON.stringify(newUser));
    
    // Update state
    set({ user: newUser, isAuthenticated: true });
    return true;
  },

  login: (email: string, password: string) => {
    // Get user from localStorage
    const storedUser = localStorage.getItem(email);
    if (!storedUser) {
      return false;
    }

    // Parse user data
    const user = JSON.parse(storedUser);
    
    // Check password
    if (user.password !== password) {
      return false;
    }

    // Update state
    set({ user, isAuthenticated: true });
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
        character: createInitialCharacter(stats)
      };

      // Save to localStorage
      localStorage.setItem(updatedUser.email, JSON.stringify(updatedUser));

      return { user: updatedUser };
    });
  }
}));
