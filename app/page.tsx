import { LobbyForm } from "@/components/lobby-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      <div className="z-10 max-w-2xl w-full items-center justify-center font-mono text-sm lg:flex flex-col gap-8">
        {/* Game Title */}
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 text-foreground">
            <span className="inline-block">
              <span className="inline-flex">
                <span className="bg-accent text-accent-foreground px-2 py-1 rounded shadow-lg">
                  W
                </span>
                <span className="bg-primary text-primary-foreground px-2 py-1 rounded shadow-lg">
                  O
                </span>
                <span className="bg-accent text-accent-foreground px-2 py-1 rounded shadow-lg">
                  R
                </span>
                <span className="bg-primary text-primary-foreground px-2 py-1 rounded shadow-lg">
                  D
                </span>
                <span className="bg-accent text-accent-foreground px-2 py-1 rounded shadow-lg">
                  L
                </span>
              </span>
            </span>
            <div className="mt-2 text-foreground drop-shadow-lg">WARS</div>
          </h1>
          <p className="text-xl text-muted-foreground">
            Battle your friends in the ultimate word-guessing showdown!
          </p>
        </div>

        {/* Lobby Form */}
        <div className="bg-card p-8 rounded-xl shadow-xl border border-border w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center text-card-foreground">
            Enter Player Names
          </h2>
          <LobbyForm />
        </div>

        {/* Game Info */}
        <div className="text-center text-sm text-muted-foreground mt-8">
          5 rounds • 6 guesses per round • Best score wins!
        </div>
      </div>
    </main>
  );
}
