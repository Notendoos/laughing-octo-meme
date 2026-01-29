import type { BingoCard } from "../../engine/types.ts";
import * as styles from "./BingoGrid.css.ts";

type BingoGridProps = {
  card: BingoCard;
};

export default function BingoGrid({ card }: BingoGridProps) {
  return (
    <div className={styles.grid}>
      {card.flatMap((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`${styles.cell} ${cell.marked ? styles.marked : ""}`}
          >
            {cell.number}
          </div>
        ))
      )}
    </div>
  );
}
