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

  useEffect(() => {
    if (!state.isStarted || state.isFinished) return;

    const interval = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isStarted, state.isFinished]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return { state, initGame, flipCard, checkMatch, formatTime };
}
