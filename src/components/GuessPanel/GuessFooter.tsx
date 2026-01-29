import type { ReactElement } from "react";
import { GuessInputRow } from "./GuessInputRow.tsx";

type GuessFooterProps = {
  queueRemaining: number;
  currentGuess: string;
  onGuessChange: (value: string) => void;
  onSubmitGuess: () => void;
  disabled?: boolean;
  allowDutch?: boolean;
};

export function GuessFooter({
  queueRemaining,
  currentGuess,
  onGuessChange,
  onSubmitGuess,
  disabled = false,
  allowDutch = false,
}: GuessFooterProps): ReactElement {
  return (
    <div>
      <p className="sv-text-muted">Queue remaining: {queueRemaining}</p>
      <GuessInputRow
        wordLength={5}
        value={currentGuess}
        onChange={onGuessChange}
        onSubmit={onSubmitGuess}
        disabled={disabled}
        allowDutch={allowDutch}
      />
      <button
        type="button"
        className="guess-panel__submit"
        onClick={onSubmitGuess}
        disabled={disabled || !currentGuess.trim()}
      >
        Submit
      </button>
    </div>
  );
}
