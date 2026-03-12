import { Link } from "react-router-dom";
import "./QuizPage.css";

const difficulties = [
  { id: "easy", label: "Fácil", emoji: "🌱", desc: "Preguntas sencillas para calentar" },
  { id: "medium", label: "Medio", emoji: "🔥", desc: "Un poco más de desafío" },
  { id: "hard", label: "Difícil", emoji: "💀", desc: "Sólo para los más valientes" },
];

const QuizPage = () => {
  return (
    <main className="quiz-select">
      <Link className="btn-back--quiz" to="/">
        ⬅️ Volver a la Home
      </Link>

      <div className="quiz-select__hero">
        <p className="home-eyebrow">Quiz Cultural</p>
        <h1 className="home-title">
          Elige tu <span>dificultad</span>
        </h1>
      </div>

      <div className="quiz-select__cards">
        {difficulties.map((d) => (
          <Link key={d.id} to={`/cultural-quiz/${d.id}`} className="difficulty-card">
            <span className="difficulty-card__emoji">{d.emoji}</span>
            <span className="difficulty-card_labl">{d.label}</span>
            <span className="difficulty-card_desc">{d.desc}</span>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default QuizPage;
