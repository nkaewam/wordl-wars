# Wordl Wars

A two-player, face-to-face twist on the classic Wordl guessing game – entirely offline and playable right in your browser.

## Table of Contents

1. [Overview](#overview)
2. [Gameplay](#gameplay)
3. [Scoring](#scoring)
4. [Features](#features)
5. [Tech Stack](#tech-stack)
6. [Getting Started](#getting-started)
7. [Project Structure](#project-structure)
8. [Roadmap](#roadmap)
9. [Contributing](#contributing)
10. [License](#license)

---

## Overview

Wordl Wars brings competitive energy to Wordl by allowing **two players** to battle for the highest total score over five rounds. The app ships as a 100 % front-end web application – no servers, accounts, or internet connection required after the first load.

## Gameplay

1. Launch the app – a lobby screen asks for **Player 1** and **Player 2** names.
2. The game randomly chooses a hidden five-letter word.
3. Players take turns guessing the same word.
4. Each turn consists of up to **5 guesses** or until the player guesses the word correctly.
5. After Player 1‟s turn, the board resets and Player 2 tries the same word.
6. A new secret word is chosen for the next round.
7. After each player completes **5 rounds**, the points are summed and the player with the higher score wins.

## Scoring

During a player‟s turn every correct letter in the correct position earns **1 point** (maximum **5 pts** per round). E.g.:

| Guess       | Result     | Points |
| ----------- | ---------- | ------ |
| `C R A N E` | 🟩⬛⬛🟩🟨 | 2      |

A perfect guess (`🟩🟩🟩🟩🟩`) awards the full 5 points even if achieved before exhausting all guesses.

## Features

- 🔄 _Turn-based_ play on a single device
- 🔡 Familiar Wordl color feedback (🟩 correct, 🟨 misplaced, ⬛ absent)
- 📊 Real-time score board & turn indicator
- 🕹️ Keyboard support (physical and on-screen)
- 📱 Responsive design & touch friendliness
- 💾 **Offline-first** – works without backend or internet after initial load

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router, TypeScript, Static Export)
- React 18
- CSS Modules/PostCSS (Tailwind or vanilla utility classes, TBD)

## Getting Started

```bash
# 1. Install dependencies
pnpm install

# 2. Run the dev server
dev
pnpm dev

# 3. Open the app
http://localhost:3000
```

### Production build

```bash
pnpm build   # next build && next export – outputs static site to `out/`
pnpm preview # serve the static export locally
```

You can host the generated `out/` folder on any static hosting (GitHub Pages, Netlify, Vercel static, etc.).

## Project Structure

```text
wordl-wars/
├── app/            # Next.js App Router pages
├── components/     # Reusable UI components
├── lib/            # Game logic & util helpers
├── public/         # Static assets (word lists, icons)
│   ├── words.txt   # Top 100 common words (answers)
│   └── all-words.txt # Comprehensive word list (validation)
└── docs/           # Project documentation (task breakdown, specs)
```

## Roadmap

- [ ] Complete core game logic & validation
- [ ] Add animations & sound effects
- [ ] PWA install support (service worker + manifest)
- [ ] Accessibility audit (ARIA, color contrast)
- [ ] Add local-storage persistence for in-progress games

## Contributing

Pull requests are welcome! Please open an issue first to discuss major changes.

1. Fork the repo & create your branch (`git checkout -b feature/awesome`)
2. Commit your changes (`git commit -m 'feat: add awesome'`)
3. Push to the branch (`git push origin feature/awesome`)
4. Open a pull request

## License

[MIT](LICENSE)
