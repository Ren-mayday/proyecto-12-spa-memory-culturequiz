import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <main className="home">
      <div className="home-hero">
        <p className="home-eyebrow">Elige tu juego</p>
        <h1 className="home-title">
          Pon a prueba <span>tu mente</span>
        </h1>
      </div>
      <div className="cta-section">
        <Link to="/memory" className="game-card">
          <span className="game-card__icon">🃏</span>
          <span className="game-card__title">Memory Game</span>
          <span className="game-card__desc">Encuentra todas las parejas</span>
        </Link>
        <Link to="/cultural-quiz" className="game-card">
          <span className="game-card__icon">🎨</span>
          <span className="game-card__title">Trivial Quiz</span>
          <span className="game-card__desc">En inglés</span>
        </Link>
      </div>
    </main>
  );
};

export default Home;
