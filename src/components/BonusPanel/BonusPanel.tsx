import type { FormEventHandler } from "react";
import type { BonusRoundState } from "../../engine/types";

type BonusPanelProps = {
  bonusRound: BonusRoundState | null;
  guessValue: string;
  onGuessChange: (value: string) => void;
  onSubmitGuess: FormEventHandler<HTMLFormElement>;
  message: string;
};

export default function BonusPanel({
  bonusRound,
  guessValue,
  onGuessChange,
  onSubmitGuess,
  message,
}: BonusPanelProps) {
  if (!bonusRound) {
    return null;
  }

  return (
    <div className="bonus-section">
      <h2>Bonus Round</h2>
      <p>
        Word length: <strong>{bonusRound.wordLength}</strong> · Attempts:{" "}
        <strong>
          {bonusRound.attemptsUsed}/{bonusRound.maxAttempts}
        </strong>
      </p>
      <form onSubmit={onSubmitGuess}>
        <label htmlFor="bonus-guess" className="sr-only">
          Enter the bonus word
        </label>
        <input
          id="bonus-guess"
          value={guessValue}
          onChange={(event) => onGuessChange(event.target.value)}
          placeholder="Type the bonus word"
          autoComplete="off"
        />
        <button type="submit" disabled={!guessValue.trim()}>
          Submit
        </button>
      </form>
      <p>{message}</p>
      {bonusRound.guesses.length > 0 && (
        <ul>
          {bonusRound.guesses.map((guess, index) => (
            <li key={`${guess.guess}-${index}`}>
              {guess.guess} · {guess.isCorrect ? "✅" : "❌"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
