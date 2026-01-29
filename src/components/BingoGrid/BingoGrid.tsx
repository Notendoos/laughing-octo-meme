import type { BingoCard } from "../../engine/types.ts";

type BingoGridProps = {
  card: BingoCard;
};

export default function BingoGrid({ card }: BingoGridProps) {
  return (
    <div className="bingo-grid">
      {card.flatMap((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`bingo-cell ${cell.marked ? "marked" : ""}`}
          >
            {cell.number}
          </div>
        ))
      )}
    </div>
  );
}
