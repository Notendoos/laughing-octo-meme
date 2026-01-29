import type { ActiveWordRound } from "../../engine/types.ts";
import type { WordRoundEvent } from "../../engine/session.ts";
import * as panelStyles from "../GuessPanel/GuessPanel.css.ts";
import GuessFooter from "../GuessPanel/GuessFooter.tsx";
import { GuessGrid } from "../GuessPanel/GuessGrid.tsx";
import GuessHeader from "../GuessPanel/GuessHeader.tsx";

type WordRoundPanelProps = {
  phaseKind: string;
  activeRound: ActiveWordRound | null;
  queueRemaining: number;
  timerProgress: number;
  remainingTimeMs: number;
  currentGuess: string;
  onGuessChange: (value: string) => void;
  onSubmitGuess: () => void;
  wordRoundEvent: WordRoundEvent | null;
  roundNumber: number;
  timerPaused: boolean;
  dutchMode?: boolean;
};

export default function WordRoundPanel({
  phaseKind,
  activeRound,
  queueRemaining,
  timerProgress,
  remainingTimeMs,
  currentGuess,
  onGuessChange,
  onSubmitGuess,
  wordRoundEvent,
  roundNumber,
  timerPaused,
  dutchMode,
}: WordRoundPanelProps) {
  if (!activeRound) {
    return null;
  }

  const guessHistory = activeRound.currentWord?.guesses ?? [];
  const guessRows = guessHistory.map((guess) => ({
    guess: guess.guess,
    letterFeedback: guess.letterFeedback,
  }));
  const maxAttempts =
    activeRound.currentWord?.maxAttempts ?? activeRound.maxAttemptsPerWord;
  const remainingGuesses = activeRound.currentWord
    ? Math.max(
        0,
        activeRound.currentWord.maxAttempts -
          (activeRound.currentWord.attemptsUsed ?? 0)
      )
    : maxAttempts;

  return (
    <div className={panelStyles.panel}>
      <GuessHeader
        roundNumber={roundNumber}
        remainingGuesses={Math.max(0, remainingGuesses)}
        roundActive={phaseKind === "WORD_ROUND"}
        timerProgress={timerProgress}
        remainingTimeMs={remainingTimeMs}
        correctWordCount={activeRound.correctWordCount}
        sessionPaused={timerPaused}
      />
      <GuessGrid
        guesses={guessRows}
        wordLength={activeRound.wordLength}
        maxRows={maxAttempts}
        sessionPaused={timerPaused}
      />
      {wordRoundEvent?.type === "CONTINUE" && (
        <p>
          Last guess: {wordRoundEvent.guessResult.guess}{" "}
          {wordRoundEvent.guessResult.isCorrect ? "✅" : "❌"}
        </p>
      )}
      <GuessFooter
        queueRemaining={queueRemaining}
        currentGuess={currentGuess}
        onGuessChange={onGuessChange}
        onSubmitGuess={onSubmitGuess}
        disabled={phaseKind !== "WORD_ROUND"}
        allowDutch={dutchMode ?? false}
      />
    </div>
  );
}
