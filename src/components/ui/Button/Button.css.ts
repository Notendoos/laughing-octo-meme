import { styleVariants, style } from "@vanilla-extract/css";
import { themeContract } from "../../../styles/theme.css.ts";

export const base = style({
  borderRadius: themeContract.radius.md,
  padding: `${themeContract.space.sm} ${themeContract.space.lg}`,
  fontWeight: 700,
  letterSpacing: "0.05rem",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: themeContract.space.xs,
  border: "none",
  cursor: "pointer",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
});

export const variants = styleVariants({
  primary: {
    background: themeContract.color.accent,
    color: "#0f172a",
    boxShadow: `0 10px 25px rgba(250, 204, 21, 0.4)`,
  },
  ghost: {
    background: "transparent",
    border: `1px solid ${themeContract.color.border}`,
    color: themeContract.color.text,
    boxShadow: "none",
  },
});

export const disabled = style({
  opacity: 0.5,
  cursor: "not-allowed",
  transform: "none",
  boxShadow: "none",
});
