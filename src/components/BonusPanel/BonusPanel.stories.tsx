import type { Meta, StoryObj } from "@storybook/react";
import BonusPanel from "./BonusPanel";

const meta: Meta<typeof BonusPanel> = {
  title: "Components/BonusPanel",
  component: BonusPanel,
};

export default meta;

type Story = StoryObj<typeof BonusPanel>;

export const Default: Story = {
  args: {
    bonusRound: {
      targetWord: "fireproof",
      wordLength: 10,
      maxAttempts: 10,
      attemptsUsed: 1,
      guesses: [],
      solved: false,
    },
    currentGuess: "fireproof",
    onGuessChange: () => {},
    onSubmitGuess: () => {},
    message: "Good luck!",
  },
};
