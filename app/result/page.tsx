"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/lib/game-store";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Award } from "lucide-react";
import { ResultWordRow } from "@/components/result-word-row";

export default function ResultPage() {
  const router = useRouter();
  const {
    player1Name,
    player2Name,
    player1,
    player2,
    turnHistory,
    isGameComplete,
    resetGame,
  } = useGameStore();

  // Redirect to lobby if game is not complete
  useEffect(() => {
    if (!isGameComplete) {
      router.push("/");
    }
  }, [isGameComplete, router]);

  if (!isGameComplete) {
    return null;
  }

  // Determine the winner
  const player1TotalScore = player1.score;
  const player2TotalScore = player2.score;

  let winner: "player1" | "player2" | "tie" = "tie";
  if (player1TotalScore > player2TotalScore) {
    winner = "player1";
  } else if (player2TotalScore > player1TotalScore) {
    winner = "player2";
  }

  const winnerName = winner === "player1" ? player1Name : player2Name;
  const winnerScore =
    winner === "player1" ? player1TotalScore : player2TotalScore;
  const loserName = winner === "player1" ? player2Name : player1Name;
  const loserScore =
    winner === "player1" ? player2TotalScore : player1TotalScore;

  const handlePlayAgain = () => {
    resetGame();
    router.push("/");
  };

  console.log(turnHistory);

  return (
    <main className="h-screen flex flex-col bg-background overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
          {/* Winner Banner */}
          <div className="text-center space-y-2 sm:space-y-4">
            {winner === "tie" ? (
              <div className="space-y-2 sm:space-y-4">
                <div className="flex justify-center items-center space-x-2 sm:space-x-4">
                  <Trophy className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 text-yellow-500" />
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                    It&apos;s a Tie!
                  </h1>
                  <Trophy className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 text-yellow-500" />
                </div>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
                  Both players scored {player1TotalScore} points
                </p>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-4">
                <div className="flex justify-center items-center space-x-2 sm:space-x-4">
                  <Trophy className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 text-yellow-500" />
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {winnerName} Wins!
                  </h1>
                  <Trophy className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 text-yellow-500" />
                </div>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
                  Final Score: {winnerScore} - {loserScore}
                </p>
              </div>
            )}
          </div>

          {/* Final Scoreboard */}
          <div className="bg-card rounded-lg border p-4 sm:p-6 space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-center">
              Final Scoreboard
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Player 1 */}
              <div
                className={`p-3 sm:p-4 rounded-lg border-2 ${
                  winner === "player1"
                    ? "border-yellow-500 bg-yellow-950/20"
                    : winner === "player2"
                    ? "border-gray-300 bg-gray-900/20"
                    : "border-blue-300 bg-blue-950/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h3 className="text-base sm:text-lg font-semibold truncate">{player1Name}</h3>
                  {winner === "player1" && (
                    <Medal className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500 flex-shrink-0" />
                  )}
                  {winner === "tie" && (
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500 flex-shrink-0" />
                  )}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-center">
                  {player1TotalScore}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground text-center">
                  Total Points
                </div>
              </div>

              {/* Player 2 */}
              <div
                className={`p-3 sm:p-4 rounded-lg border-2 ${
                  winner === "player2"
                    ? "border-yellow-500 bg-yellow-950/20"
                    : winner === "player1"
                    ? "border-gray-300 bg-gray-900/20"
                    : "border-purple-300 bg-purple-950/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h3 className="text-base sm:text-lg font-semibold truncate">{player2Name}</h3>
                  {winner === "player2" && (
                    <Medal className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500 flex-shrink-0" />
                  )}
                  {winner === "tie" && (
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500 flex-shrink-0" />
                  )}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-center">
                  {player2TotalScore}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground text-center">
                  Total Points
                </div>
              </div>
            </div>
          </div>

          {/* Round-by-Round Breakdown */}
          <div className="bg-card rounded-lg border p-4 sm:p-6 space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-center">
              Round-by-Round Breakdown
            </h2>

            <div className="space-y-3 sm:space-y-4">
              {turnHistory.map((turn, index) => (
                <div key={index} className="p-3 sm:p-4 bg-muted/50 rounded-lg space-y-2 sm:space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="font-medium text-base sm:text-lg">
                      Round {turn.round}
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full self-start sm:self-auto ${
                        turn.winner === "player1"
                          ? "text-blue-600 bg-blue-900/20"
                          : turn.winner === "player2"
                          ? "text-purple-600 bg-purple-900/20"
                          : "text-gray-600 bg-gray-900/20"
                      }`}
                    >
                      {turn.winner === "player1"
                        ? `${player1Name} wins`
                        : turn.winner === "player2"
                        ? `${player2Name} wins`
                        : "Tie"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Player 1 Turn */}
                    <div className="p-3 sm:p-4 bg-card rounded-lg border">
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <h4 className="font-semibold text-blue-600 text-sm sm:text-base truncate">
                          {player1Name}
                        </h4>
                        <span className="text-xs sm:text-sm font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded flex-shrink-0">
                          {turn.player1Score} pts
                        </span>
                      </div>

                      {/* Best Guess Row */}
                      <div className="mb-2 sm:mb-3">
                        {turn.player1Turn.bestGuess ? (
                          <ResultWordRow
                            word={turn.player1Turn.bestGuess}
                            tileStates={turn.player1Turn.bestGuess
                              .split("")
                              .map((letter, letterIndex) => {
                                const answerKey = turn.player1Turn.answerKey;
                                if (
                                  letter.toLowerCase() ===
                                  answerKey[letterIndex].toLowerCase()
                                )
                                  return "correct";
                                if (
                                  answerKey
                                    .toLowerCase()
                                    .includes(letter.toLowerCase())
                                )
                                  return "present";
                                return "absent";
                              })}
                            className="mx-auto"
                          />
                        ) : (
                          <div className="text-center text-muted-foreground text-xs sm:text-sm">
                            No guesses made
                          </div>
                        )}
                      </div>

                      <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Answer:</span>
                          <span className="font-mono font-medium bg-muted px-2 py-1 rounded">
                            {turn.player1Turn.answerKey}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Player 2 Turn */}
                    <div className="p-3 sm:p-4 bg-card rounded-lg border">
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <h4 className="font-semibold text-purple-600 text-sm sm:text-base truncate">
                          {player2Name}
                        </h4>
                        <span className="text-xs sm:text-sm font-medium bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-2 py-1 rounded flex-shrink-0">
                          {turn.player2Score} pts
                        </span>
                      </div>

                      {/* Best Guess Row */}
                      <div className="mb-2 sm:mb-3">
                        {turn.player2Turn.bestGuess ? (
                          <ResultWordRow
                            word={turn.player2Turn.bestGuess}
                            tileStates={turn.player2Turn.bestGuess
                              .split("")
                              .map((letter, letterIndex) => {
                                const answerKey = turn.player2Turn.answerKey;
                                if (
                                  letter.toLowerCase() ===
                                  answerKey[letterIndex].toLowerCase()
                                )
                                  return "correct";
                                if (
                                  answerKey
                                    .toLowerCase()
                                    .includes(letter.toLowerCase())
                                )
                                  return "present";
                                return "absent";
                              })}
                            className="mx-auto"
                          />
                        ) : (
                          <div className="text-center text-muted-foreground text-xs sm:text-sm">
                            No guesses made
                          </div>
                        )}
                      </div>

                      <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Answer:</span>
                          <span className="font-mono font-medium bg-muted px-2 py-1 rounded">
                            {turn.player2Turn.answerKey}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Play Again Button - Fixed at bottom */}
      <div className="flex-shrink-0 p-4 sm:p-6 bg-background border-t border-border">
        <div className="text-center">
          <Button
            onClick={handlePlayAgain}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg"
          >
            Play Again
          </Button>
        </div>
      </div>
    </main>
  );
}
