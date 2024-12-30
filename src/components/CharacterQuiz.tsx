import React, { useState } from 'react';
import type { CharacterStats } from '../types/character';
import type { QuizVersion, QuizState, QuizAnswers } from '../types/quiz';
import { QuizVersionSelect } from './quiz/QuizVersionSelect';
import { QuizQuestion } from './quiz/QuizQuestion';
import { getQuestions, calculateStatScore } from '../utils/quizHelpers';

interface QuizProps {
  onComplete: (stats: CharacterStats) => void;
}

export function CharacterQuiz({ onComplete }: QuizProps) {
  const [quizVersion, setQuizVersion] = useState<QuizVersion>(null);
  const [quizState, setQuizState] = useState<QuizState>('version-select');
  const [currentStat, setCurrentStat] = useState<keyof CharacterStats | null>(null);
  const [currentPart, setCurrentPart] = useState<'part1' | 'part2'>('part1');
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const stats: (keyof CharacterStats)[] = [
    'strength', 'dexterity', 'constitution', 
    'intelligence', 'wisdom', 'charisma'
  ];

  const handleVersionSelect = (version: QuizVersion) => {
    setQuizVersion(version);
    setQuizState('in-progress');
    setCurrentStat(stats[0]);
  };

  const handleAnswer = (value: number) => {
    const stat = currentStat!;
    
    setAnswers(prev => ({
      ...prev,
      [stat]: {
        ...prev[stat] || { part1: [], part2: [] },
        [currentPart]: [...(prev[stat]?.[currentPart] || []), value]
      }
    }));

    const currentQuestions = getQuestions(stat, quizVersion);
    const currentPartQuestions = currentQuestions[currentPart];
    const currentAnswers = answers[stat]?.[currentPart]?.length || 0;

    if (currentAnswers + 1 >= (Array.isArray(currentPartQuestions) ? currentPartQuestions.length : 1)) {
      if (currentPart === 'part1' && currentQuestions.part2?.length > 0) {
        setCurrentPart('part2');
      } else {
        const nextStatIndex = stats.indexOf(stat) + 1;
        if (nextStatIndex < stats.length) {
          setCurrentStat(stats[nextStatIndex]);
          setCurrentPart('part1');
        } else {
          const finalStats = stats.reduce((acc, stat) => ({
            ...acc,
            [stat]: calculateStatScore(stat, answers[stat] || { part1: [], part2: [] })
          }), {}) as CharacterStats;

          onComplete(finalStats);
        }
      }
    }
  };

  if (quizState === 'version-select') {
    return <QuizVersionSelect onSelect={handleVersionSelect} />;
  }

  if (!currentStat || !quizVersion) return null;

  const currentQuestions = getQuestions(currentStat, quizVersion);
  const currentPartQuestions = currentQuestions[currentPart];
  const questionIndex = answers[currentStat]?.[currentPart]?.length || 0;
  const question = Array.isArray(currentPartQuestions) 
    ? currentPartQuestions[questionIndex]
    : currentPartQuestions;

  if (!question) return null;

  return (
    <QuizQuestion
      stat={currentStat}
      part={currentPart}
      question={question}
      onAnswer={handleAnswer}
    />
  );
}