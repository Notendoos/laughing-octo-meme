export type LetterSegment = {
  display: string;
  offsets: number[];
};

export const normalizeGuessString = (value: string): string =>
  value.replace(/[^a-z]/gi, "").toLowerCase();

export const segmentGuess = (
  value: string,
  allowDutch = false,
  maxCells?: number,
): LetterSegment[] => {
  const normalized = normalizeGuessString(value);
  const segments: LetterSegment[] = [];
  let cursor = 0;

  const limit = maxCells ?? Number.POSITIVE_INFINITY;

  while (segments.length < limit && cursor < normalized.length) {
    if (
      allowDutch &&
      normalized[cursor] === "i" &&
      normalized[cursor + 1] === "j"
    ) {
      segments.push({
        display: "IJ",
        offsets: [cursor, cursor + 1],
      });
      cursor += 2;
      continue;
    }

    segments.push({
      display: normalized[cursor].toUpperCase(),
      offsets: [cursor],
    });
    cursor += 1;
  }

  if (maxCells !== undefined) {
    while (segments.length < maxCells) {
      segments.push({
        display: "",
        offsets: [],
      });
    }
  }

  return segments;
};

export const composeValue = (segments: string[]): string =>
  segments
    .map((segment) => (segment === "IJ" ? "ij" : segment))
    .join("")
    .trim();

export const countGuessLetters = (value: string, allowDutch = false): number =>
  segmentGuess(value, allowDutch).length;
