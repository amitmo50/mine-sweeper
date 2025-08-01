import { useCallback, useEffect, useState } from "react";
import { fetchBoardGame } from "../../api/fetch-board-game";
import { Game } from "../../app.types";
import { revealTile, handleCashOut, canCashOut } from "../../utils/game-logic";
import { toggleFlag } from "../../utils/flag-logic";
import {
  BOARD_TITLE,
  RESTART_BUTTON_TEXT,
  LOADING_TEXT,
  NO_BOARD_DATA_TEXT,
  RELOAD_GAME_TEXT,
  RESTART_ICON,
} from "./board-game.consts";
import { Board } from "../board/board";

export const BoardGame = () => {
  const [game, setGame] = useState<Game>({
    board: [],
    gameOver: false,
    gameWon: false,
    mineCount: 10,
    flagCount: 0,
    coins: 0,
    totalCoinsEarned: 0,
    canCashOut: false,
  });
  const [loading, setLoading] = useState(true);

  const loadGame = useCallback(async () => {
    setLoading(true);
    const newGame = await fetchBoardGame();
    setGame(newGame);
    setLoading(false);
  }, []);

  const handleTileClick = useCallback(
    (x: number, y: number) => {
      const result = revealTile(game.board, x, y, game.gameOver);

      setGame((prev) => ({
        ...prev,
        board: result.updatedBoard,
        gameOver: result.gameOver,
        gameWon: result.gameWon,
        coins: prev.coins + result.coinsEarned,
        canCashOut: canCashOut(
          prev.coins + result.coinsEarned,
          result.gameOver
        ),
      }));
    },
    [game.board, game.gameOver]
  );

  const handleTileRightClick = useCallback(
    (x: number, y: number) => {
      const result = toggleFlag(game.board, x, y, game.gameOver);

      setGame((prev) => ({
        ...prev,
        board: result.updatedBoard,
        flagCount: result.flagCount,
      }));
    },
    [game.board, game.gameOver]
  );

  const handleCashOutClick = useCallback(() => {
    const cashOutResult = handleCashOut(game.coins, game.totalCoinsEarned);

    setGame((prev) => ({
      ...prev,
      coins: cashOutResult.coins,
      totalCoinsEarned: cashOutResult.totalCoinsEarned,
      canCashOut: cashOutResult.canCashOut,
    }));
  }, [game.coins, game.totalCoinsEarned]);

  const handleRestart = useCallback(() => {
    loadGame();
  }, [loadGame]);

  useEffect(() => {
    loadGame();
  }, [loadGame]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020024] flex items-center justify-center text-[#FFFF]">
        <div className="text-white text-xl">{LOADING_TEXT}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center size-full min-h-screen bg-[#020024] text-[#FFFF]">
      {/* Header */}
      <div className="flex flex-col justify-center items-center py-[20px] gap-[10px]">
        <h1 className="text-[48px] min-[300px]:text-[24px] min-[600px]:text-[32px] min-[900px]:text-[48px] min-[1200px]:text-[64px] font-bold text-white">
          {BOARD_TITLE}
        </h1>
        <div className="flex flex-row justify-around gap-[10px] w-full">
          <p className="text-[24px] min-[300px]:text-[16px] min-[600px]:text-[20px] min-[900px]:text-[24px] min-[1200px]:text-[26px]">
            💣 Mines: {game.mineCount}
          </p>
          <p className="text-[24px] min-[300px]:text-[16px] min-[600px]:text-[20px] min-[900px]:text-[24px] min-[1200px]:text-[26px]">
            🚩 Flags: {game.flagCount}
          </p>
          <p className="text-[24px] min-[300px]:text-[16px] min-[600px]:text-[20px] min-[900px]:text-[24px] min-[1200px]:text-[26px]">
            🪙 Coins: {game.coins}
          </p>
          <p className="text-[24px] min-[300px]:text-[16px] min-[600px]:text-[20px] min-[900px]:text-[24px] min-[1200px]:text-[26px]">
            💰 Total: {game.totalCoinsEarned}
          </p>
        </div>
      </div>

      {/* Game Board */}
      {game.board.length > 0 && (
        <div className="flex flex-col justify-center items-center">
          <Board
            board={game.board}
            onTileClick={handleTileClick}
            onTileRightClick={handleTileRightClick}
            gameOver={game.gameOver}
            gameWon={game.gameWon}
          />
        </div>
      )}

      {/* No Game Data */}
      {!game.board.length && (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[48px] p-[20px]">{NO_BOARD_DATA_TEXT}</h1>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-row gap-[20px]">
        <button
          onClick={handleRestart}
          className="px-[20px] py-[10px] cursor-pointer text-[24px] border-[1px] border-[#FFFF] rounded-[10px] hover:bg-[#FFFF] hover:text-[#020024] transition-all duration-200"
        >
          {RESTART_ICON} {RESTART_BUTTON_TEXT}
        </button>
        {game.canCashOut && (
          <button
            onClick={handleCashOutClick}
            className="px-[20px] py-[10px] cursor-pointer text-[24px] border-[1px] border-[#FFFF] rounded-[10px] hover:bg-[#FFFF] hover:text-[#020024] transition-all duration-200 bg-green-600"
          >
            💰 Cash Out
          </button>
        )}
        {!game.board.length && (
          <button
            type="button"
            onClick={loadGame}
            className="px-[20px] py-[10px] cursor-pointer text-[24px] border-[1px] border-[#FFFF] rounded-[10px] hover:bg-[#FFFF] hover:text-[#020024] transition-all duration-200"
          >
            {RELOAD_GAME_TEXT}
          </button>
        )}
      </div>
    </div>
  );
};
