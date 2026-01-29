import type { Meta, StoryObj } from "@storybook/react";
import Scoreboard from "./Scoreboard";

const meta: Meta<typeof Scoreboard> = {
  title: "Components/Scoreboard",
  component: Scoreboard,
};

export default meta;

type Story = StoryObj<typeof Scoreboard>;

export const Default: Story = {
  args: {
    phaseLabel: "Word Round 1",
    roundLabel: 1,
    totalScore: 320,
    ballPoolCount: 45,
    linesCompleted: 2,
    bestScore: 800,
  },
};
