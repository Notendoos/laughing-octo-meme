import { style } from "@vanilla-extract/css";
import { themeContract } from "../../styles/theme.css.ts";

export const overlay = style({
  position: "fixed",
  inset: 0,
  background: "rgba(3, 7, 18, 0.65)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: themeContract.space.md,
  zIndex: 100,
});

export const panel = style({
  width: "min(520px, 100%)",
  background: "rgba(7, 11, 25, 0.95)",
  borderRadius: themeContract.radius.lg,
  padding: themeContract.space.lg,
  boxShadow: "0 35px 70px rgba(0,0,0,0.7)",
  border: `1px solid rgba(255,255,255,0.15)`,
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.md,
});

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const title = style({
  fontSize: "1.25rem",
  fontWeight: 700,
  letterSpacing: "0.08rem",
});

export const closeButton = style({
  border: "none",
  background: "transparent",
  color: themeContract.color.text,
  fontSize: "1.25rem",
  cursor: "pointer",
});

export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.sm,
  padding: themeContract.space.sm,
  borderRadius: themeContract.radius.md,
  background: "rgba(255, 255, 255, 0.02)",
});

export const label = style({
  fontSize: "0.9rem",
  textTransform: "uppercase",
  color: themeContract.color.subtext,
  letterSpacing: "0.2rem",
  display: "flex",
  alignItems: "center",
  gap: themeContract.space.xs,
});

export const slider = style({
  width: "100%",
  height: "6px",
  borderRadius: "999px",
  background: "rgba(248, 247, 241, 0.3)",
  WebkitAppearance: "none",
  appearance: "none",
  accentColor: themeContract.color.accent,
  outline: "none",
  cursor: "pointer",
  selectors: {
    "&::-webkit-slider-thumb": {
      width: "18px",
      height: "18px",
      borderRadius: "50%",
      background: themeContract.color.accentLight,
      boxShadow: "0 0 0 3px rgba(255, 255, 255, 0.4)",
    },
    "&::-moz-range-thumb": {
      width: "18px",
      height: "18px",
      borderRadius: "50%",
      background: themeContract.color.accentLight,
      boxShadow: "0 0 0 3px rgba(255, 255, 255, 0.4)",
      border: "none",
    },
  },
});

export const toggleRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${themeContract.space.sm} ${themeContract.space.md}`,
  borderRadius: themeContract.radius.md,
  background: "rgba(255, 255, 255, 0.04)",
});

export const themeGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: themeContract.space.sm,
});

export const themeOption = style({
  borderRadius: themeContract.radius.md,
  border: `1px solid rgba(255, 255, 255, 0.15)`,
  padding: `${themeContract.space.sm} ${themeContract.space.md}`,
  background: "rgba(255, 255, 255, 0.02)",
  color: themeContract.color.text,
  cursor: "pointer",
  textAlign: "left",
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.xs,
  transition: "border-color 0.2s ease, transform 0.2s ease",
});

export const themeOptionActive = style({
  borderColor: themeContract.color.accent,
  transform: "translateY(-1px)",
});

export const themeTitle = style({
  fontWeight: 700,
});

export const themeDescription = style({
  fontSize: "0.75rem",
  color: themeContract.color.subtext,
});

export const languageGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: themeContract.space.sm,
});

export const languageOption = style({
  borderRadius: themeContract.radius.md,
  border: `1px solid rgba(255, 255, 255, 0.15)`,
  padding: `${themeContract.space.sm} ${themeContract.space.md}`,
  background: "rgba(255, 255, 255, 0.02)",
  color: themeContract.color.text,
  cursor: "pointer",
  minWidth: "140px",
  flex: "1 1 150px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const languageOptionActive = style({
  borderColor: themeContract.color.accent,
  transform: "translateY(-1px)",
});

export const languageTitle = style({
  fontWeight: 600,
});

export const languageBadge = style({
  fontSize: "0.75rem",
  color: themeContract.color.subtext,
});

export const actionRow = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: themeContract.space.sm,
  marginTop: themeContract.space.sm,
});
