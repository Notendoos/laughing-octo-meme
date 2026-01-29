import clsx from "clsx";
import type { ReactElement } from "react";
import {
  Settings,
  SlidersHorizontal,
  RefreshCcw,
  Pause,
  Globe,
} from "lucide-react";
import * as styles from "./SettingsModal.css.ts";
import { Button } from "../ui/Button/Button.tsx";
import {
  chromaVariants,
  ThemeKey,
  ThemePreference,
} from "../../styles/theme.css.ts";
import {
  LanguageKey,
  languageLabels,
} from "../../utils/word-pool.ts";

type SettingsModalProps = {
  open: boolean;
  onClose: () => void;
  wordRoundSeconds: number;
  setWordRoundSeconds: (value: number) => void;
  dutchMode: boolean;
  setDutchMode: (value: boolean) => void;
  maxSeconds: number;
  timerPaused: boolean;
  onToggleTimerPause: () => void;
  onResetSession: () => void;
  timerStatusText: string;
  themePreference: ThemePreference;
  appliedTheme: ThemeKey;
  onThemePreferenceChange: (value: ThemePreference) => void;
  selectedLanguages: LanguageKey[];
  onToggleLanguage: (value: LanguageKey) => void;
};

export function SettingsModal({
  open,
  onClose,
  wordRoundSeconds,
  setWordRoundSeconds,
  dutchMode,
  setDutchMode,
  maxSeconds,
  timerPaused,
  onToggleTimerPause,
  onResetSession,
  timerStatusText,
  themePreference,
  appliedTheme,
  onThemePreferenceChange,
  selectedLanguages,
  onToggleLanguage,
}: SettingsModalProps): ReactElement | null {
  if (!open) {
    return null;
  }

  return (
    <section className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.panel}>
        <header className={styles.header}>
          <p className={styles.title}>
            <Settings size={18} /> Game settings
          </p>
          <button
            className={styles.closeButton}
            aria-label="Close settings"
            onClick={onClose}
          >
            ✕
          </button>
        </header>

        <div className={styles.panelInner}>
          <div className={styles.section}>
            <span className={styles.label}>
              <SlidersHorizontal size={16} /> Word round duration
            </span>
          <input
            type="range"
            className={styles.slider}
            min={15}
            max={maxSeconds}
            value={wordRoundSeconds}
            onChange={(event) => setWordRoundSeconds(Number(event.target.value))}
          />
          <p>
            Each round now lasts {wordRoundSeconds}s (max {maxSeconds}s). Reset to
            apply.
          </p>
          </div>

          <div className={styles.section}>
            <span className={styles.label}>
              <SlidersHorizontal size={16} /> Dutch IJ input
          </span>
          <div className={styles.toggleRow}>
            <p>{dutchMode ? "Enabled" : "Disabled"}</p>
            <Button variant="ghost" onClick={() => setDutchMode(!dutchMode)}>
              Toggle
            </Button>
          </div>
          </div>

          <div className={styles.section}>
            <span className={styles.label}>
              <Pause size={16} /> Timer controls
          </span>
          <div className={styles.toggleRow}>
            <p>{timerStatusText}</p>
            <Button variant="ghost" onClick={onToggleTimerPause}>
              {timerPaused ? "Resume" : "Pause"}
            </Button>
          </div>
          </div>

          <div className={styles.section}>
            <span className={styles.label}>
              <Settings size={16} /> Theme preference
          </span>
          <div className={styles.toggleRow}>
            <p>
              {themePreference === "auto"
                ? "Following your device preference"
                : "Manual theme selection"}
            </p>
            <Button
              variant={themePreference === "auto" ? "primary" : "ghost"}
              onClick={() => onThemePreferenceChange("auto")}
            >
              Auto (system)
            </Button>
          </div>
          </div>

          <div className={styles.section}>
            <span className={styles.label}>
              <Settings size={16} /> Visual themes
          </span>
          <div className={styles.themeGrid}>
            {Object.entries(chromaVariants).map(([key, variant]) => (
              <button
                key={key}
                type="button"
                className={clsx(
                  styles.themeOption,
                  key === appliedTheme && styles.themeOptionActive,
                )}
                onClick={() =>
                  onThemePreferenceChange(key as ThemePreference)
                }
              >
                <span className={styles.themeTitle}>{variant.label}</span>
                <span className={styles.themeDescription}>
                  {variant.description}
                </span>
              </button>
            ))}
          </div>
          </div>

          <div className={styles.section}>
            <span className={styles.label}>
              <Globe size={16} /> Word languages
          </span>
          <div className={styles.languageGrid}>
            {Object.entries(languageLabels).map(([key, label]) => {
              const langKey = key as LanguageKey;
              const isActive = selectedLanguages.includes(langKey);
              return (
                <button
                  key={key}
                  type="button"
                  className={clsx(
                    styles.languageOption,
                    isActive && styles.languageOptionActive,
                  )}
                  onClick={() => onToggleLanguage(langKey)}
                >
                  <span className={styles.languageTitle}>{label}</span>
                  <span className={styles.languageBadge}>
                    {isActive ? "Included" : "Add"}
                  </span>
                </button>
              );
            })}
          </div>
          </div>

          <div className={styles.section}>
            <span className={styles.label}>
              <RefreshCcw size={16} /> Quick actions
          </span>
          <div className={styles.toggleRow}>
            <p>Reset progress and apply new settings</p>
            <Button variant="ghost" onClick={onResetSession}>
              Reset
            </Button>
          </div>
          </div>
        </div>

        <footer className={styles.actionRow}>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </footer>
      </div>
    </section>
  );
}
