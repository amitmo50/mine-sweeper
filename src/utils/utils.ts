import { Tile } from "../app.types";

/**
 * Determines what content to display on a tile based on its state
 * @param tile - The tile to get the content for
 * @param gameOver - Whether the game is over
 * @returns The content to display on the tile
 */
export const getTileContent = (tile: Tile, gameOver: boolean): string => {
  if (tile.isFlagged) {
    return "🚩";
  }

  if (!tile.isRevealed && !gameOver) {
    return "";
  }

  if (tile.isMine) {
    return "💣";
  }

  // Show coin if tile has coin and is revealed
  if (tile.isRevealed && tile.hasCoin) {
    return "🪙";
  }

  if (tile.adjacentMines === 0) {
    return "";
  }

  return tile.adjacentMines.toString();
};
