import type { FormEventHandler } from "react";
import type { BonusRoundState } from "../../engine/types.ts";
import { Button } from "../ui/Button/Button.tsx";
import * as styles from "./BonusPanel.css.ts";

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
    <div className={styles.root}>
      <h2 className={styles.title}>Bonus Round</h2>
      <p className={styles.info}>
        Word length: <strong>{bonusRound.wordLength}</strong> · Attempts:{" "}
        <strong>
          {bonusRound.attemptsUsed}/{bonusRound.maxAttempts}
        </strong>
      </p>
      <form className={styles.form} onSubmit={onSubmitGuess}>
        <label htmlFor="bonus-guess" className="sr-only">
          Enter the bonus word
        </label>
        <input
          id="bonus-guess"
          className={styles.input}
          value={guessValue}
          onChange={(event) => onGuessChange(event.target.value)}
          placeholder="Type the bonus word"
          autoComplete="off"
        />
        <Button type="submit" variant="primary" disabled={!guessValue.trim()}>
          Submit
        </Button>
      </form>
      <p className={styles.message}>{message}</p>
      {bonusRound.guesses.length > 0 && (
        <div className={styles.historyList}>
          {bonusRound.guesses.map((guess, index) => (
            <span key={`${guess.guess}-${index}`} className={styles.historyItem}>
              {guess.guess} · {guess.isCorrect ? "✅" : "❌"}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
