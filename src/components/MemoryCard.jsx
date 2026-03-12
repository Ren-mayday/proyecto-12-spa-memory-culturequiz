//! Carta individual

const MemoryCard = ({ card, flipCard }) => {
  return (
    <div className="memory-card" onClick={() => flipCard(card.id)}>
      {card.isFlipped ? card.emoji : "❓"}
    </div>
  );
};

export default MemoryCard;
