# Wordl Wars – Milestone Action Items

This document breaks down each milestone from `docs/task.md` into actionable tasks. Check items off as you progress.

---

## M1 – Core Game Logic

- [x] Load and preprocess 5-letter word list - **UPDATED**: Created dual file system with `all-words.txt` (comprehensive validation list 2500+ words) and `words.txt` (top 100 common words by frequency for answers).
- [x] Implement `getRandomWord()` utility - **COMPLETED**: Returns random words from answer list only.
- [x] Build `evaluateGuess(guess, answer)` function returning tile states. - **COMPLETED**: Implements Wordl-style tile evaluation with correct/present/absent states and scoring.
- [x] Create score calculation helper (`calculateRoundScore`). - **COMPLETED**: Calculates round scores with bonus points for correct guesses and determines winner.
- [ ] Implement turn & round manager (context or hook).
- [ ] Define TypeScript types/interfaces for Game, Player, Turn, TileState.
- [ ] Add basic error handling (invalid word, too short, etc.).

## M2 – Base UI Components

- [x] Install shadcn/ui and add **InputOTP** component (`pnpm dlx shadcn@latest add input-otp`). - **COMPLETED**: Installed shadcn/ui and InputOTP component successfully.
- [x] Create `WordGrid` wrapper around `InputOTP` to display 5-letter word guesses. - **COMPLETED**: Created WordGrid component with proper styling and tile state support.
- [x] Apply custom styles/theme to match game colors (🟩, 🟨, ⬛).
- [x] `OnScreenKeyboard` with clickable keys + key state coloring. - **COMPLETED**: Created OnScreenKeyboard component with QWERTY layout, clickable keys, and state-based coloring (correct=green, present=yellow, absent=gray).
- [x] `TurnIndicator` showing current player and round. - **COMPLETED**: Created TurnIndicator component displaying current player, round progress, and visual turn indicators with smooth transitions.
- [x] Global CSS variables & basic theme colors. - **COMPLETED**: Added Wordl Wars game colors to global CSS including tile states, keyboard colors, and player theme colors.

## M3 – Lobby Screen

- [x] Design `/` route with form for Player 1 & Player 2 names. - **COMPLETED**: Created LobbyForm component with clean, modern design featuring player name inputs with VS divider and gradient styling.
- [x] Validate non-empty names, show inline errors. - **COMPLETED**: Implemented comprehensive validation including required fields, length limits (2-20 chars), duplicate name prevention, and real-time error clearing.
- [x] Persist names in GameContext and route to `/play`. - **COMPLETED**: Implemented Zustand store for game state management with comprehensive game logic, player state tracking, and automatic routing to `/play` after form submission.
- [x] “Start Game” CTA styling & animation.

## M4 – Gameplay Integration & Scoreboard

- [x] Initialize GameContext with secret word and round state. - **COMPLETED**: Added useEffect to initialize game with secret word and round state, integrated WordGrid and OnScreenKeyboard components with proper game state management.
- [x] Alternate active player after each turn completion.
- [x] Hook up `WordGrid`, `OnScreenKeyboard`, scoring logic.
- [x] `ScoreBoard` component displaying cumulative scores. - **COMPLETED**: Created comprehensive ScoreBoard component with cumulative scores, round-by-round breakdown, winner indicators, and game progress bar.
- [x] Handle end-of-round transitions and reset grid.

## M5 – Result Screen

- [x] Compute winner after five rounds for both players.
- [x] `/result` route showing final scoreboard & winner banner. - **COMPLETED**: Created comprehensive result page with winner banner, final scoreboard, round-by-round breakdown, game statistics, and play again functionality.
- [ ] “Play Again” button to reset GameContext and return to lobby.
- [ ] Optional: shareable results summary (copy to clipboard).

## M6 – Polish & Accessibility

- [x] Responsive layouts (mobile portrait → desktop wide).

## M7 – Offline & PWA Enhancements

- [ ] Generate `manifest.json` with app icons & metadata.
- [ ] Configure Next.js service worker via `next-pwa` or custom SW.
- [ ] Cache word list & static assets for offline play.
- [ ] Add “Add to Home Screen” prompt handling.
