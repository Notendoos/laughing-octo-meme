import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { CustomPhasePanel } from "./CustomPhasePanel";

describe("CustomPhasePanel", () => {
  it("renders label and description", () => {
    render(
      <CustomPhasePanel
        label="Trivia Break"
        metadata={{
          description: "A quick pause for trivia.",
          detail: "Stay sharp, the host is watching.",
          actionLabel: "Continue",
        }}
        onComplete={vi.fn()}
      />,
    );

    expect(screen.getByText("Trivia Break")).toBeInTheDocument();
    expect(screen.getByText("Continue")).toBeInTheDocument();
  });
});
