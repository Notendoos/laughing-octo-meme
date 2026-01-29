import { useMemo } from "react";
import type { ReactElement } from "react";
import { Clock4, Pause, Play } from "lucide-react";
import { Button } from "../ui/Button/Button.tsx";
import * as styles from "./TimerDisplay.css.ts";
import { usePedometer } from "../../hooks/usePedometer.ts";

type TimerDisplayProps = {
  remainingMs: number;
  onToggle: () => void;
  paused: boolean;
};

const formatTime = (milliseconds: number): string => {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
};

export function TimerDisplay({
  remainingMs,
  onToggle,
  paused,
}: TimerDisplayProps): ReactElement {
  const pedometerTime = usePedometer(remainingMs, { durationMs: 450 });
  const timeString = useMemo(() => formatTime(pedometerTime), [pedometerTime]);

  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <p className={styles.label}>
          <Clock4 size={18} />
          <span>time left</span>
        </p>
        <div className={styles.valueMask}>
          <p
            key={timeString}
            className={styles.value}
          >
            {timeString}
          </p>
        </div>
      </div>
      <div className={styles.action}>
        <Button variant="primary" onClick={onToggle}>
          {paused ? <Play size={16} /> : <Pause size={16} />}
          <span>{paused ? "Resume" : "Pause"}</span>
        </Button>
      </div>
    </div>
  );
}
