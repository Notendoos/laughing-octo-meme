import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Scoreboard from "./Scoreboard";

describe("Scoreboard", () => {
  it("renders phase and score info", () => {
    render(
      <Scoreboard
        phaseLabel="Word Round 1"
        roundLabel={1}
        totalScore={420}
        ballPoolCount={30}
        linesCompleted={3}
        bestScore={500}
      />
    );

    expect(screen.getByText("Phase")).toBeDefined();
    expect(screen.getByText("Word Round 1")).toBeDefined();
    expect(screen.getByText("Total Score")).toBeDefined();
    expect(screen.getByText("High Score")).toBeDefined();
  });
});
