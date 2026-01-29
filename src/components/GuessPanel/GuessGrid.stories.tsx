import type { StoryObj, Meta } from "@storybook/react";
import { GuessGrid } from "./GuessGrid";

const meta: Meta<typeof GuessGrid> = {
  title: "Guess Panel/Guess Grid",
  component: GuessGrid,
  parameters: {
    layout: "centered",
  },
};

export default meta;

const sampleGuesses = [
  { guess: "crate", letterFeedback: ["correct", "present", "absent", "absent", "absent"] },
  { guess: "shine", letterFeedback: ["absent", "correct", "present", "absent", "absent"] },
  { guess: "bloom", letterFeedback: ["present", "absent", "absent", "present", "correct"] },
];

export const Default: StoryObj<typeof GuessGrid> = {
  args: {
    guesses: sampleGuesses,
    wordLength: 5,
    maxRows: 6,
    sessionPaused: false,
  },
};

export const Paused: StoryObj<typeof GuessGrid> = {
  args: {
    guesses: sampleGuesses,
    wordLength: 5,
    maxRows: 6,
    sessionPaused: true,
  },
};
