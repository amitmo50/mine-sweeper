import { Tile } from "../app.types";

/**
 * Checks if a tile can be revealed (not already revealed, flagged, or game over)
 * @param board - The board to check
 * @param x - The x coordinate of the tile
 * @param y - The y coordinate of the tile
 * @param gameOver - Whether the game is over
 * @returns Whether the tile can be revealed
 */
export const canRevealTile = (
  board: Tile[][],
  x: number,
  y: number,
  gameOver: boolean
): boolean => {
  return (
    !gameOver &&
    board[x]?.[y] &&
    !board[x][y].isRevealed &&
    !board[x][y].isFlagged
  );
};

/**
 * Reveals all mines on the board when game is lost
 * @param board - The board to reveal mines on
 * @returns The updated board
 */
export const revealAllMines = (board: Tile[][]): Tile[][] => {
  const updatedBoard = [...board];
  updatedBoard.forEach((row) => {
    row.forEach((cell) => {
      if (cell.isMine) {
        cell.isRevealed = true;
      }
    });
  });
  return updatedBoard;
};

/**
 * Gets all adjacent tiles for a given position
 * @param board - The board to get adjacent tiles from
 * @param x - The x coordinate of the tile
 * @param y - The y coordinate of the tile
 * @returns An array of adjacent tiles
 */
export const getAdjacentTiles = (
  board: Tile[][],
  x: number,
  y: number
): Array<{ x: number; y: number; tile: Tile }> => {
  const adjacentTiles: Array<{ x: number; y: number; tile: Tile }> = [];

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && nx < board.length && ny >= 0 && ny < board[0].length) {
        adjacentTiles.push({
          x: nx,
          y: ny,
          tile: board[nx][ny],
        });
      }
    }
  }

  return adjacentTiles;
};

/**
 * Reveals a single tile and returns the updated board
 * @param board - The board to reveal a tile on
 * @param x - The x coordinate of the tile
 * @param y - The y coordinate of the tile
 * @returns The updated board
 */
export const revealSingleTile = (
  board: Tile[][],
  x: number,
  y: number
): Tile[][] => {
  const updatedBoard = [...board];
  updatedBoard[x][y].isRevealed = true;
  return updatedBoard;
};

/**
 * Performs flood fill to reveal adjacent tiles when clicking on a blank tile
 * @param board - The board to perform flood fill on
 * @param startX - The x coordinate of the starting tile
 * @param startY - The y coordinate of the starting tile
 * @returns The updated board
 */
export const floodFillReveal = (
  board: Tile[][],
  startX: number,
  startY: number
): Tile[][] => {
  const updatedBoard = [...board];
  const stack = [{ x: startX, y: startY }];
  const visited = new Set<string>();

  while (stack.length > 0) {
    const { x: cx, y: cy } = stack.pop()!;
    const key = `${cx},${cy}`;

    if (visited.has(key)) continue;
    visited.add(key);

    const adjacentTiles = getAdjacentTiles(updatedBoard, cx, cy);

    for (const { x: nx, y: ny, tile } of adjacentTiles) {
      if (!tile.isRevealed && !tile.isFlagged) {
        updatedBoard[nx][ny].isRevealed = true;

        if (updatedBoard[nx][ny].adjacentMines === 0) {
          stack.push({ x: nx, y: ny });
        }
      }
    }
  }

  return updatedBoard;
};

/**
 * Checks if the game has been won by counting revealed tiles
 * @param board - The board to check if the game has been won
 * @returns Whether the game has been won
 */
export const checkGameWon = (board: Tile[][]): boolean => {
  const totalTiles = board.length * board[0].length;
  const revealedTiles = board.flat().filter((tile) => tile.isRevealed).length;
  const mineCount = board.flat().filter((tile) => tile.isMine).length;

  return revealedTiles === totalTiles - mineCount;
};

/**
 * Main function to reveal a tile and handle all game logic
 * @param board - The board to reveal a tile on
 * @param x - The x coordinate of the tile
 * @param y - The y coordinate of the tile
 * @param gameOver - Whether the game is over
 * @returns The updated board, whether the game is over, whether the game has been won, and coin information
 */
export const revealTile = (
  board: Tile[][],
  x: number,
  y: number,
  gameOver: boolean
): {
  updatedBoard: Tile[][];
  gameOver: boolean;
  gameWon: boolean;
  coinsEarned: number;
} => {
  if (!canRevealTile(board, x, y, gameOver)) {
    return {
      updatedBoard: board,
      gameOver,
      gameWon: false,
      coinsEarned: 0,
    };
  }

  const tile = board[x][y];
  let coinsEarned = 0;

  if (tile.isMine) {
    const updatedBoard = revealAllMines(board);
    return {
      updatedBoard,
      gameOver: true,
      gameWon: false,
      coinsEarned: 0,
    };
  }

  let updatedBoard = revealSingleTile(board, x, y);

  // Check if the revealed tile has a coin
  if (tile.hasCoin) {
    coinsEarned = 1;
    // Remove the coin from the tile after collection
    updatedBoard[x][y].hasCoin = false;
  }

  if (tile.adjacentMines === 0) {
    updatedBoard = floodFillReveal(updatedBoard, x, y);
  }

  const gameWon = checkGameWon(updatedBoard);

  return {
    updatedBoard,
    gameOver: gameWon,
    gameWon,
    coinsEarned,
  };
};

/**
 * Handles cash out logic - converts current coins to total earned and resets current coins
 * @param currentCoins - Current coins to cash out
 * @param totalCoinsEarned - Total coins earned so far
 * @returns Updated coin values after cash out
 */
export const handleCashOut = (
  currentCoins: number,
  totalCoinsEarned: number
): {
  coins: number;
  totalCoinsEarned: number;
  canCashOut: boolean;
} => {
  const newTotalCoinsEarned = totalCoinsEarned + currentCoins;

  return {
    coins: 0,
    totalCoinsEarned: newTotalCoinsEarned,
    canCashOut: false,
  };
};

/**
 * Checks if player can cash out (has coins and game is not over)
 * @param coins - Current coins
 * @param gameOver - Whether the game is over
 * @returns Whether player can cash out
 */
export const canCashOut = (coins: number, gameOver: boolean): boolean => {
  return coins > 0 && !gameOver;
};
