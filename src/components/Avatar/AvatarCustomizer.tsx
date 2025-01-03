import React from 'react';
import { useAvatarStore } from '../../stores/avatarStore';
import { Avatar } from './Avatar';
import type { AvatarState } from '../../types/avatar';

export const AvatarCustomizer: React.FC = () => {
  const avatar = useAvatarStore();

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex gap-8">
        {/* Avatar Preview */}
        <div className="flex-shrink-0">
          <Avatar
            avatar={avatar}
            size="xl"
            showEffects={true}
            showLevel={true}
          />
        </div>

        {/* Customization Options */}
        <div className="flex-grow space-y-4">
          {/* Race Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Race
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['human', 'elf', 'dwarf', 'orc'].map(race => (
                <button
                  key={race}
                  onClick={() => avatar.updateRace(race as AvatarState['race'])}
                  className={`p-2 rounded ${
                    avatar.race === race
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {race.charAt(0).toUpperCase() + race.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Class Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Class
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['warrior', 'mage', 'rogue', 'cleric'].map(className => (
                <button
                  key={className}
                  onClick={() => avatar.updateClass(className as AvatarState['class'])}
                  className={`p-2 rounded ${
                    avatar.class === className
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {className.charAt(0).toUpperCase() + className.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Skin Color */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Skin Color
            </label>
            <div className="flex gap-2">
              {[
                { name: 'Fair', color: '#FFE0BD' },
                { name: 'Light', color: '#FFD1AA' },
                { name: 'Medium', color: '#D8A088' },
                { name: 'Dark', color: '#A66A53' },
                { name: 'Deep', color: '#8E4B3B' }
              ].map(({ name, color }) => (
                <button
                  key={color}
                  onClick={() => avatar.updateColors({ skin: color })}
                  className={`w-8 h-8 rounded-full border-2 ${
                    avatar.colors.skin === color
                      ? 'border-purple-500'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                  title={name}
                />
              ))}
            </div>
          </div>

          {/* Hair Style */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Hair Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['short', 'long', 'spiky'].map(style => (
                <button
                  key={style}
                  onClick={() => avatar.updateFeatures({ hairStyle: style })}
                  className={`p-2 rounded ${
                    avatar.features.hairStyle === style
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {style.charAt(0).toUpperCase() + style.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Hair Color */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Hair Color
            </label>
            <div className="flex gap-2">
              {[
                { name: 'Black', color: '#090909' },
                { name: 'Brown', color: '#4A3728' },
                { name: 'Blonde', color: '#E6B55C' },
                { name: 'Red', color: '#8E2216' },
                { name: 'White', color: '#E8E8E8' },
                { name: 'Blue', color: '#2E4B9C' },
                { name: 'Purple', color: '#6B2E9C' }
              ].map(({ name, color }) => (
                <button
                  key={color}
                  onClick={() => avatar.updateColors({ hair: color })}
                  className={`w-8 h-8 rounded-full border-2 ${
                    avatar.colors.hair === color
                      ? 'border-purple-500'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                  title={name}
                />
              ))}
            </div>
          </div>

          {/* Body Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Body Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['athletic', 'slim', 'muscular'].map(type => (
                <button
                  key={type}
                  onClick={() => avatar.updateFeatures({ bodyType: type })}
                  className={`p-2 rounded ${
                    avatar.features.bodyType === type
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={() => avatar.saveAvatar()}
            className="w-full mt-4 py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
