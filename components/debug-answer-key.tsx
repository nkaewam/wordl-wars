interface DebugAnswerKeyProps {
  secretWord: string;
}

export function DebugAnswerKey({ secretWord }: DebugAnswerKeyProps) {
  // Only show in development environment
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-card/90 text-card-foreground px-3 py-2 rounded-md text-sm font-mono border border-border shadow-lg">
      <div className="text-xs text-muted-foreground mb-1">
        DEBUG - Answer Key:
      </div>
      <div className="text-lg font-bold">{secretWord.toUpperCase()}</div>
    </div>
  );
}
