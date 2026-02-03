import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import * as inputStyles from "./GuessInputRow.css.ts";
import {
  composeValue,
  countGuessLetters,
  normalizeGuessString,
  segmentGuess,
} from "./guess-utils.ts";

export type GuessInputRowHandle = {
  focusFirstEmpty: () => void;
};

type GuessInputRowProps = {
  wordLength: number;
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
  allowDutch?: boolean;
};

export const GuessInputRow = forwardRef<GuessInputRowHandle, GuessInputRowProps>(
  (
    {
      wordLength,
      value,
      disabled = false,
      onChange,
      onSubmit,
      allowDutch = false,
    },
    ref
  ) => {
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const ijPending = useRef<number | null>(null);

    const letters = useMemo(() => {
      const segments = segmentGuess(value, allowDutch, wordLength);
      return segments.map((segment) => segment.display);
    }, [value, wordLength, allowDutch]);

    const setFocus = useCallback((index: number) => {
      const next = inputsRef.current[index];
      next?.focus();
      next?.select();
    }, []);

    const moveToNext = (index: number) => {
      for (let i = index + 1; i < wordLength; i += 1) {
        if (inputsRef.current[i]?.disabled) {
          continue;
        }
        const next = inputsRef.current[i];
        next?.focus();
        next?.select();
        break;
      }
    };

    const focusFirstEmpty = useCallback(() => {
      const candidateIndex = letters.findIndex(
        (_letter, index) =>
          !letters[index] && !inputsRef.current[index]?.disabled
      );
      const target = candidateIndex !== -1 ? candidateIndex : wordLength - 1;
      setFocus(target);
    }, [letters, setFocus, wordLength]);

    useImperativeHandle(ref, () => ({
      focusFirstEmpty,
    }));

    const handleInput =
      (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
        const raw = normalizeGuessString(event.target.value);
        const letter = raw
          ? raw.slice(-2) === "ij" && allowDutch
            ? "IJ"
            : raw.slice(-1).toUpperCase()
          : "";
        const nextLetters = [...letters];
        nextLetters[index] = letter;
        onChange(composeValue(nextLetters));

        if (allowDutch) {
          if (letter === "IJ") {
            ijPending.current = null;
            moveToNext(index);
            return;
          }

          if (letter === "I") {
            ijPending.current = index;
          } else if (ijPending.current === index) {
            ijPending.current = null;
          }
        }

        if (letter) {
          moveToNext(index);
        }
      };

    const handleKeyDown = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
      if (allowDutch && event.key.toLowerCase() === "j" && letters[index] === "I") {
        event.preventDefault();
        const nextLetters = [...letters];
        nextLetters[index] = "IJ";
        ijPending.current = null;
        onChange(composeValue(nextLetters));
        moveToNext(index);
        return;
      }

      if (event.key === "Enter" || event.key === "NumpadEnter") {
        event.preventDefault();
        onSubmit();
        return;
      }

      if (event.key === "Backspace") {
        if (letters[index]) {
          const nextLetters = letters.map((letter, idx) =>
            idx === index ? "" : letter
          );
          onChange(composeValue(nextLetters));
          return;
        }
        for (let prev = index - 1; prev >= 0; prev -= 1) {
          if (inputsRef.current[prev]?.disabled) {
            continue;
          }
          setFocus(prev);
          break;
        }
      }
    };

    return (
      <div className={inputStyles.root}>
        {letters.map((letter, index) => (
          <input
            key={`letter-input-${index}`}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            className={inputStyles.cellInput}
            value={letter}
            onChange={handleInput(index)}
            onKeyDown={handleKeyDown(index)}
            disabled={disabled}
            maxLength={allowDutch ? 2 : 1}
            aria-label={`Letter ${index + 1}`}
          />
        ))}
      </div>
    );
  }
);

GuessInputRow.displayName = "GuessInputRow";

export { countGuessLetters } from "./guess-utils.ts";
