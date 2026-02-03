import clsx from "clsx";
import type { Line } from "../../engine/types.ts";
import * as styles from "./BallDrawPanel.css.ts";

export type BallDrawReport = {
  drawnNumbers: number[];
  lines: Line[];
  scoreDelta: number;
};

type BallDrawPanelProps = {
  report: BallDrawReport | null;
  displayNumbers?: number[];
};

const isSpecialBall = (value: number) => value % 7 === 0;

export default function BallDrawPanel({
  report,
  displayNumbers,
}: BallDrawPanelProps) {
  if (!report) {
    return null;
  }

  const numbers = displayNumbers ?? report.drawnNumbers;

  return (
    <div className={styles.root}>
      <p className={styles.title}>Ball draw report</p>
      <div className={styles.chips}>
        {numbers.map((ball, index) => (
          <span
            key={`${ball}-${index}`}
            className={clsx(
              styles.chip,
              "ball-chip",
              isSpecialBall(ball) && styles.specialChip
            )}
          >
            {ball}
          </span>
        ))}
      </div>
      <p className={styles.summary}>
        Lines completed: {report.lines.length} · Score +{report.scoreDelta}
      </p>
    </div>
  );
}
