import React from "react";
import Answer from "../Answer";
import { nanoid } from "nanoid";
import { useState } from "react";
import he from "he";

type QuestionComponentProps = {
  question: string;
  answerOptions: string[];
  correctAnswer: string;
  onAnswerChange: (answer: string) => void;
};

const Question: React.FC<QuestionComponentProps> = ({
  question,
  answerOptions,
  correctAnswer,
  onAnswerChange,
}) => {
  const [transformedAnswerOptions, setTransformedAnswerOptions] = useState(
    createTranfrormedAnswerOptions(answerOptions)
  );

  function createTranfrormedAnswerOptions(answerOptions: string[]) {
    return answerOptions.map((option) => ({
      answer: he.decode(option),
      isClicked: false,
      id: nanoid(),
    }));
  }

  function clickAnswer(id: string) {
    setTransformedAnswerOptions((oldAnswer) =>
      oldAnswer.map((answer) => {
        if (answer.id === id) {
          onAnswerChange(answer.answer);
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
      isClicked={answer.isClicked}
      clickAnswer={() => clickAnswer(answer.id)}
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
