export enum TileStatus {
  WIN = "win",
  LOSE = "lose",
  REVEALED = "revealed",
  FLAGGED = "flagged",
}

export type Tile = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
  status?: TileStatus;
  hasCoin?: boolean;
};

export type Game = {
  board: Tile[][];
  gameOver: boolean;
  gameWon: boolean;
  mineCount: number;
  flagCount: number;
  coins: number;
  totalCoinsEarned: number;
  canCashOut: boolean;
};

export type BoardProps = {
  board: Tile[][];
  onTileClick: (x: number, y: number) => void;
  onTileRightClick: (x: number, y: number) => void;
  gameOver: boolean;
  gameWon: boolean;
};

export type CardProps = {
  tile: Tile;
  onClick: () => void;
  onRightClick: () => void;
  gameOver: boolean;
};
