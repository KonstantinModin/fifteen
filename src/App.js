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
  const [isTimerTicking, setIsTimerTicking] = useState(false);

  const matrixSq = matrixSize * matrixSize;

  useEffect(() => {
    const updateLocalStorage = () => {
      const timePassed = ((Date.now() - gameStartedAt) / 1e3) | 0;

      const results =
        JSON.parse(window.localStorage.getItem("results15")) || {};
      if (!results[matrixSize]) results[matrixSize] = [];

      const newGameResult = { sec: timePassed };
      results[matrixSize] = [...results[matrixSize], newGameResult]
        .sort((a, b) => a.sec - b.sec)
        .slice(0, 12);

      window.localStorage.setItem("results15", JSON.stringify(results));
    };

    if (gameFinished) {
      setIsTimerTicking(false);
      updateLocalStorage();
    }
  }, [matrixSize, gameFinished, gameStartedAt]);

  const resetState = (rotationMap) => {
    setGameFinished(false);
    setGameTouched(false);
    setCrazyRotationMap(rotationMap);
    setGameStartedAt(null);
    setShuffleType(null);
    setIsTimerTicking(false);
  };

  const startNewGame = (matrix, rotationMap) => {
    resetState(rotationMap);
    setMatrix(matrix);
    const now = Date.now();
    setGameStartedAt(now);
    setIsTimerTicking(true);
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
        isTimerTicking={isTimerTicking}
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
      {gameFinished && (
        <Overlay
          text="You win!"
          onClick={correctShuffle}
          gameFinished={gameFinished}
          matrixSize={matrixSize}
        />
      )}
    </div>
  );
};

export default App;
