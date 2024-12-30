import type { CharacterStats } from '../types/character';
import type { QuizVersion } from '../types/quiz';
import * as questions from '../data/questions';

export function getQuestions(stat: keyof CharacterStats, version: QuizVersion) {
  const fullQuestions = {
    strength: questions.strengthQuestions,
    intelligence: questions.intelligenceQuestions,
    dexterity: questions.dexterityQuestions,
    constitution: questions.constitutionQuestions,
    wisdom: questions.wisdomQuestions,
    charisma: questions.charismaQuestions
  }[stat];

  if (!fullQuestions) {
    throw new Error(`No questions found for stat: ${stat}`);
  }

  if (version === 'short') {
    return {
      part1: fullQuestions.part1,
      part2: fullQuestions.part2.slice(0, Math.floor(fullQuestions.part2.length / 2))
    };
  }

  return fullQuestions;
}

export function calculateStatScore(stat: keyof CharacterStats, answers: { part1: number[]; part2: number[] }) {
  const { part1, part2 } = answers;
  
  // Calculate base scores
  const part1Score = part1.reduce((sum, val) => sum + val, 0);
  const part2Score = part2.reduce((sum, val) => sum + val, 0);
  
  // Apply stat-specific scoring rules
  switch (stat) {
    case 'strength':
    case 'constitution':
      return Math.max(part1Score, part2Score);
    case 'intelligence':
    case 'wisdom':
      return Math.round((part1Score + part2Score) / 2);
    case 'dexterity':
    case 'charisma':
      return Math.max(8, Math.min(18, part1Score + part2Score));
    default:
      return Math.max(8, Math.min(18, part1Score + part2Score));
  }
}