export const generateMatrix = (matrixSize, matrixSq) => {
  const arr = [...Array(matrixSize)].map((_) => [...Array(matrixSize)]);

  return arr.map((row, y) =>
    row.map((_, x) => {
      const count = x + y * matrixSize + 1;
      return count < matrixSq ? count : 0;
    })
  );
};

export const checkIsGameSolved = (matrix, matrixSq) => {
  const pattern = [...Array(matrixSq)].map((_, idx) =>
    idx + 1 < matrixSq ? idx + 1 : 0
  ).join``;
  const flatMatrix = matrix.reduce((a, b) => [...a, b.join``], []).join``;

  return pattern === flatMatrix;
};

export const getPlaceToMove = (y, x, matrix) => {
  if (matrix[y - 1] && matrix[y - 1][x] === 0) return [y - 1, x];
  if (matrix[y] && matrix[y][x - 1] === 0) return [y, x - 1];
  if (matrix[y] && matrix[y][x + 1] === 0) return [y, x + 1];
  if (matrix[y + 1] && matrix[y + 1][x] === 0) return [y + 1, x];
  return null;
};

const getRandomNumber = (limitNotIncluded) =>
  (Math.random() * limitNotIncluded) | 0;

export const getRandomShuffledMatrix = (matrixSize, matrixSq) => {
  const matrix = generateMatrix(matrixSize, matrixSq);
  for (let i = 0; i < matrixSize * matrixSize; i++) {
    const yNumber = getRandomNumber(matrixSize);
    const xNumber = getRandomNumber(matrixSize);
    const newY = getRandomNumber(matrixSize);
    const newX = getRandomNumber(matrixSize);

    if (matrix[yNumber][xNumber] !== 0 && matrix[newY][newX] !== 0) {
      const temp = matrix[yNumber][xNumber];
      matrix[yNumber][xNumber] = matrix[newY][newX];
      matrix[newY][newX] = temp;
    }
  }
  return matrix;
};

const getPossibleMoves = (emptyY, emptyX, matrixSize) => {
  return [
    { y: emptyY - 1, x: emptyX },
    { y: emptyY, x: emptyX - 1 },
    { y: emptyY, x: emptyX + 1 },
    { y: emptyY + 1, x: emptyX },
  ].filter(({ y, x }) => y > -1 && y < matrixSize && x > -1 && x < matrixSize);
};

export const getCorrectShuffledMatrix = (matrixSize, matrixSq) => {
  const matrix = generateMatrix(matrixSize, matrixSq);
  let emptyY = matrixSize - 1;
  let emptyX = matrixSize - 1;

  for (let i = 0; i < matrixSize * matrixSize * 10; i++) {
    const possibleMoves = getPossibleMoves(emptyY, emptyX, matrixSize);
    const randomMove = possibleMoves[getRandomNumber(possibleMoves.length)];

    matrix[emptyY][emptyX] = matrix[randomMove.y][randomMove.x];
    matrix[randomMove.y][randomMove.x] = 0;
    emptyY = randomMove.y;
    emptyX = randomMove.x;
  }

  return matrix;
};

const getMatrixCopy = (matrix) =>
  matrix.map((row) => row.map((value) => value));

export const getMatrixAfterSwap = (matrix, yNumber, xNumber, newY, newX) => {
  const matrixCopy = getMatrixCopy(matrix);
  const temp = matrix[yNumber][xNumber];
  matrixCopy[yNumber][xNumber] = matrix[newY][newX];
  matrixCopy[newY][newX] = temp;

  return matrixCopy;
};

export const getRandomRotationMap = (matrixSq) => {
  const rotationMap = [...Array(matrixSq)].map((_) => getRandomNumber(4));
  return rotationMap;
};
