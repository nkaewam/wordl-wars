/**
 * Tests for game utilities
 */

import {
  evaluateGuess,
  calculateRoundScore,
  getTileStateEmoji,
  getTileStateColor,
} from "./game-utils";

describe("Game Utils", () => {
  describe("evaluateGuess", () => {
    const testCases = [
      {
        guess: "HELLO",
        answer: "WORLD",
        expected: ["absent", "absent", "absent", "correct", "present"],
      },
      {
        guess: "WORLD",
        answer: "WORLD",
        expected: ["correct", "correct", "correct", "correct", "correct"],
      },
      {
        guess: "HELLO",
        answer: "HELLO",
        expected: ["correct", "correct", "correct", "correct", "correct"],
      },
      {
        guess: "STARE",
        answer: "SPARE",
        expected: ["correct", "absent", "correct", "correct", "correct"],
      },
      {
        guess: "SPARE",
        answer: "STARE",
        expected: ["correct", "absent", "correct", "correct", "correct"],
      },
      {
        guess: "HEART",
        answer: "EARTH",
        expected: ["present", "present", "present", "present", "present"],
      },
      {
        guess: "EARTH",
        answer: "HEART",
        expected: ["present", "present", "present", "present", "present"],
      },
      {
        guess: "ABOUT",
        answer: "ABOVE",
        expected: ["correct", "correct", "correct", "absent", "absent"],
      },
      {
        guess: "ABOVE",
        answer: "ABOUT",
        expected: ["correct", "correct", "correct", "absent", "absent"],
      },
    ];

    testCases.forEach(({ guess, answer, expected }) => {
      it(`should evaluate "${guess}" vs "${answer}" correctly`, () => {
        const result = evaluateGuess(guess, answer);
        const resultStates = result.tiles.map((tile) => tile.state);

        expect(resultStates).toEqual(expected);
        expect(result.tiles).toHaveLength(5);
        expect(result.isCorrect).toBe(
          guess.toLowerCase() === answer.toLowerCase()
        );

        // Test score calculation
        const expectedScore = resultStates.reduce((score, state) => {
          switch (state) {
            case "correct":
              return score + 10;
            case "present":
              return score + 5;
            case "absent":
              return score + 0;
            default:
              return score;
          }
        }, 0);

        expect(result.score).toBe(expectedScore);
      });
    });

    it("should throw error for invalid word lengths", () => {
      expect(() => evaluateGuess("HELL", "WORLD")).toThrow(
        "Both guess and answer must be 5 letters long"
      );
      expect(() => evaluateGuess("HELLO", "WORL")).toThrow(
        "Both guess and answer must be 5 letters long"
      );
    });
  });

  describe("calculateRoundScore", () => {
    it("should calculate round scores correctly", () => {
      const player1Guess = evaluateGuess("HELLO", "WORLD");
      const player2Guess = evaluateGuess("WORLD", "WORLD");
      const roundScore = calculateRoundScore(
        player1Guess,
        player2Guess,
        "WORLD"
      );

      // Player 1: 15 base points + 0 bonus = 15 total
      // Player 2: 50 base points + 50 bonus = 100 total
      expect(roundScore.player1Score).toBe(15);
      expect(roundScore.player2Score).toBe(100);
      expect(roundScore.winner).toBe("player2");
    });

    it("should handle tie correctly", () => {
      const player1Guess = evaluateGuess("HELLO", "WORLD");
      const player2Guess = evaluateGuess("WORLD", "WORLD");
      const roundScore = calculateRoundScore(
        player1Guess,
        player1Guess,
        "WORLD"
      );

      expect(roundScore.player1Score).toBe(roundScore.player2Score);
      expect(roundScore.winner).toBe("tie");
    });

    it("should handle both players getting correct answers", () => {
      const player1Guess = evaluateGuess("WORLD", "WORLD");
      const player2Guess = evaluateGuess("WORLD", "WORLD");
      const roundScore = calculateRoundScore(
        player1Guess,
        player2Guess,
        "WORLD"
      );

      expect(roundScore.player1Score).toBe(100); // 50 base + 50 bonus
      expect(roundScore.player2Score).toBe(100); // 50 base + 50 bonus
      expect(roundScore.winner).toBe("tie");
    });
  });

  describe("getTileStateEmoji", () => {
    it("should return correct emojis for each tile state", () => {
      expect(getTileStateEmoji("correct")).toBe("🟩");
      expect(getTileStateEmoji("present")).toBe("🟨");
      expect(getTileStateEmoji("absent")).toBe("⬛");
    });
  });

  describe("getTileStateColor", () => {
    it("should return correct Tailwind classes for each tile state", () => {
      expect(getTileStateColor("correct")).toBe("bg-green-500 text-white");
      expect(getTileStateColor("present")).toBe("bg-yellow-500 text-white");
      expect(getTileStateColor("absent")).toBe("bg-gray-500 text-white");
    });
  });
});
