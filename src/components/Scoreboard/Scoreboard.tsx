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
}: ScoreboardProps) {
  return (
    <section className="scoreboard">
      <div className="score-slot">
        <p>Phase</p>
        <strong>{phaseLabel}</strong>
      </div>
      <div className="score-slot">
        <p>Round</p>
        <strong>{roundLabel}</strong>
      </div>
      <div className="score-slot">
        <p>Total Score</p>
        <strong>{totalScore}</strong>
      </div>
      <div className="score-slot">
        <p>Ball Pool</p>
        <strong>{ballPoolCount}</strong>
      </div>
      <div className="score-slot">
        <p>Lines Scored</p>
        <strong>{linesCompleted}</strong>
      </div>
      {bestScore !== undefined && (
        <div className="score-slot">
          <p>High Score</p>
          <strong>{bestScore}</strong>
        </div>
      )}
    </section>
  );
}
