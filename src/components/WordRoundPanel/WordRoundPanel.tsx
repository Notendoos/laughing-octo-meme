import type { FormEventHandler } from "react";
import type { ActiveWordRound } from "../../engine/types";
import type { WordRoundEvent } from "../../engine/session";

type WordRoundPanelProps = {
  phaseKind: string;
  activeRound: ActiveWordRound | null;
  queueRemaining: number;
  timerProgress: number;
  remainingTimeMs: number;
  currentGuess: string;
  onGuessChange: (value: string) => void;
  onSubmitGuess: FormEventHandler<HTMLFormElement>;
  wordRoundEvent: WordRoundEvent | null;
};

export default function WordRoundPanel({
  activeRound,
  queueRemaining,
  timerProgress,
  remainingTimeMs,
  currentGuess,
  onGuessChange,
  onSubmitGuess,
  wordRoundEvent,
}: WordRoundPanelProps) {
  if (!activeRound) {
    return null;
  }

  return (
    <div>
      <div className="progress-track">
        <div
          className="progress-bar"
          style={{ width: `${timerProgress}%` }}
        />
      </div>
      <p>Time left: {Math.max(0, Math.ceil(remainingTimeMs / 1000))}s</p>
      <p>
        Correct this round: <strong>{activeRound.correctWordCount}</strong>
      </p>
      {wordRoundEvent?.type === "CONTINUE" && (
        <p>
          Last guess: {wordRoundEvent.guessResult.guess}{" "}
          {wordRoundEvent.guessResult.isCorrect ? "✅" : "❌"}
        </p>
      )}
      <form className="guess-form" onSubmit={onSubmitGuess}>
        <label htmlFor="word-guess" className="sr-only">
          Guess a word
        </label>
        <input
          id="word-guess"
          value={currentGuess}
          onChange={(event) => onGuessChange(event.target.value)}
          placeholder="Guess the word"
          autoComplete="off"
        />
        <button type="submit">Submit</button>
      </form>
      <p>Queue remaining: {queueRemaining}</p>
    </div>
  );
}
