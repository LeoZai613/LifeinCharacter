import React, { useRef, useEffect } from 'react';
import type { AvatarState } from '../../types/avatar';

interface AvatarProps {
  avatar: AvatarState;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showEffects?: boolean;
  showLevel?: boolean;
}

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
  xl: 'w-48 h-48'
};

export const Avatar: React.FC<AvatarProps> = ({
  avatar,
  size = 'md',
  showEffects = true,
  showLevel = true
}) => {
  const isLevelUpRef = useRef(false);

  // Helper functions for getting SVG paths
  const getBodyPath = () => {
    const paths = {
      slim: 'M 35,30 C 35,30 40,25 50,25 C 60,25 65,30 65,30 L 65,80 C 65,80 60,85 50,85 C 40,85 35,80 35,80 Z',
      muscular: 'M 30,30 C 30,30 40,25 50,25 C 60,25 70,30 70,30 L 70,80 C 70,80 60,90 50,90 C 40,90 30,80 30,80 Z',
      athletic: 'M 33,30 C 33,30 40,25 50,25 C 60,25 67,30 67,30 L 67,80 C 67,80 60,87 50,87 C 40,87 33,80 33,80 Z'
    };
    return paths[avatar.features.bodyType as keyof typeof paths] || paths.athletic;
  };

  const getClassSpecificDetails = () => {
    const details = {
      mage: 'M 30,30 C 30,20 70,20 70,30 L 65,85 C 65,85 55,90 45,90 C 35,90 35,85 35,85 Z', // Robe
      warrior: 'M 35,40 L 65,40 L 60,80 L 40,80 Z', // Armor plate
      rogue: 'M 40,30 L 60,30 L 65,80 L 35,80 Z', // Light armor
      cleric: 'M 35,30 C 35,25 65,25 65,30 L 60,85 C 60,85 50,90 40,90 Z' // Holy robes
    };
    return details[avatar.class as keyof typeof details];
  };

  const getFacePath = () => {
    const paths = {
      round: 'M 40,35 C 40,30 60,30 60,35 C 60,45 55,55 50,55 C 45,55 40,45 40,35',
      angular: 'M 40,30 L 60,30 L 58,50 L 42,50 Z',
      soft: 'M 40,35 Q 50,30 60,35 Q 60,45 50,52 Q 40,45 40,35'
    };
    return paths[avatar.features.faceStyle as keyof typeof paths] || paths.round;
  };

  const getRaceSpecificFeatures = () => {
    const features = {
      elf: 'M 35,35 L 30,25 L 45,35 M 55,35 L 70,25 L 65,35', // Pointed ears
      dwarf: 'M 30,60 C 45,65 55,65 70,60', // Beard base
      orc: 'M 45,45 L 55,45 L 50,50 Z', // Tusks
      human: '' // No special features
    };
    return features[avatar.race as keyof typeof features] || features.human;
  };

  const getHairPath = () => {
    const paths = {
      short: 'M 35,30 C 35,20 65,20 65,30',
      long: 'M 35,30 C 35,20 65,20 65,30 L 70,60 C 70,60 60,65 50,65 C 40,65 30,60 30,60 Z',
      spiky: 'M 35,30 L 40,20 L 45,30 L 50,15 L 55,30 L 60,20 L 65,30'
    };
    return paths[avatar.features.hairStyle as keyof typeof paths] || paths.short;
  };

  // Class-specific colors and details
  const getClassColors = () => {
    const colors = {
      mage: {
        primary: '#8B5CF6', // Purple for mage robes
        secondary: '#C4B5FD', // Lighter purple for details
        accent: '#4C1D95' // Dark purple for shadows
      },
      warrior: {
        primary: '#DC2626', // Red for armor
        secondary: '#F87171', // Lighter red for highlights
        accent: '#7F1D1D' // Dark red for shadows
      },
      rogue: {
        primary: '#059669', // Green for leather
        secondary: '#6EE7B7', // Lighter green for details
        accent: '#064E3B' // Dark green for shadows
      },
      cleric: {
        primary: '#D97706', // Gold for holy robes
        secondary: '#FCD34D', // Yellow for holy symbols
        accent: '#92400E' // Dark gold for shadows
      }
    };
    return colors[avatar.class as keyof typeof colors] || colors.warrior;
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{
          filter: showEffects ? 'drop-shadow(0 0 2px rgba(255,255,255,0.3))' : 'none'
        }}
      >
        {/* Base circle with class-specific glow */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={getClassColors().secondary}
          strokeWidth="2"
          className="animate-pulse"
        />

        {/* Body base */}
        <path
          d={getBodyPath()}
          fill={avatar.colors.skin}
          stroke="#000"
          strokeWidth="1"
        />

        {/* Class-specific clothing/armor */}
        {avatar.class && (
          <>
            <path
              d={getClassSpecificDetails()}
              fill={getClassColors().primary}
              stroke={getClassColors().accent}
              strokeWidth="1"
            />
            {/* Class-specific decorative details */}
            {avatar.class === 'mage' && (
              <path
                d="M 40,35 L 60,35 M 45,45 L 55,45"
                stroke={getClassColors().secondary}
                strokeWidth="1"
                fill="none"
              />
            )}
            {avatar.class === 'warrior' && (
              <path
                d="M 45,50 L 55,50 M 40,60 L 60,60"
                stroke={getClassColors().secondary}
                strokeWidth="2"
                fill="none"
              />
            )}
            {avatar.class === 'cleric' && (
              <path
                d="M 50,40 L 50,60 M 40,50 L 60,50"
                stroke={getClassColors().secondary}
                strokeWidth="1"
                fill="none"
              />
            )}
            {avatar.class === 'rogue' && (
              <path
                d="M 40,45 L 60,45 M 42,55 L 58,55"
                stroke={getClassColors().secondary}
                strokeWidth="0.5"
                fill="none"
              />
            )}
          </>
        )}

        {/* Face with better shading */}
        <path
          d={getFacePath()}
          fill={avatar.colors.skin}
          stroke="#000"
          strokeWidth="1"
        />
        <path
          d={getFacePath()}
          fill="rgba(0,0,0,0.1)"
          strokeWidth="0"
          transform="translate(2, 2)"
        />

        {/* Race-specific features with shading */}
        <path
          d={getRaceSpecificFeatures()}
          fill={avatar.colors.skin}
          stroke="#000"
          strokeWidth="1"
        />
        {avatar.race === 'dwarf' && (
          <path
            d="M 35,62 C 45,67 55,67 65,62"
            fill={avatar.colors.hair}
            stroke={avatar.colors.hair}
            strokeWidth="1"
          />
        )}

        {/* Hair with highlights */}
        <path
          d={getHairPath()}
          fill={avatar.colors.hair}
          stroke="#000"
          strokeWidth="1"
        />
        <path
          d={getHairPath()}
          fill="rgba(255,255,255,0.2)"
          strokeWidth="0"
          transform="translate(-1, -1) scale(0.95)"
        />

        {/* Eyes with shine */}
        <circle cx="45" cy="42" r="2" fill={avatar.colors.eyes} />
        <circle cx="55" cy="42" r="2" fill={avatar.colors.eyes} />
        <circle cx="44" cy="41" r="0.5" fill="#FFF" />
        <circle cx="54" cy="41" r="0.5" fill="#FFF" />

        {/* Class-specific effects */}
        {showEffects && (
          <g>
            {avatar.class === 'mage' && (
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={getClassColors().secondary}
                strokeWidth="0.5"
                opacity="0.5"
                className="animate-spin"
              />
            )}
            {avatar.class === 'warrior' && (
              <path
                d="M 30,30 L 70,70 M 30,70 L 70,30"
                stroke={getClassColors().secondary}
                strokeWidth="0.5"
                opacity="0.3"
              />
            )}
            {avatar.class === 'cleric' && (
              <circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke={getClassColors().secondary}
                strokeWidth="0.5"
                opacity="0.5"
                strokeDasharray="5,5"
                className="animate-pulse"
              />
            )}
          </g>
        )}
      </svg>

      {showLevel && (
        <div 
          className="absolute -bottom-2 -right-2 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center"
          style={{ backgroundColor: getClassColors().primary }}
        >
          {avatar.level}
        </div>
      )}
    </div>
  );
};
