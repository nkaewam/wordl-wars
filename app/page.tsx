import { LobbyForm } from "@/components/lobby-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-2xl w-full items-center justify-center font-mono text-sm lg:flex flex-col gap-8">
        {/* Game Title */}
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Wordle Wars
          </h1>
          <p className="text-xl text-gray-600">
            Battle your friends in the ultimate word-guessing showdown!
          </p>
        </div>

        {/* Lobby Form */}
        <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Enter Player Names
          </h2>
          <LobbyForm />
        </div>

        {/* Game Info */}
        <div className="text-center text-sm text-gray-500 mt-8">
          <p>5 rounds • 6 guesses per round • Best score wins!</p>
        </div>
      </div>
    </main>
  );
}
