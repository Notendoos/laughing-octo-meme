import type { ReactElement } from "react";
import * as styles from "./GuessPanel.css.ts";

type GuessMeterProps = {
  value: number | string;
  label: string;
};

export function GuessMeter({ value, label }: GuessMeterProps): ReactElement {
  return (
    <div className={styles.meter}>
      <span className={styles.meterValue}>{value}</span>
      <span className={styles.meterLabel}>{label}</span>
    </div>
  );
}
