import { style } from "@vanilla-extract/css";
import { themeContract } from "../../styles/theme.css.ts";

export const root = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  gap: themeContract.space.sm,
});

export const slot = style({
  padding: `${themeContract.space.sm} ${themeContract.space.md}`,
  borderRadius: themeContract.radius.md,
  background: "rgba(255, 255, 255, 0.05)",
  border: `1px solid rgba(255, 255, 255, 0.15)`,
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
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
});
