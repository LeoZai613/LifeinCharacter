export const constitutionQuestions = {
  part1: {
    text: "Select your general health level:",
    options: [
      { value: 18, text: "Exceptional health, never get sick" },
      { value: 16, text: "Very healthy, rarely get sick" },
      { value: 14, text: "Above average health" },
      { value: 12, text: "Average health" },
      { value: 10, text: "Below average health" },
      { value: 8, text: "Poor health" }
    ]
  },
  part2: [
    { text: "Do you get sick at least once a season?", value: -2 },
    { text: "Do you have any allergies?", value: -1 },
    { text: "Can you run a mile without stopping?", value: 1 },
    { text: "Have you completed a marathon?", value: 3 },
    { text: "Can you perform acts of extreme endurance?", value: 4 },
    { text: "Are you sensitive to pain?", value: -1 },
    { text: "Do you have perfect health (excluding injuries)?", value: 3 },
    { text: "Are you easily winded?", value: -1 },
    { text: "Can you handle extreme temperatures well?", value: 2 },
    { text: "Do you recover quickly from injuries?", value: 2 }
  ]
};