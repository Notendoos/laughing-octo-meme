import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GuessInputRow } from "./GuessInputRow";

describe("GuessInputRow", () => {
  it("calls change handler when input is provided", () => {
    const onChange = vi.fn();
    render(
      <GuessInputRow
        wordLength={5}
        value=""
        onChange={onChange}
        onSubmit={vi.fn()}
      />,
    );

    const firstInput = screen.getByLabelText("Letter 1") as HTMLInputElement;
    fireEvent.change(firstInput, { target: { value: "c" } });

    expect(onChange).toHaveBeenCalled();
  });

  it("respects Dutch IJ handling", () => {
    const onChange = vi.fn();
    render(
      <GuessInputRow
        wordLength={5}
        value=""
        onChange={onChange}
        onSubmit={vi.fn()}
        allowDutch
      />,
    );

    const firstInput = screen.getByLabelText("Letter 1") as HTMLInputElement;
    fireEvent.change(firstInput, { target: { value: "ij" } });

    expect(onChange).toHaveBeenCalled();
  });
});
