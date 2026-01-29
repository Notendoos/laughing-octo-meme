import type { BonusProgress, BonusRoundState } from "../../engine/types.ts";
import GuessFooter from "../GuessPanel/GuessFooter.tsx";
import { GuessGrid } from "../GuessPanel/GuessGrid.tsx";
import * as styles from "./BonusPanel.css.ts";

type BonusPanelProps = {
  bonusRound: BonusRoundState | null;
  currentGuess: string;
  onGuessChange: (value: string) => void;
  onSubmitGuess: () => void;
  message: string;
  bonusLocked?: boolean;
  bonusProgress?: BonusProgress | null;
};

export default function BonusPanel({
  bonusRound,
  currentGuess,
  onGuessChange,
  onSubmitGuess,
  message,
  bonusLocked = false,
  bonusProgress = null,
}: BonusPanelProps) {
  const attemptsLeft = bonusRound
    ? Math.max(0, bonusRound.maxAttempts - bonusRound.attemptsUsed)
    : 0;
  const guessRows = bonusRound
    ? bonusRound.guesses.map((guess) => ({
        guess: guess.guess,
        letterFeedback: guess.letterFeedback,
      }))
    : [];

  const progressPercent = Math.round((bonusProgress?.overallPercent ?? 0) * 100);
  const targetScore = bonusProgress?.targetScore ?? 0;
  const targetWords = bonusProgress?.targetWords ?? 0;

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>
        {bonusLocked ? "Bonus Locked" : "Bonus Round"}
      </h2>
      {bonusLocked ? (
        <>
          <p className={styles.info}>
            Unlock the bonus by reaching{" "}
            <strong>{targetWords} correct words</strong>{" "}
            {targetScore > 0 && (
              <>
                and <strong>{targetScore} points</strong>
              </>
            )}
            .
          </p>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className={styles.progressLabel}>
            <span>
              Words: {bonusProgress?.currentWords ?? 0}/{targetWords}
            </span>
            <span>
              Score: {bonusProgress?.currentScore ?? 0}/{targetScore}
            </span>
          </p>
          {message && <p className={styles.message}>{message}</p>}
          {!bonusRound && (
            <p className={styles.info}>
              Keep playing the word rounds to unlock the final 10-letter challenge.
            </p>
          )}
        </>
      ) : bonusRound ? (
        <>
          <p className={styles.info}>
            Word length: <strong>{bonusRound.wordLength}</strong> · Attempts remaining:{" "}
            <strong>{attemptsLeft}</strong>
          </p>
          <GuessGrid
            guesses={guessRows}
            wordLength={bonusRound.wordLength}
            maxRows={bonusRound.maxAttempts}
            sessionPaused={false}
          />
          <div className={styles.footer}>
            <GuessFooter
              queueRemaining={attemptsLeft}
              queueLabel="Attempts remaining"
              currentGuess={currentGuess}
              onGuessChange={onGuessChange}
              onSubmitGuess={onSubmitGuess}
              disabled={bonusRound.solved}
              wordLength={bonusRound.wordLength}
            />
          </div>
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
        </>
      ) : (
        <p className={styles.info}>
          Bonus requirements not met yet. Keep chasing the words and points.
        </p>
      )}
    </div>
  );
}
