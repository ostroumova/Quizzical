export type QuestionType = {
  category: string;
  correct_answer: string;
  difficulty: "medium";
  incorrect_answers: string[];
  question: string;
  type: string;
  isAnswered: boolean;
  id: string;
};
