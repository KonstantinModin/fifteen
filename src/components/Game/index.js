import { getPlaceToMove, getMatrixAfterSwap } from "../../utilities";
import "./index.css";

const Game = ({
  matrix,
  setMatrix,
  gameFinished,
  gameStartedAt,
  setGameStartedAt,
  crazyRotationMap,
}) => {
  const gameWidth = document.querySelector(".Game")?.offsetWidth;

  const cellOnClickHandler = ({
    target: {
      dataset: { value, y, x },
    },
  }) => {
    if (gameFinished || !gameStartedAt) return;

    const yNumber = Number(y);
    const xNumber = Number(x);

    const placeToMove = getPlaceToMove(yNumber, xNumber, matrix);
    if (!placeToMove) {
      console.log("no place to move!");
      return;
    }
    if (!gameStartedAt) {
      const now = new Date().getTime();
      setGameStartedAt(now);
    }
    const [newY, newX] = placeToMove;

    const newMatrix = getMatrixAfterSwap(matrix, yNumber, xNumber, newY, newX);

    setMatrix(newMatrix);
  };

  const directionClassMap = [
    "",
    " rotation-right",
    " rotation-bottom",
    " rotation-left",
  ];

  const renderCell = (cell, x, y) => {
    let className = cell ? "Cell" : "Cell empty";

    const direction = crazyRotationMap && crazyRotationMap[cell];
    if (direction !== null) {
      className += directionClassMap[direction];
    }
    if (!direction && x + y * matrix.length + 1 === cell) {
      className += " correct";
    }

    return (
      <div className={className} key={x}>
        <span
          onClick={cellOnClickHandler}
          data-value={cell}
          data-y={y}
          data-x={x}
        >
          {cell ? cell : null}
        </span>
      </div>
    );
  };
  const renderRow = (row, y) => {
    return (
      <div className="Row" key={y}>
        {row.map((cell, x) => renderCell(cell, x, y))}
      </div>
    );
  };

  return (
    <div className="Game" style={{ height: gameWidth }}>
      {matrix && matrix.map(renderRow)}
    </div>
  );
};

export default Game;
