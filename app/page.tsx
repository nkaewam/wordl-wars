import { LobbyForm } from "@/components/lobby-form";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center gap-10 bg-background overflow-hidden">
      <div className="z-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl items-center justify-center font-mono text-sm flex flex-col gap-10 sm:gap-14 md:gap-16 h-full">
        <Image
          src="/wordl-wars-transparent.webp"
          alt="Wordl Wars Logo"
          width={400}
          height={400}
          className="w-64 lg:w-auto h-auto"
        />

        {/* Lobby Form */}
        <div className="flex w-full items-center justify-center min-h-0">
          <div className="bg-card p-3 sm:p-4 md:p-6 rounded-xl shadow-xl border-2 sm:border-4 border-border w-full">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 md:mb-6 text-center text-card-foreground">
              Enter Player Names
            </h2>
            <LobbyForm />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs sm:text-sm text-muted-foreground">
          <div>made with &lt;3 from @itstontann for @pploycheeze</div>
          <div className="mt-1">🐕 🐱</div>
        </div>
      </div>
    </main>
  );
}
