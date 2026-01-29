import { style } from "@vanilla-extract/css";
import { themeContract } from "../../styles/theme.css.ts";

export const root = style({
  display: "flex",
  gap: themeContract.space.xs,
  justifyContent: "center",
});

export const cellInput = style({
  width: "3.2rem",
  height: "3.2rem",
  borderRadius: themeContract.radius.md,
  border: "2px solid rgba(255, 255, 255, 0.25)",
  background: "rgba(255, 255, 255, 0.04)",
  color: themeContract.color.text,
  fontSize: "1.2rem",
  fontWeight: 700,
  textAlign: "center",
  letterSpacing: "0.12rem",
  textTransform: "uppercase",
});
