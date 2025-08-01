import React from "react";
import { CardProps } from "../../app.types";
import { getTileContent } from "../../utils/utils";
import { cn } from "../../utils/cn";
import { baseClasses } from "./card.consts";

export const Card = ({ tile, onClick, onRightClick, gameOver }: CardProps) => {
  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onRightClick();
  };

  const isRevealed = tile.isRevealed || (gameOver && tile.isMine);
  const isFlagged = tile.isFlagged;
  const isMine = tile.isMine;

  const getTileClasses = () => {
    if (isFlagged) {
      return cn(baseClasses, "bg-yellow-100 hover:bg-yellow-200");
    }

    if (isRevealed) {
      if (isMine) {
        return cn(baseClasses, "bg-red-500 text-white");
      }
      return cn(baseClasses, "bg-gray-200");
    }

    return cn(baseClasses, "bg-gray-300 hover:bg-gray-400");
  };

  return (
    <button
      className={getTileClasses()}
      onClick={onClick}
      onContextMenu={handleRightClick}
      disabled={isRevealed || gameOver}
    >
      {getTileContent(tile, gameOver)}
    </button>
  );
};
