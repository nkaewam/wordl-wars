/**
 * TypeScript types and interfaces for Wordle Wars
 */

export type TileState = "correct" | "present" | "absent";

export interface TileEvaluation {
  letter: string;
  state: TileState;
  position: number;
}

export interface GuessEvaluation {
  tiles: TileEvaluation[];
  isCorrect: boolean;
  score: number;
}

export interface RoundScore {
  player1Score: number;
  player2Score: number;
  winner: "player1" | "player2" | "tie" | null;
}
