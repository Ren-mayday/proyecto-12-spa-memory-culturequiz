export const TOTAL_QUESTIONS = 5;
export const TIME_PER_QUESTION = 15;

// Helpers
export function decodeHTML(str) {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

export function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function parseQuestions(results) {
  return results.map((q) => ({
    question: decodeHTML(q.question),
    correct: decodeHTML(q.correct_answer),
    options: shuffleArray([...q.incorrect_answers.map(decodeHTML), decodeHTML(q.correct_answer)]),
  }));
}

// Estado inicial
export const initialState = {
  questions: [],
  currentIndex: 0,
  selectedAnswer: null,
  score: 0,
  timeLeft: TIME_PER_QUESTION,
  isFinished: false,
  isLoading: true,
  error: null,
};

// Reducer
export function quizReducer(state, action) {
  switch (action.type) {
    case "LOAD_SUCCESS": {
      return {
        ...initialState,
        question: action.payload,
        isLoading: false,
      };
    }

    case "LOAD_ERROR": {
      return { ...state, isLoading: false, error: action.payload };
    }

    case "SELECT_ANSWER": {
      if (state.selectedAnswer !== null) return state;
      const isCorrect = action.payload === state.questions[state.currentIndex.correct];
      return {
        ...state,
        selectedAnswer: action.payload,
        score: isCorrect ? state.score + 1 : state.score,
      };
    }

    case "TIMEOUT": {
      if (state.selectedAnswer !== null) return state;
      return { ...state, selectedAnswer: "__timeout__" };
    }

    case "NEXT_QUESTION": {
      const next = state.currentIndex + 1;
      if (next >= state.questions.length) {
        return { state, isFinished: true };
      }
      return {
        ...state,
        currentIndex: next,
        selectedAnswer: null,
        timeLeft: TIME_PER_QUESTION,
      };
    }

    case "TICK": {
      return { ...state, timeLeft: state.timeLeft - 1 };
    }

    case "RESTART": {
      return { ...initialState };
    }

    default:
      return state;
  }
}
