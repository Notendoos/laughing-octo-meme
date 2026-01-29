import { style } from "@vanilla-extract/css";
import { themeContract } from "../../styles/theme.css.ts";

export const canvas = style({
  position: "fixed",
  inset: 0,
  pointerEvents: "none",
  zIndex: 900,
});
