import type { ActiveWordRound } from "../../engine/types.ts";
import type { WordRoundEvent } from "../../engine/session.ts";
import type { Ref } from "react";
import * as panelStyles from "../GuessPanel/GuessPanel.css.ts";
import type { GuessInputRowHandle } from "../GuessPanel/GuessInputRow.tsx";
import GuessFooter from "../GuessPanel/GuessFooter.tsx";
import { GuessGrid } from "../GuessPanel/GuessGrid.tsx";
import GuessHeader from "../GuessPanel/GuessHeader.tsx";
import { TimerDisplay } from "../TimerDisplay/TimerDisplay.tsx";

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
  allowDutch?: boolean;
  onToggleTimer: () => void;
  guessInputRef?: Ref<GuessInputRowHandle>;
  languageLabel?: string;
  showLanguageChip?: boolean;
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
  allowDutch,
  guessInputRef,
  languageLabel,
  showLanguageChip,
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
        languageLabel={languageLabel}
        showLanguageChip={showLanguageChip}
      />
      {allowDutch && (
        <p className={panelStyles.note}>
          Dutch word lists automatically enable the IJ-aware input flow.
        </p>
      )}
      <GuessGrid
        guesses={guessRows}
        wordLength={activeRound.wordLength}
        maxRows={maxAttempts}
        sessionPaused={timerPaused}
      />
      <div className={panelStyles.timerSection}>
        <TimerDisplay
          remainingMs={remainingTimeMs}
          onToggle={onToggleTimer}
          paused={timerPaused}
        />
      </div>
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
        allowDutch={allowDutch ?? false}
        inputRef={guessInputRef}
      />
    </div>
  );
}
