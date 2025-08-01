import { Tile } from "../app.types";

/**
 * Checks if a tile can be flagged (not revealed and game not over)
 * @param board - The board to check
 * @param x - The x coordinate of the tile
 * @param y - The y coordinate of the tile
 * @param gameOver - Whether the game is over
 * @returns Whether the tile can be flagged
 */
export const canFlagTile = (
  board: Tile[][],
  x: number,
  y: number,
  gameOver: boolean
): boolean => {
  return !gameOver && board[x]?.[y] && !board[x][y].isRevealed;
};

/**
 * Toggles the flag state of a tile
 * @param board - The board to toggle the flag on
 * @param x - The x coordinate of the tile
 * @param y - The y coordinate of the tile
 * @returns The updated board
 */
export const toggleTileFlag = (
  board: Tile[][],
  x: number,
  y: number
): Tile[][] => {
  const updatedBoard = [...board];
  updatedBoard[x][y].isFlagged = !updatedBoard[x][y].isFlagged;
  return updatedBoard;
};

/**
 * Counts the total number of flagged tiles on the board
 * @param board - The board to count flagged tiles on
 * @returns The number of flagged tiles
 */
export const countFlaggedTiles = (board: Tile[][]): number => {
  return board.flat().filter((tile) => tile.isFlagged).length;
};

/**
 * Main function to toggle a tile flag and return updated state
 * @param board - The board to toggle the flag on
 * @param x - The x coordinate of the tile
 * @param y - The y coordinate of the tile
 * @param gameOver - Whether the game is over
 * @returns The updated board and the number of flagged tiles
 */
export const toggleFlag = (
  board: Tile[][],
  x: number,
  y: number,
  gameOver: boolean
): {
  updatedBoard: Tile[][];
  flagCount: number;
} => {
  if (!canFlagTile(board, x, y, gameOver)) {
    return {
      updatedBoard: board,
      flagCount: countFlaggedTiles(board),
    };
  }

  const updatedBoard = toggleTileFlag(board, x, y);
  const flagCount = countFlaggedTiles(updatedBoard);

  return {
    updatedBoard,
    flagCount,
  };
};
