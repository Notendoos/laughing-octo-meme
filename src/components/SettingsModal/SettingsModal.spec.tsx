import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SettingsModal } from "./SettingsModal";

describe("SettingsModal", () => {
  it("renders content when open", () => {
    render(
      <SettingsModal
        open
        onClose={vi.fn()}
        wordRoundSeconds={60}
        setWordRoundSeconds={vi.fn()}
        dutchMode
        setDutchMode={vi.fn()}
        maxSeconds={90}
        timerPaused={false}
        onToggleTimerPause={vi.fn()}
        onResetSession={vi.fn()}
        timerStatusText="Running"
        themeKey="classic"
        onThemeChange={vi.fn()}
        selectedLanguages={["english"]}
        onToggleLanguage={vi.fn()}
      />,
    );

    expect(screen.getByText(/Game settings/i)).toBeInTheDocument();
  });
});
