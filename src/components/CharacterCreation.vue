&lt;template>
  &lt;div class="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
    &lt;h2 class="text-2xl font-bold mb-6">Create Your Character</h2>
    
    &lt;form @submit.prevent="createCharacter" class="space-y-4">
      &lt;div>
        &lt;label for="name" class="block text-sm font-medium text-gray-700">Character Name&lt;/label>
        &lt;input
          v-model="formData.name"
          type="text"
          id="name"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      &lt;/div>

      &lt;div>
        &lt;label for="race" class="block text-sm font-medium text-gray-700">Race&lt;/label>
        &lt;select
          v-model="formData.race"
          id="race"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          &lt;option value="Human">Human&lt;/option>
          &lt;option value="Elf">Elf&lt;/option>
          &lt;option value="Dwarf">Dwarf&lt;/option>
          &lt;option value="Halfling">Halfling&lt;/option>
        &lt;/select>
      &lt;/div>

      &lt;div>
        &lt;label for="class" class="block text-sm font-medium text-gray-700">Class&lt;/label>
        &lt;select
          v-model="formData.class"
          id="class"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          &lt;option value="Fighter">Fighter&lt;/option>
          &lt;option value="Wizard">Wizard&lt;/option>
          &lt;option value="Rogue">Rogue&lt;/option>
          &lt;option value="Cleric">Cleric&lt;/option>
        &lt;/select>
      &lt;/div>

      &lt;div class="pt-4">
        &lt;button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Character
        &lt;/button>
      &lt;/div>
    &lt;/form>
  &lt;/div>
&lt;/template>

&lt;script setup lang="ts">
import { ref } from 'vue';
import { useCharacterStore } from '../stores/characterStore';
import { useRouter } from 'vue-router';

const characterStore = useCharacterStore();
const router = useRouter();

const formData = ref({
  name: '',
  race: 'Human',
  class: 'Fighter',
});

const createCharacter = async () => {
  await characterStore.initializeCharacter({
    name: formData.value.name,
    race: formData.value.race,
    class: formData.value.class,
  });
  
  // Navigate to the character dashboard after creation
  router.push('/dashboard');
};
&lt;/script>
