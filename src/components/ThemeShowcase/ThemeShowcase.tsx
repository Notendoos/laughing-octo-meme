import type { ReactElement } from "react";
import { chromaVariants } from "../../styles/theme.css.ts";
import * as styles from "./ThemeShowcase.css.ts";

type ThemeShowcaseProps = {
  highlight?: string;
};

export function ThemeShowcase({ highlight }: ThemeShowcaseProps): ReactElement {
  return (
    <div className={styles.grid}>
      {Object.entries(chromaVariants).map(([key, variant]) => (
        <article
          key={key}
          className={styles.card}
          style={{
            background: `linear-gradient(135deg, ${variant.color.surfaceAlt}, ${variant.color.surface})`,
            borderColor: variant.color.border,
          }}
        >
          <header className={styles.header}>
            <span className={styles.label}>{variant.label}</span>
            <span className={styles.badge}>
              {key === highlight ? "Selected" : key}
            </span>
          </header>
          <p className={styles.description}>{variant.description}</p>
          <div className={styles.colorRow}>
            {(["accent", "accentLight", "accentStrong"] as const).map((name) => (
              <span
                key={`${key}-${name}`}
                className={styles.swatch}
                style={{ backgroundColor: variant.color[name] }}
              >
                {name.replace("accent", "acc")}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
