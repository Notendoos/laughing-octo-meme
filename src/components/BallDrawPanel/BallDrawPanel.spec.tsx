import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import BallDrawPanel from "./BallDrawPanel";

describe("BallDrawPanel", () => {
  it("renders ball chips", () => {
    render(
      <BallDrawPanel
        report={{ drawnNumbers: [1, 2], lines: [], scoreDelta: 200 }}
      />
    );

    expect(screen.getByText("Ball draw report")).toBeDefined();
    expect(screen.getByText("1")).toBeDefined();
  });
});
