import { globalStyle, style } from "@vanilla-extract/css";
import { themeContract } from "../../styles/theme.css.ts";

export const root = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  gap: themeContract.space.sm,
});

export const slot = style({
  padding: `${themeContract.space.sm} ${themeContract.space.md}`,
  borderRadius: themeContract.radius.md,
  background: themeContract.color.surfaceAlt,
  border: `1px solid ${themeContract.color.borderLight}`,
  boxShadow: `inset 0 1px 0 ${themeContract.color.overlay}`,
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.xs,
});

export const label = style({
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.15rem",
  color: themeContract.color.subtext,
});

export const value = style({
  fontSize: "1.2rem",
  fontWeight: 700,
  letterSpacing: "0.05rem",
  minHeight: "1.2em",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  animation: "scoreRoll 0.45s ease",
});

globalStyle("@keyframes scoreRoll", {
  "0%": { opacity: 0, transform: "translateY(-12px)" },
  "60%": { opacity: 1, transform: "translateY(0)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});
