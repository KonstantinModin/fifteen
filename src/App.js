import { useEffect, useState } from "react";
import Controls from "./components/Controls";
import Game from "./components/Game";
import Footer from "./components/Footer";
import {
  generateMatrix,
  checkIsGameSolved,
  getCorrectShuffledMatrix,
  getRandomShuffledMatrix,
  getRandomRotationMap,
} from "./utilities";

import "./App.css";

const App = () => {
  const [matrixSize, setMatrixSize] = useState(4);
  const [matrix, setMatrix] = useState(null);
  const [crazyRotationMap, setCrazyRotationMap] = useState(null);
  const [gameStartedAt, setGameStartedAt] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);

  const matrixSq = matrixSize * matrixSize;

  const startNewGame = (matrix, rotationMap) => {
    setMatrix(matrix);
    setGameFinished(false);
    setGameStartedAt(null);
    setCrazyRotationMap(rotationMap);
  };

  useEffect(() => {
    const matrix = generateMatrix(matrixSize, matrixSq);
    startNewGame(matrix, null);
  }, [matrixSize, matrixSq]);

  useEffect(() => {
    const isGameSolved =
      matrix &&
      !crazyRotationMap &&
      gameStartedAt &&
      checkIsGameSolved(matrix, matrixSq);

    if (isGameSolved) {
      setGameFinished(true);
      alert("You did it!");
    }
  }, [matrix, matrixSize, matrixSq, gameStartedAt, crazyRotationMap]);

  const correctShuffle = () => {
    const correctShuffledMatrix = getCorrectShuffledMatrix(
      matrixSize,
      matrixSq
    );

    startNewGame(correctShuffledMatrix, null);
  };

  const randomShuffle = () => {
    const randomShuffledMatrix = getRandomShuffledMatrix(matrixSize, matrixSq);

    startNewGame(randomShuffledMatrix, null);
  };

  const crazyShuffle = () => {
    const randomShuffledMatrix = getRandomShuffledMatrix(matrixSize, matrixSq);
    const rotationMap = getRandomRotationMap(matrixSq);

    startNewGame(randomShuffledMatrix, rotationMap);
  };

  return (
    <div className="App">
      <Controls
        matrixSize={matrixSize}
        setMatrixSize={setMatrixSize}
        correctShuffle={correctShuffle}
        randomShuffle={randomShuffle}
        crazyShuffle={crazyShuffle}
      />
      <Game
        matrix={matrix}
        setMatrix={setMatrix}
        gameFinished={gameFinished}
        gameStartedAt={gameStartedAt}
        setGameStartedAt={setGameStartedAt}
        crazyRotationMap={crazyRotationMap}
      />
      <Footer />
    </div>
  );
};

export default App;
