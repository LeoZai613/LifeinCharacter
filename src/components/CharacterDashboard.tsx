import React, { useMemo, useEffect } from 'react';
import { useUserStore } from '../stores/userStore';
import { TaskList } from './TaskList';

export const CharacterDashboard = () => {
  const { user, addHabit, addDaily, addTodo, completeDaily, completeTodo, toggleHabit } = useUserStore();
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

    console.log('Calculating buffs:', {
      habits: character.habits.map(h => ({
        name: h.name,
        count: h.count,
        stat: h.associatedStat,
        buffAmount: h.count > 0 ? Math.floor(h.count) : 0
      })),
      calculatedBuffs: buffs
    });

    return buffs;
  }, [character?.habits]);

  if (!character) {
    return <div className="text-white">Create a character to begin your journey!</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Character Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-bold text-white mb-4">Character Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(character.stats).map(([stat, value]) => (
              <div key={stat} className="bg-gray-700 p-3 rounded-lg">
                <div className="text-gray-400 capitalize">{stat}</div>
                <div className="text-white text-xl">
                  {value}
                  {statBuffs[stat as keyof typeof character.stats] && (
                    <span className="text-green-400 text-sm ml-2">
                      +{statBuffs[stat as keyof typeof character.stats]}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-bold text-white mb-4">Character Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="text-gray-400">Level</div>
              <div className="text-white text-xl">{character.level}</div>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="text-gray-400">Experience</div>
              <div className="text-white text-xl">
                {character.experience} / {character.experienceToNextLevel}
              </div>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="text-gray-400">Health</div>
              <div className="text-white text-xl">
                {character.health.current} / {character.health.max}
              </div>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="text-gray-400">Mana</div>
              <div className="text-white text-xl">
                {character.mana.current} / {character.mana.max}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task List */}
      <TaskList
        habits={character.habits}
        dailies={character.dailies}
        todos={character.todos}
        onAddHabit={addHabit}
        onAddDaily={addDaily}
        onAddTodo={addTodo}
        onCompleteDaily={completeDaily}
        onCompleteTodo={completeTodo}
        onToggleHabit={toggleHabit}
      />
    </div>
  );
};
