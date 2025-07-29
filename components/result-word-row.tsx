"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { TileState } from "@/lib/types";

interface ResultWordRowProps {
  word: string;
  tileStates: TileState[];
  className?: string;
}

export function ResultWordRow({
  word,
  tileStates,
  className,
}: ResultWordRowProps) {
  const getTileStateColor = (state: TileState): string => {
    switch (state) {
      case "correct":
        return "bg-green-500 border-green-500 text-white";
      case "present":
        return "bg-yellow-500 border-yellow-500 text-white";
      case "absent":
        return "bg-gray-500 border-gray-500 text-white";
      default:
        return "bg-card border-border text-foreground";
    }
  };

  return (
    <div className={cn("flex justify-center", className)}>
      <div className="flex gap-0.5 sm:gap-1">
        {Array.from({ length: 5 }, (_, colIndex) => (
          <div
            key={colIndex}
            className={cn(
              "size-6 sm:size-7 md:size-8 text-xs sm:text-sm rounded-sm font-bold border-2 flex items-center justify-center transition-all duration-200",
              getTileStateColor(tileStates[colIndex])
            )}
          >
            {word[colIndex] || ""}
          </div>
        ))}
      </div>
    </div>
  );
}
