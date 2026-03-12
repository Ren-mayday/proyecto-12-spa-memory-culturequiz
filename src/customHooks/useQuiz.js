import { useReducer, useEffect, useRef } from "react";
import { quizReducer, initialState, parsedQuestions, TOTAL_QUESTIONS } from "../reducers/quizReducer";

export function useQuiz(difficulty) {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const timeRef = useRef(null);

  // Fetch preguntas (al montar y al reiniciar)
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `https://opentdb.com/api.php?amount=${TOTAL_QUESTIONS}&type=multiple&difficulty=${difficulty}`,
        );
        const data = await res.json();
        if (data.response_code !== 0) throw new Error("No se pudieron cargar las preguntas");
        dispatch({ type: "LOAD_SUCCESS", payload: parseQuestions(data.results) });
      } catch (error) {
        dispatch({ type: "LOAD_ERROR", payload: error.message });
      }
    };

    fetchQuestions();
  }, [state.isLoading, difficulty]);

  // Timeout por pregunta
  useEffect(() => {
    if (state.isLoading || state.isFinished || state.selectedAnswer !== null) return;

    timeRef.current = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => clearInterval(timeRef.current);
  }, [state.currentIndex, state.isLoading, state.isFinished, state.selectedAnswer]);

  // Timeout cuando el tiempo llega a 0
  useEffect(() => {
    if (state.selectedAnswer !== null) {
      clearInterval(timeRef.current);
    }
  }, [state.selectedAnswer]);

  const selectedAnswer = (answer) => dispatch({ type: "SELECTED_ANSWER", payload: answer });
  const nextQuestion = () => dispatch({ type: "NEXT_QUESTION" });
  const restart = () => dispatch({ type: "RESTART" });

  return {
    ...state,
    currentQuestion: state.questions[state.currentIndex] ?? null,
    totalQuestions: TOTAL_QUESTIONS,
    selectedAnswer,
    nextQuestion,
    restart,
  };
}
