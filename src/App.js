import { useEffect, useState } from "react";
import Confetti from "react-confetti";

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
import Overlay from "./components/Overlay";

const App = () => {
  const [matrixSize, setMatrixSize] = useState(4);
  const [matrix, setMatrix] = useState(null);
  const [crazyRotationMap, setCrazyRotationMap] = useState(null);
  const [gameStartedAt, setGameStartedAt] = useState(null);
  const [gameTouched, setGameTouched] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [shuffleType, setShuffleType] = useState(null);

  const matrixSq = matrixSize * matrixSize;

  const resetState = (rotationMap) => {
    setGameFinished(false);
    setGameTouched(false);
    setCrazyRotationMap(rotationMap);
    setGameStartedAt(null);
    setShuffleType(null);
  };

  const startNewGame = (matrix, rotationMap) => {
    resetState(rotationMap);
    setMatrix(matrix);
    const now = new Date().getTime();
    setGameStartedAt(now);
  };

  useEffect(() => {
    const matrix = generateMatrix(matrixSize, matrixSq);
    setMatrix(matrix);
    resetState(null);
  }, [matrixSize, matrixSq]);

  useEffect(() => {
    const isGameSolved =
      matrix &&
      gameTouched &&
      !crazyRotationMap &&
      gameStartedAt &&
      checkIsGameSolved(matrix, matrixSq);

    if (isGameSolved) {
      setGameFinished(true);
    }
  }, [
    matrix,
    matrixSize,
    matrixSq,
    gameStartedAt,
    crazyRotationMap,
    gameTouched,
  ]);

  const correctShuffle = () => {
    const correctShuffledMatrix = getCorrectShuffledMatrix(
      matrixSize,
      matrixSq
    );

    startNewGame(correctShuffledMatrix, null);
    setShuffleType(1);
  };

  const randomShuffle = () => {
    const randomShuffledMatrix = getRandomShuffledMatrix(matrixSize, matrixSq);

    startNewGame(randomShuffledMatrix, null);
    setShuffleType(2);
  };

  const crazyShuffle = () => {
    const randomShuffledMatrix = getRandomShuffledMatrix(matrixSize, matrixSq);
    const rotationMap = getRandomRotationMap(matrixSq);

    startNewGame(randomShuffledMatrix, rotationMap);
    setShuffleType(3);
  };

  return (
    <div className="App">
      <Controls
        matrixSize={matrixSize}
        setMatrixSize={setMatrixSize}
        correctShuffle={correctShuffle}
        randomShuffle={randomShuffle}
        crazyShuffle={crazyShuffle}
        gameStartedAt={gameStartedAt}
        shuffleType={shuffleType}
      />
      <Game
        matrix={matrix}
        setMatrix={setMatrix}
        gameFinished={gameFinished}
        gameStartedAt={gameStartedAt}
        setGameTouched={setGameTouched}
        crazyRotationMap={crazyRotationMap}
        gameTouched={gameTouched}
      />
      <Footer />
      {gameFinished && <Confetti numberOfPieces={500} wind={0.01} />}
      {gameFinished && <Overlay text="You win!" onClick={correctShuffle} />}
    </div>
  );
};

export default App;
