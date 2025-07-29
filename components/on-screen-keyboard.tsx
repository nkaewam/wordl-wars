"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { TileState } from "@/lib/types";

interface OnScreenKeyboardProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  keyStates: Record<string, TileState>;
  disabled?: boolean;
  className?: string;
}

const KEYBOARD_LAYOUT = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

export function OnScreenKeyboard({
  onKeyPress,
  onBackspace,
  onEnter,
  keyStates,
  disabled = false,
  className,
}: OnScreenKeyboardProps) {
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
      return "bg-gray-200 hover:bg-gray-300 text-gray-900 border-gray-300";
    }

    switch (state) {
      case "correct":
        return "bg-green-500 hover:bg-green-600 text-white border-green-500";
      case "present":
        return "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500";
      case "absent":
        return "bg-gray-500 hover:bg-gray-600 text-white border-gray-500";
      default:
        return "bg-gray-200 hover:bg-gray-300 text-gray-900 border-gray-300";
    }
  };

  const getKeyWidth = (key: string): string => {
    if (key === "ENTER" || key === "BACKSPACE") {
      return "w-16";
    }
    return "w-10";
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyClick(key)}
              disabled={disabled}
              className={cn(
                "h-12 px-2 rounded-md font-semibold text-sm border-2 transition-all duration-200 select-none",
                getKeyWidth(key),
                getKeyStateColor(key),
                disabled && "opacity-50 cursor-not-allowed",
                !disabled && "cursor-pointer active:scale-95"
              )}
            >
              {key === "BACKSPACE" ? "⌫" : key === "ENTER" ? "↵" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
