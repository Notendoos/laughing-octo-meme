import type { Meta, StoryObj } from "@storybook/react";
import Page from "./page";

const meta: Meta<typeof Page> = {
  title: "Pages/Wordingo",
  component: Page,
};

export default meta;

type Story = StoryObj<typeof Page>;

export const Default: Story = {
  render: (args) => (
    <div style={{ minHeight: "100vh", padding: "2rem" }}>
      <Page {...args} />
    </div>
  ),
};
