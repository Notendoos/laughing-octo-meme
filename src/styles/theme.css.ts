import { createThemeContract, globalStyle } from "@vanilla-extract/css";

export const themeContract = createThemeContract({
  color: {
    background: null,
    surface: null,
    accent: null,
    accentLight: null,
    border: null,
    text: null,
    subtext: null,
    success: null,
    danger: null,
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
  effect: {
    windowGlow: null,
  },
  layout: {
    pageMinHeight: null,
    pageMaxWidth: null,
  },
});

type ThemePalette = {
  label: string;
  description: string;
  color: {
    background: string;
    surface: string;
    accent: string;
    accentLight: string;
    border: string;
    text: string;
    subtext: string;
    success: string;
    danger: string;
  };
};

export const chromaVariants: Record<string, ThemePalette> = {
  classic: {
    label: "Classic",
    description: "Sunlit studio gloss",
    color: {
      background: "#06030b",
      surface: "rgba(13, 9, 23, 0.9)",
      accent: "#facc15",
      accentLight: "#f97316",
      border: "rgba(248, 247, 241, 0.15)",
      text: "#f8f7f1",
      subtext: "rgba(248, 247, 241, 0.7)",
      success: "#22c55e",
      danger: "#fb7185",
    },
  },
  ocean: {
    label: "Ocean",
    description: "Cool blue gradients",
    color: {
      background: "#030c13",
      surface: "rgba(4, 18, 25, 0.9)",
      accent: "#0ea5e9",
      accentLight: "#38bdf8",
      border: "rgba(14, 165, 233, 0.35)",
      text: "#ebf8ff",
      subtext: "rgba(235, 248, 255, 0.7)",
      success: "#2dd4bf",
      danger: "#fb7185",
    },
  },
  sunset: {
    label: "Sunset",
    description: "Warm neon dusk",
    color: {
      background: "#1a041d",
      surface: "rgba(40, 16, 32, 0.85)",
      accent: "#fb923c",
      accentLight: "#f97316",
      border: "rgba(251, 146, 60, 0.25)",
      text: "#fff1e6",
      subtext: "rgba(255, 241, 230, 0.75)",
      success: "#34d399",
      danger: "#f87171",
    },
  },
};

export type ThemeKey = keyof typeof chromaVariants;
export const DEFAULT_THEME: ThemeKey = "classic";

const baseThemeVars = {
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
  effect: {
    windowGlow: "0 20px 45px rgba(15, 23, 42, 0.45)",
  },
  layout: {
    pageMinHeight: "100vh",
    pageMaxWidth: "1400px",
  },
};

globalStyle(":root", {
  vars: {
    [themeContract.font.primary]: baseThemeVars.font.primary,
    [themeContract.font.secondary]: baseThemeVars.font.secondary,
    [themeContract.space.xs]: baseThemeVars.space.xs,
    [themeContract.space.sm]: baseThemeVars.space.sm,
    [themeContract.space.md]: baseThemeVars.space.md,
    [themeContract.space.lg]: baseThemeVars.space.lg,
    [themeContract.space.xl]: baseThemeVars.space.xl,
    [themeContract.radius.sm]: baseThemeVars.radius.sm,
    [themeContract.radius.md]: baseThemeVars.radius.md,
    [themeContract.radius.lg]: baseThemeVars.radius.lg,
    [themeContract.radius.round]: baseThemeVars.radius.round,
    [themeContract.effect.windowGlow]: baseThemeVars.effect.windowGlow,
    [themeContract.layout.pageMinHeight]: baseThemeVars.layout.pageMinHeight,
    [themeContract.layout.pageMaxWidth]: baseThemeVars.layout.pageMaxWidth,
  },
});

const applyColorVariant = (
  selector: string,
  palette: ThemePalette["color"],
) => {
  globalStyle(selector, {
    vars: {
      [themeContract.color.background]: palette.background,
      [themeContract.color.surface]: palette.surface,
      [themeContract.color.accent]: palette.accent,
      [themeContract.color.accentLight]: palette.accentLight,
      [themeContract.color.border]: palette.border,
      [themeContract.color.text]: palette.text,
      [themeContract.color.subtext]: palette.subtext,
      [themeContract.color.success]: palette.success,
      [themeContract.color.danger]: palette.danger,
    },
  });
};

applyColorVariant(":root", chromaVariants[DEFAULT_THEME].color);
Object.entries(chromaVariants).forEach(([variantId, palette]) => {
  applyColorVariant(`[data-theme="${variantId}"]`, palette.color);
});

// Backward-compatible exports
export const lightTheme = DEFAULT_THEME;
export const darkTheme = "dark";
