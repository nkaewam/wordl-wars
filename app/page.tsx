import { LobbyForm } from "@/components/lobby-form";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      <div className="z-10 max-w-2xl w-full items-center justify-center font-mono text-sm lg:flex flex-col gap-8">
        <Image
          src="/wordl-wars-transparent.webp"
          alt="Wordl Wars Logo"
          width={300}
          height={300}
        />

        {/* Lobby Form */}
        <div className="bg-card p-8 rounded-xl shadow-xl border-4 border-border w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center text-card-foreground">
            Enter Player Names
          </h2>
          <LobbyForm />
        </div>

        {/* Game Info */}
        <div className="text-center text-sm text-muted-foreground mt-8">
          3 rounds • 6 guesses per round • Best score wins!
        </div>
      </div>
    </main>
  );
}
