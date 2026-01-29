import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import WordRoundPanel from "./WordRoundPanel";

describe("WordRoundPanel", () => {
  it("shows progress and accepts input", () => {
    const handleSubmit = vi.fn(() => {});
    const handleChange = vi.fn(() => {});
    render(
      <WordRoundPanel
        phaseKind="WORD_ROUND"
        activeRound={{
          timeLimitMs: 5000,
          elapsedMs: 2000,
          wordLength: 5,
          maxAttemptsPerWord: 2,
          wordQueue: ["alpha"],
          currentWord: null,
          correctWordCount: 1,
        }}
        queueRemaining={1}
        timerProgress={60}
        remainingTimeMs={3000}
        currentGuess=""
        onGuessChange={handleChange}
        onSubmitGuess={handleSubmit}
        wordRoundEvent={null}
      />
    );

    expect(screen.getByText("Queue remaining: 1")).toBeDefined();
    const input = screen.getByLabelText("Letter 1");
    fireEvent.change(input, { target: { value: "a" } });
    expect(handleChange).toHaveBeenCalled();
  });
});
