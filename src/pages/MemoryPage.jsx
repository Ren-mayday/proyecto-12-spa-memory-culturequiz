import "./MemoryPage.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useMemory } from "../customHooks/useMemory";
import MemoryBoard from "../components/MemoryBoard";

const MemoryPage = () => {
  const { state, initGame, flipCard, formatTime, bestRecord } = useMemory();

  useEffect(() => {
    initGame();
  }, []);

  return (
    <main className="memory-view">
      <header className="memory-header">
        <Link className="btn-back" to="/">
          ⬅️ Volver a la Home
        </Link>
        <h2>Memory Game</h2>
        <div className="game-controls">
          <div className="score-container">
            <span>Puntuación: {state.score}</span>
          </div>
          <div className="timer-container">
            <span>Tiempo: {formatTime(state.time)}</span>
          </div>
        </div>
      </header>

      <section id="game-container" className="memory-board-game">
        <MemoryBoard cards={state.cards} flipCard={flipCard} />
      </section>

      {/* Modal de victoria */}
      {state.isFinished && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal">
            <h2 id="modal-title">🎉 ¡Completado!</h2>

            <div className="modal-stats">
              <div className="modal-stat">
                <span className="modal-stat__label">Puntuación</span>
                <span className="modal-stat__value">{state.score}</span>
              </div>
              <div className="modal-stat">
                <span className="modal-stat__label">Tiempo</span>
                <span className="modal-stat__value">{formatTime(state.time)}</span>
              </div>
            </div>

            {bestRecord.score !== null && (
              <div className="modal-best">
                <h3>🏆 Mejor puntuación</h3>
                <div className="modal-stats">
                  <div className="modal-stat">
                    <span className="modal-stat__label">Puntuación</span>
                    <span className="modal-stat__value">{bestRecord.score}</span>
                  </div>
                  <div className="modal-stat">
                    <span className="modal-stat__label">Tiempo</span>
                    <span className="modal-stat__value">{formatTime(bestRecord.time)}</span>
                  </div>
                </div>
              </div>
            )}

            <button className="btn-play-again" onClick={initGame}>
              Jugar de nuevo
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default MemoryPage;
