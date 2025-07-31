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
import { TurnTimer } from "@/components/turn-timer";

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
    timeRemaining,
    showAnswerDialog,
    showCorrectGuessDialog,
    correctGuessPlayer,
    startGame,
    submitGuess,
    updateCurrentGuess,
    nextTurn,
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
    }) &&
    timeRemaining > 0; // Don't allow typing when time has expired

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
    <main className="h-[100dvh] flex flex-col items-center justify-center bg-background overflow-hidden">
      <DebugAnswerKey secretWord={secretWord} />
      <div className="z-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl flex flex-col items-center justify-center font-mono text-sm h-full gap-10">
        {/* Turn Indicator */}

        <TurnIndicator
          currentPlayer={currentPlayer}
          player1Name={player1Name}
          player2Name={player2Name}
          player1Score={player1.score}
          player2Score={player2.score}
          currentRound={currentRound}
          maxRounds={maxRounds}
          className="w-full"
        />

        {/* Turn Timer */}
        <TurnTimer />

        {/* Word Grid - Takes remaining space */}

        <WordGrid
          currentGuess={currentPlayerState.currentGuess}
          previousGuesses={currentPlayerState.guesses}
          tileStates={currentPlayerState.tileStates}
          currentRow={currentPlayerState.guesses.length}
          onChange={updateCurrentGuess}
          disabled={!isCurrentPlayerTurn}
          className="w-full"
        />

        {/* On-Screen Keyboard - Fixed at bottom */}
        <OnScreenKeyboard
          onKeyPress={handleKeyPress}
          onBackspace={handleBackspace}
          onEnter={handleEnter}
          keyStates={keyStates}
          disabled={!isCurrentPlayerTurn}
          isEnterDisabled={currentPlayerState.currentGuess.length !== 5}
          className="w-full"
        />
      </div>

      <AnswerRevealDialog open={showAnswerDialog} onOpenChange={() => {}} />

      <CorrectGuessDialog
        open={showCorrectGuessDialog}
        onOpenChange={() => {}}
        playerName={
          correctGuessPlayer === "player1" ? player1Name : player2Name
        }
        onContinue={nextTurn}
      />
    </main>
  );
}
