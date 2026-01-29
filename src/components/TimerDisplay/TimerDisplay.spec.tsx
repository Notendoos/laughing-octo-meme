import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TimerDisplay } from "./TimerDisplay";

describe("TimerDisplay", () => {
  it("formats remaining milliseconds", () => {
    render(
      <TimerDisplay remainingMs={75000} onToggle={vi.fn()} paused={false} />,
    );

    expect(screen.getByText("01:15")).toBeInTheDocument();
  });

  it("calls toggle handler when button is pressed", () => {
    const onToggle = vi.fn();
    render(<TimerDisplay remainingMs={30000} onToggle={onToggle} paused />);

    const button = screen.getByRole("button", { name: /resume/i });
    fireEvent.click(button);
    expect(onToggle).toHaveBeenCalled();
  });
});
