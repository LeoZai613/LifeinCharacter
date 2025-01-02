import { create } from 'zustand';
import type { Character, CharacterStats, Daily, Habit, Todo, TaskDifficulty } from '../types/character';

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
  todos: []
});

// Helper function to save user data
const saveUser = (user: User) => {
  localStorage.setItem(user.email, JSON.stringify(user));
  console.log('Saved user data:', {
    email: user.email,
    character: {
      stats: user.character?.stats,
      habits: user.character?.habits.length,
      dailies: user.character?.dailies.length,
      todos: user.character?.todos.length
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
        habits: storedUser.character?.habits.length,
        dailies: storedUser.character?.dailies.length,
        todos: storedUser.character?.todos.length
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
      type: 'habit',
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

    saveUser(updatedUser);
    set({ user: updatedUser });
  },

  addDaily: (daily) => {
    const state = get();
    if (!state.user?.character) return;

    const newDaily: Daily = {
      id: Date.now().toString(),
      type: 'daily',
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

    saveUser(updatedUser);
    set({ user: updatedUser });
  },

  addTodo: (todo) => {
    const state = get();
    if (!state.user?.character) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      type: 'todo',
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

    saveUser(updatedUser);
    set({ user: updatedUser });
  },

  completeDaily: (dailyId: string) => {
    const state = get();
    if (!state.user?.character) return;

    const daily = state.user.character.dailies.find(d => d.id === dailyId);
    if (!daily || daily.completed) return;

    const updatedUser = {
      ...state.user,
      character: {
        ...state.user.character,
        dailies: state.user.character.dailies.map(d =>
          d.id === dailyId
            ? { 
                ...d, 
                completed: true,
                streak: d.streak + 1,
              }
            : d
        ),
        experience: state.user.character.experience + 10,
      },
    };

    saveUser(updatedUser);
    set({ user: updatedUser });
  },

  completeTodo: (todoId: string) => {
    const state = get();
    if (!state.user?.character) return;

    const todo = state.user.character.todos.find(t => t.id === todoId);
    if (!todo || todo.completed) return;

    const updatedUser = {
      ...state.user,
      character: {
        ...state.user.character,
        todos: state.user.character.todos.map(t =>
          t.id === todoId
            ? { ...t, completed: true }
            : t
        ),
        experience: state.user.character.experience + 15, // More XP for todos
      },
    };

    saveUser(updatedUser);
    set({ user: updatedUser });
  },

  toggleHabit: (habitId: string, positive: boolean) => {
    const state = get();
    if (!state.user?.character) return;

    const habit = state.user.character.habits.find(h => h.id === habitId);
    if (!habit) return;

    const updatedUser = {
      ...state.user,
      character: {
        ...state.user.character,
        habits: state.user.character.habits.map(h =>
          h.id === habitId
            ? { ...h, count: h.count + (positive ? 1 : -1) }
            : h
        ),
        experience: state.user.character.experience + (positive ? 5 : -5),
      },
    };

    saveUser(updatedUser);
    set({ user: updatedUser });
  },
}));
