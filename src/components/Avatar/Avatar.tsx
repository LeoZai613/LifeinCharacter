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
        M 50,15 
        C 45,15 42,16 40,18
        L 38,22
        C 36,25 35,28 34,32
        L 33,65
        C 33,72 35,75 38,77
        L 42,80
        C 45,82 48,83 50,83
        C 52,83 55,82 58,80
        L 62,77
        C 65,75 67,72 67,65
        L 66,32
        C 65,28 64,25 62,22
        L 60,18
        C 58,16 55,15 50,15
        Z

        M 34,32
        C 34,32 30,35 28,42
        C 27,45 27,48 28,51
        C 29,54 31,56 33,56
        L 34,52
        M 66,32
        C 66,32 70,35 72,42
        C 73,45 73,48 72,51
        C 71,54 69,56 67,56
        L 66,52

        M 38,77
        C 38,77 38,82 37,85
        L 36,90
        C 35,95 34,98 33,102
        C 32,105 31,108 30,110
        M 62,77
        C 62,77 62,82 63,85
        L 64,90
        C 65,95 66,98 67,102
        C 68,105 69,108 70,110
      `,
      muscular: `
        M 50,15
        C 44,15 40,16 37,19
        L 34,23
        C 31,26 29,30 28,35
        L 27,65
        C 27,73 30,77 35,79
        L 42,82
        C 45,83 48,84 50,84
        C 52,84 55,83 58,82
        L 65,79
        C 70,77 73,73 73,65
        L 72,35
        C 71,30 69,26 66,23
        L 63,19
        C 60,16 56,15 50,15
        Z

        M 28,35
        C 28,35 24,38 22,45
        C 21,48 21,51 22,54
        C 23,57 25,59 27,59
        L 28,55
        M 72,35
        C 72,35 76,38 78,45
        C 79,48 79,51 78,54
        C 77,57 75,59 73,59
        L 72,55

        M 35,79
        C 35,79 35,84 34,87
        L 33,92
        C 32,97 31,100 30,104
        C 29,107 28,110 27,112
        M 65,79
        C 65,79 65,84 66,87
        L 67,92
        C 68,97 69,100 70,104
        C 71,107 72,110 73,112
      `,
      athletic: `
        M 50,15
        C 45,15 41,16 38,19
        L 35,23
        C 33,26 31,30 30,35
        L 29,65
        C 29,72 32,76 36,78
        L 42,81
        C 45,82 48,83 50,83
        C 52,83 55,82 58,81
        L 64,78
        C 68,76 71,72 71,65
        L 70,35
        C 69,30 67,26 65,23
        L 62,19
        C 59,16 55,15 50,15
        Z

        M 30,35
        C 30,35 26,38 24,45
        C 23,48 23,51 24,54
        C 25,57 27,59 29,59
        L 30,55
        M 70,35
        C 70,35 74,38 76,45
        C 77,48 77,51 76,54
        C 75,57 73,59 71,59
        L 70,55

        M 36,78
        C 36,78 36,83 35,86
        L 34,91
        C 33,96 32,99 31,103
        C 30,106 29,109 28,111
        M 64,78
        C 64,78 64,83 65,86
        L 66,91
        C 67,96 68,99 69,103
        C 70,106 71,109 72,111
      `
    };
    return paths[avatar.features.bodyType as keyof typeof paths] || paths.athletic;
  };

  const getArmorPath = () => {
    const paths = {
      mage: `
        M 50,15
        C 45,15 40,17 38,20
        L 35,25
        L 32,35
        L 32,65
        C 32,70 35,75 38,77
        L 45,80
        C 48,81 52,81 55,80
        L 62,77
        C 65,75 68,70 68,65
        L 68,35
        L 65,25
        L 62,20
        C 60,17 55,15 50,15

        M 40,30 L 60,30
        M 38,40 L 62,40
        M 36,50 L 64,50

        M 32,35
        C 32,35 25,40 22,45
        C 20,48 20,52 22,55
        L 25,58
        M 68,35
        C 68,35 75,40 78,45
        C 80,48 80,52 78,55
        L 75,58

        M 38,77
        C 38,77 37,82 35,87
        C 34,90 33,92 32,95
        M 62,77
        C 62,77 63,82 65,87
        C 66,90 67,92 68,95
      `,
      warrior: `
        M 50,15
        C 44,15 38,17 35,20
        L 30,25
        L 26,35
        L 26,65
        C 26,70 30,75 35,77
        L 45,80
        C 48,81 52,81 55,80
        L 65,77
        C 70,75 74,70 74,65
        L 74,35
        L 70,25
        L 65,20
        C 62,17 56,15 50,15

        M 35,30 L 65,30
        M 33,40 L 67,40
        M 35,50 L 65,50
        M 37,60 L 63,60

        M 26,35
        C 26,35 20,40 16,45
        C 14,48 14,52 16,55
        L 20,58
        M 74,35
        C 74,35 80,40 84,45
        C 86,48 86,52 84,55
        L 80,58

        M 35,77
        C 35,77 34,82 32,87
        C 31,90 30,92 29,95
        M 65,77
        C 65,77 66,82 68,87
        C 69,90 70,92 71,95
      `,
      rogue: `
        M 50,15
        C 45,15 39,17 36,20
        L 33,25
        L 30,35
        L 30,65
        C 30,70 33,75 36,77
        L 45,80
        C 48,81 52,81 55,80
        L 64,77
        C 67,75 70,70 70,65
        L 70,35
        L 67,25
        L 64,20
        C 61,17 55,15 50,15

        M 40,30 L 60,30
        M 42,40 L 58,40
        M 44,50 L 56,50

        M 30,35
        C 30,35 24,40 20,45
        C 18,48 18,52 20,55
        L 24,58
        M 70,35
        C 70,35 76,40 80,45
        C 82,48 82,52 80,55
        L 76,58

        M 36,77
        C 36,77 35,82 33,87
        C 32,90 31,92 30,95
        M 64,77
        C 64,77 65,82 67,87
        C 68,90 69,92 70,95
      `,
      cleric: `
        M 50,15
        C 45,15 39,17 36,20
        L 33,25
        L 30,35
        L 30,65
        C 30,70 33,75 36,77
        L 45,80
        C 48,81 52,81 55,80
        L 64,77
        C 67,75 70,70 70,65
        L 70,35
        L 67,25
        L 64,20
        C 61,17 55,15 50,15

        M 45,35 L 55,35
        M 50,30 L 50,40
        M 40,45 L 60,45

        M 30,35
        C 30,35 24,40 20,45
        C 18,48 18,52 20,55
        L 24,58
        M 70,35
        C 70,35 76,40 80,45
        C 82,48 82,52 80,55
        L 76,58

        M 36,77
        C 36,77 35,82 33,87
        C 32,90 31,92 30,95
        M 64,77
        C 64,77 65,82 67,87
        C 68,90 69,92 70,95
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

  const getDefaultClothing = () => {
    const clothes = {
      warrior: `
        M 35,40 L 65,40
        C 63,45 62,50 62,55
        L 38,55
        C 38,50 37,45 35,40
        Z
        M 38,55
        C 38,65 39,75 40,85
        L 60,85
        C 61,75 62,65 62,55
        Z
        M 40,85
        C 39,90 38,95 37,100
        L 63,100
        C 62,95 61,90 60,85
        Z
      `,
      mage: `
        M 35,35
        C 35,40 36,45 38,50
        L 62,50
        C 64,45 65,40 65,35
        L 35,35
        Z
        M 38,50
        C 37,60 36,70 35,80
        L 65,80
        C 64,70 63,60 62,50
        Z
        M 35,80
        L 33,110
        L 67,110
        L 65,80
        Z
      `,
      rogue: `
        M 35,35 L 65,35
        C 64,40 63,45 62,50
        L 38,50
        C 37,45 36,40 35,35
        Z
        M 38,50
        C 37,60 36,70 35,80
        L 65,80
        C 64,70 63,60 62,50
        Z
        M 35,80
        C 34,90 33,100 32,110
        L 68,110
        C 67,100 66,90 65,80
        Z
      `,
      cleric: `
        M 35,35
        C 35,40 36,45 38,50
        L 62,50
        C 64,45 65,40 65,35
        L 35,35
        Z
        M 38,50
        C 37,60 36,70 35,80
        L 65,80
        C 64,70 63,60 62,50
        Z
        M 35,80
        C 34,90 33,100 32,110
        L 68,110
        C 67,100 66,90 65,80
        Z
        M 48,40 L 52,40
        M 50,38 L 50,42
      `
    };
    return clothes[avatar.class as keyof typeof clothes] || clothes.warrior;
  };

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

          {/* Enhanced muscle definition and anatomical details */}
          <circle cx="34" cy="32" r="2" fill="rgba(0,0,0,0.1)" /> {/* Left shoulder */}
          <circle cx="66" cy="32" r="2" fill="rgba(0,0,0,0.1)" /> {/* Right shoulder */}
          <circle cx="38" cy="77" r="2" fill="rgba(0,0,0,0.1)" /> {/* Left hip */}
          <circle cx="62" cy="77" r="2" fill="rgba(0,0,0,0.1)" /> {/* Right hip */}
          
          {/* Muscle definition lines */}
          <path
            d={`
              M 36,42 C 34,45 34,49 36,52
              M 64,42 C 66,45 66,49 64,52
              M 42,67 C 45,69 48,70 50,70
              M 50,70 C 52,69 55,69 58,67
              M 38,85 C 37,88 36,91 35,93
              M 62,85 C 63,88 64,91 65,93
              M 42,35 L 58,35
              M 41,45 L 59,45
            `}
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="1"
            fill="none"
          />
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

        {/* Default clothing based on class */}
        <path
          d={getDefaultClothing()}
          fill={`rgba(${avatar.class === 'warrior' ? '139,69,19' : 
                      avatar.class === 'mage' ? '70,130,180' :
                      avatar.class === 'rogue' ? '47,79,79' :
                      '72,61,139'}, 0.8)`}
          stroke="#000"
          strokeWidth="1"
        />

        {/* Class-specific clothing details */}
        <path
          d={`
            ${avatar.class === 'warrior' ? `
              M 40,45 L 60,45
              M 42,50 L 58,50
              M 44,90 L 56,90
            ` : avatar.class === 'mage' ? `
              M 40,40 L 60,40
              M 38,70 L 62,70
              M 36,100 L 64,100
            ` : avatar.class === 'rogue' ? `
              M 40,40 L 60,40
              M 42,60 L 58,60
              M 44,80 L 56,80
            ` : `
              M 45,45 L 55,45
              M 50,40 L 50,50
              M 40,60 L 60,60
            `}
          `}
          stroke="rgba(0,0,0,0.3)"
          strokeWidth="1"
          fill="none"
        />

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
