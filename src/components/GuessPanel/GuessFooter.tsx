import { memo, type ReactElement, type Ref } from "react";
import type { GuessInputRowHandle } from "./GuessInputRow.tsx";
import { GuessInputRow, countGuessLetters } from "./GuessInputRow.tsx";
import { Button } from "../ui/Button/Button.tsx";

type GuessFooterProps = {
  queueRemaining: number;
  currentGuess: string;
  onGuessChange: (value: string) => void;
  onSubmitGuess: () => void;
  disabled?: boolean;
  allowDutch?: boolean;
  inputRef?: Ref<GuessInputRowHandle>;
  wordLength?: number;
  queueLabel?: string;
};

function GuessFooter({
  queueRemaining,
  currentGuess,
  onGuessChange,
  onSubmitGuess,
  disabled = false,
  allowDutch = false,
  inputRef,
  wordLength = 5,
  queueLabel,
}: GuessFooterProps): ReactElement {
  const label = queueLabel ?? "Queue remaining";
  return (
    <div>
      <p className="sv-text-muted">
        {label}: {queueRemaining}
      </p>
      <GuessInputRow
        wordLength={wordLength ?? 5}
        value={currentGuess}
        onChange={onGuessChange}
        onSubmit={onSubmitGuess}
        disabled={disabled}
        allowDutch={allowDutch}
        ref={inputRef}
      />
      <Button
        type="button"
        variant="primary"
        onClick={onSubmitGuess}
        disabled={
          disabled ||
      countGuessLetters(currentGuess, allowDutch ?? false) !== (wordLength ?? 5)
        }
      >
        Submit
      </Button>
    </div>
  );
}

export default memo(GuessFooter);
