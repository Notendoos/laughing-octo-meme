import type { ReactElement } from "react";
import * as styles from "./GuessPanel.css.ts";
import { GuessMeter } from "./GuessMeter.tsx";

type GuessHeaderProps = {
  roundNumber: number;
  remainingGuesses: number;
  roundActive: boolean;
  timerProgress: number;
  remainingTimeMs: number;
  correctWordCount: number;
  sessionPaused: boolean;
};

export function GuessHeader({
  roundNumber,
  remainingGuesses,
  roundActive,
  timerProgress,
  remainingTimeMs,
  correctWordCount,
  sessionPaused,
}: GuessHeaderProps): ReactElement {
  const modeLabel = roundActive ? "Speelmodus" : "Kies een ronde om te starten";
  return (
    <div className={styles.header}>
      <div className={styles.meterRow}>
        <GuessMeter value={remainingGuesses} label="Beurten over" />
        <GuessMeter value={roundNumber} label="Ronde" />
      </div>
      <p className={styles.modeChip}>{modeLabel}</p>
      <div className={styles.progressRow}>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressBar}
            style={{ width: `${Math.min(timerProgress, 100)}%` }}
          />
        </div>
        <p className={styles.timerStatus}>
          Time left: {Math.max(0, Math.ceil(remainingTimeMs / 1000))}s
          {sessionPaused ? " (paused)" : ""}
        </p>
        <p className={styles.correctLabel}>
          Correct words: <strong>{correctWordCount}</strong>
        </p>
      </div>
    </div>
  );
}
