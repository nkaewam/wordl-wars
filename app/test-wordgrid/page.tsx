"use client";

import { useState } from "react";
import { WordGrid } from "@/components/word-grid";
import type { TileState } from "@/lib/types";

export default function TestWordGridPage() {
  const [word, setWord] = useState("");
  const [tileStates, setTileStates] = useState<TileState[]>([]);

  const handleWordChange = (newWord: string) => {
    setWord(newWord);
    // Clear tile states when word changes
    setTileStates([]);
  };

  const handleEvaluate = () => {
    if (word.length === 5) {
      // Simulate evaluation with "WORLD" as the answer
      const answer = "WORLD";
      const result = evaluateGuess(word, answer);
      setTileStates(result.tiles.map((tile) => tile.state));
    }
  };

  // Simple evaluation function for demo
  const evaluateGuess = (guess: string, answer: string) => {
    const tiles = [];
    const answerLetterCounts = new Map<string, number>();

    // Count letters in answer
    for (const letter of answer) {
      answerLetterCounts.set(letter, (answerLetterCounts.get(letter) || 0) + 1);
    }

    // First pass: mark correct letters
    for (let i = 0; i < 5; i++) {
      const guessLetter = guess[i];
      const answerLetter = answer[i];

      if (guessLetter === answerLetter) {
        tiles.push({
          letter: guessLetter,
          state: "correct" as TileState,
          position: i,
        });
        answerLetterCounts.set(
          guessLetter,
          answerLetterCounts.get(guessLetter)! - 1
        );
      } else {
        tiles.push({
          letter: guessLetter,
          state: "absent" as TileState,
          position: i,
        });
      }
    }

    // Second pass: mark present letters
    for (let i = 0; i < 5; i++) {
      if (tiles[i].state !== "correct") {
        const guessLetter = guess[i];
        const remainingCount = answerLetterCounts.get(guessLetter) || 0;

        if (remainingCount > 0) {
          tiles[i].state = "present";
          answerLetterCounts.set(guessLetter, remainingCount - 1);
        }
      }
    }

    return { tiles };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            WordGrid Test
          </h1>
          <p className="text-gray-600">
            Test the WordGrid component with different states
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter a 5-letter word:
            </label>
            <WordGrid
              value={word}
              onChange={handleWordChange}
              tileStates={tileStates}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleEvaluate}
              disabled={word.length !== 5}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Evaluate vs &quot;WORLD&quot;
            </button>
            <button
              onClick={() => {
                setWord("");
                setTileStates([]);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Clear
            </button>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">Current word:</h3>
            <p className="text-lg font-mono bg-gray-100 p-2 rounded">
              {word || "_____"}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">Tile states:</h3>
            <div className="flex gap-1">
              {tileStates.map((state, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded border-2 flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor:
                      state === "correct"
                        ? "#10b981"
                        : state === "present"
                        ? "#f59e0b"
                        : state === "absent"
                        ? "#6b7280"
                        : "#ffffff",
                    borderColor:
                      state === "correct"
                        ? "#10b981"
                        : state === "present"
                        ? "#f59e0b"
                        : state === "absent"
                        ? "#6b7280"
                        : "#d1d5db",
                    color: state ? "#ffffff" : "#000000",
                  }}
                >
                  {state ? state.charAt(0).toUpperCase() : "?"}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-medium text-gray-900 mb-3">Test Examples:</h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>WORLD</strong> → All green (correct)
            </p>
            <p>
              <strong>HELLO</strong> → Mixed states (L correct, L present,
              others absent)
            </p>
            <p>
              <strong>SPARE</strong> → Mixed states (S, P, A, R correct, E
              absent)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
