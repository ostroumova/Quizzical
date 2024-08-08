import React from "react";
import Answer from "../Answer";
import { nanoid } from "nanoid";
import { useState } from "react";
import he from "he";
import { QuestionType } from "../../types";

type QuestionComponentProps = {
  question: string;
  answerOptions: string[];
  onAnswerChange: (answer: string) => void;
  questionId: string;
  isAnswersSubmitted: boolean;
  correctAnswer: string;
  setQuestions: (
    updateFn: (prevQuestions: QuestionType[]) => QuestionType[]
  ) => void;
};

const Question: React.FC<QuestionComponentProps> = ({
  question,
  answerOptions,
  onAnswerChange,
  setQuestions,
  questionId,
  isAnswersSubmitted,
  correctAnswer,
}) => {
  const [transformedAnswerOptions, setTransformedAnswerOptions] = useState(
    createTranfrormedAnswerOptions(answerOptions)
  );

  function createTranfrormedAnswerOptions(answerOptions: string[]) {
    return answerOptions.map((option) => ({
      answer: he.decode(option),
      isClicked: false,
      id: nanoid(),
      isCorrect: option === correctAnswer,
    }));
  }

  function clickAnswer(id: string, questionId: string) {
    setTransformedAnswerOptions((oldAnswer) =>
      oldAnswer.map((answer) => {
        if (answer.id === id) {
          onAnswerChange(answer.answer);
          setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
              q.id === questionId ? { ...q, isAnswered: true } : q
            )
          );
          return { ...answer, isClicked: !answer.isClicked };
        }
        return { ...answer, isClicked: false };
      })
    );
  }

  const answerOptionsContainer = transformedAnswerOptions.map((answer) => (
    <Answer
      key={answer.id}
      id={answer.id}
      value={answer.answer}
      isCorrect={answer.isCorrect}
      isClicked={answer.isClicked}
      isAnswersSubmitted={isAnswersSubmitted}
      clickAnswer={() => clickAnswer(answer.id, questionId)}
    />
  ));

  return (
    <div className="question-box">
      <h3>{question}</h3>
      <div className="answer-options">{answerOptionsContainer}</div>
    </div>
  );
};

export default Question;
