"use client";

import { useState } from "react";
import { WordGrid } from "@/components/word-grid";
import { OnScreenKeyboard } from "@/components/on-screen-keyboard";
import { TurnIndicator } from "@/components/turn-indicator";

export function ComponentsDemo() {
  // Demo state for components
  const [currentGuess, setCurrentGuess] = useState("");
  const [keyStates, setKeyStates] = useState<
    Record<string, "correct" | "present" | "absent">
  >({
    H: "present",
    E: "correct",
    L: "absent",
    O: "present",
  });

  const handleKeyPress = (key: string) => {
    if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key);
    }
  };

  const handleBackspace = () => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  const handleEnter = () => {
    console.log("Enter pressed with guess:", currentGuess);
    // In a real game, this would submit the guess
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Turn Indicator Demo */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">Turn Indicator Demo</h2>
        <TurnIndicator
          currentPlayer="player1"
          player1Name="Alice"
          player2Name="Bob"
          currentRound={2}
          maxRounds={5}
        />
      </div>

      {/* Word Grid Demo */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">Word Grid Demo</h2>
        <div className="flex flex-col items-center gap-4">
          <WordGrid
            value={currentGuess}
            onChange={setCurrentGuess}
            tileStates={["correct", "present", "absent", "present", "correct"]}
          />
          <p className="text-sm text-gray-600">
            Current guess: {currentGuess || "(empty)"}
          </p>
        </div>
      </div>

      {/* On-Screen Keyboard Demo */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">On-Screen Keyboard Demo</h2>
        <OnScreenKeyboard
          onKeyPress={handleKeyPress}
          onBackspace={handleBackspace}
          onEnter={handleEnter}
          keyStates={keyStates}
        />
      </div>
    </div>
  );
}
