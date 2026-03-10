import { useEffect, useReducer } from "react";
import { memoryReducer, initialGameState } from "../reducers/memoryReducer";

const LS_KEY = "memory_best";

function getBestRecord() {
  try {
    const stored = localStorage.getItem(LS_KEY);
    return stored ? JSON.parse(stored) : { score: null, time: null };
  } catch {
    return { score: null, time: null };
  }
}

function saveBestRecord(score, time) {
  const current = getBestRecord();

  const isBetterScore = current.score === null || score > current.score;
  const isSameScoreFasterTime = score === current.score && (current.time === null || time < current.time);

  if (isBetterScore || isSameScoreFasterTime) {
    localStorage.setItem(LS_KEY, JSON.stringify({ score, time }));
    return true;
  }
  return false;
}

export function useMemory() {
  const [state, dispatch] = useReducer(memoryReducer, initialGameState);

  const initGame = () => dispatch({ type: "INIT_GAME" });
  const flipCard = (id) => dispatch({ type: "FLIP_CARD", payload: id });
  const checkMatch = () => dispatch({ type: "CHECK_MATCH" });

  // Comprueba pareja tras voltear 2 cartas
  useEffect(() => {
    if (state.flippedCards.length === 2) {
      setTimeout(() => {
        checkMatch();
      }, 1000);
    }
  }, [state.flippedCards]);

  // Cronómetro: arranca con la primera carta, para al terminar
  useEffect(() => {
    if (!state.isStarted || state.isFinished) return;

    const interval = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isStarted, state.isFinished]);

  // Guarda récord al terminar la partida
  useEffect(() => {
    if (!state.isFinished) return;
    saveBestRecord(state.score, state.time);
  }, [state.isFinished]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return { state, initGame, flipCard, formatTime, bestRecord: getBestRecord() };
}
