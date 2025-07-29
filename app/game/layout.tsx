"use client";

import React, { useEffect } from "react";
import { useGameStore } from "@/lib/game-store";
import { redirect, useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isGameActive, isLoading, error } = useGameStore();

  const router = useRouter();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Optionally show a confirmation dialog

      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading game...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Lobby
          </button>
        </div>
      </div>
    );
  }

  // Redirect to home if game is not active
  if (!isGameActive) redirect("/");

  return <div>{children}</div>;
};

export default Layout;
