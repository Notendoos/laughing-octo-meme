import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BonusPanel from "./BonusPanel";

describe("BonusPanel", () => {
  it("shows attempts info and submits guess", async () => {
    const handleSubmit = vi.fn();
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
        currentGuess="fireproof"
        onGuessChange={() => {}}
        onSubmitGuess={handleSubmit}
        message="Keep going"
      />
    );

    expect(screen.getByText(/attempts remaining/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(handleSubmit).toHaveBeenCalled();
  });
});
