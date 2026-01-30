import { memo, type ReactElement } from "react";
import * as styles from "./GuessPanel.css.ts";
import { GuessMeter } from "./GuessMeter.tsx";

type GuessHeaderProps = {
  roundNumber: number;
  remainingGuesses: number;
  roundActive: boolean;
  correctWordCount: number;
  sessionPaused: boolean;
  languageLabel?: string;
  showLanguageChip?: boolean;
};

function GuessHeader({
  roundNumber,
  remainingGuesses,
  roundActive,
  correctWordCount,
  sessionPaused,
  languageLabel,
  showLanguageChip = false,
}: GuessHeaderProps): ReactElement {
  const modeLabel = roundActive ? "Speelmodus" : "Kies een ronde om te starten";
  return (
    <div className={styles.header}>
      <div className={styles.meterRow}>
        <GuessMeter value={remainingGuesses} label="Beurten" />
        <GuessMeter value={roundNumber} label="Ronde" />
      </div>
      <div className={styles.headerMeta}>
        <p className={styles.modeChip}>{modeLabel}</p>
        {showLanguageChip && languageLabel && (
          <span className={styles.languageChip}>{languageLabel}</span>
        )}
        <span className={styles.correctLabel}>
          Correct words: <strong>{correctWordCount}</strong>
        </span>
        {sessionPaused && (
          <span className={styles.sessionStatus}>Gespeeld gepauzeerd</span>
        )}
      </div>
    </div>
  );
}

export default memo(GuessHeader);
