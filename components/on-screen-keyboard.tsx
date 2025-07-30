"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { TileState } from "@/lib/types";
import { Delete, Send } from "lucide-react";

interface OnScreenKeyboardProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  keyStates: Record<string, TileState>;
  disabled?: boolean;
  isEnterDisabled?: boolean;
  className?: string;
}

const KEYBOARD_LAYOUT = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "BACKSPACE"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M", "ENTER"],
];

export function OnScreenKeyboard({
  onKeyPress,
  onBackspace,
  onEnter,
  keyStates,
  disabled = false,
  isEnterDisabled = false,
  className,
}: OnScreenKeyboardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (disabled) return;

      const key = event.key.toUpperCase();

      // Prevent default behavior for game keys
      if (key === "ENTER" || key === "BACKSPACE" || /^[A-Z]$/.test(key)) {
        event.preventDefault();
      }

      switch (key) {
        case "ENTER":
          onEnter();
          break;
        case "BACKSPACE":
        case "DELETE":
          onBackspace();
          break;
        default:
          // Only handle single letter keys
          if (/^[A-Z]$/.test(key)) {
            onKeyPress(key);
          }
          break;
      }
    };

    // Add event listener to the document
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onKeyPress, onBackspace, onEnter, disabled]);

  const handleKeyClick = (key: string) => {
    if (disabled) return;

    switch (key) {
      case "ENTER":
        onEnter();
        break;
      case "BACKSPACE":
        onBackspace();
        break;
      default:
        onKeyPress(key);
        break;
    }
  };

  const getKeyStateColor = (key: string): string => {
    const state = keyStates[key];
    if (!state) {
      return "bg-card hover:bg-card/80 text-foreground border-border";
    }

    switch (state) {
      case "correct":
        return "bg-accent hover:bg-accent/80 text-accent-foreground border-accent";
      case "present":
        return "bg-primary hover:bg-primary/80 text-primary-foreground border-primary";
      case "absent":
        return "bg-muted hover:bg-muted/80 text-muted-foreground border-muted";
      default:
        return "bg-card hover:bg-card/80 text-foreground border-border";
    }
  };

  const getKeyWidth = (key: string): string => {
    if (key === "ENTER") {
      return "w-12 sm:w-14 md:w-18 lg:w-20";
    }
    if (key === "BACKSPACE") {
      return "w-10 sm:w-12 md:w-14";
    }
    return "w-7 sm:w-8 md:w-9 lg:w-10";
  };

  const getKeyHeight = (key: string): string => {
    return "h-8 sm:h-9 md:h-10 lg:h-12";
  };

  const getKeyTextSize = (key: string): string => {
    if (key === "ENTER") {
      return "text-xs sm:text-sm md:text-base";
    }
    return "text-xs sm:text-sm md:text-base lg:text-lg";
  };

  return (
    <div
      ref={containerRef}
      className={cn("flex flex-col gap-0.5 sm:gap-1 w-full", className)}
    >
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-0.5 sm:gap-1">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyClick(key)}
              disabled={disabled || (key === "ENTER" && isEnterDisabled)}
              className={cn(
                "px-1 sm:px-2 rounded-md font-semibold border-2 transition-all duration-200 select-none flex justify-center items-center",
                getKeyWidth(key),
                getKeyHeight(key),
                getKeyTextSize(key),
                getKeyStateColor(key),
                (disabled || (key === "ENTER" && isEnterDisabled)) &&
                  "opacity-50 cursor-not-allowed",
                !disabled &&
                  !(key === "ENTER" && isEnterDisabled) &&
                  "cursor-pointer active:scale-95",
                key === "ENTER" &&
                  "bg-green-500 hover:bg-green-600 text-white border-green-500",
                key === "BACKSPACE" &&
                  "bg-red-400 hover:bg-red-500 text-white border-red-400"
              )}
            >
              {key === "BACKSPACE" ? (
                <Delete className="size-3 sm:size-4 md:size-5" />
              ) : key === "ENTER" ? (
                <span className="hidden sm:inline">SUBMIT</span>
              ) : (
                key
              )}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
