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
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  tileStates?: TileState[];
  className?: string;
}

export function WordGrid({
  value,
  onChange,
  disabled = false,
  tileStates,
  className,
}: WordGridProps) {
  // Ensure value is exactly 5 characters
  const normalizedValue = value.padEnd(5, "").slice(0, 5).toUpperCase();

  const handleValueChange = (newValue: string) => {
    // Only allow letters and limit to 5 characters
    const lettersOnly = newValue
      .replace(/[^A-Za-z]/g, "")
      .toUpperCase()
      .slice(0, 5);
    onChange(lettersOnly);
  };

  const getTileStateColor = (index: number): string => {
    if (!tileStates || index >= tileStates.length) {
      return "bg-white border-gray-300 text-gray-900";
    }

    const state = tileStates[index];
    switch (state) {
      case "correct":
        return "bg-green-500 border-green-500 text-white";
      case "present":
        return "bg-yellow-500 border-yellow-500 text-white";
      case "absent":
        return "bg-gray-500 border-gray-500 text-white";
      default:
        return "bg-white border-gray-300 text-gray-900";
    }
  };

  return (
    <div className={cn("flex justify-center", className)}>
      <InputOTP
        value={normalizedValue}
        onChange={handleValueChange}
        maxLength={5}
        disabled={disabled}
        containerClassName="gap-1"
        className="text-center"
      >
        <InputOTPGroup className="gap-1">
          {Array.from({ length: 5 }, (_, index) => (
            <InputOTPSlot
              key={index}
              index={index}
              className={cn(
                "h-12 w-12 text-lg font-bold border-2 transition-all duration-200",
                getTileStateColor(index),
                disabled && "opacity-50"
              )}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
