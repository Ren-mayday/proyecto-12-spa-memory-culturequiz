//! Tablero con 12 cartas
import MemoryCard from "./MemoryCard";
import "./MemoryBoard.css";

const MemoryBoard = ({ cards, flipCard }) => {
  return (
    <div className="memory-board">
      {cards.map((card) => (
        <MemoryCard key={card.id} card={card} flipCard={flipCard} />
      ))}
    </div>
  );
};

export default MemoryBoard;
