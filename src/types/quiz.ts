export type QuizVersion = 'short' | 'long' | null;
export type QuizState = 'version-select' | 'in-progress';

export interface QuestionOption {
  value: number;
  text: string;
}

export interface Question {
  text: string;
  description?: string;
  value?: number;
  options?: QuestionOption[];
}

export interface QuestionSet {
  part1: Question | Question[];
  part2: Question[];
}

export interface QuizAnswers {
  [stat: string]: {
    part1: number[];
    part2: number[];
  };
}