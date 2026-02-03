import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useState } from "react";
import {
  GuessInputRow,
  countGuessLetters,
} from "./GuessInputRow";

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

  it("combines IJ keystrokes into a single guess letter", () => {
    const onChange = vi.fn();
    const ControlledInput = () => {
      const [value, setValue] = useState("");
      const handleChange = (next: string) => {
        setValue(next);
        onChange(next);
      };
      return (
        <GuessInputRow
          wordLength={5}
          value={value}
          onChange={handleChange}
          onSubmit={vi.fn()}
          allowDutch
        />
      );
    };

    render(<ControlledInput />);
    const firstInput = screen.getByLabelText("Letter 1") as HTMLInputElement;
    fireEvent.change(firstInput, { target: { value: "i" } });
    fireEvent.keyDown(firstInput, { key: "j", code: "KeyJ" });

    const lastCall = onChange.mock.calls.at(-1)?.[0];
    expect(lastCall).toBe("ij");
  });

  it("counts IJ as a single letter when tallying guesses", () => {
    expect(countGuessLetters("ij", true)).toBe(1);
    expect(countGuessLetters("ij", false)).toBe(2);
  });
});
