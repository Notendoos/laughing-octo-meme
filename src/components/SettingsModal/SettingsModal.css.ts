import { style } from "@vanilla-extract/css";
import { themeContract } from "../../styles/theme.css.ts";

export const overlay = style({
  position: "fixed",
  inset: 0,
  background: "rgba(3, 7, 18, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: themeContract.space.md,
  zIndex: 100,
});

export const panel = style({
  width: "100%",
  maxWidth: "520px",
  background: themeContract.color.surface,
  borderRadius: themeContract.radius.lg,
  padding: themeContract.space.lg,
  boxShadow: "0 25px 60px rgba(2,0,0,0.55)",
  position: "relative",
});

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: themeContract.space.lg,
});

export const title = style({
  fontSize: "1.5rem",
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
  marginBottom: themeContract.space.lg,
});

export const label = style({
  fontSize: "0.9rem",
  textTransform: "uppercase",
  color: themeContract.color.subtext,
  letterSpacing: "0.2rem",
});

export const slider = style({
  width: "100%",
});

export const toggleRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${themeContract.space.sm} ${themeContract.space.md}`,
  borderRadius: themeContract.radius.md,
  background: "rgba(255, 255, 255, 0.04)",
});

export const toggleButton = style({
  borderRadius: themeContract.radius.round,
  border: `1px solid ${themeContract.color.border}`,
  padding: `${themeContract.space.xs} ${themeContract.space.md}`,
  cursor: "pointer",
  fontWeight: 600,
  background: "transparent",
  color: themeContract.color.text,
});

export const actionRow = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: themeContract.space.sm,
});

export const actionButton = style({
  border: "none",
  borderRadius: themeContract.radius.md,
  padding: `${themeContract.space.sm} ${themeContract.space.lg}`,
  fontWeight: 700,
  cursor: "pointer",
  color: "#0f172a",
});

export const primaryButton = style({
  background: themeContract.color.accent,
});

export const secondaryButton = style({
  background: "rgba(255, 255, 255, 0.08)",
});
