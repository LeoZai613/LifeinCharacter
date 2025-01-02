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

// Helper function to save user data
const saveUser = (user: User) => {
  localStorage.setItem(user.email, JSON.stringify(user));
  console.log('Saved user data:', {
    email: user.email,
    character: {
      stats: user.character?.stats,
      habits: user.character?.habits.map(h => ({
        name: h.name,
        streak: h.streak,
        completed: h.completed,
        associatedStat: h.associatedStat
      }))
    }
  });
};

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  isAuthenticated: false,

  signup: (email: string, password: string, username: string) => {
    const existingUser = localStorage.getItem(email);
    if (existingUser) {
      return false;
    }

    const newUser: User = {
      email,
      password,
      username,
      character: null,
    };

    saveUser(newUser);
    set({ user: newUser, isAuthenticated: true });
    return true;
  },

  login: (email: string, password: string) => {
    const userJson = localStorage.getItem(email);
    if (!userJson) {
      return false;
    }

    const storedUser: User = JSON.parse(userJson);
    if (storedUser.password !== password) {
      return false;
    }

    console.log('Loaded user data:', {
      email: storedUser.email,
      character: {
        stats: storedUser.character?.stats,
        habits: storedUser.character?.habits.map(h => ({
          name: h.name,
          streak: h.streak,
          completed: h.completed,
          associatedStat: h.associatedStat
        }))
      }
    });
    set({ user: storedUser, isAuthenticated: true });
    return true;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  setCharacter: (stats: CharacterStats) => {
    const state = get();
    if (!state.user) return;

    const updatedUser = {
      ...state.user,
      character: createInitialCharacter(stats),
    };

    saveUser(updatedUser);
    set({ user: updatedUser });
  },

  addHabit: (habit) => {
    const state = get();
    if (!state.user?.character) return;

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

    saveUser(updatedUser);
    set({ user: updatedUser });
  },

  completeHabit: (habitId: string) => {
    const state = get();
    if (!state.user?.character) return;

    const habit = state.user.character.habits.find(h => h.id === habitId);
    if (!habit || habit.completed) return;

    const updatedUser = {
      ...state.user,
      character: {
        ...state.user.character,
        habits: state.user.character.habits.map(h =>
          h.id === habitId
            ? { 
                ...h, 
                completed: true,
                streak: h.streak + 1,
              }
            : h
        ),
        experience: state.user.character.experience + 10,
      },
    };

    console.log('Completing habit:', {
      habitId,
      beforeStreak: habit.streak,
      afterStreak: habit.streak + 1,
      updatedHabit: updatedUser.character.habits.find(h => h.id === habitId)
    });

    saveUser(updatedUser);
    set({ user: updatedUser });
  },
}));
