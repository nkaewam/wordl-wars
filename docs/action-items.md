# Wordle Wars – Milestone Action Items

This document breaks down each milestone from `docs/task.md` into actionable tasks. Check items off as you progress.

---

## M1 – Core Game Logic

- [x] Load and preprocess 5-letter word list - **UPDATED**: Created dual file system with `all-words.txt` (comprehensive validation list 2500+ words) and `words.txt` (top 100 common words by frequency for answers).
- [x] Implement `getRandomWord()` utility - **COMPLETED**: Returns random words from answer list only.
- [x] Build `evaluateGuess(guess, answer)` function returning tile states. - **COMPLETED**: Implements Wordle-style tile evaluation with correct/present/absent states and scoring.
- [x] Create score calculation helper (`calculateRoundScore`). - **COMPLETED**: Calculates round scores with bonus points for correct guesses and determines winner.
- [ ] Implement turn & round manager (context or hook).
- [ ] Define TypeScript types/interfaces for Game, Player, Turn, TileState.
- [ ] Add basic error handling (invalid word, too short, etc.).

## M2 – Base UI Components

- [x] Install shadcn/ui and add **InputOTP** component (`pnpm dlx shadcn@latest add input-otp`). - **COMPLETED**: Installed shadcn/ui and InputOTP component successfully.
- [x] Create `WordGrid` wrapper around `InputOTP` to display 5-letter word guesses. - **COMPLETED**: Created WordGrid component with proper styling and tile state support.
- [ ] Apply custom styles/theme to match game colors (🟩, 🟨, ⬛).
- [ ] `OnScreenKeyboard` with clickable keys + key state coloring.
- [ ] `TurnIndicator` showing current player and round.
- [ ] Global CSS variables & basic theme colors.

## M3 – Lobby Screen

- [ ] Design `/` route with form for Player 1 & Player 2 names.
- [ ] Validate non-empty names, show inline errors.
- [ ] Persist names in GameContext and route to `/play`.
- [ ] “Start Game” CTA styling & animation.

## M4 – Gameplay Integration & Scoreboard

- [ ] Initialize GameContext with secret word and round state.
- [ ] Alternate active player after each turn completion.
- [ ] Hook up `WordGrid`, `OnScreenKeyboard`, scoring logic.
- [ ] `ScoreBoard` component displaying cumulative scores.
- [ ] Handle end-of-round transitions and reset grid.

## M5 – Result Screen

- [ ] Compute winner after five rounds for both players.
- [ ] `/result` route showing final scoreboard & winner banner.
- [ ] “Play Again” button to reset GameContext and return to lobby.
- [ ] Optional: shareable results summary (copy to clipboard).

## M6 – Polish & Accessibility

- [ ] Tile flip/slide and keyboard press animations.
- [ ] Implement color-blind friendly mode toggle.
- [ ] Responsive layouts (mobile portrait → desktop wide).

## M7 – Offline & PWA Enhancements

- [ ] Generate `manifest.json` with app icons & metadata.
- [ ] Configure Next.js service worker via `next-pwa` or custom SW.
- [ ] Cache word list & static assets for offline play.
- [ ] Add “Add to Home Screen” prompt handling.
