import { useEffect, useReducer } from "react";
import { memoryReducer, initialGameState } from "../reducers/memoryReducer";

export function useMemory() {
  const [state, dispatch] = useReducer(memoryReducer, initialGameState);

  const initGame = () => dispatch({ type: "INIT_GAME" });
  const flipCard = (id) => dispatch({ type: "FLIP_CARD", payload: id });
  const checkMatch = () => dispatch({ type: "CHECK_MATCH" });

  useEffect(() => {
    if (state.flippedCards.length === 2) {
      setTimeout(() => {
        checkMatch();
      }, 1000);
    }
  }, [state.flippedCards]);

  return { state, initGame, flipCard, checkMatch };
}
