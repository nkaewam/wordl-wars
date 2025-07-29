"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/lib/game-store";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Award } from "lucide-react";

export default function ResultPage() {
  const router = useRouter();
  const {
    player1Name,
    player2Name,
    player1,
    player2,
    roundScores,
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Winner Banner */}
        <div className="text-center space-y-4">
          {winner === "tie" ? (
            <div className="space-y-4">
              <div className="flex justify-center items-center space-x-4">
                <Trophy className="h-16 w-16 text-yellow-500" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  It&apos;s a Tie!
                </h1>
                <Trophy className="h-16 w-16 text-yellow-500" />
              </div>
              <p className="text-xl text-muted-foreground">
                Both players scored {player1TotalScore} points
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center items-center space-x-4">
                <Trophy className="h-16 w-16 text-yellow-500" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {winnerName} Wins!
                </h1>
                <Trophy className="h-16 w-16 text-yellow-500" />
              </div>
              <p className="text-xl text-muted-foreground">
                Final Score: {winnerScore} - {loserScore}
              </p>
            </div>
          )}
        </div>

        {/* Final Scoreboard */}
        <div className="bg-card rounded-lg border p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-center">
            Final Scoreboard
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Player 1 */}
            <div
              className={`p-4 rounded-lg border-2 ${
                winner === "player1"
                  ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
                  : winner === "player2"
                  ? "border-gray-300 bg-gray-50 dark:bg-gray-900/20"
                  : "border-blue-300 bg-blue-50 dark:bg-blue-950/20"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">{player1Name}</h3>
                {winner === "player1" && (
                  <Medal className="h-6 w-6 text-yellow-500" />
                )}
                {winner === "tie" && (
                  <Award className="h-6 w-6 text-blue-500" />
                )}
              </div>
              <div className="text-3xl font-bold text-center">
                {player1TotalScore}
              </div>
              <div className="text-sm text-muted-foreground text-center">
                Total Points
              </div>
            </div>

            {/* Player 2 */}
            <div
              className={`p-4 rounded-lg border-2 ${
                winner === "player2"
                  ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
                  : winner === "player1"
                  ? "border-gray-300 bg-gray-50 dark:bg-gray-900/20"
                  : "border-purple-300 bg-purple-50 dark:bg-purple-950/20"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">{player2Name}</h3>
                {winner === "player2" && (
                  <Medal className="h-6 w-6 text-yellow-500" />
                )}
                {winner === "tie" && (
                  <Award className="h-6 w-6 text-purple-500" />
                )}
              </div>
              <div className="text-3xl font-bold text-center">
                {player2TotalScore}
              </div>
              <div className="text-sm text-muted-foreground text-center">
                Total Points
              </div>
            </div>
          </div>
        </div>

        {/* Round-by-Round Breakdown */}
        <div className="bg-card rounded-lg border p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-center">
            Round-by-Round Breakdown
          </h2>

          <div className="space-y-3">
            {roundScores.map((round, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <span className="font-medium">Round {index + 1}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm">
                    {player1Name}: {round.player1Score}
                  </span>
                  <span className="text-sm">
                    {player2Name}: {round.player2Score}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      round.winner === "player1"
                        ? "text-blue-600"
                        : round.winner === "player2"
                        ? "text-purple-600"
                        : "text-gray-600"
                    }`}
                  >
                    {round.winner === "player1"
                      ? `${player1Name} wins`
                      : round.winner === "player2"
                      ? `${player2Name} wins`
                      : "Tie"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Game Statistics */}
        <div className="bg-card rounded-lg border p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-center">
            Game Statistics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold">{turnHistory.length}</div>
              <div className="text-sm text-muted-foreground">Total Turns</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold">{roundScores.length}</div>
              <div className="text-sm text-muted-foreground">Rounds Played</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold">
                {player1TotalScore + player2TotalScore}
              </div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
          </div>
        </div>

        {/* Play Again Button */}
        <div className="text-center">
          <Button
            onClick={handlePlayAgain}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
          >
            Play Again
          </Button>
        </div>
      </div>
    </main>
  );
}
