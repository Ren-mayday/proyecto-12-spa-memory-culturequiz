import { useReducer, useEffect, useRef } from "react";
import { quizReducer, initialState, parseQuestions, TOTAL_QUESTIONS } from "../reducers/quizReducer";

export function useQuiz(difficulty) {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const timerRef = useRef(null);

  // Fetch preguntas (al montar y al reiniciar)
  useEffect(() => {
    if (!state.isLoading) return;

    const controller = new AbortController();

    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `https://opentdb.com/api.php?amount=${TOTAL_QUESTIONS}&type=multiple&difficulty=${difficulty}&lang=es`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        if (data.response_code !== 0) throw new Error("No se pudieron cargar las preguntas.");
        dispatch({ type: "LOAD_SUCCESS", payload: parseQuestions(data.results) });
      } catch (error) {
        if (error.name === "AbortError") return;
        dispatch({
          type: "LOAD_ERROR",
          payload: "No se pudieron cargar las preguntas. Espera unos segundos e inténtalo de nuevo.",
        });
      }
    };

    fetchQuestions();

    return () => controller.abort();
  }, [state.isLoading, difficulty]);

  // Temporizador por pregunta
  useEffect(() => {
    if (state.isLoading || state.isFinished || state.selectedAnswer !== null) return;

    timerRef.current = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [state.currentIndex, state.isLoading, state.isFinished, state.selectedAnswer]);

  // Timeout cuando el tiempo llega a 0
  useEffect(() => {
    if (state.timeLeft <= 0 && state.selectedAnswer === null) {
      dispatch({ type: "TIMEOUT" });
    }
  }, [state.timeLeft]);

  // Para el timer al seleccionar respuesta
  useEffect(() => {
    if (state.selectedAnswer !== null) {
      clearInterval(timerRef.current);
    }
  }, [state.selectedAnswer]);

  const selectAnswer = (answer) => dispatch({ type: "SELECT_ANSWER", payload: answer });
  const nextQuestion = () => dispatch({ type: "NEXT_QUESTION" });
  const restart = () => dispatch({ type: "RESTART" });

  return {
    ...state,
    currentQuestion: state.questions[state.currentIndex] ?? null,
    totalQuestions: TOTAL_QUESTIONS,
    selectAnswer,
    nextQuestion,
    restart,
  };
}
