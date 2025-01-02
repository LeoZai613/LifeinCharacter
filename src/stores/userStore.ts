import { create } from 'zustand';
import type { Character, CharacterStats } from '../types/character';

interface User {
  id: string;
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

// Helper function to save state to localStorage
const saveToStorage = (email: string, data: User) => {
  localStorage.setItem(`user_${email}`, JSON.stringify(data));
};

// Helper function to get state from localStorage
const getFromStorage = (email: string): User | null => {
  const data = localStorage.getItem(`user_${email}`);
  return data ? JSON.parse(data) : null;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,

  signup: (email: string, password: string, username: string) => {
    // Check if user already exists
    const existingUser = getFromStorage(email);
    if (existingUser) {
      return false; // User already exists
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      username,
      password,
      character: null
    };

    saveToStorage(email, newUser);
    set({ user: newUser, isAuthenticated: true });
    return true;
  },

  login: (email: string, password: string) => {
    const savedUser = getFromStorage(email);
    if (!savedUser || savedUser.password !== password) {
      return false; // Invalid credentials
    }

    set({ user: savedUser, isAuthenticated: true });
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
        character: {
          id: '1',
          name: 'Adventurer',
          race: 'Human',
          class: 'Fighter',
          level: 1,
          experience: 0,
          stats,
          battleTokens: 0,
          habits: []
        }
      };

      // Save to localStorage
      saveToStorage(updatedUser.email, updatedUser);

      return { user: updatedUser };
    });
  }
}));
