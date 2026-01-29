import { useEffect, useRef, useState } from "react";

type UsePedometerOptions = {
  durationMs?: number;
};

const DEFAULT_DURATION = 500;

export function usePedometer(
  target: number,
  options: UsePedometerOptions = {}
): number {
  const { durationMs = DEFAULT_DURATION } = options;
  const [displayValue, setDisplayValue] = useState(target);
  const animationFrame = useRef<number | null>(null);
  const currentValue = useRef(target);

  useEffect(() => {
    if (animationFrame.current !== null) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }

    const startValue = currentValue.current;
    const delta = target - startValue;

    if (delta === 0) {
      return;
    }

    const startTime = performance.now();

    const step = (timestamp: number) => {
      const elapsed = Math.min(durationMs, timestamp - startTime);
      const progress = durationMs === 0 ? 1 : elapsed / durationMs;
      const next = Math.round(startValue + delta * progress);
      currentValue.current = next;
      setDisplayValue(next);

      if (elapsed < durationMs) {
        animationFrame.current = requestAnimationFrame(step);
      } else {
        currentValue.current = target;
        setDisplayValue(target);
        animationFrame.current = null;
      }
    };

    animationFrame.current = requestAnimationFrame(step);

    return () => {
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
      }
    };
  }, [target, durationMs]);

  return displayValue;
}
