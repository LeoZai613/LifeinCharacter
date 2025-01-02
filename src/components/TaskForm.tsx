import React, { useState } from 'react';
import { Habit, Daily, Todo } from '../types/character';

interface TaskFormProps {
  type: 'habit' | 'daily' | 'todo';
  onSubmit: (task: Habit | Daily | Todo) => void;
  onCancel: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ type, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<'trivial' | 'easy' | 'medium' | 'hard'>('easy');
  const [isPositive, setIsPositive] = useState(true);
  const [dueDate, setDueDate] = useState('');
  const [schedule, setSchedule] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const baseTask = {
      id: crypto.randomUUID(),
      name,
      description,
      difficulty,
      completed: false,
      lastCompleted: null,
      impact: {
        health: difficulty === 'hard' ? 10 : difficulty === 'medium' ? 5 : 2,
        mana: difficulty === 'hard' ? 8 : difficulty === 'medium' ? 4 : 1,
        experience: difficulty === 'hard' ? 20 : difficulty === 'medium' ? 10 : 5,
      },
    };

    let task: Habit | Daily | Todo;

    switch (type) {
      case 'habit':
        task = {
          ...baseTask,
          type: 'habit',
          positive: isPositive,
          count: 0,
        };
        break;
      case 'daily':
        task = {
          ...baseTask,
          type: 'daily',
          streak: 0,
          schedule,
        };
        break;
      case 'todo':
        task = {
          ...baseTask,
          type: 'todo',
          dueDate: dueDate || undefined,
        };
        break;
      default:
        return;
    }

    onSubmit(task);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as typeof difficulty)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="trivial">Trivial</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {type === 'habit' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <div className="mt-1 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={isPositive}
                onChange={() => setIsPositive(true)}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2">Positive</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={!isPositive}
                onChange={() => setIsPositive(false)}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2">Negative</span>
            </label>
          </div>
        </div>
      )}

      {type === 'daily' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Schedule</label>
          <div className="mt-1 grid grid-cols-7 gap-2">
            {Object.entries(schedule).map(([day, checked]) => (
              <label key={day} className="flex flex-col items-center">
                <span className="text-xs capitalize">{day.slice(0, 3)}</span>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) =>
                    setSchedule((prev) => ({ ...prev, [day]: e.target.checked }))
                  }
                  className="mt-1 text-indigo-600 focus:ring-indigo-500"
                />
              </label>
            ))}
          </div>
        </div>
      )}

      {type === 'todo' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create {type}
        </button>
      </div>
    </form>
  );
};
