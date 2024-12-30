import React from 'react';
import { Clock, ClipboardList } from 'lucide-react';
import type { QuizVersion } from '../../types/quiz';

interface QuizVersionSelectProps {
  onSelect: (version: QuizVersion) => void;
}

export function QuizVersionSelect({ onSelect }: QuizVersionSelectProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-xl shadow-xl text-center">
      <h2 className="text-3xl font-bold mb-6">Choose Your Quiz Version</h2>
      <p className="text-gray-300 mb-8">Select between a quick or comprehensive assessment</p>
      <div className="flex gap-4">
        <button
          onClick={() => onSelect('short')}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
        >
          <Clock className="w-5 h-5" />
          Quick Version
        </button>
        <button
          onClick={() => onSelect('long')}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
        >
          <ClipboardList className="w-5 h-5" />
          Detailed Version
        </button>
      </div>
    </div>
  );
}