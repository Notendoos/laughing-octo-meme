import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button.tsx";

describe("Button", () => {
  it("renders text and applies variant classes", () => {
    render(
      <Button variant="primary" data-testid="primary">
        Go
      </Button>
    );
    const button = screen.getByTestId("primary");
    expect(button).toHaveTextContent("Go");
    expect(button).not.toBeDisabled();
  });

  it("supports disabled state", () => {
    render(
      <Button variant="ghost" disabled>
        Disabled
      </Button>
    );
    expect(screen.getByText("Disabled")).toBeDisabled();
  });
});
