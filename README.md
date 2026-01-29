## WORDINGO

WORDINGO is a single-player, TV-style word guessing & bingo mashup built with **Next.js**, **vanilla-extract theming**, and a deterministic **engine/session** core. The app layers timed word rounds, progressive bingo draws, and a payoff bonus word while keeping all heavy lifting inside the engine and the React layer responsible for pacing, timers, and inputs.

### Key Features

- **Timed Word Rounds** – Each round runs inside a configurable timer, tracking Wordle-like feedback per guess and exposing a reusable `GuessInputRow` component with optional Dutch `IJ` handling.
- **Bingo Board** – A 5×5 grid pre-marked with numbers, receives draws after each round, detects new lines, and awards +200 points per completed line.
- **Modular Phase Flow** – The session uses a configurable phase sequence (`SETUP`, `WORD_ROUND`, `BALL_DRAW`, `BONUS_WORD`, etc.) so new mini-games or breaks can be inserted easily.
- **Bonus Round** – A 10-letter word with attempts based on earlier rounds; success unlocks +500 bonus points.
- **Visual Themes + Feedback** – `theme.css.ts` defines chroma variants; the settings modal lets players pick palettes and language word pools, plus confetti bursts celebrate bingo lines and bonus successes.
- **Multilingual Word Pool** – Add/remove English and Dutch word sources from the modal, and every round queue / bonus word rebuilds around the selected languages (storage ensures the selection carries between sessions).
- **Storybook & Vitest** – UI primitives, panels, and the timer component are documented with `.stories.tsx` + `.mdx`, and covered by Vitest specs to ensure regressions stay visible.

### Architecture Overview

| Layer | Responsibility |
| --- | --- |
| `src/engine/` | Encapsulates the deterministic rules for word rounds, ball draws, bonus logic, and phase transitions. |
| `src/engine/session.ts` | Bridges engine updates with React’s timers/input, exposing helper functions like `createGameSession`, `advancePhase`, and `completeBallDraw`. |
| `src/app/page.tsx` | Orchestrates UI state, handles animations (GSAP), manages settings + local storage, and renders the panels. |
| `src/components/` | Hosts modular, single-purpose pieces (`GuessGrid`, `GuessHeader`, `BingoGrid`, `TimerDisplay`, etc.) each with its own `.css.ts` file and reusable `ui/Button`. |
| `src/styles/` | Exposes the `themeContract`, global styles, and multi-variant palettes via `data-theme`. |

### Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run the dev server**
   ```bash
   npm run dev
   ```
   Story-like pacing, animated draws, and timer logic start once you hit the start button.
3. **Run Storybook**
   ```bash
   npm run storybook
   ```
   Docs cover every visual component plus the shared `TimerDisplay`, `GuessPanel`, and `SettingsModal`.
4. **Run tests**
   ```bash
   npm run test
   ```
   (Vitest already covers the guess panel, settings modal, timer, and engine/session core logic.)

### Configuration & Settings

- **Word Round Duration** – Use the settings modal slider (15–90s) and reset the session to apply new values.
- **Dutch IJ Input** – Toggle the Dutch keyboard logic; the `GuessInputRow` merges `ij` pairs into a single tile.
- **Themes** – Select from the “chroma” variants (Classic, Ocean, Sunset) inside the modal; the selection persists via `localStorage`.
- **Languages** – Add/remove the English and Dutch word pools; every round queue and bonus word will rebuild after closing the modal and resetting.
- **Timer Controls & Reset** – Pause/resume timers in Word rounds + reset the entire game to re-run initial draws.

### Development Notes

- Every component imports its own `.css.ts` file to keep vanilla-extract bundles stable.
- The reusable `Button` component lives in `src/components/ui/Button/Button.tsx` and is used everywhere that needs actions, thereby centralizing variants and docs.
- Storybook is configured via `.storybook/main.ts` and includes the `vanillaExtractPlugin` so theme styles render correctly.
- The `word-pool` utility allows future language adds by dropping new JSON files under `src/data/` and registering them in `wordCollections`.

### TODO / Roadmap

See `TODO.md` for outstanding work items, including unfinished animations, bonus round polish, and Storybook/Vitest expansion.
