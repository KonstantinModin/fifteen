import { useEffect, useState } from "react";
import "./index.css";

const Overlay = ({ text, onClick, gameFinished, matrixSize }) => {
  const [gameStats, setGameStats] = useState();

  useEffect(() => {
    if (gameFinished) {
      setTimeout(() => {
        const results = JSON.parse(window.localStorage.getItem("results15"));
        const currentGameStats = results && results[matrixSize];

        setGameStats(currentGameStats);
      }, 100);
    }
  }, [gameFinished, matrixSize]);

  return (
    <div className="Overlay" onClick={onClick}>
      <div className="Overlay-Text">{text}</div>
      {gameStats && (
        <div className="Results">
          <h3>Best times for current field size:</h3>
          <div>
            {gameStats.map(({ sec }, idx) => (
              <div key={idx}>Total time: {sec} sec.</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Overlay;
