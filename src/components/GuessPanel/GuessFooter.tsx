import { memo, type ReactElement, type Ref } from "react";
import type { GuessInputRowHandle } from "./GuessInputRow.tsx";
import { GuessInputRow } from "./GuessInputRow.tsx";
import { Button } from "../ui/Button/Button.tsx";

type GuessFooterProps = {
  queueRemaining: number;
  currentGuess: string;
  onGuessChange: (value: string) => void;
  onSubmitGuess: () => void;
  disabled?: boolean;
  allowDutch?: boolean;
  inputRef?: Ref<GuessInputRowHandle>;
};

function GuessFooter({
  queueRemaining,
  currentGuess,
  onGuessChange,
  onSubmitGuess,
  disabled = false,
  allowDutch = false,
  inputRef,
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
        ref={inputRef}
      />
      <Button
        type="button"
        variant="primary"
        onClick={onSubmitGuess}
        disabled={disabled || !currentGuess.trim()}
      >
        Submit
      </Button>
    </div>
  );
}

export default memo(GuessFooter);
