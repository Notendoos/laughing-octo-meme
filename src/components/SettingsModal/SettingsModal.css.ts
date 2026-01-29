import { style } from "@vanilla-extract/css";
import { themeContract } from "../../styles/theme.css.ts";

export const overlay = style({
  position: "fixed",
  inset: 0,
  background: themeContract.color.overlay,
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: themeContract.space.md,
  zIndex: 100,
});

export const panel = style({
  width: "min(720px, 100%)",
  maxHeight: "min(calc(100vh - 3rem), 90vh)",
  background: themeContract.color.surface,
  borderRadius: themeContract.radius.lg,
  padding: `${themeContract.space.lg} ${themeContract.space.xl}`,
  boxShadow: themeContract.effect.windowGlow,
  border: `1px solid ${themeContract.color.border}`,
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.md,
  overflowY: "auto",
  scrollbarWidth: "thin",
});

export const panelInner = style({
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
  background: themeContract.color.surfaceAlt,
});

export const sectionBody = style({
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.sm,
  padding: themeContract.space.sm,
  borderRadius: themeContract.radius.md,
  background: themeContract.color.overlay,
});

export const sectionSubtext = style({
  fontSize: "0.8rem",
  color: themeContract.color.subtext,
});

export const select = style({
  width: "100%",
  borderRadius: themeContract.radius.md,
  border: `1px solid ${themeContract.color.borderLight}`,
  background: themeContract.color.surface,
  color: themeContract.color.text,
  padding: `${themeContract.space.sm} ${themeContract.space.md}`,
  fontSize: "0.9rem",
});

export const multiSelect = style({
  minHeight: "120px",
  background: themeContract.color.surface,
  borderRadius: themeContract.radius.md,
  border: `1px solid ${themeContract.color.borderLight}`,
  padding: themeContract.space.sm,
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
  background: themeContract.color.borderLight,
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
      boxShadow: `0 0 0 3px ${themeContract.color.overlay}`,
    },
    "&::-moz-range-thumb": {
      width: "18px",
      height: "18px",
      borderRadius: "50%",
      background: themeContract.color.accentLight,
      boxShadow: `0 0 0 3px ${themeContract.color.overlay}`,
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
  background: themeContract.color.overlay,
});

export const themeGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: themeContract.space.sm,
});

export const themeOption = style({
  borderRadius: themeContract.radius.md,
  border: `1px solid ${themeContract.color.border}`,
  padding: `${themeContract.space.sm} ${themeContract.space.md}`,
  background: themeContract.color.surfaceAlt,
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
  border: `1px solid ${themeContract.color.border}`,
  padding: `${themeContract.space.sm} ${themeContract.space.md}`,
  background: themeContract.color.surfaceAlt,
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

export const note = style({
  fontSize: "0.75rem",
  color: themeContract.color.subtext,
  margin: `${themeContract.space.sm} ${themeContract.space.sm} 0`,
  textAlign: "center",
});
