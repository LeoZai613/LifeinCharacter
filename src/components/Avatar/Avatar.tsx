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
      slim: 'M 30,30 L 70,30 L 70,70 L 30,70 Z',
      muscular: 'M 25,30 L 75,30 L 75,75 L 25,75 Z',
      athletic: 'M 28,30 L 72,30 L 72,72 L 28,72 Z'
    };
    return paths[avatar.features.bodyType as keyof typeof paths] || paths.athletic;
  };

  const getFacePath = () => {
    const paths = {
      round: 'M 40,40 A 10,10 0 0 1 60,40 A 10,10 0 0 1 40,40',
      angular: 'M 35,35 L 65,35 L 65,55 L 35,55 Z',
      soft: 'M 38,38 Q 50,45 62,38 Q 62,52 50,58 Q 38,52 38,38'
    };
    return paths[avatar.features.faceStyle as keyof typeof paths] || paths.round;
  };

  const getEyesPath = () => {
    return 'M 43,42 A 2,2 0 0 1 47,42 M 53,42 A 2,2 0 0 1 57,42';
  };

  const getHairPath = () => {
    const paths = {
      short: 'M 35,35 Q 50,25 65,35',
      long: 'M 35,35 Q 50,25 65,35 L 70,60 Q 50,70 30,60 Z',
      spiky: 'M 35,35 L 45,25 L 50,35 L 55,25 L 65,35'
    };
    return paths[avatar.features.hairStyle as keyof typeof paths] || paths.short;
  };

  // Class-specific effect colors
  const getEffectColor = () => {
    const colors = {
      warrior: 'text-red-500',
      mage: 'text-blue-500',
      rogue: 'text-green-500',
      cleric: 'text-yellow-500'
    };
    return colors[avatar.class];
  };

  // Method to trigger level up animation
  const triggerLevelUp = () => {
    isLevelUpRef.current = true;
    setTimeout(() => {
      isLevelUpRef.current = false;
    }, 1000);
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <div className="avatar-container">
        <svg
          viewBox="0 0 100 100"
          className={`w-full h-full ${isLevelUpRef.current ? 'animate-bounce' : ''}`}
        >
          {/* Body */}
          <g className={`race-${avatar.race}`}>
            <path
              d={getBodyPath()}
              fill={avatar.colors.skin}
              className="transition-colors duration-300"
            />
          </g>

          {/* Face */}
          <g className={`race-${avatar.race}`}>
            <path
              d={getFacePath()}
              fill={avatar.colors.skin}
              className="transition-colors duration-300"
            />
            <path
              d={getEyesPath()}
              fill={avatar.colors.eyes}
              className="transition-colors duration-300"
            />
          </g>

          {/* Hair */}
          <path
            d={getHairPath()}
            fill={avatar.colors.hair}
            className="transition-colors duration-300"
          />

          {/* Equipment */}
          {avatar.equipment.body && (
            <use href={`#${avatar.equipment.body}`} />
          )}
          {avatar.equipment.weapon && (
            <use href={`#${avatar.equipment.weapon}`} />
          )}
          {avatar.equipment.shield && (
            <use href={`#${avatar.equipment.shield}`} />
          )}
          {avatar.equipment.head && (
            <use href={`#${avatar.equipment.head}`} />
          )}
          {avatar.equipment.accessory && (
            <use href={`#${avatar.equipment.accessory}`} />
          )}

          {/* Class Effects */}
          {showEffects && (
            <g className={getEffectColor()}>
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="animate-pulse opacity-50"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Level Badge */}
      {showLevel && (
        <div className="absolute -bottom-2 -right-2 bg-purple-600 text-white rounded-full px-2 py-1 text-xs font-bold">
          Lvl {avatar.level}
        </div>
      )}
    </div>
  );
};
