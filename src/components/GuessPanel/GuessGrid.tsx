import { memo } from "react";
import type { ReactElement } from "react";
import type { LetterFeedback } from "../../engine/types.ts";
import * as styles from "./GuessPanel.css.ts";

type GuessRow = {
  guess: string;
  letterFeedback: LetterFeedback[];
};

type GuessGridProps = {
  guesses: GuessRow[];
  wordLength: number;
  maxRows: number;
  sessionPaused: boolean;
};

const padRows = (rows: GuessRow[], maxRows: number): GuessRow[] => {
  const result = [...rows];
  while (result.length < maxRows) {
    result.push({ guess: "", letterFeedback: [] });
  }
  return result.slice(0, maxRows);
};

function GuessGridComponent({
  guesses,
  wordLength,
  maxRows,
  sessionPaused,
}: GuessGridProps): ReactElement {
  const rows = padRows(guesses, maxRows);
  const MAX_VISIBLE_ROWS = 5;
  const ROW_HEIGHT = 48;
  const ROW_GAP = 0.35 * 16; // approx px
  const scrollOffset = Math.max(0, rows.length - MAX_VISIBLE_ROWS);
  const translateY = scrollOffset * (ROW_HEIGHT + ROW_GAP);

  return (
    <div className={styles.gridContainer}>
      <div
        className={`${styles.grid} ${styles.rowsWrapper} ${
          sessionPaused ? styles.gridBlurred : ""
        }`}
        data-testid="guess-grid"
        style={{ transform: `translateY(-${translateY}px)` }}
      >
        {rows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className={styles.row} data-row={rowIndex}>
            {Array.from({ length: wordLength }, (_, cellIndex) => {
              const letter = row.guess?.[cellIndex] ?? "";
              const status = row.letterFeedback?.[cellIndex] ?? "";
              const statusClass = status ? status : letter ? "absent" : "empty";
              return (
                <span
                  key={`cell-${rowIndex}-${cellIndex}`}
                  className={`${styles.cell} ${styles.cellVariant[
                    statusClass as keyof typeof styles.cellVariant
                  ]}`}
                >
                  {letter.toUpperCase()}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export const GuessGrid = memo(GuessGridComponent);
