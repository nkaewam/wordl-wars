import { create } from "zustand";
import {
  getRandomWord,
  evaluateGuess,
  calculateRoundScore,
} from "./game-utils";
import type { GameStore, Player, TileState, GuessEvaluation } from "./types";

const MAX_GUESSES = 6;
const MAX_ROUNDS = 5;

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

    if (!state.isGameActive || player.guesses.length >= MAX_GUESSES) {
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

    // Check if round is complete
    if (evaluation.isCorrect || updatedPlayer.guesses.length >= MAX_GUESSES) {
      get().nextTurn();
    }
  },

  updateCurrentGuess: (guess: string) => {
    const state = get();
    const currentPlayer = state.currentPlayer;
    const player = state[currentPlayer];

    if (!state.isGameActive || player.guesses.length >= MAX_GUESSES) {
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

    // Check if both players have completed their turns
    if (player1.guesses.length > 0 && player2.guesses.length > 0) {
      // Get the last guess from each player and evaluate them
      const player1LastGuess = player1.guesses[player1.guesses.length - 1];
      const player2LastGuess = player2.guesses[player2.guesses.length - 1];

      const player1Evaluation = evaluateGuess(
        player1LastGuess,
        state.secretWord
      );
      const player2Evaluation = evaluateGuess(
        player2LastGuess,
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
      // Switch to next player
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
