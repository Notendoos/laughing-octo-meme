import type { ReactElement } from "react";
import * as styles from "./Scoreboard.css.ts";
import { usePedometer } from "../../hooks/usePedometer.ts";

type ScoreboardProps = {
  phaseLabel: string;
  roundLabel: string | number;
  totalScore: number;
  ballPoolCount: number;
  linesCompleted: number;
  bestScore?: number;
};

export default function Scoreboard({
  phaseLabel,
  roundLabel,
  totalScore,
  ballPoolCount,
  linesCompleted,
  bestScore,
}: ScoreboardProps): ReactElement {
  const displayScore = usePedometer(totalScore);
  const displayPool = usePedometer(ballPoolCount);
  const displayLines = usePedometer(linesCompleted);
  const displayBest = usePedometer(bestScore ?? 0);

  return (
    <section className={styles.root} aria-hidden="true">
      <div className={styles.slot}>
        <p className={styles.label}>Phase</p>
        <strong className={styles.value}>{phaseLabel}</strong>
      </div>
      <div className={styles.slot}>
        <p className={styles.label}>Round</p>
        <strong className={styles.value}>{roundLabel}</strong>
      </div>
      <div className={styles.slot}>
        <p className={styles.label}>Score</p>
        <strong key={`score-${displayScore}`} className={styles.value}>
          {displayScore}
        </strong>
      </div>
      <div className={styles.slot}>
        <p className={styles.label}>Balls left</p>
        <strong key={`balls-${displayPool}`} className={styles.value}>
          {displayPool}
        </strong>
      </div>
      <div className={styles.slot}>
        <p className={styles.label}>Lines</p>
        <strong key={`lines-${displayLines}`} className={styles.value}>
          {displayLines}
        </strong>
      </div>
      {bestScore !== undefined && (
        <div className={styles.slot}>
          <p className={styles.label}>Personal best</p>
          <strong key={`best-${displayBest}`} className={styles.value}>
            {displayBest}
          </strong>
        </div>
      )}
    </section>
  );
}
