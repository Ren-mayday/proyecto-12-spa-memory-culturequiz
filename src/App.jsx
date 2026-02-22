import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import MemoryPage from "./pages/MemoryPage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="/memory" element={<MemoryPage />} />
        <Route path="/cultural-quiz" element={<QuizPage />} />
      </Route>
    </Routes>
  );
}

export default App;
