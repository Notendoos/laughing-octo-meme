import { StorybookConfig } from "@storybook/nextjs-vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(tsx|mdx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  staticDirs: ["../public"],
  async viteFinal(config) {
    return {
      ...config,
      plugins: [...(config.plugins ?? []), vanillaExtractPlugin()],
    };
  },
};

export default config;
