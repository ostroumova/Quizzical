import React from "react";

type AnswerProps = {
  id: string;
  value: string;
  isClicked: boolean;
  clickAnswer: () => void;
};

const Answer: React.FC<AnswerProps> = ({
  id,
  value,
  isClicked,
  clickAnswer,
}) => {
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
      <label htmlFor={id} className="radio-label">
        {value}
      </label>
    </div>
  );
};
export default Answer;
