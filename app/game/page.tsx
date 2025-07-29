"use client";

import { useEffect } from "react";
import { useGameStore } from "@/lib/game-store";
import { evaluateGuess } from "@/lib/game-utils";
import { TurnIndicator } from "@/components/turn-indicator";
import { WordGrid } from "@/components/word-grid";
import { OnScreenKeyboard } from "@/components/on-screen-keyboard";
import { AnswerRevealDialog } from "@/components/answer-reveal-dialog";
import { CorrectGuessDialog } from "@/components/correct-guess-dialog";
import { DebugAnswerKey } from "@/components/debug-answer-key";

export default function GamePage() {
  const {
    player1Name,
    player2Name,
    currentPlayer,
    currentRound,
    maxRounds,
    isGameActive,
    secretWord,
    player1,
    player2,
    showAnswerDialog,
    showCorrectGuessDialog,
    correctGuessPlayer,
    startGame,
    submitGuess,
    updateCurrentGuess,
    nextTurn,
    closeAnswerDialog,
    closeCorrectGuessDialog,
  } = useGameStore();

  // Initialize game if not already active
  useEffect(() => {
    if (!isGameActive && player1Name && player2Name) {
      startGame(player1Name, player2Name);
    }
  }, [isGameActive, player1Name, player2Name, startGame]);

  const currentPlayerState = currentPlayer === "player1" ? player1 : player2;
  const isCurrentPlayerTurn =
    isGameActive &&
    currentPlayerState.guesses.length < 6 &&
    !currentPlayerState.guesses.some((guess) => {
      const evaluation = evaluateGuess(guess, secretWord);
      return evaluation.isCorrect;
    });

  const handleKeyPress = (key: string) => {
    if (!isCurrentPlayerTurn) return;

    const newGuess = currentPlayerState.currentGuess + key;
    if (newGuess.length <= 5) {
      updateCurrentGuess(newGuess);
    }
  };

  const handleBackspace = () => {
    if (!isCurrentPlayerTurn) return;

    const newGuess = currentPlayerState.currentGuess.slice(0, -1);
    updateCurrentGuess(newGuess);
  };

  const handleEnter = () => {
    if (!isCurrentPlayerTurn || currentPlayerState.currentGuess.length !== 5)
      return;

    submitGuess(currentPlayerState.currentGuess);
  };

  // Calculate key states for keyboard - only for current player's current turn
  const calculateKeyStates = () => {
    const keyStates: Record<string, "correct" | "present" | "absent"> = {};

    // Only use the current player's guesses for this turn
    const currentPlayerGuesses = currentPlayerState.guesses;
    const currentPlayerTileStates = currentPlayerState.tileStates;

    currentPlayerGuesses.forEach((guess, guessIndex) => {
      const tileStates = currentPlayerTileStates[guessIndex];
      if (tileStates) {
        guess.split("").forEach((letter, letterIndex) => {
          const state = tileStates[letterIndex];
          const key = letter.toUpperCase();

          // Only update if we don't have a better state already
          if (
            !keyStates[key] ||
            state === "correct" ||
            (state === "present" && keyStates[key] === "absent")
          ) {
            keyStates[key] = state;
          }
        });
      }
    });

    return keyStates;
  };

  const keyStates = calculateKeyStates();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <DebugAnswerKey secretWord={secretWord} />
      <div className="z-10 max-w-4xl w-full items-center justify-center font-mono text-sm lg:flex flex-col gap-8">
        {/* Game Header */}
        {/* <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Wordle Wars
          </h1>
        </div> */}

        {/* Turn Indicator */}

        <TurnIndicator
          currentPlayer={currentPlayer}
          player1Name={player1Name}
          player2Name={player2Name}
          player1Score={player1.score}
          player2Score={player2.score}
          currentRound={currentRound}
          maxRounds={maxRounds}
        />

        <WordGrid
          currentGuess={currentPlayerState.currentGuess}
          previousGuesses={currentPlayerState.guesses}
          tileStates={currentPlayerState.tileStates}
          currentRow={currentPlayerState.guesses.length}
          onChange={updateCurrentGuess}
          disabled={!isCurrentPlayerTurn}
          className="mb-4"
        />

        {/* On-Screen Keyboard */}

        <OnScreenKeyboard
          onKeyPress={handleKeyPress}
          onBackspace={handleBackspace}
          onEnter={handleEnter}
          keyStates={keyStates}
          disabled={!isCurrentPlayerTurn}
          isEnterDisabled={currentPlayerState.currentGuess.length !== 5}
        />
      </div>

      <AnswerRevealDialog
        open={showAnswerDialog}
        onOpenChange={(open) => {
          if (!open) closeAnswerDialog();
        }}
      />

      <CorrectGuessDialog
        open={showCorrectGuessDialog}
        onOpenChange={(open) => {
          if (!open) closeCorrectGuessDialog();
        }}
        playerName={
          correctGuessPlayer === "player1" ? player1Name : player2Name
        }
      />
    </main>
  );
}
