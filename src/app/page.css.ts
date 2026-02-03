import { style } from "@vanilla-extract/css";
import { themeContract } from "../styles/theme.css.ts";

export const shell = style({
  minHeight: "100vh",
  padding: "2rem clamp(1rem, 4vw, 2.5rem)",
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.lg,
});

export const header = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.sm,
  paddingBottom: themeContract.space.sm,
  minHeight: "150px",
});

export const headerContent = style({
  position: "relative",
  zIndex: 1,
  display: "flex",
  width: "100%",
  gap: themeContract.space.md,
  flexWrap: "wrap",
});

export const headerPanel = style({
  flex: "1 1 420px",
  borderRadius: themeContract.radius.lg,
  padding: themeContract.space.md,
  border: `1px solid ${themeContract.color.borderLight}`,
  background: "rgba(0,0,0,0.35)",
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.xs,
});

export const headerPhaseLabel = style({
  fontSize: "1rem",
  fontWeight: 600,
  color: themeContract.color.subtext,
});

export const headerCaption = style({
  fontSize: "0.85rem",
  color: themeContract.color.info,
});

export const headerActions = style({
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.sm,
  minWidth: "260px",
});

export const settingsRow = style({
  display: "flex",
  gap: themeContract.space.sm,
  justifyContent: "flex-end",
});

export const main = style({
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.lg,
});

export const tabBar = style({
  display: "flex",
  gap: themeContract.space.xs,
});

export const tabButton = style({
  flex: 1,
  padding: `${themeContract.space.sm} ${themeContract.space.md}`,
  borderRadius: themeContract.radius.md,
  border: `1px solid ${themeContract.color.border}`,
  background: themeContract.color.surfaceAlt,
  color: themeContract.color.subtext,
  fontWeight: 600,
  cursor: "pointer",
  transition: "border-color 0.2s ease, color 0.2s ease",
});

export const tabButtonActive = style({
  borderColor: themeContract.color.accent,
  color: themeContract.color.text,
});

export const tabPanels = style({
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.md,
});

export const tabHidden = style({
  display: "none !important",
});

export const panel = style({
  borderRadius: themeContract.radius.lg,
  padding: themeContract.space.lg,
  border: `1px solid ${themeContract.color.borderLight}`,
  background: `linear-gradient(180deg, ${themeContract.color.gradientStart}, ${themeContract.color.gradientEnd})`,
  boxShadow: themeContract.effect.cardGlow,
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.md,
});

export const primaryPanel = style({
  minHeight: "420px",
});

export const secondaryPanel = style({
  minHeight: "420px",
});

export const panelBlurred = style({
  filter: "blur(4px)",
  opacity: 0.75,
  transition: "filter 0.3s ease, opacity 0.3s ease",
  pointerEvents: "none",
});

export const pauseOverlay = style({
  position: "absolute",
  inset: 0,
  borderRadius: themeContract.radius.lg,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: themeContract.space.sm,
  background: `linear-gradient(180deg, ${themeContract.color.overlay}, ${themeContract.color.gradientEnd})`,
  border: "none",
  borderColor: "transparent",
  boxShadow: themeContract.effect.cardGlow,
  zIndex: 2,
  textAlign: "center",
  cursor: "pointer",
  padding: themeContract.space.lg,
  font: "inherit",
  color: themeContract.color.text,
  appearance: "none",
  borderWidth: 0,
  transition: "transform 0.2s ease",
  outline: "none",
  width: "100%",
  "@media": {
    "(hover: hover)": {
      ":hover": {
        transform: "scale(1.01)",
      },
    },
  },
});

export const overlayLabel = style({
  fontSize: "1.4rem",
  fontWeight: 600,
});

export const overlayCaption = style({
  color: themeContract.color.subtext,
});

export const overlayTime = style({
  fontSize: "2.5rem",
  fontWeight: 700,
  fontFamily: `"Space Mono", "JetBrains Mono", monospace`,
  letterSpacing: "0.12rem",
  color: themeContract.color.accent,
});

export const overlayAction = style({
  fontSize: "0.95rem",
  fontWeight: 600,
  letterSpacing: "0.25rem",
  textTransform: "uppercase",
  color: themeContract.color.accent,
});

export const overlayHint = style({
  fontSize: "0.65rem",
  letterSpacing: "0.3rem",
  textTransform: "uppercase",
  color: themeContract.color.subtext,
});

export const panelHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  gap: themeContract.space.sm,
});

export const panelLabel = style({
  fontSize: "0.85rem",
  letterSpacing: "0.3rem",
  color: themeContract.color.subtext,
  textTransform: "uppercase",
});

export const panelTitle = style({
  fontSize: "1.4rem",
  margin: 0,
});

export const helperText = style({
  color: themeContract.color.subtext,
  fontSize: "0.9rem",
  marginTop: themeContract.space.sm,
});

export const ballSummary = style({
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.xs,
  fontSize: "0.9rem",
  color: themeContract.color.subtext,
});

export const bonusPanel = style({
  borderRadius: themeContract.radius.lg,
  padding: themeContract.space.lg,
  border: `1px solid ${themeContract.color.borderLight}`,
  background: `linear-gradient(135deg, ${themeContract.color.highlight}, ${themeContract.color.gradientEnd})`,
  boxShadow: themeContract.effect.cardGlow,
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.sm,
});

export const placeholder = style({
  padding: themeContract.space.sm,
  borderRadius: themeContract.radius.md,
  background: themeContract.color.overlay,
  border: `1px solid ${themeContract.color.borderLight}`,
});

export const buttonGroup = style({
  display: "flex",
  gap: themeContract.space.sm,
  flexWrap: "wrap",
});
