import clsx from "clsx";
import { useMemo } from "react";
import type { ReactElement } from "react";
import { Clock4 } from "lucide-react";
import { Button } from "../ui/Button/Button.tsx";
import * as styles from "./TimerDisplay.css.ts";
import { usePedometer } from "../../hooks/usePedometer.ts";
import { formatTimecode } from "../../utils/time.ts";

type TimerDisplayProps = {
  remainingMs: number;
  onToggle: () => void;
  paused: boolean;
  className?: string;
};

export function TimerDisplay({
  remainingMs,
  onToggle,
  paused,
  className,
}: TimerDisplayProps): ReactElement {
  const pedometerTime = usePedometer(remainingMs, { durationMs: 450 });
  const timeString = useMemo(
    () => formatTimecode(pedometerTime),
    [pedometerTime],
  );

  return (
    <Button
      variant="ghost"
      className={clsx(styles.root, paused && styles.paused, className)}
      onClick={onToggle}
      aria-label={`${paused ? 'Resume' : 'Pause'} timer`}
    >
      <Clock4 size={14} className={styles.icon} />
      <span className={styles.value}>{timeString}</span>
    </Button>
  );
}
