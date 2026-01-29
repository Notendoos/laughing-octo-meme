import { style } from "@vanilla-extract/css";
import { themeContract } from "../../styles/theme.css.ts";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.sm,
});

export const title = style({
  fontSize: "1rem",
  fontWeight: 600,
  color: themeContract.color.subtext,
});

export const chips = style({
  display: "flex",
  flexWrap: "wrap",
  gap: themeContract.space.sm,
});

export const chip = style({
  width: "42px",
  height: "42px",
  borderRadius: themeContract.radius.round,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
  border: `1px solid rgba(255,255,255,0.18)`,
  background: "rgba(255, 255, 255, 0.05)",
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
});

export const specialChip = style({
  background: "linear-gradient(120deg, rgba(250, 204, 21, 0.4), rgba(249, 115, 22, 0.9))",
  border: `1px solid rgba(250, 204, 21, 0.8)`,
  color: "#060912",
  boxShadow: "0 10px 25px rgba(250, 204, 21, 0.35)",
});

export const summary = style({
  fontSize: "0.9rem",
  color: themeContract.color.subtext,
});
