import gsap from "gsap";
import { memo, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactElement } from "react";
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

const MAX_VISIBLE_ROWS = 5;
const BASE_ROW_HEIGHT = 48;
const BASE_ROW_GAP = 0.35 * 16;
const INITIAL_ROW_STEP = BASE_ROW_HEIGHT + BASE_ROW_GAP;
const INITIAL_GRID_HEIGHT =
  MAX_VISIBLE_ROWS * BASE_ROW_HEIGHT + (MAX_VISIBLE_ROWS - 1) * BASE_ROW_GAP;

function GuessGridComponent({
  guesses,
  wordLength,
  maxRows,
  sessionPaused,
}: GuessGridProps): ReactElement {
  const rows = padRows(guesses, maxRows);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const previousCountRef = useRef(guesses.length);
  const [rowStep, setRowStep] = useState(INITIAL_ROW_STEP);
  const [gridHeight, setGridHeight] = useState(INITIAL_GRID_HEIGHT);

  const translateY = useMemo(() => {
    const scrollOffset = Math.max(0, guesses.length - MAX_VISIBLE_ROWS);
    return scrollOffset * rowStep;
  }, [guesses.length, rowStep]);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) {
      return;
    }
    const firstRow = wrapper.querySelector<HTMLDivElement>("[data-row='0']");
    if (!firstRow) {
      return;
    }
    const wrapperStyle = getComputedStyle(wrapper);
    const gridStyle = getComputedStyle(container);
    const rowHeight = firstRow.getBoundingClientRect().height;
    const rowGap = parseFloat(wrapperStyle.gap) || BASE_ROW_GAP;
    const padding =
      parseFloat(gridStyle.paddingTop) + parseFloat(gridStyle.paddingBottom) || 0;
    const calculatedHeight =
      rowHeight * MAX_VISIBLE_ROWS +
      rowGap * (MAX_VISIBLE_ROWS - 1) +
      padding;
    setRowStep(rowHeight + rowGap);
    setGridHeight(calculatedHeight);
  }, [rows.length]);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return;
    }
    gsap.to(wrapper, {
      y: -translateY,
      duration: 0.35,
      ease: "power2.out",
    });
  }, [translateY]);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const hasMoreGuesses = guesses.length > previousCountRef.current;
    if (!wrapper) {
      previousCountRef.current = guesses.length;
      return;
    }
    previousCountRef.current = guesses.length;
    if (!hasMoreGuesses) {
      return;
    }
    const newRow = wrapper.querySelector<HTMLDivElement>(
      `[data-row="${guesses.length - 1}"]`,
    );
    if (!newRow) {
      return;
    }
    gsap.fromTo(
      newRow,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.35, ease: "power3.out" },
    );
  }, [guesses.length]);

  const gridStyle: CSSProperties = useMemo(
    () => ({
      "--guess-grid-height": `${gridHeight}px`,
    }) as CSSProperties,
    [gridHeight],
  );

  return (
    <div
      className={styles.gridContainer}
      ref={containerRef}
      style={gridStyle}
    >
      <div
        ref={wrapperRef}
        className={`${styles.grid} ${styles.rowsWrapper} ${
          sessionPaused ? styles.gridBlurred : ""
        }`}
        data-testid="guess-grid"
      >
        {rows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className={styles.row} data-row={rowIndex}>
            {Array.from({ length: wordLength }, (_, cellIndex) => {
              const letter = row.guess?.[cellIndex] ?? "";
              const rawStatus = row.letterFeedback?.[cellIndex] ?? "";
              const mappedStatus =
                rawStatus === "exact" ? "correct" : rawStatus || "";
              const statusClass = mappedStatus
                ? mappedStatus
                : letter
                ? "absent"
                : "empty";
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
