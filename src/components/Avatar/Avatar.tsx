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
      slim: `
        M 50,20 
        C 45,20 40,22 38,25
        L 35,35 
        C 33,40 32,45 32,50
        L 32,70
        C 32,75 35,80 38,82
        L 45,85
        C 48,86 52,86 55,85
        L 62,82
        C 65,80 68,75 68,70
        L 68,50
        C 68,45 67,40 65,35
        L 62,25
        C 60,22 55,20 50,20
        Z
        M 32,35 L 25,45 L 28,60 L 32,50
        M 68,35 L 75,45 L 72,60 L 68,50
        M 38,82 L 35,95
        M 62,82 L 65,95
      `,
      muscular: `
        M 50,20
        C 44,20 38,22 35,25
        L 32,35
        C 30,40 28,45 28,50
        L 28,70
        C 28,75 32,80 35,82
        L 45,85
        C 48,86 52,86 55,85
        L 65,82
        C 68,80 72,75 72,70
        L 72,50
        C 72,45 70,40 68,35
        L 65,25
        C 62,22 56,20 50,20
        Z
        M 28,35 L 20,45 L 23,60 L 28,50
        M 72,35 L 80,45 L 77,60 L 72,50
        M 35,82 L 32,95
        M 65,82 L 68,95
      `,
      athletic: `
        M 50,20
        C 45,20 39,22 36,25
        L 33,35
        C 31,40 30,45 30,50
        L 30,70
        C 30,75 33,80 36,82
        L 45,85
        C 48,86 52,86 55,85
        L 64,82
        C 67,80 70,75 70,70
        L 70,50
        C 70,45 69,40 67,35
        L 64,25
        C 61,22 55,20 50,20
        Z
        M 30,35 L 22,45 L 25,60 L 30,50
        M 70,35 L 78,45 L 75,60 L 70,50
        M 36,82 L 33,95
        M 64,82 L 67,95
      `
    };
    return paths[avatar.features.bodyType as keyof typeof paths] || paths.athletic;
  };

  const getArmorPath = () => {
    const paths = {
      mage: `
        M 50,20 
        C 45,20 40,22 38,25
        L 35,35 
        L 32,50
        L 32,70
        C 32,75 35,80 38,82
        L 45,85
        C 48,86 52,86 55,85
        L 62,82
        C 65,80 68,75 68,70
        L 68,50
        L 65,35
        L 62,25
        C 60,22 55,20 50,20
        M 40,40 L 60,40
        M 38,50 L 62,50
        M 36,60 L 64,60
        M 32,35 L 25,45 L 28,60
        M 68,35 L 75,45 L 72,60
        M 38,82 L 35,95
        M 62,82 L 65,95
      `,
      warrior: `
        M 50,20
        C 44,20 38,22 35,25
        L 32,35
        L 28,50
        L 28,70
        C 28,75 32,80 35,82
        L 45,85
        C 48,86 52,86 55,85
        L 65,82
        C 68,80 72,75 72,70
        L 72,50
        L 68,35
        L 65,25
        C 62,22 56,20 50,20
        M 35,35 L 65,35
        M 33,45 L 67,45
        M 35,55 L 65,55
        M 37,65 L 63,65
        M 28,35 L 20,45 L 23,60
        M 72,35 L 80,45 L 77,60
        M 35,82 L 32,95
        M 65,82 L 68,95
      `,
      rogue: `
        M 50,20
        C 45,20 39,22 36,25
        L 33,35
        L 30,50
        L 30,70
        C 30,75 33,80 36,82
        L 45,85
        C 48,86 52,86 55,85
        L 64,82
        C 67,80 70,75 70,70
        L 70,50
        L 67,35
        L 64,25
        C 61,22 55,20 50,20
        M 40,35 L 60,35
        M 42,45 L 58,45
        M 44,55 L 56,55
        M 30,35 L 22,45 L 25,60
        M 70,35 L 78,45 L 75,60
        M 36,82 L 33,95
        M 64,82 L 67,95
      `,
      cleric: `
        M 50,20
        C 45,20 39,22 36,25
        L 33,35
        L 30,50
        L 30,70
        C 30,75 33,80 36,82
        L 45,85
        C 48,86 52,86 55,85
        L 64,82
        C 67,80 70,75 70,70
        L 70,50
        L 67,35
        L 64,25
        C 61,22 55,20 50,20
        M 45,40 L 55,40
        M 50,35 L 50,45
        M 40,50 L 60,50
        M 30,35 L 22,45 L 25,60
        M 70,35 L 78,45 L 75,60
        M 36,82 L 33,95
        M 64,82 L 67,95
      `
    };
    return paths[avatar.class as keyof typeof paths] || paths.warrior;
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
        className={`w-full h-full ${showEffects ? 'animate-float' : ''}`}
        style={{
          filter: showEffects ? 'drop-shadow(0 0 4px rgba(255,255,255,0.5))' : 'none'
        }}
      >
        <defs>
          <radialGradient id="auraGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={getClassColors().secondary} stopOpacity="0.4" />
            <stop offset="100%" stopColor={getClassColors().secondary} stopOpacity="0" />
          </radialGradient>
          <filter id="glowFilter">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background aura effect */}
        {showEffects && (
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="url(#auraGradient)"
            className="animate-glow"
          />
        )}

        {/* Body base with improved shading and limbs */}
        <g>
          {/* Shadow layer */}
          <path
            d={getBodyPath()}
            fill="rgba(0,0,0,0.2)"
            strokeWidth="0"
            transform="translate(2, 2)"
          />
          
          {/* Base body */}
          <path
            d={getBodyPath()}
            fill={avatar.colors.skin}
            stroke="#000"
            strokeWidth="1"
          />
          
          {/* Highlight layer */}
          <path
            d={getBodyPath()}
            fill="rgba(255,255,255,0.1)"
            strokeWidth="0"
            transform="translate(-1, -1) scale(0.98)"
          />

          {/* Joint highlights */}
          <circle cx="32" cy="35" r="2" fill="rgba(0,0,0,0.1)" /> {/* Left shoulder */}
          <circle cx="68" cy="35" r="2" fill="rgba(0,0,0,0.1)" /> {/* Right shoulder */}
          <circle cx="38" cy="82" r="2" fill="rgba(0,0,0,0.1)" /> {/* Left hip */}
          <circle cx="62" cy="82" r="2" fill="rgba(0,0,0,0.1)" /> {/* Right hip */}
        </g>

        {/* Class-specific armor with details */}
        {avatar.class && (
          <g>
            {/* Armor base */}
            <path
              d={getArmorPath()}
              fill={getClassColors().primary}
              stroke={getClassColors().accent}
              strokeWidth="1"
              className={showEffects ? 'animate-pulse-slow' : ''}
            />
            
            {/* Armor highlights */}
            <path
              d={getArmorPath()}
              fill="rgba(255,255,255,0.1)"
              strokeWidth="0"
              transform="translate(-0.5, -0.5) scale(0.99)"
            />
            
            {/* Class-specific decorative elements */}
            {avatar.class === 'mage' && (
              <g className="animate-sparkle">
                <path
                  d="M 40,35 L 60,35 M 45,45 L 55,45"
                  stroke={getClassColors().secondary}
                  strokeWidth="1"
                  fill="none"
                  filter="url(#glowFilter)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="none"
                  stroke={getClassColors().secondary}
                  strokeWidth="0.5"
                  opacity="0.6"
                  className="animate-spin-slow"
                />
              </g>
            )}
            {avatar.class === 'warrior' && (
              <g>
                <path
                  d="M 45,50 L 55,50 M 40,60 L 60,60"
                  stroke={getClassColors().secondary}
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M 30,30 L 70,70 M 30,70 L 70,30"
                  stroke={getClassColors().secondary}
                  strokeWidth="0.5"
                  opacity="0.4"
                  className="animate-pulse-slow"
                />
              </g>
            )}
            {avatar.class === 'cleric' && (
              <g className="animate-glow">
                <path
                  d="M 50,40 L 50,60 M 40,50 L 60,50"
                  stroke={getClassColors().secondary}
                  strokeWidth="1"
                  fill="none"
                  filter="url(#glowFilter)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="none"
                  stroke={getClassColors().secondary}
                  strokeWidth="0.5"
                  opacity="0.5"
                  strokeDasharray="5,5"
                  className="animate-spin-slow"
                />
              </g>
            )}
            {avatar.class === 'rogue' && (
              <g>
                <path
                  d="M 40,45 L 60,45 M 42,55 L 58,55"
                  stroke={getClassColors().secondary}
                  strokeWidth="0.5"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="none"
                  stroke={getClassColors().secondary}
                  strokeWidth="0.3"
                  opacity="0.3"
                  strokeDasharray="2,8"
                  className="animate-spin-slow"
                />
              </g>
            )}
          </g>
        )}

        {/* Face with enhanced expressions */}
        <path
          d={getFacePath()}
          fill={avatar.colors.skin}
          stroke="#000"
          strokeWidth="1"
        />
        {/* Cheeks */}
        <path
          d="M 43,43 C 43,41 45,41 45,43 M 55,43 C 55,41 57,41 57,43"
          fill="rgba(255,150,150,0.3)"
          stroke="none"
        />
        {/* Mouth */}
        <path
          d="M 46,46 C 48,48 52,48 54,46"
          stroke="#000"
          strokeWidth="1"
          fill="none"
        />

        {/* Race-specific features */}
        <path
          d={getRaceSpecificFeatures()}
          fill={avatar.colors.skin}
          stroke="#000"
          strokeWidth="1"
        />

        {/* Hair with improved styling and highlights */}
        <g>
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
        </g>

        {/* Eyes with animated shine */}
        <g>
          <circle cx="45" cy="42" r="2" fill={avatar.colors.eyes} />
          <circle cx="55" cy="42" r="2" fill={avatar.colors.eyes} />
          <circle 
            cx="44" 
            cy="41" 
            r="0.5" 
            fill="#FFF" 
            className="animate-sparkle"
          />
          <circle 
            cx="54" 
            cy="41" 
            r="0.5" 
            fill="#FFF"
            className="animate-sparkle" 
          />
        </g>

      </svg>

      {/* Level indicator with enhanced styling */}
      {showLevel && (
        <div 
          className="absolute -bottom-2 -right-2 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center transform hover:scale-110 transition-transform duration-200"
          style={{ 
            backgroundColor: getClassColors().primary,
            boxShadow: `0 0 10px ${getClassColors().secondary}`,
            filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))'
          }}
        >
          {avatar.level}
        </div>
      )}
    </div>
  );
};
