import { style } from "@vanilla-extract/css";
import { themeContract } from "../../styles/theme.css.ts";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.sm,
});

export const title = style({
  fontSize: "1rem",
  fontWeight: 600,
  color: themeContract.color.subtext,
});

export const chips = style({
  display: "flex",
  flexWrap: "wrap",
  gap: themeContract.space.sm,
});

export const chip = style({
  width: "42px",
  height: "42px",
  borderRadius: themeContract.radius.round,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
  border: `1px solid ${themeContract.color.borderLight}`,
  background: themeContract.color.surfaceAlt,
  boxShadow: `inset 0 0 0 1px ${themeContract.color.border}`,
});

export const specialChip = style({
  background: `linear-gradient(120deg, ${themeContract.color.accentLight}, ${themeContract.color.accentStrong})`,
  border: `1px solid ${themeContract.color.accent}`,
  color: themeContract.color.onAccent,
  boxShadow: themeContract.effect.windowGlow,
});

export const summary = style({
  fontSize: "0.9rem",
  color: themeContract.color.subtext,
});
