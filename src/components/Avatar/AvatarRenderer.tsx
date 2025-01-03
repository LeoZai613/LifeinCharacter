import React from 'react';
import type { AvatarCustomization } from '../../types/avatar';

interface AvatarRendererProps {
  customization: AvatarCustomization;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showEffects?: boolean;
}

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
  xl: 'w-48 h-48'
};

export const AvatarRenderer: React.FC<AvatarRendererProps> = ({
  customization,
  size = 'md',
  showEffects = true
}) => {
  // Example SVG-based avatar - we'll expand this with actual assets
  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
      >
        {/* Base body shape based on body type */}
        <path
          d={getBodyPath(customization.bodyType)}
          fill={getSkinToneColor(customization.skinTone)}
        />
        
        {/* Race-specific features */}
        {getRaceFeatures(customization.race)}
        
        {/* Hair */}
        <path
          d={getHairPath(customization.hairStyle)}
          fill={getHairColor(customization.hairColor)}
        />
        
        {/* Equipment layers */}
        {Object.entries(customization.equipment).map(([slot, item]) => (
          item && <use key={slot} href={`#${item}`} />
        ))}
        
        {/* Effects */}
        {showEffects && customization.effects.aura && (
          <g className="avatar-effects">
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke={getAuraColor(customization.effects.aura)}
              strokeWidth="2"
              className="animate-pulse"
            />
          </g>
        )}
      </svg>
      
      {/* Particle effects */}
      {showEffects && customization.effects.particles?.map((effect, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle, ${effect} 0%, transparent 70%)`,
            animation: 'float 3s infinite',
            opacity: 0.5
          }}
        />
      ))}
    </div>
  );
};

// Helper functions for generating SVG paths and colors
const getBodyPath = (bodyType: string): string => {
  // We'll replace these with actual SVG paths
  const paths = {
    athletic: 'M 20,20 L 80,20 L 80,80 L 20,80 Z',
    sturdy: 'M 15,20 L 85,20 L 85,85 L 15,85 Z',
    slim: 'M 25,20 L 75,20 L 75,80 L 25,80 Z',
    powerful: 'M 10,20 L 90,20 L 90,90 L 10,90 Z'
  };
  return paths[bodyType as keyof typeof paths] || paths.athletic;
};

const getSkinToneColor = (tone: string): string => {
  const colors = {
    fair: '#FFE0BD',
    light: '#FFD1AA',
    medium: '#D8A088',
    dark: '#A66A53',
    deep: '#8E4B3B'
  };
  return colors[tone as keyof typeof colors] || colors.medium;
};

const getHairColor = (color: string): string => {
  const colors = {
    black: '#090909',
    brown: '#4A3728',
    blonde: '#E6B55C',
    red: '#8E2216',
    white: '#E8E8E8',
    blue: '#2E4B9C',
    purple: '#6B2E9C'
  };
  return colors[color as keyof typeof colors] || colors.brown;
};

const getAuraColor = (aura: string): string => {
  return aura; // For now, just use the color directly
};

const getRaceFeatures = (race: string) => {
  // We'll add race-specific SVG elements here
  switch (race) {
    case 'elf':
      return (
        <path
          d="M 20,30 L 30,20 L 40,30 M 60,30 L 70,20 L 80,30"
          stroke="currentColor"
          fill="none"
          className="elf-ears"
        />
      );
    case 'dwarf':
      return (
        <path
          d="M 40,60 Q 50,70 60,60"
          stroke="currentColor"
          fill="none"
          className="dwarf-beard"
        />
      );
    default:
      return null;
  }
};

const getHairPath = (style: string): string => {
  // We'll replace these with actual hair SVG paths
  const paths = {
    short: 'M 30,20 Q 50,10 70,20',
    long: 'M 30,20 Q 50,10 70,20 L 75,60 Q 50,70 25,60 Z',
    curly: 'M 30,20 Q 50,10 70,20 Q 80,40 70,60 Q 50,70 30,60 Q 20,40 30,20',
    braided: 'M 30,20 Q 50,10 70,20 L 60,70 L 40,70 Z',
    mohawk: 'M 45,10 Q 50,0 55,10 L 55,30 L 45,30 Z'
  };
  return paths[style as keyof typeof paths] || paths.short;
};
