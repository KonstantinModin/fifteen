import "./index.css";

const Controls = ({
  matrixSize,
  setMatrixSize,
  correctShuffle,
  randomShuffle,
  crazyShuffle,
}) => {
  const inputChangeHandler = ({ target: { value } }) => {
    setMatrixSize(Number(value));
  };

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
        <button onClick={correctShuffle}>Shuffle</button>
        <button onClick={randomShuffle}>Random Shuffle</button>
        <button onClick={crazyShuffle}>Crazy Shuffle</button>
      </div>
    </div>
  );
};

export default Controls;
