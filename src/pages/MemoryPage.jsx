import "./MemoryPage.css";
import { Link } from "react-router-dom";

const MemoryPage = () => {
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
            <span>0</span>
          </div>
          <div className="timer-container">
            <span>00:00</span>
          </div>
        </div>
      </header>
    </main>
  );
};

export default MemoryPage;
