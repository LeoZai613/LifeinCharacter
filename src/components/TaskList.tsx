import React, { useState } from 'react';
import { Habit, Daily, Todo } from '../types/character';
import { useUserStore } from '../stores/userStore';

interface TaskListProps {
  habits: Habit[];
  dailies: Daily[];
  todos: Todo[];
  onTaskUpdate: (type: 'habit' | 'daily' | 'todo', taskId: string, completed: boolean) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  habits,
  dailies,
  todos,
  onTaskUpdate,
}) => {
  const [activeTab, setActiveTab] = useState<'habits' | 'dailies' | 'todos'>('habits');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'trivial': return 'text-gray-500';
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const renderHabits = () => (
    <div className="space-y-2">
      {habits.map((habit) => (
        <div
          key={habit.id}
          className="flex items-center justify-between p-3 bg-white rounded-lg shadow"
        >
          <div className="flex-1">
            <h3 className="font-medium">{habit.name}</h3>
            <p className="text-sm text-gray-600">{habit.description}</p>
            <span className={`text-xs ${getDifficultyColor(habit.difficulty)}`}>
              {habit.difficulty}
            </span>
          </div>
          <div className="flex gap-2">
            {habit.positive && (
              <button
                onClick={() => onTaskUpdate('habit', habit.id, true)}
                className="px-3 py-1 text-green-600 border border-green-600 rounded hover:bg-green-50"
              >
                +
              </button>
            )}
            <button
              onClick={() => onTaskUpdate('habit', habit.id, false)}
              className="px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-50"
            >
              -
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDailies = () => (
    <div className="space-y-2">
      {dailies.map((daily) => (
        <div
          key={daily.id}
          className="flex items-center justify-between p-3 bg-white rounded-lg shadow"
        >
          <div className="flex-1">
            <h3 className="font-medium">{daily.name}</h3>
            <p className="text-sm text-gray-600">{daily.description}</p>
            <div className="flex gap-2 mt-1">
              <span className={`text-xs ${getDifficultyColor(daily.difficulty)}`}>
                {daily.difficulty}
              </span>
              {daily.streak > 0 && (
                <span className="text-xs text-purple-600">
                  🔥 {daily.streak} day streak
                </span>
              )}
            </div>
          </div>
          <input
            type="checkbox"
            checked={daily.completed}
            onChange={(e) => onTaskUpdate('daily', daily.id, e.target.checked)}
            className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
          />
        </div>
      ))}
    </div>
  );

  const renderTodos = () => (
    <div className="space-y-2">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between p-3 bg-white rounded-lg shadow"
        >
          <div className="flex-1">
            <h3 className="font-medium">{todo.name}</h3>
            <p className="text-sm text-gray-600">{todo.description}</p>
            <div className="flex gap-2 mt-1">
              <span className={`text-xs ${getDifficultyColor(todo.difficulty)}`}>
                {todo.difficulty}
              </span>
              {todo.dueDate && (
                <span className="text-xs text-blue-600">
                  Due: {new Date(todo.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={(e) => onTaskUpdate('todo', todo.id, e.target.checked)}
            className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('habits')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'habits'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Habits
        </button>
        <button
          onClick={() => setActiveTab('dailies')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'dailies'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Dailies
        </button>
        <button
          onClick={() => setActiveTab('todos')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'todos'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          To-Dos
        </button>
      </div>

      {activeTab === 'habits' && renderHabits()}
      {activeTab === 'dailies' && renderDailies()}
      {activeTab === 'todos' && renderTodos()}
    </div>
  );
};
