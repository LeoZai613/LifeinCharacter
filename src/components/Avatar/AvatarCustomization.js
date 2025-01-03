import React, { useState, useEffect } from 'react';
import './AvatarCustomization.css';

const API_URL = 'http://localhost:3001/api';

const AvatarCustomization = ({ userId = '1' }) => {
  const [avatarState, setAvatarState] = useState({
    race: 'Elf',
    class: 'Mage',
    skinColor: '#F5D0C5',
    hairStyle: 'Short',
    hairColor: '#8B5CF6',
    bodyType: 'Athletic'
  });
  const [isSaving, setIsSaving] = useState(false);

  // Load initial avatar data
  useEffect(() => {
    const loadAvatarData = async () => {
      try {
        const response = await fetch(`${API_URL}/avatar/${userId}`);
        const data = await response.json();
        if (Object.keys(data).length > 0) {
          setAvatarState(data);
        }
      } catch (error) {
        console.error('Error loading avatar data:', error);
      }
    };

    loadAvatarData();
  }, [userId]);

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`${API_URL}/avatar/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(avatarState),
      });

      if (!response.ok) {
        throw new Error('Failed to save avatar changes');
      }

      const savedData = await response.json();
      console.log('Avatar changes saved:', savedData);
      alert('Avatar changes saved successfully!');
    } catch (error) {
      console.error('Error saving avatar changes:', error);
      alert('Failed to save avatar changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="avatar-customization">
      {/* Your existing UI components */}
      <button 
        className="save-changes-button"
        onClick={handleSaveChanges}
        disabled={isSaving}
        style={{
          backgroundColor: '#8B5CF6',
          color: 'white',
          padding: '12px',
          borderRadius: '8px',
          border: 'none',
          width: '100%',
          fontSize: '16px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
};

export default AvatarCustomization;
