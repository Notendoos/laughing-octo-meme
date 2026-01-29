import { style } from "@vanilla-extract/css";
import { themeContract } from "../../styles/theme.css.ts";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.sm,
  padding: themeContract.space.lg,
  borderRadius: themeContract.radius.lg,
  border: `1px solid ${themeContract.color.border}`,
  background: `linear-gradient(135deg, ${themeContract.color.gradientStart}, ${themeContract.color.gradientEnd})`,
  boxShadow: themeContract.effect.windowGlow,
});

export const chip = style({
  alignSelf: "flex-start",
  padding: `${themeContract.space.xs} ${themeContract.space.sm}`,
  borderRadius: themeContract.radius.round,
  border: `1px solid ${themeContract.color.accent}`,
  fontSize: "0.75rem",
  letterSpacing: "0.15rem",
  textTransform: "uppercase",
  color: themeContract.color.accentLight,
});

export const title = style({
  margin: 0,
  fontSize: "1.5rem",
});

export const description = style({
  margin: 0,
  fontSize: "1rem",
  color: themeContract.color.subtext,
});

export const detail = style({
  fontSize: "0.9rem",
  color: themeContract.color.text,
});

export const actions = style({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: themeContract.space.sm,
});
