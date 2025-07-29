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
    if (key === "ENTER" || key === "BACKSPACE") {
      return "w-16";
    }
    return "w-10";
  };

  return (
    <div ref={containerRef} className={cn("flex flex-col gap-2", className)}>
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className=" flex justify-center gap-1">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyClick(key)}
              disabled={disabled || (key === "ENTER" && isEnterDisabled)}
              className={cn(
                "size-12 px-2 rounded-md font-semibold border-2 transition-all duration-200 select-none flex justify-center items-center",
                getKeyWidth(key),
                getKeyStateColor(key),
                (disabled || (key === "ENTER" && isEnterDisabled)) &&
                  "opacity-50 cursor-not-allowed",
                !disabled &&
                  !(key === "ENTER" && isEnterDisabled) &&
                  "cursor-pointer active:scale-95",
                key === "ENTER" &&
                  "bg-green-500 w-20 hover:bg-green-600 text-white border-green-500",
                key === "BACKSPACE" &&
                  "bg-red-400 hover:bg-red-500 text-white border-red-400"
              )}
            >
              {key === "BACKSPACE" ? (
                <Delete className="size-5" />
              ) : key === "ENTER" ? (
                "SUBMIT"
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
