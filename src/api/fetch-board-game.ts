import { Game, Tile } from "../app.types";

export const BOARD_SIZE = 3;
export const MINE_COUNT = 3;
export const COIN_COUNT = 2; // Number of coins to place on the board

const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 0],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

/**
 * Creates an empty board with the specified size
 * @returns A 2D array of empty tiles
 */
const createEmptyBoard = (): Tile[][] => {
  return Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
      hasCoin: false,
    }))
  );
};

/**
 * Places mines on the board
 * @param board - The board to place mines on
 */
const placeMines = (board: Tile[][]): void => {
  let minesPlaced = 0;
  while (minesPlaced < MINE_COUNT) {
    const x = Math.floor(Math.random() * BOARD_SIZE);
    const y = Math.floor(Math.random() * BOARD_SIZE);

    if (!board[x][y].isMine) {
      board[x][y].isMine = true;
      minesPlaced++;
    }
  }
};

/**
 * Places coins on the board (not on mines)
 * @param board - The board to place coins on
 */
const placeCoins = (board: Tile[][]): void => {
  let coinsPlaced = 0;
  while (coinsPlaced < COIN_COUNT) {
    const x = Math.floor(Math.random() * BOARD_SIZE);
    const y = Math.floor(Math.random() * BOARD_SIZE);

    if (!board[x][y].isMine && !board[x][y].hasCoin) {
      board[x][y].hasCoin = true;
      coinsPlaced++;
    }
  }
};

/**
 * Calculates the number of adjacent mines for each tile
 * @param board - The board to calculate adjacent mines for
 */
const calculateAdjacentMines = (board: Tile[][]): void => {
  for (let x = 0; x < BOARD_SIZE; x++) {
    for (let y = 0; y < BOARD_SIZE; y++) {
      if (board[x][y].isMine) continue;
      let count = 0;

      for (const [dx, dy] of DIRECTIONS) {
        const nx = x + dx;
        const ny = y + dy;

        if (
          nx >= 0 &&
          nx < BOARD_SIZE &&
          ny >= 0 &&
          ny < BOARD_SIZE &&
          board[nx][ny].isMine
        ) {
          count++;
        }
      }
      board[x][y].adjacentMines = count;
    }
  }
};

/**
 * Fetches a new board game
 * @returns A promise that resolves to a new game
 */
export const fetchBoardGame = async (): Promise<Game> => {
  const board = createEmptyBoard();
  placeMines(board);
  placeCoins(board);
  calculateAdjacentMines(board);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        board,
        gameOver: false,
        gameWon: false,
        mineCount: MINE_COUNT,
        flagCount: 0,
        coins: 0,
        totalCoinsEarned: 0,
        canCashOut: false,
      });
    }, 500);
  });
};
