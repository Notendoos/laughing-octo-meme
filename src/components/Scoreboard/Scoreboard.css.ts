import { style } from "@vanilla-extract/css";
import { themeContract } from "../../styles/theme.css.ts";

export const root = style({
  position: "absolute",
  inset: 0,
  zIndex: 0,
  padding: themeContract.space.md,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: themeContract.space.md,
  pointerEvents: "none",
  userSelect: "none",
  opacity: 0.2,
  filter: "blur(3px)",
  color: themeContract.color.subtext,
  transition: "opacity 0.2s ease",
});

export const slot = style({
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.xs,
});

export const label = style({
  fontSize: "0.65rem",
  textTransform: "uppercase",
  letterSpacing: "0.18rem",
  color: themeContract.color.subtext,
});

export const value = style({
  fontSize: "1rem",
  fontWeight: 600,
  letterSpacing: "0.08rem",
  color: themeContract.color.text,
});
