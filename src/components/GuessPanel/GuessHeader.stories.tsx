import type { StoryObj, Meta } from "@storybook/react";
import GuessHeader from "./GuessHeader";

const meta: Meta<typeof GuessHeader> = {
  title: "Guess Panel/Guess Header",
  component: GuessHeader,
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const Default: StoryObj<typeof GuessHeader> = {
  args: {
    roundNumber: 2,
    remainingGuesses: 3,
    roundActive: true,
    correctWordCount: 4,
    sessionPaused: false,
  },
};

export const Paused: StoryObj<typeof GuessHeader> = {
  args: {
    ...Default.args,
    sessionPaused: true,
  },
};
