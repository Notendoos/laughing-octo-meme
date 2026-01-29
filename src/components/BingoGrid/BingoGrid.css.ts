import { style } from "@vanilla-extract/css";
import { themeContract } from "../../styles/theme.css.ts";

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(5, minmax(48px, 1fr))",
  gap: "0.5rem",
});

export const cell = style({
  borderRadius: themeContract.radius.md,
  border: `1px solid rgba(255,255,255,0.18)`,
  padding: "0.65rem",
  textAlign: "center",
  fontWeight: 700,
  background: "rgba(255, 255, 255, 0.04)",
  color: themeContract.color.text,
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)",
});

export const marked = style({
  background: "linear-gradient(145deg, rgba(14,165,233,0.4), rgba(59,130,246,0.8))",
  border: `1px solid rgba(14,165,233,0.6)`,
  color: "#fff",
});
