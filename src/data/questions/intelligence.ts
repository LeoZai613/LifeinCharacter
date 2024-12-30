export const intelligenceQuestions = {
  part1: {
    text: "Select your IQ or highest degree (whichever gives the higher score):",
    options: [
      { value: 19, text: "A doctorate (PhD) / IQ 131 or higher" },
      { value: 16, text: "A Masters Degree / IQ 121 to 130" },
      { value: 14, text: "An undergraduate or apprenticeship / IQ 111 to 120" },
      { value: 12, text: "HighSchool / IQ 101 to 110" },
      { value: 10, text: "Middle School(Grades 6-8) / IQ 91 to 100" },
      { value: 8, text: "Grammar School(Grades 1-5) / IQ 81 to 90" },
      { value: 6, text: "No Schooling / IQ 80 or lower" }
    ]
  },
  part2: [
    { text: "Are you literate in at least one language?", value: 2 },
    { text: "Are you conversant in at least two natural languages?", value: 1 },
    { text: "Are you literate in at least two natural languages?", value: 1 },
    { text: "Are you conversant in three or more natural languages?", value: 2 },
    { text: "Are you literate in three or more natural languages?", value: 2 },
    { text: "Can you operate most devices without asking for help after reading instructions?", value: 1 },
    { text: "Can you operate most devices without instructions?", value: 2 },
    { text: "Can you add two three-digit numbers in your head?", value: 1 },
    { text: "Are you considered an expert at a puzzle game?", value: 2 },
    { text: "Do you have a reputation for being smart?", value: 1 },
    { text: "Can you often predict how movies or books will end?", value: 1 },
    { text: "Do you need instructions repeated often?", value: -1 }
  ]
};