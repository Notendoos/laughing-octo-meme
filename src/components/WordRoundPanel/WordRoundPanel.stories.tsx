import type { Meta, StoryObj } from "@storybook/react";
import type { ActiveWordRound } from "../../engine/types.ts";
import WordRoundPanel from "./WordRoundPanel.tsx";
import type { WordRoundEvent } from "../../engine/session.ts";

const meta: Meta<typeof WordRoundPanel> = {
  title: "Components/WordRoundPanel",
  component: WordRoundPanel,
};

export default meta;

type Story = StoryObj<typeof WordRoundPanel>;

const activeRound: ActiveWordRound = {
  timeLimitMs: 8000,
  elapsedMs: 3200,
  wordLength: 5,
  maxAttemptsPerWord: 6,
  wordQueue: [
    { word: "clash", language: "english" },
    { word: "theme", language: "english" },
    { word: "pride", language: "dutch" },
  ],
  currentWord: {
    language: "english",
    targetWord: "clash",
    attemptsUsed: 2,
    maxAttempts: 6,
    guesses: [
      {
        guess: "cable",
        isCorrect: false,
        timestampMs: Date.now(),
        letterFeedback: ["correct", "absent", "present", "absent", "absent"],
      },
      {
        guess: "clash",
        isCorrect: true,
        timestampMs: Date.now(),
        letterFeedback: ["correct", "correct", "correct", "correct", "correct"],
      },
    ],
    solved: true,
  },
  correctWordCount: 1,
};

const lastEvent: WordRoundEvent = {
  type: "CONTINUE",
  guessResult: {
    guess: "clash",
    isCorrect: true,
    timestampMs: Date.now(),
    letterFeedback: ["correct", "correct", "correct", "correct", "correct"],
  },
};

export const Default: Story = {
  args: {
    phaseKind: "WORD_ROUND",
    activeRound,
    queueRemaining: 2,
    timerProgress: 45,
    remainingTimeMs: 3500,
    currentGuess: "",
    onGuessChange: () => {},
    onSubmitGuess: () => {},
    wordRoundEvent: lastEvent,
    roundNumber: 1,
    timerPaused: false,
    allowDutch: true,
    onToggleTimer: () => {},
    languageLabel: "English",
    showLanguageChip: true,
  },
};
