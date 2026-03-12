// Lee el parámetro de la ruta, usa el hook y orquesta todos los componentes
import { useParams, Link } from "react-router-dom";
import { useQuiz } from "../customHooks/useQuiz";
import QuizQuestion from "../components/QuizQuestion";
import QuizAnswers from "../components/QuizAnswers";
import QuizResult from "../components/QuizResult";
import "./QuizGamePage.css";

const QuizGamePage = () => {
  const { difficulty } = useParams();
  const {
    currentQuestion,
    currentIndex,
    selectedAnswer,
    score,
    timeLeft,
    isFinished,
    isLoading,
    error,
    totalQuestions,
    selectAnswer,
    nextQuestion,
    restart,
  } = useQuiz(difficulty);

  if (isLoading) {
    return (
      <main className="quiz-game quiz-game--centered">
        <div className="quiz-loader">
          <span className="quiz-loader__spinner" />
          <p>Cargando preguntas...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="quiz-game quiz-game--centered">
        <p className="quiz-error">⚠️ {error}</p>
        <Link className="btn-back" to="/cultural-quiz">
          ⬅️ Volver
        </Link>
      </main>
    );
  }

  if (isFinished) {
    return (
      <main className="quiz-game quiz-game--centered">
        <QuizResult score={score} total={totalQuestions} difficulty={difficulty} onRestart={restart} />
      </main>
    );
  }

  if (!currentQuestion) return null;

  return (
    <main className="quiz-game">
      <header className="quiz-header">
        <Link className="btn-back" to="/cultural-quiz">
          ⬅️ Volver
        </Link>

        <div className="quiz-progress">
          <span className="quiz-progress__text">
            {currentIndex + 1} / {totalQuestions}
          </span>
          <div className="quiz-progress__bar">
            <div className="quiz-progress__fill" style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }} />
          </div>
        </div>

        <div className={`quiz-timer ${timeLeft <= 5 ? "quiz-timer--urgent" : ""}`}>⏱️ {timeLeft}s</div>
      </header>

      <section className="quiz-body">
        <QuizQuestion question={currentQuestion.question} />
        <QuizAnswers
          answers={currentQuestion.options}
          correct={currentQuestion.correct}
          selectedAnswer={selectedAnswer}
          onSelect={selectAnswer}
        />
        {selectedAnswer !== null && (
          <button className="btn-next" onClick={nextQuestion}>
            {currentIndex + 1 === totalQuestions ? "Ver resultado" : "Siguiente ➡️"}
          </button>
        )}
      </section>
    </main>
  );
};

export default QuizGamePage;
