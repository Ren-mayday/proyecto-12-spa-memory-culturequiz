import "./QuizQuestion.css";

const QuizQuestion = ({ question }) => {
  return (
    <div className="quiz-question">
      <p className="quiz-question__text">{question}</p>
    </div>
  );
};

export default QuizQuestion;
