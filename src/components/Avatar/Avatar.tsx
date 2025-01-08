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
        C 42,15 35,20 33,30
        L 32,45
        C 31,55 31,65 32,75
        L 33,85
        C 35,95 42,100 50,100
        C 58,100 65,95 67,85
        L 68,75
        C 69,65 69,55 68,45
        L 67,30
        C 65,20 58,15 50,15
        Z

        M 33,30
        C 33,30 30,35 29,42
        C 28,45 28,48 29,51
        C 30,54 32,56 34,56
        L 35,52
        M 67,30
        C 67,30 70,35 71,42
        C 72,45 72,48 71,51
        C 70,54 68,56 66,56
        L 65,52

        M 33,85
        C 33,85 35,90 38,95
        L 40,100
        C 42,105 45,110 50,110
        C 55,110 58,105 60,100
        L 62,95
        C 65,90 67,85 67,85
      `,
      muscular: `
        M 50,15
        C 40,15 32,20 30,30
        L 29,45
        C 28,55 28,65 29,75
        L 30,85
        C 32,95 40,100 50,100
        C 60,100 68,95 70,85
        L 71,75
        C 72,65 72,55 71,45
        L 70,30
        C 68,20 60,15 50,15
        Z

        M 30,30
        C 30,30 27,35 26,42
        C 25,45 25,48 26,51
        C 27,54 29,56 31,56
        L 32,52
        M 70,30
        C 70,30 73,35 74,42
        C 75,45 75,48 74,51
        C 73,54 71,56 69,56
        L 68,52

        M 30,85
        C 30,85 32,90 35,95
        L 37,100
        C 40,105 45,110 50,110
        C 55,110 60,105 63,100
        L 65,95
        C 68,90 70,85 70,85
      `,
      athletic: `
        M 50,15
        C 41,15 34,20 32,30
        L 31,45
        C 30,55 30,65 31,75
        L 32,85
        C 34,95 41,100 50,100
        C 59,100 66,95 68,85
        L 69,75
        C 70,65 70,55 69,45
        L 68,30
        C 66,20 59,15 50,15
        Z

        M 32,30
        C 32,30 29,35 28,42
        C 27,45 27,48 28,51
        C 29,54 31,56 33,56
        L 34,52
        M 68,30
        C 68,30 71,35 72,42
        C 73,45 73,48 72,51
        C 71,54 69,56 67,56
        L 66,52

        M 32,85
        C 32,85 34,90 37,95
        L 39,100
        C 42,105 46,110 50,110
        C 54,110 58,105 61,100
        L 63,95
        C 66,90 68,85 68,85
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
      human: '',
      elf: 'M 35,35 L 30,25 L 45,35 M 55,35 L 70,25 L 65,35',
      dwarf: 'M 35,35 C 35,25 45,15 50,15 C 55,15 65,25 65,35',
      orc: 'M 35,35 L 40,25 L 45,35 M 55,35 L 60,25 L 65,35'
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
        M 32,35 
        C 32,45 33,55 35,65
        L 65,65
        C 67,55 68,45 68,35
        L 32,35
        Z
        M 35,65
        C 35,75 36,85 38,95
        L 62,95
        C 64,85 65,75 65,65
        Z
        M 38,95
        C 38,100 40,105 42,110
        L 58,110
        C 60,105 62,100 62,95
        Z
      `,
      mage: `
        M 30,30
        C 30,40 32,50 35,60
        L 65,60
        C 68,50 70,40 70,30
        L 30,30
        Z
        M 35,60
        C 33,70 31,80 30,90
        L 70,90
        C 69,80 67,70 65,60
        Z
        M 30,90
        C 29,100 28,110 27,120
        L 73,120
        C 72,110 71,100 70,90
        Z
      `,
      rogue: `
        M 32,35
        C 32,45 33,55 35,65
        L 65,65
        C 67,55 68,45 68,35
        L 32,35
        Z
        M 35,65
        C 34,75 33,85 32,95
        L 68,95
        C 67,85 66,75 65,65
        Z
        M 32,95
        C 31,105 30,115 29,125
        L 71,125
        C 70,115 69,105 68,95
        Z
      `,
      cleric: `
        M 32,35
        C 32,45 33,55 35,65
        L 65,65
        C 67,55 68,45 68,35
        L 32,35
        Z
        M 35,65
        C 34,75 33,85 32,95
        L 68,95
        C 67,85 66,75 65,65
        Z
        M 32,95
        C 31,105 30,115 29,125
        L 71,125
        C 70,115 69,105 68,95
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
        className="w-full h-full animate-float"
        style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.5))' }}
      >
        <defs>
          <radialGradient id="auraGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F87171" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F87171" stopOpacity="0" />
          </radialGradient>
          <filter id="glowFilter">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="url(#auraGradient)" 
          className="animate-glow"
        />

        <g>
          <path
            d={getBodyPath()}
            fill="rgba(0,0,0,0.2)"
            strokeWidth="0"
            transform="translate(2, 2)"
          />
          <circle cx="34" cy="32" r="2" fill="rgba(0,0,0,0.1)" />
          <circle cx="66" cy="32" r="2" fill="rgba(0,0,0,0.1)" />
          <circle cx="38" cy="77" r="2" fill="rgba(0,0,0,0.1)" />
          <circle cx="62" cy="77" r="2" fill="rgba(0,0,0,0.1)" />
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

        <g>
          <g>
            <path
              d="M 45,50 L 55,50 M 40,60 L 60,60"
              stroke="#F87171"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 30,30 L 70,70 M 30,70 L 70,30"
              stroke="#F87171"
              strokeWidth="0.5"
              opacity="0.4"
              className="animate-pulse-slow"
            />
          </g>
        </g>

        <path
          d={getDefaultClothing()}
          fill="rgba(139,69,19, 0.8)"
          stroke="#000"
          strokeWidth="1"
        />

        <path
          d={`
            M 40,45 L 60,45
            M 42,50 L 58,50
            M 44,90 L 56,90
          `}
          stroke="rgba(0,0,0,0.3)"
          strokeWidth="1"
          fill="none"
        />

        <path
          d={getFacePath()}
          fill="#FFD1AA"
          stroke="#000"
          strokeWidth="1"
        />

        <path
          d="M 43,43 C 43,41 45,41 45,43 M 55,43 C 55,41 57,41 57,43"
          fill="rgba(255,150,150,0.3)"
          stroke="none"
        />

        <path
          d="M 46,46 C 48,48 52,48 54,46"
          stroke="#000"
          strokeWidth="1"
          fill="none"
        />

        <path
          d={getRaceSpecificFeatures()}
          fill="#FFD1AA"
          stroke="#000"
          strokeWidth="1"
        />

        <g>
          <path
            d="M 35,30 C 35,20 65,20 65,30"
            fill="#4A3728"
            stroke="#000"
            strokeWidth="1"
          />
          <path
            d="M 35,30 C 35,20 65,20 65,30"
            fill="rgba(255,255,255,0.2)"
            strokeWidth="0"
            transform="translate(-1, -1) scale(0.95)"
          />
        </g>

        <g>
          <circle cx="45" cy="42" r="2" fill="#2E4B9C" />
          <circle cx="55" cy="42" r="2" fill="#2E4B9C" />
          <circle cx="44" cy="41" r="0.5" fill="#FFF" className="animate-sparkle" />
          <circle cx="54" cy="41" r="0.5" fill="#FFF" className="animate-sparkle" />
        </g>
      </svg>
      <div 
        className="absolute -bottom-2 -right-2 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center transform hover:scale-110 transition-transform duration-200"
        style={{ 
          backgroundColor: 'rgb(220, 38, 38)',
          boxShadow: 'rgb(248, 113, 113) 0px 0px 10px',
          filter: 'drop-shadow(rgba(0, 0, 0, 0.5) 0px 0px 2px)'
        }}
      >
        {avatar.level}
      </div>
    </div>
  );
};
