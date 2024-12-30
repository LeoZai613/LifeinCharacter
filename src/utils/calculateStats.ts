export function calculateStrengthScore(part1Score: number, part2Answers: boolean[]): number {
  // Calculate part 2 score
  const part2Score = part2Answers.reduce((total, answer, index) => {
    if (answer) {
      return total + strengthQuestions.part2[index].value;
    }
    return total;
  }, 8); // Base score of 8

  // Use the higher of the two scores
  return Math.max(part1Score, part2Score);
}

export function calculateFinalStats(answers: Record<string, any>): CharacterStats {
  return {
    strength: calculateStrengthScore(answers.strengthPart1, answers.strengthPart2),
    // Add other stat calculations as we implement them
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10
  };
}