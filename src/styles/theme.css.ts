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
    gradientStart: null,
    gradientEnd: null,
    highlight: null,
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
    cardGlow: null,
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
  classicLight: {
    label: "Classic Light",
    description: "Soft daylight with warm gold accents",
    color: {
      background: "#f3f4fb",
      surface: "#ffffff",
      surfaceAlt: "#e2e8f7",
      accent: "#fb923c",
      accentLight: "#fcd34d",
      accentStrong: "#c2410c",
      border: "#cbd5f5",
      borderLight: "#e0e7ff",
      text: "#0f172a",
      subtext: "#475569",
      info: "#2563eb",
      success: "#15803d",
      danger: "#b91c1c",
      onAccent: "#0f172a",
      onSuccess: "#0f172a",
      onInfo: "#f8fafc",
      overlay: "rgba(15, 23, 42, 0.05)",
    },
  },
  oceanLight: {
    label: "Ocean Light",
    description: "Pale aqua tones with bright highlights",
    color: {
      background: "#f1f5ff",
      surface: "#ffffff",
      surfaceAlt: "#dbeafe",
      accent: "#0ea5e9",
      accentLight: "#7dd3fc",
      accentStrong: "#0b6fb2",
      border: "#93c5fd",
      borderLight: "#dbeafe",
      text: "#0f172a",
      subtext: "#475569",
      info: "#1d4ed8",
      success: "#0d9488",
      danger: "#be123c",
      onAccent: "#0f172a",
      onSuccess: "#0f172a",
      onInfo: "#eef2ff",
      overlay: "rgba(14, 165, 233, 0.08)",
    },
  },
  sunsetLight: {
    label: "Sunset Light",
    description: "Warm apricot skies with blush pastel touch",
    color: {
      background: "#fff6f0",
      surface: "#ffffff",
      surfaceAlt: "#ffe4d6",
      accent: "#fb923c",
      accentLight: "#fdb08a",
      accentStrong: "#b45309",
      border: "#fb923c",
      borderLight: "#fcd5b5",
      text: "#1f2937",
      subtext: "#4b5563",
      info: "#ea580c",
      success: "#047857",
      danger: "#b91c1c",
      onAccent: "#0f0f0f",
      onSuccess: "#0f172a",
      onInfo: "#ffffff",
      overlay: "rgba(30, 18, 5, 0.05)",
    },
  },
};

const retroPalettes: Record<string, ThemePalette> = {
  windows95: {
    label: "Windows 95",
    description: "Sharp grays with punchy accent borders",
    color: {
      background: "#c0c0c0",
      surface: "#f8f8f8",
      surfaceAlt: "#e0e0e0",
      accent: "#000080",
      accentLight: "#1f4ed1",
      accentStrong: "#000050",
      border: "#6e6e6e",
      borderLight: "#ffffff",
      text: "#0b0b0b",
      subtext: "#3f3f3f",
      info: "#0047ab",
      success: "#007f0e",
      danger: "#a30000",
      onAccent: "#ffffff",
      onSuccess: "#ffffff",
      onInfo: "#ffffff",
      overlay: "rgba(0, 0, 0, 0.05)",
    },
  },
  oldskool: {
    label: "Oldskool",
    description: "Creamy beige with VHS neons",
    color: {
      background: "#f5efe1",
      surface: "#ffffff",
      surfaceAlt: "#faeeda",
      accent: "#e65100",
      accentLight: "#ff8a50",
      accentStrong: "#b23c00",
      border: "#2f1a0e",
      borderLight: "#f6d9bb",
      text: "#281c14",
      subtext: "#6b4f3b",
      info: "#1e5fff",
      success: "#2a9d8f",
      danger: "#d62828",
      onAccent: "#ffffff",
      onSuccess: "#ffffff",
      onInfo: "#ffffff",
      overlay: "rgba(12, 10, 8, 0.06)",
    },
  },
  vaporwave: {
    label: "Vaporwave",
    description: "Pastel pinks and blues with neon glow",
    color: {
      background: "#12002b",
      surface: "#1a0326",
      surfaceAlt: "#2c0b40",
      accent: "#ff5ef7",
      accentLight: "#7c94ff",
      accentStrong: "#e60073",
      border: "#561c91",
      borderLight: "#fcd5ff",
      text: "#f9f3ff",
      subtext: "#d4c5ff",
      info: "#00f5ff",
      success: "#66ffb8",
      danger: "#ff2d5c",
      onAccent: "#0b0025",
      onSuccess: "#01150c",
      onInfo: "#010f17",
      overlay: "rgba(255, 255, 255, 0.06)",
    },
  },
};

Object.assign(chromaVariants, retroPalettes);

export type ThemeKey = keyof typeof chromaVariants;
export const DEFAULT_THEME: ThemeKey = "classic";
export type ThemePreference = ThemeKey | "auto";

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
    cardGlow: "0 25px 55px rgba(0, 0, 0, 0.45)",
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
      [themeContract.color.gradientStart]: palette.surfaceAlt,
      [themeContract.color.gradientEnd]: palette.surface,
      [themeContract.color.highlight]: palette.accentLight,
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
