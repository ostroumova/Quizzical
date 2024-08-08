import React from "react";

type AnswerProps = {
  id: string;
  value: string;
  isClicked: boolean;
  isAnswersSubmitted: boolean;
  isCorrect: boolean;
  clickAnswer: () => void;
};

const Answer: React.FC<AnswerProps> = ({
  id,
  value,
  isClicked,
  isCorrect,
  clickAnswer,
  isAnswersSubmitted,
}) => {
  const isCorrectAndSubmitted =
    isAnswersSubmitted && isCorrect ? "correct" : "";
  const isIncorrectAndSubmitted =
    isAnswersSubmitted && !isCorrect ? "incorrect" : "";
  return (
    <div className="answer-option">
      <input
        type="radio"
        id={id}
        name="answer"
        className="answer-input"
        checked={isClicked}
        onChange={clickAnswer}
      />
      <label
        htmlFor={id}
        className={`radio-label ${isCorrectAndSubmitted} ${isIncorrectAndSubmitted}`}
      >
        {value}
      </label>
    </div>
  );
};
export default Answer;
