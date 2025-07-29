import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CorrectGuessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  playerName: string;
}

export function CorrectGuessDialog({
  open,
  onOpenChange,
  playerName,
}: CorrectGuessDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-green-600">
            Congratulations!
          </AlertDialogTitle>
          <AlertDialogDescription>
            {playerName} guessed correctly! Well done!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
