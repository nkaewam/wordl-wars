"use client";

import { useGameStore } from "@/lib/game-store";
import { TurnIndicator } from "@/components/turn-indicator";

export default function GamePage() {
  const { player1Name, player2Name, currentPlayer, currentRound, maxRounds } =
    useGameStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-4xl w-full items-center justify-center font-mono text-sm lg:flex flex-col gap-8">
        {/* Game Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Wordle Wars
          </h1>
          <p className="text-lg text-gray-600">
            Round {currentRound} of {maxRounds}
          </p>
        </div>

        {/* Turn Indicator */}
        <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200 w-full max-w-2xl">
          <TurnIndicator
            currentPlayer={currentPlayer}
            player1Name={player1Name}
            player2Name={player2Name}
            currentRound={currentRound}
            maxRounds={maxRounds}
          />
        </div>

        {/* Game Info */}
        <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
            Game Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-blue-600">Player 1</h3>
              <p className="text-gray-700">
                <strong>Name:</strong> {player1Name}
              </p>
              <p className="text-gray-700">
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    currentPlayer === "player1"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {currentPlayer === "player1" ? "Current Turn" : "Waiting"}
                </span>
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-purple-600">
                Player 2
              </h3>
              <p className="text-gray-700">
                <strong>Name:</strong> {player2Name}
              </p>
              <p className="text-gray-700">
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    currentPlayer === "player2"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {currentPlayer === "player2" ? "Current Turn" : "Waiting"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Round Progress */}
        <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
            Round Progress
          </h2>
          <div className="flex justify-center">
            <div className="flex space-x-2">
              {Array.from({ length: maxRounds }, (_, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index + 1 < currentRound
                      ? "bg-green-500 text-white"
                      : index + 1 === currentRound
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-gray-600 mt-4">
            {currentRound === 1
              ? "First round - let's begin!"
              : currentRound === maxRounds
              ? "Final round - make it count!"
              : `Round ${currentRound} in progress...`}
          </p>
        </div>

        {/* Back to Lobby Button */}
        {/* <div className="text-center">
          <button
            onClick={() => handleNavigation("/")}
            className="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Lobby
          </button>
        </div> */}
      </div>
    </main>
  );
}
