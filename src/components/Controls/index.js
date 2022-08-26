import "./index.css";

const Controls = ({
  matrixSize,
  setMatrixSize,
  correctShuffle,
  randomShuffle,
  crazyShuffle,
  gameStartedAt,
  shuffleType,
}) => {
  const inputChangeHandler = ({ target: { value } }) => {
    setMatrixSize(Number(value));
  };

  const shuffleClass = gameStartedAt ? "" : "CTA";
  const getButtonBorderClass = (id) => (id === shuffleType ? "Selected" : "");

  return (
    <div className="Controls">
      <h1>Fifteen</h1>
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
