## WORDINGO

WORDINGO is a single-player, TV-style word guessing & bingo mashup built with **Next.js**, **vanilla-extract theming**, and a deterministic **engine/session** core. The app layers timed word rounds, progressive bingo draws, and a payoff bonus word while keeping all heavy lifting inside the engine and the React layer responsible for pacing, timers, and inputs.

## Recent Updates

- Ensured the animated draw timers rely on DOM-safe handles so the pedometer-style countdown works without TypeScript glitches.
- Fixed the confetti canvas hook to preserve the `CreateTypes` renderer and avoid Promise/typing noise when firing celebratory bursts.
- Smoothed the Wordle-style guess grid with GSAP entrances and pedometer-fed score/bingo counters so the stack scrolls without clipping.

### Key Features

- **Timed Word Rounds** – Each round runs inside a configurable timer, tracking Wordle-like feedback per guess and exposing a reusable `GuessInputRow` component with optional Dutch `IJ` handling.
- **Bingo Board** – A 5×5 grid pre-marked with numbers, receives draws after each round, detects new lines, and awards +200 points per completed line.
- **Modular Phase Flow** – The session uses a configurable phase sequence (`SETUP`, `WORD_ROUND`, `BALL_DRAW`, `BONUS_WORD`, etc.) so new mini-games or breaks can be inserted easily.
- **Custom Phase Breaks** – `PHASE_SEQUENCE` includes trivia/quick-fire moments (rendered with `CustomPhasePanel`) that pause the flow until the player confirms they’re ready to continue.
- **Accessible Controls** – The settings modal provides labeled sliders and toggle buttons with distinct visual states so the duration, theme, and language selectors remain usable for keyboard/assistive-tool users.
- **Theme Preference + Auto Mode** – Players can pin a light/dark/chroma palette or defer to their OS preference; the app persists the choice, applies WCAG-friendly tokens, and animates the theme transitions.
- **Expanded Light Variants** – Each dark palette now has an equivalent lighter version (e.g., Classic, Ocean, Sunset light modes) so the UI can stay airy while preserving contrast pairings.
- **Theme Showcase Story** – Storybook now includes a `Theme/Showcase` canvas that renders each chroma and retro palette with gradient cards and accent swatches so you can preview how the UI will look before toggling the setting in-app.
- **Bonus Round** – A 10-letter word with attempts based on earlier rounds; success unlocks +500 bonus points.
- **Visual Themes + Feedback** – `theme.css.ts` defines chroma variants; the settings modal lets players pick palettes and language word pools, plus confetti bursts celebrate bingo lines and bonus successes.
- **Multilingual Word Pool** – Add/remove English and Dutch word sources from the modal, and every round queue / bonus word rebuilds around the selected languages (storage ensures the selection carries between sessions).
- **Guess Input Flow** – Submitting a word resets the input and refocuses the next tile so players can keep rolling through the queue without manual clicks.
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
- **Settings Layout** – The settings modal now sports more padding, grouped controls, and dropdown pickers so the sliders, timer controls, and language list don’t feel cramped.
- **Timer Placement** – The countdown lives inside the Word Round panel now, next to the Guess grid, so the paused state plays well with that blurred overlay and sits next to the guesses.
- **Glassy Scoreboard** – The scoreboard now shares the same gradient/card shell as the main panels so every section uses a consistent glassy surface and glow.
- **Bonus Round UI** – The 10-letter bonus phase reuses the Guess grid and input row so it feels identical to regular rounds, while attempts remaining and history stay in sync with the engine state.
- **Bonus Unlock Progress** – The bonus phase now requires a minimum score/word count to unlock, and the bonus panel shows a progress bar indicating how close you are to hitting that threshold before the 10-letter word becomes playable.
- **Languages** – Add/remove the English and Dutch word pools; every round queue and bonus word will rebuild after closing the modal and resetting.
  Selecting Dutch now automatically enables IJ-aware input, so no extra toggle is needed.
- **Timer Controls & Reset** – Pause/resume timers in Word rounds + reset the entire game to re-run initial draws.

### Development Notes

- Every component imports its own `.css.ts` file to keep vanilla-extract bundles stable.
- The reusable `Button` component lives in `src/components/ui/Button/Button.tsx` and is used everywhere that needs actions, thereby centralizing variants and docs.
- Storybook is configured via `.storybook/main.ts` and includes the `vanillaExtractPlugin` so theme styles render correctly.
- The `word-pool` utility allows future language adds by dropping new JSON files under `src/data/` and registering them in `wordCollections`.

### Outstanding Work

- Surface the pause/blur overlay with the `TimerDisplay` countdown and help text described in the spec.
- Keep the settings panel/layout compact and the glassy gradients consistent across sections while polishing the Storybook/MDX coverage for newer panels (bingo, bonus, timer, custom phases).
- Track visual regression guards and Vitest coverage whenever GSAP or new UI pieces affect layout size or input behavior.

### TODO / Roadmap

See `TODO.md` for outstanding work items, including unfinished animations, bonus round polish, and Storybook/Vitest expansion.
