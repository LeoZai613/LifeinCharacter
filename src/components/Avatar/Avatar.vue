&lt;template>
  &lt;div class="relative" :class="sizeClass">
    &lt;div class="avatar-container">
      &lt;!-- Base Character -->
      &lt;svg
        :viewBox="'0 0 100 100'"
        class="w-full h-full"
        :class="{ 'animate-bounce': isLevelUp }"
      >
        &lt;!-- Body -->
        &lt;g :class="raceClass">
          &lt;path
            :d="getBodyPath()"
            :fill="colors.skin"
            class="transition-colors duration-300"
          />
        &lt;/g>

        &lt;!-- Face -->
        &lt;g :class="raceClass">
          &lt;path
            :d="getFacePath()"
            :fill="colors.skin"
            class="transition-colors duration-300"
          />
          &lt;path
            :d="getEyesPath()"
            :fill="colors.eyes"
            class="transition-colors duration-300"
          />
        &lt;/g>

        &lt;!-- Hair -->
        &lt;path
          :d="getHairPath()"
          :fill="colors.hair"
          class="transition-colors duration-300"
        />

        &lt;!-- Equipment -->
        &lt;g v-if="equipment.body">
          &lt;use :href="`#${equipment.body}`" />
        &lt;/g>
        &lt;g v-if="equipment.weapon">
          &lt;use :href="`#${equipment.weapon}`" />
        &lt;/g>
        &lt;g v-if="equipment.shield">
          &lt;use :href="`#${equipment.shield}`" />
        &lt;/g>
        &lt;g v-if="equipment.head">
          &lt;use :href="`#${equipment.head}`" />
        &lt;/g>
        &lt;g v-if="equipment.accessory">
          &lt;use :href="`#${equipment.accessory}`" />
        &lt;/g>

        &lt;!-- Class Effects -->
        &lt;g v-if="showEffects" :class="classEffectClass">
          &lt;circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="animate-pulse opacity-50"
          />
        &lt;/g>
      &lt;/svg>
    &lt;/div>

    &lt;!-- Level Badge -->
    &lt;div
      v-if="showLevel"
      class="absolute -bottom-2 -right-2 bg-purple-600 text-white rounded-full px-2 py-1 text-xs font-bold"
    >
      Lvl {{ level }}
    &lt;/div>
  &lt;/div>
&lt;/template>

&lt;script setup lang="ts">
import { computed, ref } from 'vue';
import type { AvatarState } from '../../types/avatar';

const props = defineProps<{
  avatar: AvatarState;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showEffects?: boolean;
  showLevel?: boolean;
}>();

// Size classes for the container
const sizeClass = computed(() => ({
  'w-16 h-16': props.size === 'sm',
  'w-24 h-24': props.size === 'md',
  'w-32 h-32': props.size === 'lg',
  'w-48 h-48': props.size === 'xl',
}));

// Classes for race-specific features
const raceClass = computed(() => `race-${props.avatar.race}`);

// Classes for class-specific effects
const classEffectClass = computed(() => {
  const effects = {
    warrior: 'text-red-500',
    mage: 'text-blue-500',
    rogue: 'text-green-500',
    cleric: 'text-yellow-500'
  };
  return effects[props.avatar.class];
});

// Reactive references
const isLevelUp = ref(false);

// Avatar part getters
const getBodyPath = () => {
  // Example body paths - replace with actual SVG paths
  const paths = {
    slim: 'M 30,30 L 70,30 L 70,70 L 30,70 Z',
    muscular: 'M 25,30 L 75,30 L 75,75 L 25,75 Z',
    athletic: 'M 28,30 L 72,30 L 72,72 L 28,72 Z'
  };
  return paths[props.avatar.features.bodyType] || paths.athletic;
};

const getFacePath = () => {
  // Example face paths
  const paths = {
    round: 'M 40,40 A 10,10 0 0 1 60,40 A 10,10 0 0 1 40,40',
    angular: 'M 35,35 L 65,35 L 65,55 L 35,55 Z',
    soft: 'M 38,38 Q 50,45 62,38 Q 62,52 50,58 Q 38,52 38,38'
  };
  return paths[props.avatar.features.faceStyle] || paths.round;
};

const getEyesPath = () => {
  // Example eyes path
  return 'M 43,42 A 2,2 0 0 1 47,42 M 53,42 A 2,2 0 0 1 57,42';
};

const getHairPath = () => {
  // Example hair paths
  const paths = {
    short: 'M 35,35 Q 50,25 65,35',
    long: 'M 35,35 Q 50,25 65,35 L 70,60 Q 50,70 30,60 Z',
    spiky: 'M 35,35 L 45,25 L 50,35 L 55,25 L 65,35'
  };
  return paths[props.avatar.features.hairStyle] || paths.short;
};

// Method to trigger level up animation
const triggerLevelUp = () => {
  isLevelUp.value = true;
  setTimeout(() => {
    isLevelUp.value = false;
  }, 1000);
};

// Expose methods to parent
defineExpose({
  triggerLevelUp
});
&lt;/script>

&lt;style scoped>
.avatar-container {
  @apply relative w-full h-full;
}

/* Race-specific styles */
.race-elf path {
  @apply transition-all duration-300;
}

.race-dwarf path {
  @apply transition-all duration-300;
}

.race-orc path {
  @apply transition-all duration-300;
}

/* Class-specific effects */
.warrior circle {
  @apply animate-pulse;
}

.mage circle {
  @apply animate-ping;
}

.rogue circle {
  @apply animate-spin;
}

.cleric circle {
  @apply animate-pulse;
}
&lt;/style>
