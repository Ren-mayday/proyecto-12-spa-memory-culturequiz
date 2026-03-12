import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import MemoryPage from "./pages/MemoryPage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import QuizGamePage from "./pages/QuizGamePage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="/memory" element={<MemoryPage />} />
        <Route path="/cultural-quiz">
          <Route index element={<QuizPage />} />
          <Route path=":difficulty" element={<QuizGamePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
