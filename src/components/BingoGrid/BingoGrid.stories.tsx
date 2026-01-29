import type { Meta, StoryObj } from "@storybook/react";
import BingoGrid from "./BingoGrid";

const sampleCard = Array.from({ length: 5 }, (_, row) =>
  Array.from({ length: 5 }, (_, col) => ({
    number: row * 5 + col + 1,
    marked: row === 0,
  }))
);

const meta: Meta<typeof BingoGrid> = {
  title: "Components/BingoGrid",
  component: BingoGrid,
};

export default meta;

type Story = StoryObj<typeof BingoGrid>;

export const Default: Story = {
  args: {
    card: sampleCard,
  },
};
