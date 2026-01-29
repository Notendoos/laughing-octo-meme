import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import BingoGrid from "./BingoGrid";

describe("BingoGrid", () => {
  it("displays each cell", () => {
    const card = [
      [
        { number: 1, marked: true },
        { number: 2, marked: false },
      ],
    ];

    render(<BingoGrid card={card} />);

    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
  });
});
