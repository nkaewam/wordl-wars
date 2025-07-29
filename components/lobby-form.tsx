"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGameStore } from "@/lib/game-store";
import { Rocket } from "lucide-react";

// Form validation schema
const lobbyFormSchema = z
  .object({
    player1Name: z
      .string()
      .min(1, "Player 1 name is required")
      .min(2, "Player 1 name must be at least 2 characters")
      .max(20, "Player 1 name must be 20 characters or less")
      .trim(),
    player2Name: z
      .string()
      .min(1, "Player 2 name is required")
      .min(2, "Player 2 name must be at least 2 characters")
      .max(20, "Player 2 name must be 20 characters or less")
      .trim(),
  })
  .refine(
    (data) => data.player1Name.toLowerCase() !== data.player2Name.toLowerCase(),
    {
      message: "Player names must be different",
      path: ["player2Name"],
    }
  );

type LobbyFormValues = z.infer<typeof lobbyFormSchema>;

interface LobbyFormProps {
  className?: string;
}

export function LobbyForm({ className }: LobbyFormProps) {
  const router = useRouter();
  const startGame = useGameStore((state) => state.startGame);
  const setLoading = useGameStore((state) => state.setLoading);
  const isLoading = useGameStore((state) => state.isLoading);

  const form = useForm<LobbyFormValues>({
    resolver: zodResolver(lobbyFormSchema),
    defaultValues: {
      player1Name: "",
      player2Name: "",
    },
  });

  const handleSubmit = async (values: LobbyFormValues) => {
    setLoading(true);

    try {
      // Start the game with player names
      startGame(values.player1Name, values.player2Name);

      // Navigate to the game page
      router.push("/game");
    } catch (error) {
      console.error("Failed to start game:", error);
    } finally {
      setLoading(false);
    }
  };

  const isSubmitting = form.formState.isSubmitting || isLoading;
  const isValid = form.formState.isValid;

  return (
    <div className={cn("w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 sm:space-y-6">
          {/* Player 1 Input */}
          <FormField
            control={form.control}
            name="player1Name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base font-medium text-card-foreground">
                  Player 1 Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter Player 1 name"
                    maxLength={20}
                    disabled={isSubmitting}
                    className={cn(
                      "px-3 sm:px-4 py-2 sm:py-3 h-9 sm:h-10 text-base sm:text-lg font-medium border-2 transition-all duration-200 focus:ring-2 focus:ring-accent focus:border-transparent",
                      "border-border bg-input hover:border-primary focus:border-accent text-input-foreground"
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* VS Divider */}
          <div className="flex items-center justify-center">
            <div className="flex-1 h-px bg-border"></div>
            <span className="px-3 sm:px-4 text-base sm:text-lg font-bold text-muted-foreground">
              VS
            </span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Player 2 Input */}
          <FormField
            control={form.control}
            name="player2Name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base font-medium text-card-foreground">
                  Player 2 Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter Player 2 name"
                    maxLength={20}
                    disabled={isSubmitting}
                    className={cn(
                      "px-3 sm:px-4 py-2 sm:py-3 h-9 sm:h-10 text-base sm:text-lg font-medium border-2 transition-all duration-200 focus:ring-2 focus:ring-primary focus:border-transparent",
                      "border-border bg-input hover:border-primary focus:border-primary text-input-foreground"
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Enhanced Submit Button */}
          <div className="relative">
            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={cn(
                "w-full h-12 sm:h-14 md:h-16 py-3 sm:py-4 px-4 sm:px-6 text-base sm:text-lg md:text-xl font-bold text-primary-foreground border-0 border-b-[#855A3A] border-b-4 rounded-xl transition-all duration-300 transform cursor-pointer",
                "focus:outline-none focus:ring-4 focus:ring-primary/50",
                "shadow-lg hover:shadow-xl active:shadow-md",
                "relative overflow-hidden",
                // Enhanced gradient and animations
                isSubmitting || !isValid
                  ? "bg-muted cursor-not-allowed shadow-none hover:shadow-none"
                  : [
                      "bg-primary",
                      "hover:bg-primary/90",
                      "hover:scale-[1.015] active:scale-[0.99]",
                      "animate-pulse-slow", // Custom pulse animation when valid
                    ]
              )}
            >
              {/* Animated background gradient */}
              {!isSubmitting && isValid && (
                <div className="absolute inset-0 bg-accent opacity-0 hover:opacity-20 transition-opacity duration-300" />
              )}

              {/* Button content */}
              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 sm:h-5 w-4 sm:w-5 border-b-2 border-white mr-2 sm:mr-3"></div>
                    <span className="animate-pulse text-sm sm:text-base">Starting Game...</span>
                  </>
                ) : (
                  <>
                    <Rocket className="size-4 sm:size-5 mr-2" />
                    <span className="hidden sm:inline">Start Game</span>
                    <span className="sm:hidden">Start</span>
                  </>
                )}
              </span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
