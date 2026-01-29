import type { Meta, StoryObj } from "@storybook/react";
import { CustomPhasePanel } from "./CustomPhasePanel";

const meta: Meta<typeof CustomPhasePanel> = {
  title: "Gameplay/Custom Phase Panel",
  component: CustomPhasePanel,
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const Default: StoryObj<typeof CustomPhasePanel> = {
  args: {
    label: "Trivia Break",
    metadata: {
      description: "Quick brain teaser before the next word round.",
      detail: "Answer correctly to impress the host — there is no score impact.",
      actionLabel: "Continue the Show",
    },
    onComplete: () => undefined,
  },
};
