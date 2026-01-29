import { style } from "@vanilla-extract/css";
import { themeContract } from "../../styles/theme.css.ts";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.sm,
  borderRadius: themeContract.radius.lg,
  padding: themeContract.space.lg,
  border: `1px solid rgba(255,255,255,0.12)`,
  background: "rgba(255, 255, 255, 0.04)",
  boxShadow: "0 20px 45px rgba(0,0,0,0.55)",
});

export const title = style({
  fontSize: "1.25rem",
  fontWeight: 600,
});

export const info = style({
  fontSize: "0.95rem",
  color: themeContract.color.subtext,
});

export const form = style({
  display: "flex",
  gap: themeContract.space.sm,
  flexWrap: "wrap",
  alignItems: "center",
});

export const input = style({
  flex: "1 1 100%",
  borderRadius: themeContract.radius.md,
  border: `2px solid rgba(255, 255, 255, 0.25)`,
  padding: `${themeContract.space.sm} ${themeContract.space.md}`,
  background: "rgba(255, 255, 255, 0.04)",
  color: themeContract.color.text,
  fontSize: "1rem",
  fontWeight: 700,
  letterSpacing: "0.12rem",
  textTransform: "uppercase",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
  transition: "border 0.2s ease, box-shadow 0.2s ease",
  selectors: {
    "&:focus-visible": {
      border: `2px solid ${themeContract.color.accent}`,
      outline: "none",
      boxShadow: `0 0 0 3px rgba(250, 204, 21, 0.35)`,
    },
  },
});

export const message = style({
  color: themeContract.color.subtext,
  fontSize: "0.9rem",
});

export const historyList = style({
  display: "flex",
  flexWrap: "wrap",
  gap: themeContract.space.xs,
  fontSize: "0.9rem",
});

export const historyItem = style({
  padding: `${themeContract.space.xs} ${themeContract.space.sm}`,
  borderRadius: themeContract.radius.md,
  background: "rgba(255,255,255,0.05)",
  border: `1px solid rgba(255,255,255,0.08)`,
});
