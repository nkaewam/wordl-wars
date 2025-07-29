/**
 * TypeScript types and interfaces for Wordle Wars
 */

export type TileState = "correct" | "present" | "absent";

export type Player = "player1" | "player2";

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
  winner: Player | "tie" | null;
}

export interface PlayerState {
  name: string;
  score: number;
  currentGuess: string;
  guesses: string[];
  tileStates: TileState[][];
}

export interface GameState {
  // Game setup
  player1Name: string;
  player2Name: string;
  currentPlayer: Player;
  currentRound: number;
  maxRounds: number;

  // Game state
  isGameActive: boolean;
  isGameComplete: boolean;
  secretWord: string;

  // Player states
  player1: PlayerState;
  player2: PlayerState;

  // Round state
  roundScores: RoundScore[];
  currentRoundWinner: Player | "tie" | null;

  // UI state
  isLoading: boolean;
  error: string | null;
}

export interface GameActions {
  // Game setup
  startGame: (player1Name: string, player2Name: string) => void;
  resetGame: () => void;

  // Gameplay
  submitGuess: (guess: string) => void;
  updateCurrentGuess: (guess: string) => void;
  nextTurn: () => void;
  nextRound: () => void;

  // Player management
  setCurrentPlayer: (player: Player) => void;
  updatePlayerScore: (player: Player, score: number) => void;

  // UI actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export type GameStore = GameState & GameActions;
