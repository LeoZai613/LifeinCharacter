import React, { useState } from 'react';
import { strengthQuestions } from '../../data/quizQuestions';
import { QuizProgress } from './QuizProgress';

interface StrengthQuizProps {
  onComplete: (scores: { part1: number, part2: boolean[] }) => void;
}

export function StrengthQuiz({ onComplete }: StrengthQuizProps) {
  const [part, setPart] = useState<1 | 2>(1);
  const [part1Answer, setPart1Answer] = useState<number | null>(null);
  const [part2Answers, setPart2Answers] = useState<boolean[]>(
    new Array(strengthQuestions.part2.length).fill(false)
  );

  const handlePart1Selection = (value: number) => {
    setPart1Answer(value);
    setPart(2);
  };

  const handlePart2Answer = (index: number, value: boolean) => {
    const newAnswers = [...part2Answers];
    newAnswers[index] = value;
    setPart2Answers(newAnswers);

    if (index === strengthQuestions.part2.length - 1) {
      onComplete({
        part1: part1Answer || 8,
        part2: newAnswers
      });
    }
  };

  if (part === 1) {
    return (
      <div className="space-y-6">
        <QuizProgress 
          currentSection="Strength - Part 1"
          totalSections={2}
          currentProgress={1}
        />
        <h3 className="text-xl font-bold">{strengthQuestions.part1.text}</h3>
        <div className="space-y-3">
          {strengthQuestions.part1.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handlePart1Selection(option.value)}
              className="w-full text-left p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <QuizProgress 
        currentSection="Strength - Part 2"
        totalSections={2}
        currentProgress={2}
      />
      <div className="space-y-4">
        {strengthQuestions.part2.map((question, index) => (
          <div key={index} className="p-4 bg-gray-700 rounded-lg">
            <p className="mb-3">{question.text}</p>
            <div className="flex gap-4">
              <button
                onClick={() => handlePart2Answer(index, true)}
                className={`px-4 py-2 rounded ${
                  part2Answers[index] 
                    ? 'bg-green-600' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => handlePart2Answer(index, false)}
                className={`px-4 py-2 rounded ${
                  part2Answers[index] === false 
                    ? 'bg-red-600' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              >
                No
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}