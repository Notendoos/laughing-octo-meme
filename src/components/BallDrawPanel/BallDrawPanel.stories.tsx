import type { Meta, StoryObj } from "@storybook/react";
import BallDrawPanel, { BallDrawReport } from "./BallDrawPanel";

const meta: Meta<typeof BallDrawPanel> = {
  title: "Components/BallDrawPanel",
  component: BallDrawPanel,
};

export default meta;

type Story = StoryObj<typeof BallDrawPanel>;

export const Default: Story = {
  args: {
    report: {
      drawnNumbers: [5, 12, 34],
      lines: [{ id: "row-0", order: 0, cells: [] }],
      scoreDelta: 200,
    },
  },
};
