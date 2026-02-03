import { style } from "@vanilla-extract/css";
import { themeContract } from "../../styles/theme.css.ts";

export const root = style({
  display: "inline-flex",
  alignItems: "center",
  gap: themeContract.space.xs,
  padding: `${themeContract.space.xs} 0.65rem`,
  borderRadius: themeContract.radius.round,
  border: `1px solid ${themeContract.color.border}`,
  color: themeContract.color.text,
  background: themeContract.color.surfaceAlt,
  textTransform: "uppercase",
  fontSize: "0.8rem",
  letterSpacing: "0.12rem",
  minWidth: "92px",
});

export const paused = style({
  borderColor: themeContract.color.accent,
  color: themeContract.color.accent,
});

export const icon = style({
  color: themeContract.color.accentLight,
  opacity: 0.85,
});

export const value = style({
  fontSize: "0.95rem",
  fontWeight: 600,
  fontFamily: `"DM Mono", "JetBrains Mono", "Fira Code", Menlo, monospace`,
  letterSpacing: "0.04rem",
});
