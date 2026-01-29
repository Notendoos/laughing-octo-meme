import { style } from "@vanilla-extract/css";
import { themeContract } from "../../styles/theme.css.ts";

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(5, minmax(48px, 1fr))",
  gap: "0.5rem",
});

export const cell = style({
  borderRadius: themeContract.radius.md,
  border: `1px solid ${themeContract.color.borderLight}`,
  padding: "0.65rem",
  textAlign: "center",
  fontWeight: 700,
  background: themeContract.color.surfaceAlt,
  color: themeContract.color.text,
  boxShadow: `inset 0 0 0 1px ${themeContract.color.border}`,
});

export const marked = style({
  background: `linear-gradient(145deg, ${themeContract.color.accentLight}, ${themeContract.color.accentStrong})`,
  border: `1px solid ${themeContract.color.accent}`,
  color: themeContract.color.onAccent,
});
