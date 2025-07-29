"use client";

import React, { useEffect, useRef } from "react";
import { useGameStore } from "@/lib/game-store";
import { cn } from "@/lib/utils";

interface TurnTimerProps {
  className?: string;
}

export function TurnTimer({ className }: TurnTimerProps) {
  const { timeRemaining, isTimerActive, handleTimeExpired } = useGameStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTimerActive && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        const newTime = timeRemaining - 1;
        if (newTime <= 0) {
          handleTimeExpired();
        } else {
          useGameStore.getState().updateTimeRemaining(newTime);
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTimerActive, timeRemaining, handleTimeExpired]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getTimerColor = (): string => {
    if (timeRemaining <= 10) {
      return "text-red-500";
    } else if (timeRemaining <= 30) {
      return "text-yellow-500";
    }
    return "text-foreground";
  };

  if (!isTimerActive) {
    return null;
  }

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <div className="text-sm font-medium text-muted-foreground">Time:</div>
      <div className={cn("text-lg font-bold font-mono", getTimerColor())}>
        {formatTime(timeRemaining)}
      </div>
    </div>
  );
}
