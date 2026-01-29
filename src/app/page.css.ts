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
  display: "flex",
  gap: themeContract.space.md,
  flexWrap: "wrap",
});

export const headerPanel = style({
  flex: "1 1 420px",
  borderRadius: themeContract.radius.lg,
  padding: themeContract.space.md,
  border: `1px solid rgba(255, 255, 255, 0.2)`,
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(8, 13, 32, 0.9))",
  boxShadow: "0 35px 60px rgba(2, 4, 15, 0.55)",
});

export const headerActions = style({
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.sm,
  minWidth: "260px",
});

export const timerWrapper = style({
  width: "100%",
});

export const settingsRow = style({
  display: "flex",
  gap: themeContract.space.sm,
  justifyContent: "flex-end",
});

export const main = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 0.75fr)",
  gap: themeContract.space.lg,
  "@media": {
    "(max-width: 960px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const panel = style({
  borderRadius: themeContract.radius.lg,
  padding: themeContract.space.lg,
  border: `1px solid rgba(255, 255, 255, 0.2)`,
  background:
    "linear-gradient(180deg, rgba(15, 23, 42, 0.9), rgba(6, 11, 24, 0.8))",
  boxShadow: "0 30px 60px rgba(0, 0, 0, 0.6)",
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

export const panelWrapper = style({
  position: "relative",
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
  background: `linear-gradient(180deg, rgba(9, 9, 16, 0.92), rgba(8, 8, 12, 0.75))`,
  border: `1px solid ${themeContract.color.border}`,
  boxShadow: `0 25px 50px rgba(0, 0, 0, 0.45)`,
  zIndex: 2,
});

export const overlayLabel = style({
  fontSize: "1.4rem",
  fontWeight: 600,
});

export const overlayCaption = style({
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
  border: `1px solid rgba(255, 255, 255, 0.2)`,
  background:
    "linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 10, 25, 0.95))",
  boxShadow: "0 35px 65px rgba(2, 4, 15, 0.65)",
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.sm,
});

export const placeholder = style({
  padding: themeContract.space.sm,
  borderRadius: themeContract.radius.md,
  background: "rgba(255, 255, 255, 0.03)",
  border: `1px solid rgba(255,255,255,0.08)`,
});

export const buttonGroup = style({
  display: "flex",
  gap: themeContract.space.sm,
  flexWrap: "wrap",
});
