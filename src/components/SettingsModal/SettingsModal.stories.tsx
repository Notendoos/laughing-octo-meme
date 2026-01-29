import type { Meta, StoryObj } from "@storybook/react";
import { SettingsModal } from "./SettingsModal";

const meta: Meta<typeof SettingsModal> = {
  title: "Layout/Settings Modal",
  component: SettingsModal,
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const Default: StoryObj<typeof SettingsModal> = {
  args: {
    open: true,
    onClose: () => undefined,
    wordRoundSeconds: 60,
    setWordRoundSeconds: () => undefined,
    dutchMode: true,
    setDutchMode: () => undefined,
    maxSeconds: 90,
    timerPaused: false,
    onToggleTimerPause: () => undefined,
    onResetSession: () => undefined,
    timerStatusText: "Running",
    themeKey: "classic",
    onThemeChange: () => undefined,
    selectedLanguages: ["english"],
    onToggleLanguage: () => undefined,
  },
};
