import type { ActiveWordRound, GuessResult } from "../../engine/types.ts";
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
  showCorrectWordAnimation: boolean;
  onCorrectWordAnimationComplete: () => void;
  pendingGuess?: GuessResult | null;
};

export default function WordRoundPanel({
  phaseKind,
  activeRound,
  queueRemaining,
  remainingTimeMs,
  currentGuess,
  onGuessChange,
  onSubmitGuess,
  wordRoundEvent,
  roundNumber,
  timerPaused,
  allowDutch,
  onToggleTimer,
  guessInputRef,
  languageLabel,
  showLanguageChip,
  showCorrectWordAnimation,
  onCorrectWordAnimationComplete,
  pendingGuess,
}: WordRoundPanelProps) {
  if (!activeRound) {
    return null;
  }

  const guessHistory = activeRound.currentWord?.guesses ?? [];
  const guessRows = guessHistory.map((guess) => ({
    guess: guess.guess,
    letterFeedback: guess.letterFeedback,
  }));
  const stagedRows = pendingGuess
    ? [
        ...guessRows,
        {
          guess: pendingGuess.guess,
          letterFeedback: pendingGuess.letterFeedback,
          highlight: true,
        },
      ]
    : guessRows;
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
      <div className={panelStyles.headerRow}>
        <GuessHeader
          roundNumber={roundNumber}
          remainingGuesses={Math.max(0, remainingGuesses)}
          roundActive={phaseKind === "WORD_ROUND"}
          correctWordCount={activeRound.correctWordCount}
          sessionPaused={timerPaused}
          languageLabel={languageLabel}
          showLanguageChip={showLanguageChip}
        />
        <TimerDisplay
          className={panelStyles.timerCorner}
          remainingMs={remainingTimeMs}
          onToggle={onToggleTimer}
          paused={timerPaused}
        />
      </div>
      {allowDutch && (
        <p className={panelStyles.note}>
          Dutch word lists automatically enable the IJ-aware input flow.
        </p>
      )}
      <GuessGrid
        guesses={stagedRows}
        wordLength={activeRound.wordLength}
        maxRows={maxAttempts}
        sessionPaused={timerPaused}
        showCorrectAnimation={showCorrectWordAnimation}
        onCorrectAnimationComplete={onCorrectWordAnimationComplete}
        allowDutch={allowDutch ?? false}
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
        allowDutch={allowDutch ?? false}
        inputRef={guessInputRef}
        wordLength={activeRound.wordLength}
      />
    </div>
  );
}
