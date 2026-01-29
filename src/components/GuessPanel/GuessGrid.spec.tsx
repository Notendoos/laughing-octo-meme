import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { GuessGrid } from "./GuessGrid";

describe("GuessGrid", () => {
  it("renders the padded rows and cells", () => {
    render(
      <GuessGrid
        guesses={[{ guess: "apple", letterFeedback: ["correct", "present", "absent", "absent", "present"] }]}
        wordLength={5}
        maxRows={4}
        sessionPaused={false}
      />,
    );

    const grid = screen.getByTestId("guess-grid");
    expect(grid).toBeInTheDocument();
    expect(grid.querySelectorAll("span").length).toBe(5 * 4);
  });
});
