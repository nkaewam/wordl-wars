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
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Round indicator */}
      <div className="text-center">
        <h2 className="text-lg font-semibold text-foreground">
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
              ? "border-accent bg-accent/10 shadow-lg scale-110"
              : "border-border bg-card"
          )}
        >
          <span
            className={cn(
              "text-lg font-bold transition-colors duration-300",
              isPlayer1Turn ? "text-accent" : "text-muted-foreground"
            )}
          >
            {player1Score}
          </span>
          <span
            className={cn(
              "font-semibold text-sm transition-colors duration-300",
              isPlayer1Turn ? "text-accent" : "text-muted-foreground"
            )}
          >
            {player1Name}
          </span>
        </div>

        {/* VS indicator */}
        <div className="text-muted-foreground font-bold text-lg">VS</div>

        {/* Player 2 */}
        <div
          className={cn(
            "flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-300",
            !isPlayer1Turn
              ? "border-primary bg-primary/10 shadow-lg scale-110"
              : "border-border bg-card"
          )}
        >
          <span
            className={cn(
              "text-lg font-bold transition-colors duration-300",
              !isPlayer1Turn ? "text-primary" : "text-muted-foreground"
            )}
          >
            {player2Score}
          </span>
          <span
            className={cn(
              "font-semibold text-sm transition-colors duration-300",
              !isPlayer1Turn ? "text-primary" : "text-muted-foreground"
            )}
          >
            {player2Name}
          </span>
        </div>
      </div>
    </div>
  );
}
