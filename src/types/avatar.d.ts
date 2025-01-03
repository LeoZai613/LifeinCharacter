export interface AvatarState {
  bodyType: 'Athletic' | 'Slim' | 'Muscular';
  race: string;
  class: string;
  gender: string;
  colors: {
    skin: string;
    hair: string;
    eyes: string;
  };
  features: {
    hairStyle: string;
    faceStyle: string;
    bodyType: string;
  };
  equipment: Record<string, string>;
}

export interface AvatarCustomizationProps {
  userId?: string;
  onClose?: () => void;
}
