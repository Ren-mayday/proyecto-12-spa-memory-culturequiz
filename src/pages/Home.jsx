import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <main className="home">
      <h1>¡Bienvenidos! Empecemos a jugar</h1>
      <div className="cta-section">
        <Link to="/memory" className="cta-button memory-cta">
          <span className="cta-text">Memory Game</span>
        </Link>
        <Link to="/cultural-quiz" className="cta-button cta-quiz">
          <span className="cta-text">Quiz de cultura general</span>
        </Link>
      </div>
    </main>
  );
};

export default Home;
