import type { Meta, StoryObj } from "@storybook/react";
import WordRoundPanel from "./WordRoundPanel";
import type { WordRoundEvent } from "../../engine/session";

const meta: Meta<typeof WordRoundPanel> = {
  title: "Components/WordRoundPanel",
  component: WordRoundPanel,
};

export default meta;

type Story = StoryObj<typeof WordRoundPanel>;

const activeRound = {
  timeLimitMs: 8000,
  elapsedMs: 3000,
  wordLength: 5,
  maxAttemptsPerWord: 2,
  wordQueue: ["clash"],
  currentWord: null,
  correctWordCount: 1,
};

const lastEvent: WordRoundEvent = {
  type: "CONTINUE",
  guessResult: {
    guess: "clash",
    isCorrect: true,
    timestampMs: Date.now(),
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
  },
};
