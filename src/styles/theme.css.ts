import { createThemeContract, globalStyle } from "@vanilla-extract/css";

export const themeContract = createThemeContract({
  color: {
    background: null,
    surface: null,
    surfaceAlt: null,
    accent: null,
    accentLight: null,
    accentStrong: null,
    border: null,
    borderLight: null,
    text: null,
    subtext: null,
    info: null,
    success: null,
    danger: null,
    onAccent: null,
    onSuccess: null,
    onInfo: null,
    overlay: null,
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
    surfaceAlt: string;
    accent: string;
    accentLight: string;
    border: string;
    borderLight: string;
    accentStrong: string;
    text: string;
    subtext: string;
    success: string;
    danger: string;
    info: string;
    onAccent: string;
    onSuccess: string;
    onInfo: string;
    overlay: string;
  };
};

export const chromaVariants: Record<string, ThemePalette> = {
  classic: {
    label: "Classic",
    description: "Sunlit studio gloss",
    color: {
      background: "#06030b",
      surface: "rgba(13, 9, 23, 0.9)",
      surfaceAlt: "rgba(255, 255, 255, 0.06)",
      accent: "#facc15",
      accentLight: "#f97316",
      accentStrong: "#c2410c",
      border: "rgba(248, 247, 241, 0.35)",
      borderLight: "rgba(248, 247, 241, 0.15)",
      text: "#f8f7f1",
      subtext: "rgba(248, 247, 241, 0.7)",
      info: "#67e8f9",
      success: "#22c55e",
      danger: "#fb7185",
      onAccent: "#03060f",
      onSuccess: "#02100c",
      onInfo: "#04182b",
      overlay: "rgba(255, 255, 255, 0.05)",
    },
  },
  ocean: {
    label: "Ocean",
    description: "Cool blue gradients",
    color: {
      background: "#030c13",
      surface: "rgba(4, 18, 25, 0.9)",
      surfaceAlt: "rgba(236, 248, 255, 0.04)",
      accent: "#0ea5e9",
      accentLight: "#38bdf8",
      accentStrong: "#0284c7",
      border: "rgba(14, 165, 233, 0.35)",
      borderLight: "rgba(14, 165, 233, 0.2)",
      text: "#ebf8ff",
      subtext: "rgba(235, 248, 255, 0.75)",
      info: "#34d399",
      success: "#2dd4bf",
      danger: "#fb7185",
      onAccent: "#082030",
      onSuccess: "#021e18",
      onInfo: "#02231c",
      overlay: "rgba(15, 165, 233, 0.1)",
    },
  },
  sunset: {
    label: "Sunset",
    description: "Warm neon dusk",
    color: {
      background: "#1a041d",
      surface: "rgba(40, 16, 32, 0.85)",
      surfaceAlt: "rgba(255, 255, 255, 0.05)",
      accent: "#fb923c",
      accentLight: "#fb923c",
      accentStrong: "#c2410c",
      border: "rgba(251, 146, 60, 0.35)",
      borderLight: "rgba(251, 146, 60, 0.18)",
      text: "#fff1e6",
      subtext: "rgba(255, 241, 230, 0.75)",
      info: "#22d3ee",
      success: "#34d399",
      danger: "#f87171",
      onAccent: "#1c040d",
      onSuccess: "#021a13",
      onInfo: "#041824",
      overlay: "rgba(255, 255, 255, 0.04)",
    },
  },
  light: {
    label: "Light",
    description: "High contrast daylight",
    color: {
      background: "#f4f4f5",
      surface: "#ffffff",
      surfaceAlt: "#e9ecef",
      accent: "#0b5dfa",
      accentLight: "#3b82f6",
      accentStrong: "#1e40af",
      border: "#d1d5db",
      borderLight: "#e5e7eb",
      text: "#0f172a",
      subtext: "#475569",
      info: "#0284c7",
      success: "#0f9d58",
      danger: "#b91c1c",
      onAccent: "#ffffff",
      onSuccess: "#ffffff",
      onInfo: "#ffffff",
      overlay: "rgba(15, 23, 42, 0.08)",
    },
  },
  dark: {
    label: "Dark",
    description: "Deep high-contrast mode",
    color: {
      background: "#05060a",
      surface: "#0e121a",
      surfaceAlt: "#1c1f2a",
      accent: "#38bdf8",
      accentLight: "#5eead4",
      accentStrong: "#0f766e",
      border: "#1f2933",
      borderLight: "#374151",
      text: "#f8fafc",
      subtext: "#94a3b8",
      info: "#67e8f9",
      success: "#2dd4bf",
      danger: "#fb7185",
      onAccent: "#021826",
      onSuccess: "#022026",
      onInfo: "#011e2b",
      overlay: "rgba(248, 250, 252, 0.04)",
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
      [themeContract.color.surfaceAlt]: palette.surfaceAlt,
      [themeContract.color.accent]: palette.accent,
      [themeContract.color.accentLight]: palette.accentLight,
      [themeContract.color.accentStrong]: palette.accentStrong,
      [themeContract.color.border]: palette.border,
      [themeContract.color.borderLight]: palette.borderLight,
      [themeContract.color.info]: palette.info,
      [themeContract.color.onAccent]: palette.onAccent,
      [themeContract.color.onSuccess]: palette.onSuccess,
      [themeContract.color.onInfo]: palette.onInfo,
      [themeContract.color.overlay]: palette.overlay,
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
