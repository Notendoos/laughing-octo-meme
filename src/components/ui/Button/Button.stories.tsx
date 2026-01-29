import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button.tsx";

const meta: Meta<typeof Button> = {
  title: "UI/Buttons/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Click me",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};
