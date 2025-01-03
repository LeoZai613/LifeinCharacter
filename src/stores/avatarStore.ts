import { create } from 'zustand';
import type { AvatarState, Equipment } from '../types/avatar';

interface AvatarStore extends AvatarState {
  updateColors: (colors: Partial<AvatarState['colors']>) => void;
  updateFeatures: (features: Partial<AvatarState['features']>) => void;
  equipItem: (slot: keyof Equipment, itemId: string | undefined) => void;
  levelUp: () => void;
  updateClass: (newClass: AvatarState['class']) => void;
  updateRace: (newRace: AvatarState['race']) => void;
  updateGender: (newGender: AvatarState['gender']) => void;
  loadAvatar: () => void;
  saveAvatar: () => void;
}

export const useAvatarStore = create<AvatarStore>((set, get) => ({
  // Initial state
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

  // Actions
  updateColors: (colors) => set((state) => ({
    colors: { ...state.colors, ...colors }
  })),

  updateFeatures: (features) => set((state) => ({
    features: { ...state.features, ...features }
  })),

  equipItem: (slot, itemId) => set((state) => {
    const newEquipment = { ...state.equipment };
    if (itemId) {
      newEquipment[slot] = itemId;
    } else {
      delete newEquipment[slot];
    }
    return { equipment: newEquipment };
  }),

  levelUp: () => set((state) => ({
    level: state.level + 1
  })),

  updateClass: (newClass) => set({ class: newClass }),

  updateRace: (newRace) => set({ race: newRace }),

  updateGender: (newGender) => set({ gender: newGender }),

  loadAvatar: () => {
    const savedAvatar = localStorage.getItem('avatar');
    if (savedAvatar) {
      const avatarState = JSON.parse(savedAvatar);
      set(avatarState);
    }
  },

  saveAvatar: () => {
    const state = get();
    localStorage.setItem('avatar', JSON.stringify({
      class: state.class,
      race: state.race,
      gender: state.gender,
      colors: state.colors,
      features: state.features,
      equipment: state.equipment,
      level: state.level,
    }));
  },
}));
