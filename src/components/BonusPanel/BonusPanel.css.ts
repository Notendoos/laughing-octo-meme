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

export const message = style({
  color: themeContract.color.subtext,
  fontSize: "0.9rem",
});

export const footer = style({
  marginTop: themeContract.space.sm,
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

export const progressTrack = style({
  width: "100%",
  height: "8px",
  borderRadius: themeContract.radius.round,
  background: themeContract.color.overlay,
  overflow: "hidden",
  border: `1px solid ${themeContract.color.borderLight}`,
});

export const progressFill = style({
  height: "100%",
  borderRadius: themeContract.radius.round,
  background: `linear-gradient(120deg, ${themeContract.color.accentLight}, ${themeContract.color.accent})`,
  transition: "width 0.35s ease",
});

export const progressLabel = style({
  fontSize: "0.75rem",
  color: themeContract.color.subtext,
  marginTop: themeContract.space.xs,
  display: "flex",
  justifyContent: "space-between",
});
