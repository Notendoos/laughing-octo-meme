import { beforeAll, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../src/app/page";

beforeAll(() => {
  if (typeof globalThis.requestAnimationFrame === "undefined") {
    globalThis.requestAnimationFrame = (callback: FrameRequestCallback) =>
      setTimeout(() => callback(performance.now()), 16);
  }
});

it("renders the landing card and start button", () => {
  render(<Page />);

  expect(screen.getByText("Phase")).toBeDefined();
  expect(screen.getByRole("button", { name: /start round 1/i })).toBeDefined();
});
