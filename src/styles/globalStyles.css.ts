import { globalStyle } from "@vanilla-extract/css";
import { themeContract } from "./theme.css";

globalStyle("body", {
  fontFamily: themeContract.font.primary,
  color: themeContract.color.text,
  background: themeContract.color.background,
  margin: 0,
  minHeight: "100vh",
});

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle(".app-shell", {
  padding: `${themeContract.space.xl} ${themeContract.space.md} ${themeContract.space.lg}`,
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.lg,
});

globalStyle(".card", {
  background: themeContract.color.surface,
  border: `1px solid ${themeContract.color.border}`,
  borderRadius: themeContract.radius.lg,
  padding: themeContract.space.lg,
  boxShadow: `0 20px 45px rgba(0, 0, 0, 0.4)`,
});

globalStyle(".panel-grid", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: themeContract.space.md,
});

globalStyle(".guess-form", {
  display: "flex",
  gap: themeContract.space.sm,
});

globalStyle(".guess-form input", {
  flex: 1,
  borderRadius: themeContract.radius.md,
  border: "none",
  padding: themeContract.space.sm,
  fontSize: "1rem",
  fontWeight: 600,
  background: "rgba(255, 255, 255, 0.05)",
  color: "inherit",
});

globalStyle(".guess-form button", {
  borderRadius: themeContract.radius.md,
  border: "none",
  padding: `${themeContract.space.sm} ${themeContract.space.md}`,
  fontWeight: 700,
  background: themeContract.color.accent,
  color: "#0f172a",
  cursor: "pointer",
});

globalStyle(".ball-draw-list", {
  display: "flex",
  flexWrap: "wrap",
  gap: themeContract.space.xs,
  marginTop: themeContract.space.sm,
});

globalStyle(".ball-chip", {
  borderRadius: themeContract.radius.round,
  width: "40px",
  height: "40px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255, 255, 255, 0.08)",
  border: `1px solid ${themeContract.color.border}`,
  fontWeight: 700,
});

globalStyle(".sv-text-muted", {
  color: themeContract.color.subtext,
});

globalStyle(".bingo-grid", {
  display: "grid",
  gridTemplateColumns: "repeat(5, minmax(48px, 1fr))",
  gap: "0.35rem",
});

globalStyle(".bingo-cell", {
  borderRadius: themeContract.radius.lg,
  border: `1px solid ${themeContract.color.border}`,
  padding: "0.6rem",
  textAlign: "center",
  fontWeight: 600,
  background: "rgba(255, 255, 255, 0.03)",
});

globalStyle(".bingo-cell.marked", {
  background: "linear-gradient(120deg, #0891b2, #06b6d4)",
  color: "#fff",
  boxShadow: "0 10px 30px rgba(2, 132, 199, 0.45)",
});

globalStyle(".progress-track", {
  width: "100%",
  height: "8px",
  borderRadius: themeContract.radius.round,
  background: "rgba(248, 247, 241, 0.2)",
  overflow: "hidden",
});

globalStyle(".progress-bar", {
  height: "100%",
  borderRadius: themeContract.radius.round,
  background: "linear-gradient(120deg, #facc15, #ea580c)",
});

globalStyle(".bonus-section", {
  display: "flex",
  flexDirection: "column",
  gap: themeContract.space.md,
});

globalStyle(".bonus-section input", {
  flex: 1,
  borderRadius: themeContract.radius.md,
  border: `1px solid ${themeContract.color.border}`,
  padding: themeContract.space.sm,
  background: "transparent",
  color: "inherit",
});

globalStyle(".bonus-section button", {
  borderRadius: themeContract.radius.md,
  border: "none",
  padding: `${themeContract.space.sm} ${themeContract.space.md}`,
  fontWeight: 700,
  background: themeContract.color.success,
  color: "#0f172a",
  cursor: "pointer",
});

globalStyle(".game-over", {
  textAlign: "center",
});

globalStyle(".scoreboard", {
  display: "flex",
  flexWrap: "wrap",
  gap: themeContract.space.md,
  justifyContent: "space-between",
});

globalStyle(".score-slot", {
  flex: 1,
  minWidth: "120px",
});

globalStyle(".sr-only", {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  whiteSpace: "nowrap",
  border: 0,
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  overflow: "hidden",
});

globalStyle("@media (max-width: 640px)", {
  ".guess-form": {
    flexDirection: "column",
  },
  ".bonus-section form": {
    flexDirection: "column",
  },
});
