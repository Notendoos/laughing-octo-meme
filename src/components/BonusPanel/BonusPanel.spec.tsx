import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import BonusPanel from "./BonusPanel";

describe("BonusPanel", () => {
  it("renders attempts and accepts input", () => {
    const handleSubmit = vi.fn((event) => event.preventDefault());
    const handleChange = vi.fn();
    render(
      <BonusPanel
        bonusRound={{
          targetWord: "fireproof",
          wordLength: 10,
          maxAttempts: 10,
          attemptsUsed: 1,
          guesses: [],
          solved: false,
        }}
        guessValue="abc"
        onGuessChange={handleChange}
        onSubmitGuess={handleSubmit}
        message="Keep going"
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Type the bonus word"), {
      target: { value: "new" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));
    expect(handleChange).toHaveBeenCalled();
    expect(handleSubmit).toHaveBeenCalled();
  });
});
