import React, { useState, useEffect } from 'react';
import { useAvatarStore } from '../../stores/avatarStore';
import { useUserStore } from '../../stores/userStore';
import { Avatar } from './Avatar';
import logger from '../../utils/logger';
import type { AvatarCustomizationProps, AvatarState } from '../../types/avatar';

const AvatarCustomization: React.FC<AvatarCustomizationProps> = ({ userId = '1', onClose }) => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const { updateCharacterAvatar } = useUserStore();
  const avatar = useAvatarStore();
  const { updateFeatures, updateRace, updateClass, updateColors, saveAvatar } = useAvatarStore();

  useEffect(() => {
    logger.debug('AvatarCustomization mounted', { 
      component: 'AvatarCustomization',
      userId,
      initialState: avatar 
    });
  }, [userId, avatar]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await saveAvatar();
      
      // Update character avatar in user store
      updateCharacterAvatar(avatar);
      
      // Show success message
      setShowSuccess(true);
      
      // Close after delay
      setTimeout(() => {
        setShowSuccess(false);
        if (onClose) {
          onClose();
        }
      }, 1500);
      
    } catch (error) {
      console.error('Error saving avatar:', error);
      // setError('Failed to save avatar changes');
    } finally {
      setIsSaving(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center">
        <div className="flex flex-col items-center space-y-4">
          <Avatar
            avatar={avatar}
            size="xl"
            showEffects={true}
            showLevel={true}
          />
          <div className="text-green-400 font-medium">
            Avatar saved successfully!
          </div>
        </div>
      </div>
    );
  }

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
                  onClick={() => updateRace(race as AvatarState['race'])}
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
                  onClick={() => updateClass(className as AvatarState['class'])}
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

          {/* Body Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Body Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Athletic', 'Slim', 'Muscular'].map((type) => (
                <button
                  key={type}
                  onClick={() => updateFeatures({ bodyType: type.toLowerCase() })}
                  className={`p-2 rounded ${
                    avatar.features.bodyType === type.toLowerCase()
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Color Customization */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Colors
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Skin</label>
                <input
                  type="color"
                  value={avatar.colors.skin}
                  onChange={(e) => updateColors({ skin: e.target.value })}
                  className="w-full h-8 rounded cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Hair</label>
                <input
                  type="color"
                  value={avatar.colors.hair}
                  onChange={(e) => updateColors({ hair: e.target.value })}
                  className="w-full h-8 rounded cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Eyes</label>
                <input
                  type="color"
                  value={avatar.colors.eyes}
                  onChange={(e) => updateColors({ eyes: e.target.value })}
                  className="w-full h-8 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full mt-6 py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSaving}
            type="button"
            data-testid="save-avatar-button"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarCustomization;
