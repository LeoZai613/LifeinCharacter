import { defineStore } from 'pinia';
import type { Character, Habit } from '../types/character';

export const useCharacterStore = defineStore('character', {
  state: () => ({
    character: null as Character | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getCharacterStats: (state) => state.character?.stats,
    getHabits: (state) => state.character?.habits || [],
    getBattleTokens: (state) => state.character?.battleTokens || 0,
    getLevel: (state) => state.character?.level || 1,
  },

  actions: {
    async initializeCharacter(characterData: Partial<Character>) {
      this.loading = true;
      try {
        // In a real app, this would be an API call
        this.character = {
          id: crypto.randomUUID(),
          name: characterData.name || 'New Character',
          race: characterData.race || 'Human',
          class: characterData.class || 'Fighter',
          level: 1,
          experience: 0,
          battleTokens: 0,
          stats: {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10,
          },
          habits: [],
          ...characterData,
        };
      } catch (err) {
        this.error = 'Failed to initialize character';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async addHabit(habit: Omit<Habit, 'id' | 'completed' | 'streak'>) {
      if (!this.character) return;
      
      const newHabit: Habit = {
        id: crypto.randomUUID(),
        completed: false,
        streak: 0,
        ...habit,
      };

      this.character.habits.push(newHabit);
    },

    async completeHabit(habitId: string) {
      if (!this.character) return;

      const habit = this.character.habits.find(h => h.id === habitId);
      if (!habit) return;

      habit.completed = true;
      habit.streak += 1;

      // Calculate experience and stat gains based on difficulty
      const expGains = {
        easy: 10,
        medium: 25,
        hard: 50,
      };

      const statGains = {
        easy: 1,
        medium: 2,
        hard: 3,
      };

      this.character.experience += expGains[habit.difficulty];
      this.character.stats[habit.associatedStat] += statGains[habit.difficulty];

      // Level up check (simple implementation)
      const expNeededForNextLevel = this.character.level * 100;
      if (this.character.experience >= expNeededForNextLevel) {
        this.character.level += 1;
        this.character.battleTokens += 1;
      }
    },

    resetDailyHabits() {
      if (!this.character) return;

      this.character.habits.forEach(habit => {
        if (habit.frequency === 'daily') {
          habit.completed = false;
        }
      });
    },
  },
});
