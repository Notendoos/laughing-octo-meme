import { style, styleVariants } from "@vanilla-extract/css";
import { themeContract } from "../../styles/theme.css.ts";

export const panel = style({
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.lg,
  padding: themeContract.space.lg,
  borderRadius: themeContract.radius.lg,
  border: `1px solid ${themeContract.color.border}`,
  background: themeContract.color.surface,
  boxShadow: themeContract.effect.windowGlow,
});

export const header = style({
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.sm,
});

export const meterRow = style({
  display: "flex",
  gap: themeContract.space.sm,
});

export const meter = style({
  flex: 1,
  padding: `${themeContract.space.sm} ${themeContract.space.md}`,
  borderRadius: themeContract.radius.sm,
  background: themeContract.color.overlay,
  border: `1px solid ${themeContract.color.border}`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: themeContract.space.xs,
});

export const meterValue = style({
  fontSize: "1.1rem",
  fontWeight: 700,
});

export const meterLabel = style({
  fontSize: "0.65rem",
  letterSpacing: "0.12rem",
  textTransform: "uppercase",
  color: themeContract.color.subtext,
});

export const modeChip = style({
  alignSelf: "flex-start",
  padding: `${themeContract.space.xs} ${themeContract.space.sm}`,
  borderRadius: themeContract.radius.round,
  border: `1px solid ${themeContract.color.border}`,
  color: themeContract.color.text,
  fontSize: "0.75rem",
  letterSpacing: "0.08rem",
});

export const progressRow = style({
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.xs,
});

export const progressTrack = style({
  width: "100%",
  height: "8px",
  borderRadius: themeContract.radius.round,
  background: themeContract.color.borderLight,
  overflow: "hidden",
});

export const progressBar = style({
  height: "100%",
  borderRadius: themeContract.radius.round,
  background: `linear-gradient(120deg, ${themeContract.color.accent}, ${themeContract.color.accentStrong})`,
});

export const timerStatus = style({
  fontSize: "0.85rem",
  color: themeContract.color.subtext,
});

export const correctLabel = style({
  fontSize: "0.85rem",
  color: themeContract.color.info,
  fontWeight: 600,
});

export const grid = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.35rem",
  padding: themeContract.space.xs,
  borderRadius: themeContract.radius.md,
  background: themeContract.color.overlay,
  border: `1px solid ${themeContract.color.border}`,
});

export const gridContainer = style({
  overflow: "hidden",
  width: "100%",
  maxHeight: `calc(5 * 48px + 4 * 0.35rem + ${themeContract.space.xs} * 2)`,
  padding: `${themeContract.space.xs} 0`,
  boxSizing: "border-box",
});

export const rowsWrapper = style({
  transition: "transform 0.2s ease",
});

export const gridBlurred = style({
  filter: "blur(4px)",
  pointerEvents: "none",
});

export const row = style({
  display: "flex",
  gap: "0.25rem",
  justifyContent: "center",
});

export const cell = style({
  width: "48px",
  height: "48px",
  borderRadius: themeContract.radius.sm,
  border: `1px solid ${themeContract.color.border}`,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
  letterSpacing: "0.12rem",
  textTransform: "uppercase",
});

export const cellVariant = styleVariants({
  empty: {
    background: "transparent",
    color: themeContract.color.subtext,
  },
  absent: {
    background: themeContract.color.surfaceAlt,
    color: themeContract.color.text,
    border: `1px solid ${themeContract.color.border}`,
  },
  present: {
    background: themeContract.color.accentLight,
    color: themeContract.color.onAccent,
    boxShadow: `0 0 0 1px ${themeContract.color.border}`,
  },
  correct: {
    background: themeContract.color.success,
    color: themeContract.color.onSuccess,
    boxShadow: `0 0 0 1px ${themeContract.color.border}`,
  },
  seed: {
    background: themeContract.color.accent,
    color: themeContract.color.onAccent,
    boxShadow: `0 0 0 1px ${themeContract.color.border}`,
  },
});

export const footer = style({
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.sm,
});

export const queueText = style({
  color: themeContract.color.subtext,
  fontSize: "0.9rem",
});
