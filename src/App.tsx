import React from "react";
import { useEffect, useState } from "react";
import he from "he";

import "./App.css";
import { QuestionType } from "./types";
import Question from "./components/Question";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("intro-page");
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [quantityOfCorrectAnswers, setQuantityOfCorrectAnswers] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  useEffect(() => {
    function fetchQuestion() {
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then((response) => response.json())
        .then((data) => {
          setQuestions(data.results);
        });
    }
    fetchQuestion();
  }, []);

  function handleClick() {
    setCurrentPage("game");
  }

  const answersArray = (
    correctOption: string,
    arrayOfIncorrectOptions: string[]
  ) => {
    const randomIndex = Math.floor(
      Math.random() * (arrayOfIncorrectOptions.length + 1)
    );

    arrayOfIncorrectOptions.splice(randomIndex, 0, correctOption);

    return arrayOfIncorrectOptions;
  };

  const handleAnswerChange = (index: number, answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = answer;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correct_answer) {
        correctCount++;
      }
    });
    setQuantityOfCorrectAnswers(correctCount);
  };

  const questionsContainer = questions.map((question, index) => {
    const modifiedQuestion = he.decode(question.question);
    const answerOptions = [
      ...new Set(
        answersArray(question.correct_answer, question.incorrect_answers)
      ),
    ];
    return (
      <form key={index}>
        <Question
          correctAnswer={question.correct_answer}
          key={index}
          question={modifiedQuestion}
          answerOptions={answerOptions}
          onAnswerChange={(answer: string) => handleAnswerChange(index, answer)}
        />
      </form>
    );
  });

  return (
    <main>
      <div className="blobe-top"></div>
      {currentPage === "intro-page" && (
        <div className="intro-page">
          <h1 className="game-title">Quizzical</h1>
          <h3 className="game-invintation">Check your knowledge</h3>
          <button className="intro-page-button" onClick={handleClick}>
            Start quiz
          </button>
        </div>
      )}
      {currentPage === "game" && (
        <div className="question-container">
          {questionsContainer}
          <div className="bottom-bar">
            <h3>You scored {quantityOfCorrectAnswers}/5 correct answers</h3>
            <form onSubmit={handleSubmit}>
              <button className="submit-btn" type="submit">
                Check answers
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="blobe-bottom"></div>
    </main>
  );
};

export default App;
