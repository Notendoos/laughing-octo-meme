import { style } from "@vanilla-extract/css";
import { themeContract } from "../../styles/theme.css.ts";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.sm,
  borderRadius: themeContract.radius.lg,
  padding: themeContract.space.lg,
  border: `1px solid ${themeContract.color.border}`,
  background: themeContract.color.surfaceAlt,
  boxShadow: themeContract.effect.cardGlow,
});

export const title = style({
  fontSize: "1.25rem",
  fontWeight: 600,
});

export const info = style({
  fontSize: "0.95rem",
  color: themeContract.color.subtext,
});

export const form = style({
  display: "flex",
  gap: themeContract.space.sm,
  flexWrap: "wrap",
  alignItems: "center",
});

export const input = style({
  flex: "1 1 100%",
  borderRadius: themeContract.radius.md,
  border: `2px solid ${themeContract.color.borderLight}`,
  padding: `${themeContract.space.sm} ${themeContract.space.md}`,
  background: themeContract.color.surface,
  color: themeContract.color.text,
  fontSize: "1rem",
  fontWeight: 700,
  letterSpacing: "0.12rem",
  textTransform: "uppercase",
  boxShadow: `inset 0 1px 0 ${themeContract.color.overlay}`,
  transition: "border 0.2s ease, box-shadow 0.2s ease",
  selectors: {
    "&:focus-visible": {
      border: `2px solid ${themeContract.color.accent}`,
      outline: "none",
      boxShadow: `0 0 0 3px ${themeContract.color.overlay}`,
    },
  },
});

export const message = style({
  color: themeContract.color.subtext,
  fontSize: "0.9rem",
});

export const historyList = style({
  display: "flex",
  flexWrap: "wrap",
  gap: themeContract.space.xs,
  fontSize: "0.9rem",
});

export const historyItem = style({
  padding: `${themeContract.space.xs} ${themeContract.space.sm}`,
  borderRadius: themeContract.radius.md,
  background: themeContract.color.surface,
  border: `1px solid ${themeContract.color.borderLight}`,
});
