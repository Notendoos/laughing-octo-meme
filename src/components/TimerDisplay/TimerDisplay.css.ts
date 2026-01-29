import { style } from "@vanilla-extract/css";
import { themeContract } from "../../styles/theme.css.ts";

export const root = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: themeContract.space.md,
  padding: `${themeContract.space.sm} ${themeContract.space.md}`,
  borderRadius: themeContract.radius.lg,
  border: `1px solid rgba(255, 255, 255, 0.2)`,
  background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(9,14,26,0.8))",
  boxShadow: "0 20px 45px rgba(0, 0, 0, 0.45)",
});

export const info = style({
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.xs,
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
  fontSize: "1.25rem",
  fontWeight: 700,
});

export const action = style({
  display: "flex",
  alignItems: "center",
  gap: themeContract.space.xs,
});
