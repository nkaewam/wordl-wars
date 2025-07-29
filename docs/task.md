# Wordle Wars – Development Tasks & Approach

> **Scope:** Front-end-only game built with Next.js & React. No backend services.

---

## 0. Foundations

- [x] Bootstrap repository with Next.js App Router & TypeScript (already complete)

## 1. Game Specification

1. Define rules & edge-cases _(done in README)_
2. Gather/curate 5-letter English word list (`public/words.txt`)
3. Specify UI wireframes (Figma / hand-drawn)

## 2. Architecture

- **State Management**: React Context or lightweight store (e.g. `useReducer`, Zustand)
- **Routing**
  - `/` Lobby (enter player names)
  - `/play` Active game
  - `/result` Final scoreboard
- **Data Flow**:
  ```mermaid
  graph TD;
    Lobby --> Game(State);
    Game(State) -->|updates| Scoreboard;
    Game(State) --> Result;
  ```
- **Utilities**
  - `getRandomWord()` – picks secret word each round
  - `evaluateGuess(guess, answer)` → returns array of "correct | misplaced | absent"

## 3. Milestone Breakdown

| Milestone | Deliverables                                         |
| --------- | ---------------------------------------------------- |
| **M1**    | Game logic functions                                 |
| **M2**    | UI Components: WordGrid, Keyboard, TurnIndicator     |
| **M3**    | Lobby screen & player name form                      |
| **M4**    | Integrate turns & scoring; scoreboard component      |
| **M5**    | Result screen with winner announcement               |
| **M6**    | Polish: animations, accessibility, responsive layout |
| **M7**    | Offline/PWA enhancements (service worker + manifest) |

## 4. Components Checklist

- [ ] **LobbyForm** – collect player names
- [ ] **WordGrid** – wrapper around shadcn/ui **InputOTP** for 5-letter entry
- [ ] **OnScreenKeyboard** – clickable keys
- [ ] **TurnIndicator** – shows current player & round
- [ ] **ScoreBoard** – running totals
- [ ] **ResultModal** – end-game summary
- [ ] **Toast** – feedback (invalid word, too short, etc.)

## 5. Styling & UX

- Mobile-first responsive design
- Color-blind friendly palette & high-contrast mode
- Smooth flip/slide tile animations

## 6. Performance & Offline Support

- Pre-cache word list & static assets via service worker
- Keep bundle size lean (<150 KB gzipped target)

## 7. Deployment

- `next export` → `out/` static site
- Host on Vercel Static, Netlify, or GitHub Pages

## 8. Stretch Goals

- Dark mode toggle
- Sound FX & celebratory confetti
- LocalStorage persistence for paused games
- Internationalization (multi-language word lists)

---

### Legend

- **[ ]** pending  **[x]** completed

Happy coding! 🎉
