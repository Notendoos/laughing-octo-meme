import { style } from "@vanilla-extract/css";
import { themeContract } from "../../styles/theme.css.ts";

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: themeContract.space.md,
});

export const card = style({
  borderRadius: themeContract.radius.lg,
  padding: `${themeContract.space.md} ${themeContract.space.lg}`,
  border: `2px solid ${themeContract.color.border}`,
  boxShadow: themeContract.effect.cardGlow,
  minHeight: "180px",
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.sm,
  color: themeContract.color.text,
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontWeight: 600,
});

export const label = style({
  fontSize: "1rem",
});

export const badge = style({
  fontSize: "0.65rem",
  textTransform: "uppercase",
  letterSpacing: "0.15rem",
  padding: `${themeContract.space.xs} ${themeContract.space.sm}`,
  borderRadius: themeContract.radius.round,
  border: `1px solid ${themeContract.color.borderLight}`,
  background: themeContract.color.overlay,
});

export const description = style({
  margin: 0,
  fontSize: "0.85rem",
  color: themeContract.color.subtext,
});

export const colorRow = style({
  display: "flex",
  gap: themeContract.space.xs,
  flexWrap: "wrap",
});

export const swatch = style({
  flex: "1 0 70px",
  textAlign: "center",
  padding: `${themeContract.space.xs} ${themeContract.space.sm}`,
  borderRadius: themeContract.radius.sm,
  color: themeContract.color.onAccent,
  fontSize: "0.65rem",
  letterSpacing: "0.08rem",
  textTransform: "uppercase",
  border: `1px solid ${themeContract.color.border}`,
});
