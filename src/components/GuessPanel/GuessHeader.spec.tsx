import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import GuessHeader from "./GuessHeader";

describe("GuessHeader", () => {
  it("renders the round labels", () => {
    render(
      <GuessHeader
        roundNumber={1}
        remainingGuesses={2}
        roundActive
        correctWordCount={2}
        sessionPaused={false}
      />,
    );

    expect(screen.getByText("Beurten")).toBeInTheDocument();
    expect(screen.getByText("Ronde")).toBeInTheDocument();
  });
});
