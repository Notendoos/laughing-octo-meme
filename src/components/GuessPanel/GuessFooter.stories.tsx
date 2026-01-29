import type { Meta, StoryObj } from "@storybook/react";
import GuessFooter from "./GuessFooter";

const meta: Meta<typeof GuessFooter> = {
  title: "Guess Panel/Guess Footer",
  component: GuessFooter,
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const Default: StoryObj<typeof GuessFooter> = {
  args: {
    queueRemaining: 5,
    currentGuess: "crate",
    onGuessChange: () => undefined,
    onSubmitGuess: () => undefined,
    disabled: false,
    allowDutch: true,
  },
};
