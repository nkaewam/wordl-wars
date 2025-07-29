/**
 * Game utilities for Wordle Wars
 */

import { ALL_WORDS, ANSWER_WORDS } from "@/constant/words";
import type {
  TileState,
  TileEvaluation,
  GuessEvaluation,
  RoundScore,
} from "./types";

/**
 * Load and preprocess the 5-letter word list
 * @returns string[] Array of 5-letter words for validation
 */
export function loadWordList(): string[] {
  return ALL_WORDS;
}

/**
 * Load the answer word list (common words only)
 * @returns string[] Array of common 5-letter words for answers
 */
export function loadAnswerList(): string[] {
  return ANSWER_WORDS;
}

/**
 * Get a random word from the answer list (common words only)
 * @returns string A random 5-letter word suitable for answers
 */
export function getRandomWord(): string {
  const randomIndex = Math.floor(Math.random() * ANSWER_WORDS.length);
  return ANSWER_WORDS[randomIndex];
}

/**
 * Validate if a word is in the comprehensive word list
 * @param word The word to validate
 * @returns boolean True if the word is valid for guessing
 */
export function isValidWord(word: string): boolean {
  return ALL_WORDS.includes(word.toLowerCase());
}

/**
 * Get the total number of words in the validation list
 * @returns number Number of available words for validation
 */
export function getWordCount(): number {
  return ALL_WORDS.length;
}

/**
 * Get the total number of answer words
 * @returns number Number of available answer words
 */
export function getAnswerCount(): number {
  return ANSWER_WORDS.length;
}

/**
 * Evaluate a guess against the answer and return tile states
 * @param guess The player's guess (5-letter word)
 * @param answer The correct answer (5-letter word)
 * @returns GuessEvaluation with tile states and score
 */
export function evaluateGuess(guess: string, answer: string): GuessEvaluation {
  const normalizedGuess = guess.toLowerCase();
  const normalizedAnswer = answer.toLowerCase();

  if (normalizedGuess.length !== 5 || normalizedAnswer.length !== 5) {
    throw new Error("Both guess and answer must be 5 letters long");
  }

  const tiles: TileEvaluation[] = [];
  const answerLetterCounts = new Map<string, number>();

  // Count letters in the answer
  for (const letter of normalizedAnswer) {
    answerLetterCounts.set(letter, (answerLetterCounts.get(letter) || 0) + 1);
  }

  // First pass: mark correct letters and update counts
  for (let i = 0; i < 5; i++) {
    const guessLetter = normalizedGuess[i];
    const answerLetter = normalizedAnswer[i];

    if (guessLetter === answerLetter) {
      tiles.push({
        letter: guessLetter,
        state: "correct",
        position: i,
      });
      // Decrease count for this letter
      answerLetterCounts.set(
        guessLetter,
        answerLetterCounts.get(guessLetter)! - 1
      );
    } else {
      tiles.push({
        letter: guessLetter,
        state: "absent", // Will be updated in second pass if needed
        position: i,
      });
    }
  }

  // Second pass: mark present letters (not in correct position)
  for (let i = 0; i < 5; i++) {
    const guessLetter = normalizedGuess[i];
    const currentTile = tiles[i];

    // Only process if not already marked as correct
    if (currentTile.state !== "correct") {
      const remainingCount = answerLetterCounts.get(guessLetter) || 0;

      if (remainingCount > 0) {
        currentTile.state = "present";
        answerLetterCounts.set(guessLetter, remainingCount - 1);
      }
      // If remainingCount is 0, keep as "absent"
    }
  }

  const isCorrect = normalizedGuess === normalizedAnswer;
  const score = calculateGuessScore(tiles);

  return {
    tiles,
    isCorrect,
    score,
  };
}

/**
 * Calculate score for a single guess based on tile states
 * @param tiles Array of tile evaluations
 * @returns number Score for this guess (1-5 based on correct letters)
 */
function calculateGuessScore(tiles: TileEvaluation[]): number {
  let correctCount = 0;

  for (const tile of tiles) {
    if (tile.state === "correct") {
      correctCount++;
    }
  }

  return correctCount; // 1-5 points based on how many letters are correct
}

/**
 * Calculate turn score for a single player's turn
 * @param guesses Array of guesses made in this turn
 * @param answer The correct answer for this round
 * @returns number Score for this turn (1-5 based on best guess)
 */
export function calculateTurnScore(guesses: string[], answer: string): number {
  if (guesses.length === 0) return 0;

  let bestScore = 0;

  // Find the best score from all guesses
  for (const guess of guesses) {
    const evaluation = evaluateGuess(guess, answer);

    if (evaluation.isCorrect) {
      return 5; // Perfect score for correct word
    }

    if (evaluation.score > bestScore) {
      bestScore = evaluation.score;
    }
  }

  return bestScore; // Return the best score achieved (1-4)
}

/**
 * Calculate round score comparing two players' guesses
 * @param player1Guess Player 1's guess evaluation
 * @param player2Guess Player 2's guess evaluation
 * @param answer The correct answer for this round
 * @returns RoundScore with individual scores and winner
 */
export function calculateRoundScore(
  player1Guess: GuessEvaluation,
  player2Guess: GuessEvaluation,
  answer: string
): RoundScore {
  let player1Score = player1Guess.score;
  let player2Score = player2Guess.score;

  // Bonus points for correct guess
  if (player1Guess.isCorrect) {
    player1Score += 50; // 50 bonus points for correct word
  }

  if (player2Guess.isCorrect) {
    player2Score += 50; // 50 bonus points for correct word
  }

  // Determine winner
  let winner: "player1" | "player2" | "tie" | null = null;

  if (player1Score > player2Score) {
    winner = "player1";
  } else if (player2Score > player1Score) {
    winner = "player2";
  } else {
    winner = "tie";
  }

  return {
    player1Score,
    player2Score,
    winner,
  };
}

/**
 * Get tile state emoji for display
 * @param state TileState
 * @returns string Emoji representation
 */
export function getTileStateEmoji(state: TileState): string {
  switch (state) {
    case "correct":
      return "🟩";
    case "present":
      return "🟨";
    case "absent":
      return "⬛";
    default:
      return "⬜";
  }
}

/**
 * Get tile state color class for styling
 * @param state TileState
 * @returns string Tailwind CSS class
 */
export function getTileStateColor(state: TileState): string {
  switch (state) {
    case "correct":
      return "bg-green-500 text-white";
    case "present":
      return "bg-yellow-500 text-white";
    case "absent":
      return "bg-gray-500 text-white";
    default:
      return "bg-gray-200 text-gray-800";
  }
}
