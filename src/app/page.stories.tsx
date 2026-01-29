import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps, ReactElement } from "react";
import React from "react";
import Page from "./page.tsx";

const meta: Meta<typeof Page> = {
  title: "Pages/Wordingo",
  component: Page,
};

export default meta;

type Story = StoryObj<typeof Page>;

export const Default: Story = {
  render: (args): ReactElement => {
    const pageProps = args as ComponentProps<typeof Page>;
    return React.createElement(
      "div",
      { style: { minHeight: "100vh", padding: "2rem" } },
      React.createElement(Page, pageProps),
    ) as ReactElement;
  },
};
