interface DebugAnswerKeyProps {
  secretWord: string;
}

export function DebugAnswerKey({ secretWord }: DebugAnswerKeyProps) {
  // Only show in development environment
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/80 text-white px-3 py-2 rounded-md text-sm font-mono">
      <div className="text-xs text-gray-300 mb-1">DEBUG - Answer Key:</div>
      <div className="text-lg font-bold">{secretWord.toUpperCase()}</div>
    </div>
  );
}
