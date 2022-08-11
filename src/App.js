import { useEffect, useState } from "react";
import Controls from "./components/Controls";
import Game from "./components/Game";
import {
  generateMatrix,
  checkIsGameSolved,
  getRandomShuffledMatrix,
  getRandomRotationMap,
} from "./utilities";
// import Footer from "./components/Footer";

import "./App.css";

function App() {
  const [matrixSize, setMatrixSize] = useState(4);
  const [matrix, setMatrix] = useState(null);
  const [crazyRotationMap, setCrazyRotationMap] = useState(null);
  const [gameStartedAt, setGameStartedAt] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);

  const matrixSq = matrixSize * matrixSize;

  // const [animationStart, setAnimationStart] = useState([null, null, null]);
  // console.log("animationStart", animationStart);

  useEffect(() => {
    const matrix = generateMatrix(matrixSize, matrixSq);
    setMatrix(matrix);
    setGameFinished(false);
    setGameStartedAt(null);
    setCrazyRotationMap(null);
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

  // useEffect(() => {
  //   if (animationStart[0]) {
  //     setTimeout(() => {
  //       setAnimationStart([null, null, null]);
  //     }, 500);
  //   }
  // }, [animationStart]);

  const randomShuffle = () => {
    const randomShuffledMatrix = getRandomShuffledMatrix(matrixSize, matrixSq);

    setCrazyRotationMap(null);
    setMatrix(randomShuffledMatrix);
    setGameStartedAt(null);
    setGameFinished(false);
  };

  const crazyShuffle = () => {
    const randomShuffledMatrix = getRandomShuffledMatrix(matrixSize, matrixSq);
    const rotationMap = getRandomRotationMap(matrixSq);
    console.log("rotationMap", rotationMap);

    setCrazyRotationMap(rotationMap);
    setMatrix(randomShuffledMatrix);
    setGameStartedAt(null);
    setGameFinished(false);
  };

  return (
    <div className="App">
      <Controls
        matrixSize={matrixSize}
        setMatrixSize={setMatrixSize}
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
      {/* <Footer /> */}
    </div>
  );
}

export default App;
