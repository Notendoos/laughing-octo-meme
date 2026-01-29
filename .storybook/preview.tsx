import type { Preview } from "@storybook/nextjs-vite";
import { lightTheme } from "../src/styles/theme.css.ts";
import "../src/styles/globalStyles.css.ts";

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={lightTheme} style={{ minHeight: "100vh" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#020409" },
        { name: "light", value: "#f8f7f1" },
      ],
    },
  },
};

export default preview;
