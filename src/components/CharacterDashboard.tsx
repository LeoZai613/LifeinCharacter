import React, { useMemo, useState } from 'react';
import { useUserStore } from '../stores/userStore';
import { TaskList } from './TaskList';
import { Avatar } from './Avatar/Avatar';
import AvatarCustomization from './Avatar/AvatarCustomization';

export const CharacterDashboard = () => {
  const { user, addHabit, addDaily, addTodo, completeDaily, completeTodo, toggleHabit } = useUserStore();
  const [showCustomization, setShowCustomization] = useState(false);
  const character = user?.character;

  // Calculate stat buffs from habit streaks
  const statBuffs = useMemo(() => {
    if (!character?.habits) return {};

    const buffs: Partial<Record<keyof typeof character.stats, number>> = {};
    
    character.habits.forEach(habit => {
      if (habit.count > 0) {
        const stat = habit.associatedStat;
        const buffAmount = Math.floor(habit.count); // 1 point per positive count
        buffs[stat] = (buffs[stat] || 0) + buffAmount;
      }
    });

    console.log('Calculating buffs:', { calculatedBuffs: buffs, habits: character.habits });
    return buffs;
  }, [character?.habits]);

  if (!character) {
    return <div>Loading character...</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Character Stats Panel */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-xl text-white">
        <div className="flex items-start gap-8">
          {/* Avatar Section */}
          <div className="col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Your Avatar</h2>
                <button
                  onClick={() => setShowCustomization(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Customize
                </button>
              </div>
              {/* Avatar Display */}
              <div className="flex justify-center">
                {character?.avatar && (
                  <Avatar
                    avatar={character.avatar}
                    size="xl"
                    showEffects={true}
                    showLevel={true}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex-grow">
            <h2 className="text-3xl font-bold mb-2">{character.name}</h2>
            <p className="text-gray-400 mb-4">
              Level {character.level} {character.race} {character.class}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-4">
              {Object.entries(character.stats).map(([stat, value]) => {
                const buff = statBuffs[stat as keyof typeof character.stats] || 0;
                return (
                  <div key={stat} className="bg-gray-700 p-3 rounded-lg">
                    <div className="text-gray-400 text-sm capitalize">{stat}</div>
                    <div className="text-xl font-bold">
                      {value}
                      {buff > 0 && (
                        <span className="text-green-400 text-sm ml-2">+{buff}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress Bars */}
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Health</span>
                  <span>{character.health.current}/{character.health.max}</span>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-red-500 rounded-full h-2"
                    style={{
                      width: `${(character.health.current / character.health.max) * 100}%`
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Mana</span>
                  <span>{character.mana.current}/{character.mana.max}</span>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 rounded-full h-2"
                    style={{
                      width: `${(character.mana.current / character.mana.max) * 100}%`
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Experience</span>
                  <span>{character.experience}/{character.experienceToNextLevel}</span>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-yellow-500 rounded-full h-2"
                    style={{
                      width: `${(character.experience / character.experienceToNextLevel) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Customization Modal */}
      {showCustomization && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="max-w-4xl w-full mx-4">
            <AvatarCustomization 
              userId={user?.id} 
              onClose={() => setShowCustomization(false)} 
            />
          </div>
        </div>
      )}

      {/* Task Lists */}
      <TaskList
        habits={character.habits}
        dailies={character.dailies}
        todos={character.todos}
        onCompleteDaily={completeDaily}
        onCompleteTodo={completeTodo}
        onToggleHabit={toggleHabit}
      />
    </div>
  );
};
