import { createTheme, createThemeContract } from "@vanilla-extract/css";

export const themeContract = createThemeContract({
  color: {
    background: null,
    surface: null,
    accent: null,
    accentStrong: null,
    border: null,
    text: null,
    subtext: null,
    success: null,
    info: null,
  },
  font: {
    primary: null,
    secondary: null,
  },
  space: {
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
  },
  radius: {
    sm: null,
    md: null,
    lg: null,
    round: null,
  },
});

export const lightTheme = createTheme(themeContract, {
  color: {
    background: "#06030b",
    surface: "rgba(13, 9, 23, 0.9)",
    accent: "#facc15",
    accentStrong: "#f97316",
    border: "rgba(248, 247, 241, 0.15)",
    text: "#f8f7f1",
    subtext: "rgba(248, 247, 241, 0.7)",
    success: "#22c55e",
    info: "#38bdf8",
  },
  font: {
    primary: `"Space Grotesk", "Inter", system-ui, sans-serif`,
    secondary: `"Space Grotesk", "Inter", system-ui, sans-serif`,
  },
  space: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2.5rem",
  },
  radius: {
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    round: "999px",
  },
});

export const darkTheme = createTheme(themeContract, {
  color: {
    background: "#020409",
    surface: "#0a0515",
    accent: "#eab308",
    accentStrong: "#fb923c",
    border: "rgba(248, 247, 241, 0.1)",
    text: "#f8f7f1",
    subtext: "rgba(248, 247, 241, 0.65)",
    success: "#4ade80",
    info: "#38bdf8",
  },
  font: {
    primary: `"Space Grotesk", "Inter", system-ui, sans-serif`,
    secondary: `"Space Grotesk", "Inter", system-ui, sans-serif`,
  },
  space: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2.5rem",
  },
  radius: {
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    round: "999px",
  },
});

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
