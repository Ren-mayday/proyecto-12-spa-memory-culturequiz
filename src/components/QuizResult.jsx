import { Link } from "react-router-dom";
import "./QuizResult.css";

const difficultyLabel = {
  easy: "Fácil",
  medium: "Medio",
  hard: "Difícil",
};

const getEmoji = (score, total) => {
  const ratio = score / total;
  if (ratio === 1) return "🏆";
  if (ratio >= 0.6) return "🎉";
  if (ratio >= 0.4) return "😅";
  return "💀";
};

const QuizResult = ({ score, total, difficulty, onRestart }) => {
  const emoji = getEmoji(score, total);

  return (
    <div className="quiz-result">
      <span className="quiz-result__emoji">{emoji}</span>
      <h2 className="quiz-result__title">¡Partida terminada!</h2>
      <p className="quiz-result__difficulty">
        Dificultad: <strong>{difficultyLabel[difficulty]}</strong>
      </p>

      <div className="quiz-result__score">
        <span className="quiz-result__score-num">{score}</span>
        <span className="quiz-result__score-total">/ {total}</span>
      </div>

      <p className="quiz-result__message">
        {score === total && "¡Perfecto! No has fallado ninguna."}
        {score >= total * 0.6 && score < total && "¡Buen trabajo! Casi lo tienes."}
        {score < total * 0.6 && score > 0 && "Puedes hacerlo mejor, ¡inténtalo de nuevo!"}
        {score === 0 && "¡Ánimo! La próxima vez seguro que mejor."}
      </p>

      <div className="quiz-result__actions">
        <button className="btn-restart" onClick={onRestart}>
          Jugar de nuevo
        </button>
        <Link className="btn-change" to="/cultural-quiz">
          Cambiar dificultad
        </Link>
        <Link className="btn-home" to="/">
          🏠 Inicio
        </Link>
      </div>
    </div>
  );
};

export default QuizResult;
