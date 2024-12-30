&lt;template>
  &lt;div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    &lt;div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Character Stats Panel -->
      &lt;div class="bg-white p-6 rounded-lg shadow">
        &lt;h2 class="text-xl font-bold mb-4">Character Sheet&lt;/h2>
        &lt;div v-if="character" class="space-y-4">
          &lt;div class="flex justify-between items-center">
            &lt;span class="font-medium">{{ character.name }}&lt;/span>
            &lt;span>Level {{ character.level }}&lt;/span>
          &lt;/div>
          &lt;div class="flex justify-between items-center">
            &lt;span>{{ character.race }}&lt;/span>
            &lt;span>{{ character.class }}&lt;/span>
          &lt;/div>
          &lt;div class="grid grid-cols-2 gap-4">
            &lt;div v-for="(value, stat) in character.stats" :key="stat" class="bg-gray-50 p-2 rounded">
              &lt;div class="text-sm text-gray-500">{{ stat.charAt(0).toUpperCase() + stat.slice(1) }}&lt;/div>
              &lt;div class="text-lg font-medium">{{ value }}&lt;/div>
            &lt;/div>
          &lt;/div>
          &lt;div class="mt-4">
            &lt;div class="text-sm text-gray-500">Battle Tokens&lt;/div>
            &lt;div class="text-lg font-medium">{{ character.battleTokens }}&lt;/div>
          &lt;/div>
        &lt;/div>
      &lt;/div>

      <!-- Habits Panel -->
      &lt;div class="md:col-span-2 bg-white p-6 rounded-lg shadow">
        &lt;div class="flex justify-between items-center mb-4">
          &lt;h2 class="text-xl font-bold">Habits&lt;/h2>
          &lt;button
            @click="showNewHabitModal = true"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add Habit
          &lt;/button>
        &lt;/div>

        &lt;div v-if="habits.length === 0" class="text-center py-8 text-gray-500">
          No habits yet. Create one to begin your journey!
        &lt;/div>

        &lt;div v-else class="space-y-4">
          &lt;div
            v-for="habit in habits"
            :key="habit.id"
            class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            &lt;div>
              &lt;h3 class="font-medium">{{ habit.name }}&lt;/h3>
              &lt;p class="text-sm text-gray-500">{{ habit.description }}&lt;/p>
              &lt;div class="flex space-x-2 mt-1">
                &lt;span class="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  {{ habit.associatedStat }}
                &lt;/span>
                &lt;span class="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded">
                  {{ habit.difficulty }}
                &lt;/span>
                &lt;span class="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                  Streak: {{ habit.streak }}
                &lt;/span>
              &lt;/div>
            &lt;/div>
            &lt;button
              @click="completeHabit(habit.id)"
              :disabled="habit.completed"
              :class="[
                'px-4 py-2 rounded-md',
                habit.completed
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              ]"
            >
              {{ habit.completed ? 'Completed' : 'Complete' }}
            &lt;/button>
          &lt;/div>
        &lt;/div>
      &lt;/div>
    &lt;/div>

    <!-- New Habit Modal -->
    &lt;div v-if="showNewHabitModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      &lt;div class="bg-white p-6 rounded-lg w-full max-w-md">
        &lt;h3 class="text-lg font-bold mb-4">Create New Habit&lt;/h3>
        &lt;form @submit.prevent="createHabit" class="space-y-4">
          &lt;div>
            &lt;label class="block text-sm font-medium text-gray-700">Name&lt;/label>
            &lt;input
              v-model="newHabit.name"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          &lt;/div>

          &lt;div>
            &lt;label class="block text-sm font-medium text-gray-700">Description&lt;/label>
            &lt;textarea
              v-model="newHabit.description"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >&lt;/textarea>
          &lt;/div>

          &lt;div>
            &lt;label class="block text-sm font-medium text-gray-700">Associated Stat&lt;/label>
            &lt;select
              v-model="newHabit.associatedStat"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              &lt;option value="strength">Strength&lt;/option>
              &lt;option value="dexterity">Dexterity&lt;/option>
              &lt;option value="constitution">Constitution&lt;/option>
              &lt;option value="intelligence">Intelligence&lt;/option>
              &lt;option value="wisdom">Wisdom&lt;/option>
              &lt;option value="charisma">Charisma&lt;/option>
            &lt;/select>
          &lt;/div>

          &lt;div>
            &lt;label class="block text-sm font-medium text-gray-700">Difficulty&lt;/label>
            &lt;select
              v-model="newHabit.difficulty"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              &lt;option value="easy">Easy&lt;/option>
              &lt;option value="medium">Medium&lt;/option>
              &lt;option value="hard">Hard&lt;/option>
            &lt;/select>
          &lt;/div>

          &lt;div>
            &lt;label class="block text-sm font-medium text-gray-700">Frequency&lt;/label>
            &lt;select
              v-model="newHabit.frequency"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              &lt;option value="daily">Daily&lt;/option>
              &lt;option value="weekly">Weekly&lt;/option>
            &lt;/select>
          &lt;/div>

          &lt;div class="flex space-x-4">
            &lt;button
              type="submit"
              class="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Create
            &lt;/button>
            &lt;button
              type="button"
              @click="showNewHabitModal = false"
              class="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            &lt;/button>
          &lt;/div>
        &lt;/form>
      &lt;/div>
    &lt;/div>
  &lt;/div>
&lt;/template>

&lt;script setup lang="ts">
import { ref, computed } from 'vue';
import { useCharacterStore } from '../stores/characterStore';
import type { Habit } from '../types/character';

const characterStore = useCharacterStore();
const character = computed(() => characterStore.character);
const habits = computed(() => characterStore.getHabits);

const showNewHabitModal = ref(false);
const newHabit = ref({
  name: '',
  description: '',
  frequency: 'daily',
  difficulty: 'easy',
  associatedStat: 'strength',
});

const createHabit = async () => {
  await characterStore.addHabit(newHabit.value);
  showNewHabitModal.value = false;
  newHabit.value = {
    name: '',
    description: '',
    frequency: 'daily',
    difficulty: 'easy',
    associatedStat: 'strength',
  };
};

const completeHabit = async (habitId: string) => {
  await characterStore.completeHabit(habitId);
};
&lt;/script>
