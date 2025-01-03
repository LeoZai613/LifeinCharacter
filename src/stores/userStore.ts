import { create } from 'zustand';
import type { Character, CharacterStats, Daily, Habit, Todo } from '../types/character';

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
  addHabit: (habit: Omit<Habit, 'id' | 'type' | 'count'>) => void;
  addDaily: (daily: Omit<Daily, 'id' | 'type' | 'completed' | 'streak'>) => void;
  addTodo: (todo: Omit<Todo, 'id' | 'type' | 'completed'>) => void;
  completeDaily: (dailyId: string) => void;
  completeTodo: (todoId: string) => void;
  toggleHabit: (habitId: string, positive: boolean) => void;
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
  todos: [],
  avatar: {
    class: 'warrior',
    race: 'human',
    gender: 'other',
    colors: {
      skin: '#FFD1AA',
      hair: '#4A3728',
      eyes: '#2E4B9C',
    },
    features: {
      hairStyle: 'short',
      faceStyle: 'round',
      bodyType: 'athletic',
    },
    equipment: {},
    level: 1,
  }
});

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

    localStorage.setItem(email, JSON.stringify(newUser));
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

    localStorage.setItem(updatedUser.email, JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },

  addHabit: (habit) => {
    const state = get();
    if (!state.user?.character) return;

    const newHabit = {
      id: Date.now().toString(),
      type: 'habit' as const,
      count: 0,
      ...habit,
    };

    const updatedUser = {
      ...state.user,
      character: {
        ...state.user.character,
        habits: [...state.user.character.habits, newHabit],
      },
    };

    localStorage.setItem(updatedUser.email, JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },

  addDaily: (daily) => {
    const state = get();
    if (!state.user?.character) return;

    const newDaily = {
      id: Date.now().toString(),
      type: 'daily' as const,
      completed: false,
      streak: 0,
      ...daily,
    };

    const updatedUser = {
      ...state.user,
      character: {
        ...state.user.character,
        dailies: [...state.user.character.dailies, newDaily],
      },
    };

    localStorage.setItem(updatedUser.email, JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },

  addTodo: (todo) => {
    const state = get();
    if (!state.user?.character) return;

    const newTodo = {
      id: Date.now().toString(),
      type: 'todo' as const,
      completed: false,
      ...todo,
    };

    const updatedUser = {
      ...state.user,
      character: {
        ...state.user.character,
        todos: [...state.user.character.todos, newTodo],
      },
    };

    localStorage.setItem(updatedUser.email, JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },

  completeDaily: (dailyId: string) => {
    const state = get();
    if (!state.user?.character) return;

    const updatedUser = {
      ...state.user,
      character: {
        ...state.user.character,
        dailies: state.user.character.dailies.map(daily =>
          daily.id === dailyId
            ? { ...daily, completed: true, streak: daily.streak + 1 }
            : daily
        ),
      },
    };

    localStorage.setItem(updatedUser.email, JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },

  completeTodo: (todoId: string) => {
    const state = get();
    if (!state.user?.character) return;

    const updatedUser = {
      ...state.user,
      character: {
        ...state.user.character,
        todos: state.user.character.todos.map(todo =>
          todo.id === todoId ? { ...todo, completed: true } : todo
        ),
      },
    };

    localStorage.setItem(updatedUser.email, JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },

  toggleHabit: (habitId: string, positive: boolean) => {
    const state = get();
    if (!state.user?.character) return;

    const updatedUser = {
      ...state.user,
      character: {
        ...state.user.character,
        habits: state.user.character.habits.map(habit =>
          habit.id === habitId ? { ...habit, count: habit.count + 1 } : habit
        ),
      },
    };

    localStorage.setItem(updatedUser.email, JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },
}));
