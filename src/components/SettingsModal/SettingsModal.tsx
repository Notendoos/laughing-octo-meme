import type { ReactElement } from "react";
import * as styles from "./SettingsModal.css.ts";

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
};

export function SettingsModal({
  open,
  onClose,
  wordRoundSeconds,
  setWordRoundSeconds,
  dutchMode,
  setDutchMode,
  maxSeconds,
}: SettingsModalProps): ReactElement | null {
  if (!open) {
    return null;
  }

  return (
    <section className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.panel}>
        <header className={styles.header}>
          <p className={styles.title}>Game settings</p>
          <button
            className={styles.closeButton}
            aria-label="Close settings"
            onClick={onClose}
          >
            ✕
          </button>
        </header>

        <div className={styles.section}>
          <span className={styles.label}>Word round duration</span>
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
          <span className={styles.label}>Dutch IJ input</span>
          <div className={styles.toggleRow}>
            <p>{dutchMode ? "Enabled" : "Disabled"}</p>
            <button
              className={styles.toggleButton}
              onClick={() => setDutchMode(!dutchMode)}
            >
              Toggle
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <span className={styles.label}>Timer controls</span>
          <div className={styles.toggleRow}>
            <p>{timerStatusText}</p>
            <button
              className={styles.toggleButton}
              onClick={onToggleTimerPause}
            >
              {timerPaused ? "Resume" : "Pause"}
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <span className={styles.label}>Quick actions</span>
          <div className={styles.toggleRow}>
            <p>Reset progress and apply new settings</p>
            <button
              className={styles.toggleButton}
              onClick={onResetSession}
            >
              Reset
            </button>
          </div>
        </div>

        <footer className={styles.actionRow}>
          <button
            type="button"
            className={`${styles.actionButton} ${styles.secondaryButton}`}
            onClick={onClose}
          >
            Close
          </button>
        </footer>
      </div>
    </section>
  );
}
