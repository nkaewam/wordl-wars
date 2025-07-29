"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TurnIndicatorProps {
  currentPlayer: "player1" | "player2";
  player1Name: string;
  player2Name: string;
  player1Score: number;
  player2Score: number;
  currentRound: number;
  maxRounds?: number;
  className?: string;
}

export function TurnIndicator({
  currentPlayer,
  player1Name,
  player2Name,
  player1Score,
  player2Score,
  currentRound,
  maxRounds = 5,
  className,
}: TurnIndicatorProps) {
  const isPlayer1Turn = currentPlayer === "player1";

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Round indicator */}
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-700">
          Round {currentRound} of {maxRounds}
        </h2>
      </div>

      {/* Player indicators */}
      <div className="flex items-center gap-8">
        {/* Player 1 */}
        <div
          className={cn(
            "flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-300",
            isPlayer1Turn
              ? "border-blue-500 bg-blue-50 shadow-lg scale-110"
              : "border-gray-200 bg-gray-50"
          )}
        >
          <span
            className={cn(
              "text-lg font-bold transition-colors duration-300",
              isPlayer1Turn ? "text-blue-600" : "text-gray-500"
            )}
          >
            {player1Score}
          </span>
          <span
            className={cn(
              "font-semibold text-sm transition-colors duration-300",
              isPlayer1Turn ? "text-blue-700" : "text-gray-600"
            )}
          >
            {player1Name}
          </span>
        </div>

        {/* VS indicator */}
        <div className="text-gray-400 font-bold text-lg">VS</div>

        {/* Player 2 */}
        <div
          className={cn(
            "flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-300",
            !isPlayer1Turn
              ? "border-purple-500 bg-purple-50 shadow-lg scale-110"
              : "border-gray-200 bg-gray-50"
          )}
        >
          <span
            className={cn(
              "text-lg font-bold transition-colors duration-300",
              !isPlayer1Turn ? "text-purple-600" : "text-gray-500"
            )}
          >
            {player2Score}
          </span>
          <span
            className={cn(
              "font-semibold text-sm transition-colors duration-300",
              !isPlayer1Turn ? "text-purple-700" : "text-gray-600"
            )}
          >
            {player2Name}
          </span>

          {!isPlayer1Turn && (
            <span className="text-xs text-purple-600 mt-1 font-medium">
              Your turn
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
