import clsx from "clsx";
import type { ChangeEvent, ReactElement } from "react";
import {
  Settings,
  SlidersHorizontal,
  RefreshCcw,
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
  maxSeconds: number;
  onResetSession: () => void;
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
  maxSeconds,
  onResetSession,
  themePreference,
  appliedTheme,
  onThemePreferenceChange,
  selectedLanguages,
  onToggleLanguage,
}: SettingsModalProps): ReactElement | null {
  const handleThemeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as ThemeKey;
    onThemePreferenceChange(value);
  };
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
          <div className={styles.sectionBody}>
            <input
              type="range"
              className={styles.slider}
              min={15}
              max={maxSeconds}
              value={wordRoundSeconds}
              onChange={(event) => setWordRoundSeconds(Number(event.target.value))}
            />
            <p className={styles.sectionSubtext}>
              Each round now lasts {wordRoundSeconds}s (max {maxSeconds}s). Reset
              to apply.
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <span className={styles.label}>
            <Settings size={16} /> Experience
          </span>
          <div className={styles.sectionBody}>
            <div className={styles.toggleRow}>
              <p>
                {themePreference === "auto"
                  ? "System theme mode"
                  : "Manual palette selection"}
              </p>
              <Button
                variant={themePreference === "auto" ? "primary" : "ghost"}
                onClick={() => onThemePreferenceChange("auto")}
              >
                Auto (system)
              </Button>
            </div>
            <p className={styles.sectionSubtext}>
              Tap any palette below to immediately preview it while the system
              toggle keeps the overall mode in sync.
            </p>
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
        </div>

        <div className={styles.section}>
          <span className={styles.label}>
            <Globe size={16} /> Word languages
          </span>
          <div className={styles.sectionBody}>
            <p className={styles.sectionSubtext}>
              Pick the dictionaries that should feed the word queue. Dutch still
              enables the IJ-aware input automatically.
            </p>
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
