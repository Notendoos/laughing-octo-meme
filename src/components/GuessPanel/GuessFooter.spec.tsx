import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import GuessFooter from "./GuessFooter";

describe("GuessFooter", () => {
  it("disables submit when guess is empty", () => {
    render(
      <GuessFooter
        queueRemaining={3}
        currentGuess=""
        onGuessChange={vi.fn()}
        onSubmitGuess={vi.fn()}
      />,
    );

    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toBeDisabled();
  });

  it("calls submit handler when clicked", () => {
    const onSubmit = vi.fn();
    render(
      <GuessFooter
        queueRemaining={3}
        currentGuess="apple"
        onGuessChange={vi.fn()}
        onSubmitGuess={onSubmit}
      />,
    );

    const button = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(button);
    expect(onSubmit).toHaveBeenCalled();
  });
});
