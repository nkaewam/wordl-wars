import {
  getWordCount,
  getAnswerCount,
  getRandomWord,
  isValidWord,
} from "../lib/game-utils";
import { ComponentsDemo } from "./components-demo";

export default function Home() {
  // Test the word list loading
  const totalWords = getWordCount();
  const totalAnswers = getAnswerCount();
  const randomWord = getRandomWord();
  const isValidTest = isValidWord("hello");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col gap-8">
        <h1 className="text-4xl font-bold mb-8">Wordle Wars</h1>

        {/* Word List Status */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Word List Status</h2>
          <div className="space-y-2">
            <p>
              <strong>Total words loaded:</strong> {totalWords}
            </p>
            <p>
              <strong>Answer words loaded:</strong> {totalAnswers}
            </p>
            <p>
              <strong>Random word:</strong> {randomWord}
            </p>
            <p>
              <strong>Is &quot;hello&quot; valid?</strong>{" "}
              {isValidTest ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* Components Demo */}
        <ComponentsDemo />
      </div>
    </main>
  );
}
