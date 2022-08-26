import { getPlaceToMove, getMatrixAfterSwap } from "../../utilities";
import "./index.css";

const Game = ({
  matrix,
  setMatrix,
  gameFinished,
  gameStartedAt,
  gameTouched,
  setGameTouched,
  crazyRotationMap,
}) => {
  const gameWidth = document.querySelector(".Game")?.offsetWidth;

  const cellOnClickHandler = (y, x) => {
    if (gameFinished || !gameStartedAt) return;
    if (!gameTouched) setGameTouched(true);

    const yNumber = Number(y);
    const xNumber = Number(x);

    const placeToMove = getPlaceToMove(yNumber, xNumber, matrix);
    if (!placeToMove) return;

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
      <div
        className={className}
        key={`cell-${x}`}
        onClick={() => cellOnClickHandler(y, x)}
      >
        <span onClick={() => cellOnClickHandler(y, x)}>
          {cell ? cell : null}
        </span>
      </div>
    );
  };

  const renderRow = (row, y) => {
    return (
      <div className="Row" key={`row-${y}`}>
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
