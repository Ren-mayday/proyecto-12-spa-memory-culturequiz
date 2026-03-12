import "./QuizAnswers.css";

const QuizAnswers = ({ answers, correct, selectedAnswer, onSelect }) => {
  const getStatus = (answer) => {
    if (selectedAnswer === null) return "";
    if (answer === correct) return "correct";
    if (answer === selectedAnswer) return "wrong";
    return "disabled";
  };

  return (
    <ul className="quiz-answers">
      {answers.map((answer, index) => (
        <li key={index}>
          <button
            className={`quiz-answer ${getStatus(answer)}`}
            onClick={() => onSelect(answer)}
            disabled={selectedAnswer !== null}
          >
            <span className="quiz-answer__letter">{String.fromCharCode(65 + index)}</span>
            <span className="quiz-answer__text">{answer}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default QuizAnswers;
