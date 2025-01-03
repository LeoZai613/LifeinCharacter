export type AvatarClass = 'warrior' | 'mage' | 'rogue' | 'cleric';
export type AvatarRace = 'human' | 'elf' | 'dwarf' | 'orc';
export type AvatarGender = 'male' | 'female' | 'other';

export interface AvatarColors {
  skin: string;
  hair: string;
  eyes: string;
}

export interface AvatarFeatures {
  hairStyle: string;
  faceStyle: string;
  bodyType: string;
}

export interface Equipment {
  head?: string;
  body?: string;
  weapon?: string;
  shield?: string;
  accessory?: string;
}

export interface AvatarState {
  class: AvatarClass;
  race: AvatarRace;
  gender: AvatarGender;
  colors: AvatarColors;
  features: AvatarFeatures;
  equipment: Equipment;
  level: number;
}
