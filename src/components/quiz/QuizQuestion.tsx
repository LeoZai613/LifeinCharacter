import React from 'react';
import type { Question } from '../../types/quiz';

interface QuizQuestionProps {
  stat: string;
  part: 'part1' | 'part2';
  question: Question;
  onAnswer: (value: number) => void;
}

export function QuizQuestion({ stat, part, question, onAnswer }: QuizQuestionProps) {
  return (
    <div className="bg-gray-800 p-8 rounded-xl shadow-xl">
      <div className="mb-8">
        <div className="text-sm text-gray-400 mb-2">
          {stat.charAt(0).toUpperCase()}{stat.slice(1)} - Part {part === 'part1' ? '1' : '2'}
        </div>
        <h2 className="text-2xl font-bold">{question.text}</h2>
        {question.description && (
          <p className="mt-2 text-gray-400">{question.description}</p>
        )}
      </div>

      <div className="space-y-4">
        {question.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option.value)}
            className="w-full text-left p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            {option.text}
          </button>
        )) || (
          <div className="flex gap-4">
            <button
              onClick={() => onAnswer(1)}
              className="flex-1 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              Yes
            </button>
            <button
              onClick={() => onAnswer(0)}
              className="flex-1 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              No
            </button>
          </div>
        )}
      </div>
    </div>
  );
}