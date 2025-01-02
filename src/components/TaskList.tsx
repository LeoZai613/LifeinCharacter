import React from 'react';
import { Plus, Check, X, ChevronUp, ChevronDown } from 'lucide-react';
import type { Habit, Daily, Todo, TaskDifficulty } from '../types/character';

interface TaskListProps {
  habits: Habit[];
  dailies: Daily[];
  todos: Todo[];
  onAddHabit: (habit: Omit<Habit, 'id' | 'type' | 'count'>) => void;
  onAddDaily: (daily: Omit<Daily, 'id' | 'type' | 'completed' | 'streak'>) => void;
  onAddTodo: (todo: Omit<Todo, 'id' | 'type' | 'completed'>) => void;
  onCompleteDaily: (id: string) => void;
  onCompleteTodo: (id: string) => void;
  onToggleHabit: (id: string, positive: boolean) => void;
}

const difficultyColors: Record<TaskDifficulty, string> = {
  trivial: 'bg-gray-200',
  easy: 'bg-green-200',
  medium: 'bg-yellow-200',
  hard: 'bg-red-200'
};

export const TaskList: React.FC<TaskListProps> = ({
  habits,
  dailies,
  todos,
  onAddHabit,
  onAddDaily,
  onAddTodo,
  onCompleteDaily,
  onCompleteTodo,
  onToggleHabit
}) => {
  const [newTaskType, setNewTaskType] = React.useState<'habit' | 'daily' | 'todo'>('habit');
  const [showNewTaskForm, setShowNewTaskForm] = React.useState(false);
  const [newTask, setNewTask] = React.useState({
    name: '',
    description: '',
    difficulty: 'medium' as TaskDifficulty,
    associatedStat: 'strength' as const,
    positive: true,
    negative: false,
    frequency: 'daily' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const baseTask = {
      name: newTask.name,
      description: newTask.description,
      difficulty: newTask.difficulty,
      associatedStat: newTask.associatedStat
    };

    switch (newTaskType) {
      case 'habit':
        onAddHabit({
          ...baseTask,
          positive: newTask.positive,
          negative: newTask.negative
        });
        break;
      case 'daily':
        onAddDaily({
          ...baseTask,
          frequency: newTask.frequency
        });
        break;
      case 'todo':
        onAddTodo(baseTask);
        break;
    }

    setNewTask({
      name: '',
      description: '',
      difficulty: 'medium',
      associatedStat: 'strength',
      positive: true,
      negative: false,
      frequency: 'daily'
    });
    setShowNewTaskForm(false);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {/* Habits Column */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Habits</h3>
          <button
            onClick={() => {
              setNewTaskType('habit');
              setShowNewTaskForm(true);
            }}
            className="p-2 bg-purple-600 rounded-full hover:bg-purple-700"
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>
        <div className="space-y-2">
          {habits.map(habit => (
            <div
              key={habit.id}
              className={`p-3 rounded-lg bg-gray-700 ${difficultyColors[habit.difficulty]} bg-opacity-10`}
            >
              <div className="flex justify-between items-center">
                <span className="text-white">{habit.name}</span>
                <div className="flex gap-2">
                  {habit.positive && (
                    <button
                      onClick={() => onToggleHabit(habit.id, true)}
                      className="p-1 bg-green-600 rounded hover:bg-green-700"
                    >
                      <ChevronUp className="w-4 h-4 text-white" />
                    </button>
                  )}
                  {habit.negative && (
                    <button
                      onClick={() => onToggleHabit(habit.id, false)}
                      className="p-1 bg-red-600 rounded hover:bg-red-700"
                    >
                      <ChevronDown className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-400 mt-1">Count: {habit.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dailies Column */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Dailies</h3>
          <button
            onClick={() => {
              setNewTaskType('daily');
              setShowNewTaskForm(true);
            }}
            className="p-2 bg-purple-600 rounded-full hover:bg-purple-700"
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>
        <div className="space-y-2">
          {dailies.map(daily => (
            <div
              key={daily.id}
              className={`p-3 rounded-lg bg-gray-700 ${difficultyColors[daily.difficulty]} bg-opacity-10`}
            >
              <div className="flex justify-between items-center">
                <span className="text-white">{daily.name}</span>
                <button
                  onClick={() => onCompleteDaily(daily.id)}
                  className={`p-1 rounded ${
                    daily.completed ? 'bg-green-600' : 'bg-gray-600'
                  } hover:bg-opacity-80`}
                >
                  <Check className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="text-sm text-gray-400 mt-1">Streak: {daily.streak}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Todos Column */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">To-Dos</h3>
          <button
            onClick={() => {
              setNewTaskType('todo');
              setShowNewTaskForm(true);
            }}
            className="p-2 bg-purple-600 rounded-full hover:bg-purple-700"
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>
        <div className="space-y-2">
          {todos.map(todo => (
            <div
              key={todo.id}
              className={`p-3 rounded-lg bg-gray-700 ${difficultyColors[todo.difficulty]} bg-opacity-10`}
            >
              <div className="flex justify-between items-center">
                <span className="text-white">{todo.name}</span>
                <button
                  onClick={() => onCompleteTodo(todo.id)}
                  className={`p-1 rounded ${
                    todo.completed ? 'bg-green-600' : 'bg-gray-600'
                  } hover:bg-opacity-80`}
                >
                  <Check className="w-4 h-4 text-white" />
                </button>
              </div>
              {todo.dueDate && (
                <div className="text-sm text-gray-400 mt-1">Due: {todo.dueDate}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* New Task Modal */}
      {showNewTaskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">New {newTaskType}</h3>
              <button
                onClick={() => setShowNewTaskForm(false)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={newTask.name}
                onChange={e => setNewTask({ ...newTask, name: e.target.value })}
                className="w-full p-2 bg-gray-700 rounded text-white"
                required
              />
              <textarea
                placeholder="Description"
                value={newTask.description}
                onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                className="w-full p-2 bg-gray-700 rounded text-white"
              />
              <select
                value={newTask.difficulty}
                onChange={e => setNewTask({ ...newTask, difficulty: e.target.value as TaskDifficulty })}
                className="w-full p-2 bg-gray-700 rounded text-white"
              >
                <option value="trivial">Trivial</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <select
                value={newTask.associatedStat}
                onChange={e => setNewTask({ ...newTask, associatedStat: e.target.value as any })}
                className="w-full p-2 bg-gray-700 rounded text-white"
              >
                <option value="strength">Strength</option>
                <option value="dexterity">Dexterity</option>
                <option value="constitution">Constitution</option>
                <option value="intelligence">Intelligence</option>
                <option value="wisdom">Wisdom</option>
                <option value="charisma">Charisma</option>
              </select>
              {newTaskType === 'habit' && (
                <div className="flex gap-4">
                  <label className="flex items-center text-white">
                    <input
                      type="checkbox"
                      checked={newTask.positive}
                      onChange={e => setNewTask({ ...newTask, positive: e.target.checked })}
                      className="mr-2"
                    />
                    Positive
                  </label>
                  <label className="flex items-center text-white">
                    <input
                      type="checkbox"
                      checked={newTask.negative}
                      onChange={e => setNewTask({ ...newTask, negative: e.target.checked })}
                      className="mr-2"
                    />
                    Negative
                  </label>
                </div>
              )}
              {newTaskType === 'daily' && (
                <select
                  value={newTask.frequency}
                  onChange={e => setNewTask({ ...newTask, frequency: e.target.value as any })}
                  className="w-full p-2 bg-gray-700 rounded text-white"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              )}
              <button
                type="submit"
                className="w-full p-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Create {newTaskType}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
