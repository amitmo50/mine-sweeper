import { useCallback } from "react";
import { BoardProps } from "../../app.types";
import { Card } from "../card/card";

export const Board = ({
  board,
  onTileClick,
  onTileRightClick,
  gameOver,
  gameWon,
}: BoardProps) => {
  const handleClick = useCallback(
    (x: number, y: number) => {
      onTileClick(x, y);
    },
    [onTileClick]
  );

  const handleRightClick = useCallback(
    (x: number, y: number) => {
      onTileRightClick(x, y);
    },
    [onTileRightClick]
  );

  return (
    <div className="flex flex-col justify-center items-center gap-[5px] p-[20px]">
      {/* Game status */}
      {gameOver && (
        <h1 className="text-center text-[32px] min-[300px]:text-[22px] min-[600px]:text-[24px] min-[900px]:text-[28px] min-[1200px]:text-[32px]">
          {gameWon ? "You Won! 🎉" : "Game Over! 💥"}
        </h1>
      )}

      {/* Actual game board */}
      <div className="flex flex-col gap-[10px]">
        {board.map((row, rowIndex) => (
          <div className="flex flex-row gap-[10px]" key={rowIndex}>
            {row.map((col, colIndex) => (
              <Card
                key={`${rowIndex}-${colIndex}`}
                tile={col}
                onClick={() => handleClick(rowIndex, colIndex)}
                onRightClick={() => handleRightClick(rowIndex, colIndex)}
                gameOver={gameOver}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
