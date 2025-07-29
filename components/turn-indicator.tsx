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
  maxRounds = 3,
  className,
}: TurnIndicatorProps) {
  const isPlayer1Turn = currentPlayer === "player1";

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-0.5 sm:gap-1 md:gap-2 w-full",
        className
      )}
    >
      {/* Round indicator */}
      <div className="text-center">
        <h2 className="text-sm sm:text-base md:text-lg font-semibold text-foreground">
          Round {currentRound} of {maxRounds}
        </h2>
      </div>

      {/* Player indicators */}
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 md:gap-4 lg:gap-6 w-full justify-center">
        {/* Player 1 */}
        <div
          className={cn(
            "flex flex-col items-center p-1 sm:p-2 md:p-3 rounded-lg border-2 transition-all duration-300 min-w-0 flex-1",
            // Make it rectangular on mobile (vertical layout)
            "w-44 sm:w-auto",
            isPlayer1Turn
              ? "border-accent bg-accent/10 shadow-lg scale-105 sm:scale-110"
              : "border-border bg-card"
          )}
        >
          <span
            className={cn(
              "text-sm sm:text-lg md:text-xl font-bold transition-colors duration-300",
              isPlayer1Turn ? "text-accent" : "text-muted-foreground"
            )}
          >
            {player1Score}
          </span>
          <span
            className={cn(
              "font-semibold text-xs sm:text-sm md:text-base transition-colors duration-300 text-center w-full px-1",
              isPlayer1Turn ? "text-accent" : "text-muted-foreground"
            )}
            title={player1Name}
          >
            {player1Name}
          </span>
        </div>

        {/* VS indicator */}
        <div className="text-muted-foreground font-bold text-sm sm:text-base md:text-lg px-1 sm:px-2 md:px-4">
          VS
        </div>

        {/* Player 2 */}
        <div
          className={cn(
            "flex flex-col items-center p-1 sm:p-2 md:p-3 rounded-lg border-2 transition-all duration-300 min-w-0 flex-1",
            // Make it rectangular on mobile (vertical layout)
            "w-44 sm:w-auto",
            !isPlayer1Turn
              ? "border-primary bg-primary/10 shadow-lg scale-105 sm:scale-110"
              : "border-border bg-card"
          )}
        >
          <span
            className={cn(
              "text-sm sm:text-lg md:text-xl font-bold transition-colors duration-300",
              !isPlayer1Turn ? "text-primary" : "text-muted-foreground"
            )}
          >
            {player2Score}
          </span>
          <span
            className={cn(
              "font-semibold text-xs sm:text-sm md:text-base transition-colors duration-300 text-center w-full px-1",
              !isPlayer1Turn ? "text-primary" : "text-muted-foreground"
            )}
            title={player2Name}
          >
            {player2Name}
          </span>
        </div>
      </div>
    </div>
  );
}
