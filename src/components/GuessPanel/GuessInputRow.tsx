import { useCallback, useMemo, useRef } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import * as inputStyles from "./GuessInputRow.css.ts";

type GuessInputRowProps = {
  wordLength: number;
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
  allowDutch?: boolean;
};

const normalizeString = (value: string): string => {
  return value.replace(/[^a-z]/gi, "").toLowerCase().slice(0, 20);
};

const composeValue = (segments: string[]): string =>
  segments
    .map((segment) => (segment === "IJ" ? "ij" : segment))
    .join("")
    .trim();

export function GuessInputRow({
  wordLength,
  value,
  disabled = false,
  onChange,
  onSubmit,
  allowDutch = false,
}: GuessInputRowProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const ijPending = useRef<number | null>(null);

  const letters = useMemo(() => {
    const normalized = normalizeString(value);
    const result: string[] = [];
    let cursor = 0;

    while (result.length < wordLength && cursor < normalized.length) {
      if (
        allowDutch &&
        normalized[cursor] === "i" &&
        normalized[cursor + 1] === "j"
      ) {
        result.push("IJ");
        cursor += 2;
        continue;
      }

      result.push(normalized[cursor].toUpperCase());
      cursor += 1;
    }

    while (result.length < wordLength) {
      result.push("");
    }

    return result;
  }, [value, wordLength, allowDutch]);

  const setFocus = useCallback(
    (index: number) => {
      const next = inputsRef.current[index];
      next?.focus();
      next?.select();
    },
    []
  );

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

  const handleInput = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const raw = normalizeString(event.target.value);
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
