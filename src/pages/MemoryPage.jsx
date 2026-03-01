import "./MemoryPage.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useMemory } from "../customHooks/useMemory";
import MemoryBoard from "../components/MemoryBoard";

const MemoryPage = () => {
  const { state, initGame, flipCard, formatTime } = useMemory();
  useEffect(() => {
    initGame();
  }, []);

  return (
    <main className="memory-view">
      <header className="memory-header">
        <Link className="btn-back" to="/">
          {" "}
          ← Volver a la Home
        </Link>
        <h2>Memory Game</h2>
        <div className="game-controls">
          <div className="score-container">
            <span id="score">Puntuación: {state.score}</span>
          </div>
          <div className="timer-container">
            <span id="timer">Tiempo: {formatTime(state.time)}</span>
          </div>
        </div>
      </header>
      <section id="game-container" className="memory-board-game">
        <MemoryBoard cards={state.cards} flipCard={flipCard} />
      </section>
    </main>
  );
};

export default MemoryPage;
