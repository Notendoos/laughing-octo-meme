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

export const headerMeta = style({
  display: "flex",
  alignItems: "center",
  gap: themeContract.space.xs,
  flexWrap: "wrap",
});

export const languageChip = style({
  borderRadius: themeContract.radius.round,
  border: `1px solid ${themeContract.color.border}`,
  padding: `${themeContract.space.xs} ${themeContract.space.sm}`,
  background: themeContract.color.overlay,
  color: themeContract.color.text,
  fontSize: "0.75rem",
  letterSpacing: "0.06rem",
});

export const correctLabel = style({
  fontSize: "0.85rem",
  color: themeContract.color.info,
  fontWeight: 600,
});

export const sessionStatus = style({
  fontSize: "0.85rem",
  color: themeContract.color.subtext,
  textTransform: "uppercase",
  letterSpacing: "0.2rem",
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
  maxHeight: "var(--guess-grid-height, 320px)",
  height: "var(--guess-grid-height, 320px)",
  padding: `${themeContract.space.xs} 0`,
  boxSizing: "border-box",
});

export const rowsWrapper = style({
  willChange: "transform",
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

export const timerSection = style({
  width: "100%",
});

export const note = style({
  fontSize: "0.8rem",
  color: themeContract.color.subtext,
  margin: `${themeContract.space.xs} 0 ${themeContract.space.sm}`,
  textAlign: "center",
});
