import { memo, type ReactElement } from "react";
import { GuessInputRow } from "./GuessInputRow.tsx";
import { Button } from "../ui/Button/Button.tsx";

type GuessFooterProps = {
  queueRemaining: number;
  currentGuess: string;
  onGuessChange: (value: string) => void;
  onSubmitGuess: () => void;
  disabled?: boolean;
  allowDutch?: boolean;
};

function GuessFooter({
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
