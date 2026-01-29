import type { Meta, StoryObj } from "@storybook/react";
import { GuessInputRow } from "./GuessInputRow";

const meta: Meta<typeof GuessInputRow> = {
  title: "Guess Panel/Guess Input Row",
  component: GuessInputRow,
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const Default: StoryObj<typeof GuessInputRow> = {
  args: {
    wordLength: 5,
    value: "",
    onChange: () => undefined,
    onSubmit: () => undefined,
  },
};

export const DutchInput: StoryObj<typeof GuessInputRow> = {
  args: {
    wordLength: 5,
    value: "ijipo",
    onChange: () => undefined,
    onSubmit: () => undefined,
    allowDutch: true,
  },
};
