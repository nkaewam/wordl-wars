import { create } from "zustand";
import {
  getRandomWord,
  evaluateGuess,
  calculateRoundScore,
} from "./game-utils";
import type { GameStore, Player, TileState, GuessEvaluation } from "./types";

const MAX_GUESSES = 6;
const MAX_ROUNDS = 5;

// Helper function to get the best guess from a player's guesses
const getBestGuess = (guesses: string[], secretWord: string): string => {
  if (guesses.length === 0) return "";

  // Find the first correct guess, or return the last guess if no correct guess
  for (const guess of guesses) {
    const evaluation = evaluateGuess(guess, secretWord);
    if (evaluation.isCorrect) {
      return guess;
    }
  }

  return guesses[guesses.length - 1];
};

const createInitialPlayerState = (name: string) => ({
  name,
  score: 0,
  currentGuess: "",
  guesses: [],
  tileStates: [],
});

const createInitialGameState = () => ({
  // Game setup
  player1Name: "",
  player2Name: "",
  currentPlayer: "player1" as Player,
  currentRound: 1,
  maxRounds: MAX_ROUNDS,

  // Game state
  isGameActive: false,
  isGameComplete: false,
  secretWord: "",

  // Player states
  player1: createInitialPlayerState(""),
  player2: createInitialPlayerState(""),

  // Round state
  roundScores: [],
  currentRoundWinner: null,

  // UI state
  isLoading: false,
  error: null,
});

export const useGameStore = create<GameStore>((set, get) => ({
  ...createInitialGameState(),

  // Game setup actions
  startGame: (player1Name: string, player2Name: string) => {
    const secretWord = getRandomWord();

    set({
      player1Name,
      player2Name,
      currentPlayer: "player1",
      currentRound: 1,
      isGameActive: true,
      isGameComplete: false,
      secretWord,
      player1: createInitialPlayerState(player1Name),
      player2: createInitialPlayerState(player2Name),
      roundScores: [],
      currentRoundWinner: null,
      isLoading: false,
      error: null,
    });
  },

  resetGame: () => {
    set(createInitialGameState());
  },

  // Gameplay actions
  submitGuess: (guess: string) => {
    const state = get();
    const currentPlayer = state.currentPlayer;
    const player = state[currentPlayer];

    // Check if it's the current player's turn and they haven't completed their turn
    const isPlayerTurnComplete =
      player.guesses.length >= MAX_GUESSES ||
      player.guesses.some(
        (guess) => evaluateGuess(guess, state.secretWord).isCorrect
      );

    if (!state.isGameActive || isPlayerTurnComplete) {
      return;
    }

    // Evaluate the guess
    const evaluation = evaluateGuess(guess, state.secretWord);
    const tileStates = evaluation.tiles.map((tile) => tile.state);

    // Update player state
    const updatedPlayer = {
      ...player,
      guesses: [...player.guesses, guess],
      tileStates: [...player.tileStates, tileStates],
      currentGuess: "",
    };

    set({
      [currentPlayer]: updatedPlayer,
    });

    // Check if current player's turn is complete (correct guess or max guesses reached)
    if (evaluation.isCorrect || updatedPlayer.guesses.length >= MAX_GUESSES) {
      get().nextTurn();
    }
  },

  updateCurrentGuess: (guess: string) => {
    const state = get();
    const currentPlayer = state.currentPlayer;
    const player = state[currentPlayer];

    // Check if it's the current player's turn and they haven't completed their turn
    const isPlayerTurnComplete =
      player.guesses.length >= MAX_GUESSES ||
      player.guesses.some(
        (guess) => evaluateGuess(guess, state.secretWord).isCorrect
      );

    if (!state.isGameActive || isPlayerTurnComplete) {
      return;
    }

    // Only allow letters and limit to 5 characters
    const lettersOnly = guess
      .replace(/[^A-Za-z]/g, "")
      .toUpperCase()
      .slice(0, 5);

    set({
      [currentPlayer]: {
        ...player,
        currentGuess: lettersOnly,
      },
    });
  },

  nextTurn: () => {
    const state = get();
    const currentPlayer = state.currentPlayer;
    const player1 = state.player1;
    const player2 = state.player2;

    // Check if both players have completed their full turns (6 guesses each or correct word)
    const player1TurnComplete =
      player1.guesses.length >= MAX_GUESSES ||
      player1.guesses.some(
        (guess) => evaluateGuess(guess, state.secretWord).isCorrect
      );
    const player2TurnComplete =
      player2.guesses.length >= MAX_GUESSES ||
      player2.guesses.some(
        (guess) => evaluateGuess(guess, state.secretWord).isCorrect
      );

    if (player1TurnComplete && player2TurnComplete) {
      // Both players have completed their turns, evaluate the round
      const player1BestGuess = getBestGuess(player1.guesses, state.secretWord);
      const player2BestGuess = getBestGuess(player2.guesses, state.secretWord);

      const player1Evaluation = evaluateGuess(
        player1BestGuess,
        state.secretWord
      );
      const player2Evaluation = evaluateGuess(
        player2BestGuess,
        state.secretWord
      );

      // Calculate round score
      const roundScore = calculateRoundScore(
        player1Evaluation,
        player2Evaluation,
        state.secretWord
      );

      // Update player scores
      const updatedPlayer1 = {
        ...player1,
        score: player1.score + roundScore.player1Score,
      };
      const updatedPlayer2 = {
        ...player2,
        score: player2.score + roundScore.player2Score,
      };

      set({
        player1: updatedPlayer1,
        player2: updatedPlayer2,
        roundScores: [...state.roundScores, roundScore],
        currentRoundWinner: roundScore.winner,
      });

      // Check if game is complete
      if (state.currentRound >= state.maxRounds) {
        set({
          isGameActive: false,
          isGameComplete: true,
        });
      } else {
        // Start next round
        get().nextRound();
      }
    } else {
      // Switch to next player for their turn
      const nextPlayer: Player =
        currentPlayer === "player1" ? "player2" : "player1";
      set({ currentPlayer: nextPlayer });
    }
  },

  nextRound: () => {
    const state = get();
    const newSecretWord = getRandomWord();

    set({
      currentRound: state.currentRound + 1,
      currentPlayer: "player1",
      secretWord: newSecretWord,
      player1: {
        ...state.player1,
        currentGuess: "",
        guesses: [],
        tileStates: [],
      },
      player2: {
        ...state.player2,
        currentGuess: "",
        guesses: [],
        tileStates: [],
      },
      currentRoundWinner: null,
    });
  },

  // Player management actions
  setCurrentPlayer: (player: Player) => {
    set({ currentPlayer: player });
  },

  updatePlayerScore: (player: Player, score: number) => {
    set({
      [player]: {
        ...get()[player],
        score,
      },
    });
  },

  // UI actions
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));
