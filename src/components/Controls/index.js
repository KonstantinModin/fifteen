import { useEffect, useState } from "react";
import "./index.css";

const Controls = ({
  matrixSize,
  setMatrixSize,
  correctShuffle,
  randomShuffle,
  crazyShuffle,
  gameStartedAt,
  shuffleType,
  isTimerTicking,
}) => {
  const [timeToShow, setTimeToShow] = useState(0);

  // update game time
  useEffect(() => {
    const id = setTimeout(() => {
      if (gameStartedAt && isTimerTicking) {
        const timePassed = Date.now() - gameStartedAt;
        setTimeToShow((timePassed / 1e3) | 0);
      }
    }, 1000);
    return () => clearTimeout(id);
  }, [isTimerTicking, gameStartedAt, timeToShow]);

  // clear game time on the beginning of round
  useEffect(() => {
    const now = Date.now();
    const timeDiff = now - gameStartedAt;

    if (timeDiff < 10) {
      setTimeToShow(0);
    }
  }, [gameStartedAt]);

  const inputChangeHandler = ({ target: { value } }) => {
    setMatrixSize(Number(value));
  };

  const shuffleClass = gameStartedAt ? "" : "CTA";
  const getButtonBorderClass = (id) => (id === shuffleType ? "Selected" : "");

  return (
    <div className="Controls">
      <h1>Fifteen</h1>
      <div>Time : {gameStartedAt ? timeToShow : 0} sec</div>
      <label>
        Board size: {matrixSize} x {matrixSize}
      </label>
      <input
        type="range"
        min="3"
        max="10"
        onChange={inputChangeHandler}
        value={matrixSize}
      />
      <div className="Buttons">
        <button
          className={`${shuffleClass} ${getButtonBorderClass(1)}`}
          onClick={correctShuffle}
        >
          Shuffle
        </button>
        <button className={getButtonBorderClass(2)} onClick={randomShuffle}>
          Random Shuffle
        </button>
        <button className={getButtonBorderClass(3)} onClick={crazyShuffle}>
          Crazy Shuffle
        </button>
      </div>
    </div>
  );
};

export default Controls;
