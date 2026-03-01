//! Estado inicial del juego
import { emojis } from "../data/memoryData";

export const initialGameState = {
  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  attempts: 0,
  isFinished: false,
  isChecking: false,
};

export function memoryReducer(state, action) {
  switch (action.type) {
    case "INIT_GAME":
      const duplicatedEmojis = [...emojis, ...emojis];
      const cards = duplicatedEmojis.map((emoji, index) => ({
        id: index,
        emoji: emoji,
        isFlipped: false,
        isMatched: false,
      }));
      console.log(cards);
      const shuffleCards = cards.sort(() => Math.random() - 0.5);
      return { ...state, cards: shuffleCards };
    case "FLIP_CARD":
      if (state.isChecking || state.flippedCards.length === 2) return state;
      const updatedCards = state.cards.map((card) =>
        card.id === action.payload ? { ...card, isFlipped: true } : card,
      );
      const flippedCard = state.cards.find((card) => card.id === action.payload);
      return {
        ...state,
        cards: updatedCards,
        flippedCards: [...state.flippedCards, flippedCard],
      };
    case "CHECK_MATCH":
      const [first, second] = state.flippedCards;
      const isMatch = first.emoji === second.emoji;

      if (isMatch) {
        const updatedCards = state.cards.map((card) =>
          card.emoji === first.emoji ? { ...card, isMatched: true } : card,
        );
        const newMatchedPairs = state.matchedPairs + 1;
        return {
          ...state,
          cards: updatedCards,
          flippedCards: [],
          matchedPairs: newMatchedPairs,
          isFinished: newMatchedPairs === 6,
          isChecking: false,
        };
      } else {
        const updatedCards = state.cards.map((card) =>
          card.id === first.id || card.id === second.id ? { ...card, isFlipped: false } : card,
        );
        return {
          ...state,
          cards: updatedCards,
          flippedCards: [],
          attempts: state.attempts + 1,
          isChecking: false,
        };
      }

    default:
      return state;
  }
}
