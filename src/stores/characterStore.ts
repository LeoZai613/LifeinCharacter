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
          health: {
            current: 100,
            max: 100,
          },
          mana: {
            current: 100,
            max: 100,
          },
          ...characterData,
        };
      } catch (err) {
        this.error = 'Failed to initialize character';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async addHabit(habit: Omit<Habit, 'id' | 'completed' | 'streak' | 'history' | 'lastCompleted'>) {
      if (!this.character) return;
      
      const newHabit: Habit = {
        id: crypto.randomUUID(),
        completed: false,
        streak: 0,
        history: [],
        lastCompleted: null,
        ...habit,
      };

      this.character.habits.push(newHabit);
    },

    async completeHabit(habitId: string) {
      if (!this.character) return;

      const habit = this.character.habits.find(h => h.id === habitId);
      if (!habit) return;

      const now = new Date().toISOString();
      
      // Check if this is a new day compared to last completion
      const isNewDay = !habit.lastCompleted || 
        new Date(habit.lastCompleted).toDateString() !== new Date(now).toDateString();

      if (!habit.completed && isNewDay) {
        habit.completed = true;
        habit.lastCompleted = now;
        habit.streak += 1;
        habit.history.push({
          completedAt: now,
          streak: habit.streak
        });

        // Calculate experience and stat gains based on difficulty and streak
        const baseExpGains = {
          trivial: 5,
          easy: 10,
          medium: 25,
          hard: 50,
        };

        const baseStatGains = {
          trivial: 1,
          easy: 2,
          medium: 3,
          hard: 4,
        };

        // Bonus multiplier based on streak
        const streakMultiplier = Math.min(1 + (habit.streak * 0.1), 2.0); // Max 2x bonus at 10 streak

        const expGain = Math.round(baseExpGains[habit.difficulty] * streakMultiplier);
        const statGain = Math.round(baseStatGains[habit.difficulty] * streakMultiplier);

        this.character.experience += expGain;
        this.character.stats[habit.associatedStat] += statGain;

        // Update health and mana
        const healthGain = Math.round(baseStatGains[habit.difficulty] * streakMultiplier);
        const manaGain = Math.round(baseStatGains[habit.difficulty] * streakMultiplier);

        this.character.health.current = Math.min(
          this.character.health.current + healthGain,
          this.character.health.max
        );
        this.character.mana.current = Math.min(
          this.character.mana.current + manaGain,
          this.character.mana.max
        );

        // Level up check with improved rewards
        const expNeededForNextLevel = this.character.level * 100;
        if (this.character.experience >= expNeededForNextLevel) {
          this.character.level += 1;
          this.character.experience -= expNeededForNextLevel;
          this.character.battleTokens += this.character.level; // More tokens at higher levels
          
          // Increase max health and mana on level up
          this.character.health.max += 5;
          this.character.health.current = this.character.health.max;
          this.character.mana.max += 5;
          this.character.mana.current = this.character.mana.max;
        }
      }
    },

    resetDailyHabits() {
      if (!this.character) return;

      const now = new Date();
      const today = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const dayMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

      this.character.habits.forEach(habit => {
        // Check if the habit should reset based on schedule
        if (habit.schedule && !habit.schedule[dayMap[today]]) {
          return; // Skip reset if not scheduled for today
        }

        // Reset if it's a new day since last completion
        if (habit.lastCompleted) {
          const lastCompleted = new Date(habit.lastCompleted);
          if (lastCompleted.toDateString() !== now.toDateString()) {
            habit.completed = false;
            // Break streak if it was missed yesterday
            if ((now.getTime() - lastCompleted.getTime()) > (24 * 60 * 60 * 1000)) {
              habit.streak = 0;
            }
          }
        } else {
          habit.completed = false;
        }
      });
    },
  },
});
