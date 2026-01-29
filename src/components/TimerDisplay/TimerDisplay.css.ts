import { globalStyle, style } from "@vanilla-extract/css";
import { themeContract } from "../../styles/theme.css.ts";

export const root = style({
  display: "flex",
  alignItems: "stretch",
  justifyContent: "space-between",
  gap: themeContract.space.md,
  padding: themeContract.space.sm,
  borderRadius: themeContract.radius.lg,
  border: `1px solid ${themeContract.color.border}`,
  background: themeContract.color.surface,
  boxShadow: themeContract.effect.cardGlow,
});

export const timeCard = style({
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.xs,
  padding: `${themeContract.space.sm} ${themeContract.space.md}`,
  borderRadius: themeContract.radius.md,
  border: `1px solid ${themeContract.color.borderLight}`,
  background: themeContract.color.surfaceAlt,
  flex: 1,
});

export const label = style({
  textTransform: "uppercase",
  letterSpacing: "0.2rem",
  fontSize: "0.65rem",
  color: themeContract.color.subtext,
  display: "flex",
  alignItems: "center",
  gap: themeContract.space.xs,
});

export const value = style({
  fontSize: "1.6rem",
  fontWeight: 700,
  fontFamily: `"DM Mono", "JetBrains Mono", "Fira Code", Menlo, monospace`,
  textAlign: "center",
  display: "inline-block",
  willChange: "opacity, transform, color",
  animation: "tickPulse 0.65s ease",
});

export const valueMask = style({
  overflow: "hidden",
  height: "2rem",
  minWidth: "5.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const status = style({
  fontSize: "0.75rem",
  letterSpacing: "0.15rem",
  textTransform: "uppercase",
  color: themeContract.color.subtext,
});

export const action = style({
  display: "flex",
  alignItems: "center",
  gap: themeContract.space.xs,
});

globalStyle("@keyframes tickPulse", {
  "0%": {
    opacity: 0.3,
    transform: "scale(0.95)",
  },
  "40%": {
    opacity: 1,
    transform: "scale(1.05)",
  },
  "100%": {
    opacity: 1,
    transform: "scale(1)",
  },
});
