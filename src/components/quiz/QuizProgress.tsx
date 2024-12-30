import React from 'react';

interface QuizProgressProps {
  currentSection: string;
  totalSections: number;
  currentProgress: number;
}

export function QuizProgress({ currentSection, totalSections, currentProgress }: QuizProgressProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <span>Section: {currentSection}</span>
        <span>{Math.round((currentProgress / totalSections) * 100)}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentProgress / totalSections) * 100}%` }}
        />
      </div>
    </div>
  );
}