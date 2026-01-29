import type { Line } from "../../engine/types.ts";

export type BallDrawReport = {
  drawnNumbers: number[];
  lines: Line[];
  scoreDelta: number;
};

type BallDrawPanelProps = {
  report: BallDrawReport | null;
};

export default function BallDrawPanel({ report }: BallDrawPanelProps) {
  if (!report) {
    return null;
  }

  return (
    <div>
      <p>Ball draw in progress…</p>
      <div className="ball-draw-list">
        {report.drawnNumbers.map((ball) => (
          <span key={ball} className="ball-chip">
            {ball}
          </span>
        ))}
      </div>
      <p>Lines completed: {report.lines.length}</p>
    </div>
  );
}
