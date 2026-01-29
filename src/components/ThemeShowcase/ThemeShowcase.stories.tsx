import type { Meta } from "@storybook/react";
import { ThemeShowcase } from "./ThemeShowcase.tsx";

const meta: Meta<typeof ThemeShowcase> = {
  title: "Design/Theme Showcase",
  component: ThemeShowcase,
};

export default meta;

export const Default = {
  render: () => <ThemeShowcase />,
};
