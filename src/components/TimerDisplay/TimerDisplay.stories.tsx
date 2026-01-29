import type { Meta, StoryObj } from "@storybook/react";
import { TimerDisplay } from "./TimerDisplay";

const meta: Meta<typeof TimerDisplay> = {
  title: "Timer/Timer Display",
  component: TimerDisplay,
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const Running: StoryObj<typeof TimerDisplay> = {
  args: {
    remainingMs: 90000,
    onToggle: () => undefined,
    paused: false,
  },
};

export const Paused: StoryObj<typeof TimerDisplay> = {
  args: {
    remainingMs: 30000,
    onToggle: () => undefined,
    paused: true,
  },
};
