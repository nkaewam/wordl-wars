"use client";

import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import type { TileState } from "@/lib/types";

interface WordGridProps {
  currentGuess: string;
  previousGuesses: string[];
  tileStates: TileState[][];
  currentRow: number;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function WordGrid({
  currentGuess,
  previousGuesses,
  tileStates,
  currentRow,
  onChange,
  disabled = false,
  className,
}: WordGridProps) {
  const handleValueChange = (newValue: string) => {
    // Only allow letters and limit to 5 characters
    const lettersOnly = newValue
      .replace(/[^A-Za-z]/g, "")
      .toUpperCase()
      .slice(0, 5);
    onChange(lettersOnly);
  };

  const getTileStateColor = (rowIndex: number, colIndex: number): string => {
    if (
      rowIndex >= tileStates.length ||
      colIndex >= tileStates[rowIndex]?.length
    ) {
      return "bg-card border-border text-foreground";
    }

    const state = tileStates[rowIndex][colIndex];
    switch (state) {
      case "correct":
        return "bg-accent border-accent text-accent-foreground";
      case "present":
        return "bg-primary border-primary text-primary-foreground";
      case "absent":
        return "bg-muted border-muted text-muted-foreground";
      default:
        return "bg-card border-border text-foreground";
    }
  };

  const getRowValue = (rowIndex: number): string => {
    if (rowIndex === currentRow) {
      return currentGuess.padEnd(5, "").slice(0, 5).toUpperCase();
    }
    if (rowIndex < previousGuesses.length) {
      return previousGuesses[rowIndex].padEnd(5, "").slice(0, 5).toUpperCase();
    }
    return "     "; // 5 spaces for empty rows
  };

  const isRowEditable = (rowIndex: number): boolean => {
    return rowIndex === currentRow && !disabled;
  };

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {Array.from({ length: 6 }, (_, rowIndex) => (
        <div key={rowIndex} className="flex justify-center">
          <InputOTP
            value={getRowValue(rowIndex)}
            onChange={isRowEditable(rowIndex) ? handleValueChange : () => {}}
            maxLength={5}
            disabled={!isRowEditable(rowIndex)}
            containerClassName="gap-1"
            className="text-center"
          >
            <InputOTPGroup className="gap-1">
              {Array.from({ length: 5 }, (_, colIndex) => (
                <InputOTPSlot
                  key={colIndex}
                  index={colIndex}
                  className={cn(
                    "size-14 text-lg font-bold border-2 transition-all duration-200",
                    getTileStateColor(rowIndex, colIndex),
                    !isRowEditable(rowIndex) && "opacity-50"
                  )}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
      ))}
    </div>
  );
}
