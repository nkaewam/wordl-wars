import { create } from "zustand";
import { getRandomWord, evaluateGuess, calculateTurnScore } from "./game-utils";
import type {
  GameStore,
  Player,
  PlayerState,
  PlayerTurn,
  TurnHistory,
} from "./types";

const MAX_GUESSES = 6;
const MAX_ROUNDS = 1;

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

// Helper function to create player turn entry
const createPlayerTurn = (
  player: Player,
  round: number,
  turnNumber: number,
  answerKey: string,
  playerState: PlayerState,
  score: number
): PlayerTurn => ({
  player,
  round,
  turnNumber,
  answerKey,
  guesses: [...playerState.guesses],
  bestGuess: getBestGuess(playerState.guesses, answerKey),
  score,
  completed: true,
});

// Helper function to create turn history entry
const createTurnHistoryEntry = (
  round: number,
  turnNumber: number,
  player1AnswerKey: string,
  player2AnswerKey: string,
  player1: PlayerState,
  player2: PlayerState,
  player1Score: number,
  player2Score: number,
  winner: Player | "tie" | null
): TurnHistory => ({
  round,
  turnNumber,
  player1Turn: createPlayerTurn(
    "player1",
    round,
    turnNumber,
    player1AnswerKey,
    player1,
    player1Score
  ),
  player2Turn: createPlayerTurn(
    "player2",
    round,
    turnNumber,
    player2AnswerKey,
    player2,
    player2Score
  ),
  player1Score,
  player2Score,
  winner,
});

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

  // Player answer keys (each player has their own word)
  player1AnswerKey: "",
  player2AnswerKey: "",

  // Round state
  roundScores: [],
  currentRoundWinner: null,

  // Game history
  turnHistory: [],
  currentTurnNumber: 1,

  // UI state
  isLoading: false,
  error: null,

  // Dialog state
  showAnswerDialog: false,
  answerDialogPlayer: null,
  showCorrectGuessDialog: false,
  correctGuessPlayer: null,
});

export const useGameStore = create<GameStore>((set, get) => ({
  ...createInitialGameState(),

  // Game setup actions
  startGame: (player1Name: string, player2Name: string) => {
    const player1AnswerKey = getRandomWord();
    const player2AnswerKey = getRandomWord();

    set({
      player1Name,
      player2Name,
      currentPlayer: "player1",
      currentRound: 1,
      isGameActive: true,
      isGameComplete: false,
      secretWord: player1AnswerKey, // Start with player1's word
      player1AnswerKey,
      player2AnswerKey,
      player1: createInitialPlayerState(player1Name),
      player2: createInitialPlayerState(player2Name),
      roundScores: [],
      currentRoundWinner: null,
      turnHistory: [],
      currentTurnNumber: 1,
      isLoading: false,
      error: null,
      showCorrectGuessDialog: false,
      correctGuessPlayer: null,
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
      // Calculate turn score and update player score
      const turnScore = calculateTurnScore(
        updatedPlayer.guesses,
        state.secretWord
      );
      const finalUpdatedPlayer = {
        ...updatedPlayer,
        score: player.score + turnScore,
      };

      set({
        [currentPlayer]: finalUpdatedPlayer,
      });

      // If player guessed correctly, show correct guess dialog
      if (evaluation.isCorrect) {
        get().openCorrectGuessDialog(currentPlayer);
      }
      // If player ran out of guesses without finding the correct word, show answer dialog
      else if (updatedPlayer.guesses.length >= MAX_GUESSES) {
        get().openAnswerDialog(currentPlayer);
      }
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
        (guess) => evaluateGuess(guess, state.player1AnswerKey).isCorrect
      );
    const player2TurnComplete =
      player2.guesses.length >= MAX_GUESSES ||
      player2.guesses.some(
        (guess) => evaluateGuess(guess, state.player2AnswerKey).isCorrect
      );

    console.log(player1, player2);

    // Player 2 has completed their turn, meaning player 1 has also completed their turn
    if (player2TurnComplete) {
      // Both players have completed their turns, determine round winner
      const player1TurnScore = calculateTurnScore(
        player1.guesses,
        state.player1AnswerKey
      );
      const player2TurnScore = calculateTurnScore(
        player2.guesses,
        state.player2AnswerKey
      );

      // Determine round winner
      let roundWinner: Player | "tie" | null = null;
      if (player1TurnScore > player2TurnScore) {
        roundWinner = "player1";
      } else if (player2TurnScore > player1TurnScore) {
        roundWinner = "player2";
      } else {
        roundWinner = "tie";
      }

      // Create round score record (scores are already updated in player states)
      const roundScore = {
        player1Score: player1TurnScore,
        player2Score: player2TurnScore,
        winner: roundWinner,
      };

      // Create turn history entry
      const turnHistoryEntry = createTurnHistoryEntry(
        state.currentRound,
        state.currentTurnNumber,
        state.player1AnswerKey,
        state.player2AnswerKey,
        player1,
        player2,
        player1TurnScore,
        player2TurnScore,
        roundWinner
      );

      console.log(roundScore);
      console.log("Turn History Entry:", turnHistoryEntry);

      set({
        roundScores: [...state.roundScores, roundScore],
        currentRoundWinner: roundWinner,
        turnHistory: [...state.turnHistory, turnHistoryEntry],
      });

      // Check if game is complete
      if (state.currentRound >= state.maxRounds) {
        set({
          isGameActive: false,
          isGameComplete: true,
        });
      } else {
        // Start next round
        const newPlayer1AnswerKey = getRandomWord();
        const newPlayer2AnswerKey = getRandomWord();

        set({
          currentRound: state.currentRound + 1,
          currentTurnNumber: state.currentTurnNumber + 1,
          currentPlayer: "player1",
          secretWord: newPlayer1AnswerKey, // Start with player1's new word
          player1AnswerKey: newPlayer1AnswerKey,
          player2AnswerKey: newPlayer2AnswerKey,
          showCorrectGuessDialog: false,
          showAnswerDialog: false,
          correctGuessPlayer: null,
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
      }
    } else {
      // Switch to next player for their turn
      const nextPlayer: Player =
        currentPlayer === "player1" ? "player2" : "player1";

      // Set the secret word to the next player's answer key
      const nextPlayerAnswerKey =
        nextPlayer === "player1"
          ? state.player1AnswerKey
          : state.player2AnswerKey;

      set({
        currentPlayer: nextPlayer,
        secretWord: nextPlayerAnswerKey,
        showCorrectGuessDialog: false,
        showAnswerDialog: false,
        // Reset the next player's state for the new word
        [nextPlayer]: {
          ...state[nextPlayer],
          currentGuess: "",
          guesses: [],
          tileStates: [],
        },
      });
    }
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

  // Dialog actions
  openAnswerDialog: (player: Player) => {
    set({ showAnswerDialog: true, answerDialogPlayer: player });
  },

  closeAnswerDialog: () => {
    set({ showAnswerDialog: false, answerDialogPlayer: null });
  },

  openCorrectGuessDialog: (player: Player) => {
    set({ showCorrectGuessDialog: true, correctGuessPlayer: player });
  },

  closeCorrectGuessDialog: () => {
    set({ showCorrectGuessDialog: false, correctGuessPlayer: null });
  },
}));
