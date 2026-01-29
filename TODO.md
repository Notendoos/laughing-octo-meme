# TODO

## High Priority
- [x] Modular phase orchestration is defined through `PHASE_SEQUENCE` and reconfigurable via `GameSessionConfig`; document additional custom phases when adding them.
- [x] Bonus round reuses the `GuessGrid`/input stack, and solves trigger Kiwi-style confetti + shared UI controls.
- [x] Initial bingo reveal now runs after "Start game" (pre-draw animation) before the timer begins, keeping all draws deterministic.
- [ ] Create a UI flow for inserting `CUSTOM` phases in the main screen (e.g., trivia break) and connect them to the engine hooks.

## UI polish & UX
- [ ] Refine the Wordle-style guess board scroll/animation so it never clips (use GSAP entrances + pedometer effects for numeric changes).
- [ ] Implement the pause blur overlay + countdown `TimerDisplay` interaction described in the spec.
- [ ] Revisit the layout to keep settings panel more compact and the glassy gradients consistent across sections.

## Documentation & Testing
- [ ] Expand Storybook stories/MDX/specs for any new components (Bingo grid, Ball draw report, Bonus panel states).
- [ ] Add visual regression guards if/when adding GSAP-based transitions that affect layout size.
- [ ] Keep Vitest coverage in sync each time a new input/feedback component is introduced to avoid regressions.

## Stretch
- [ ] Explore custom mini-games between rounds (e.g., trivia break tied to `CUSTOM` phase entries).
- [ ] Allow players to upload their own word lists (currently there’s JSON data but no UI for uploads).
- [ ] Add accessibility audit (focus traps inside modal, aria descriptions for the bingo grid and timer).
