import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useGameStore } from "@/lib/game-store";

interface AnswerRevealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AnswerRevealDialog({
  open,
  onOpenChange,
}: AnswerRevealDialogProps) {
  const {
    secretWord,
    answerDialogPlayer,
    player1Name,
    player2Name,

    nextTurn,
  } = useGameStore();

  const playerName =
    answerDialogPlayer === "player1" ? player1Name : player2Name;

  const handleContinue = () => {
    // Trigger next turn after dialog closes
    setTimeout(() => {
      nextTurn();
    }, 100);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Time&apos;s up!</AlertDialogTitle>
          <AlertDialogDescription>
            {playerName} ran out of guesses. The correct word was:
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex justify-center my-4">
          <div className="text-2xl font-bold tracking-wider bg-card px-4 py-2 rounded border border-border">
            {secretWord}
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogAction onClick={handleContinue}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
