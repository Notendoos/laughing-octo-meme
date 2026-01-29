import type { ReactElement } from "react";
import { Button } from "../ui/Button/Button.tsx";
import * as styles from "./CustomPhase.css.ts";

export type CustomPhaseMetadata = {
  description?: string;
  detail?: string;
  actionLabel?: string;
};

type CustomPhasePanelProps = {
  label: string;
  metadata?: CustomPhaseMetadata;
  onComplete: () => void;
};

export function CustomPhasePanel({
  label,
  metadata,
  onComplete,
}: CustomPhasePanelProps): ReactElement {
  return (
    <div className={styles.root}>
      <span className={styles.chip}>Custom</span>
      <h2 className={styles.title}>{label}</h2>
      {metadata?.description && (
        <p className={styles.description}>{metadata.description}</p>
      )}
      {metadata?.detail && (
        <p className={styles.detail}>{metadata.detail}</p>
      )}
      <div className={styles.actions}>
        <Button variant="primary" onClick={onComplete}>
          {metadata?.actionLabel ?? "Continue"}
        </Button>
      </div>
    </div>
  );
}
