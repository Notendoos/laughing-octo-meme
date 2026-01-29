import { buildWordPool, DEFAULT_LANGUAGES, type LanguageKey } from "./word-pool.ts";

const safeModulo = (value: number, modulo: number): number =>
  ((value % modulo) + modulo) % modulo;

export const buildRoundQueue = (
  roundIndex: number,
  wordsPerRound: number,
  languages: LanguageKey[] = DEFAULT_LANGUAGES,
) => {
  const pool = buildWordPool(languages);
  if (!pool.fiveLetter.length) {
    return [];
  }
  const startIndex = safeModulo(roundIndex * wordsPerRound, pool.fiveLetter.length);
  return Array.from({ length: wordsPerRound }, (_, offset) => {
    const idx = safeModulo(startIndex + offset, pool.fiveLetter.length);
    return pool.fiveLetter[idx];
  });
};

export const sampleBonusWord = (
  languages: LanguageKey[] = DEFAULT_LANGUAGES,
  index = 0,
) => {
  const pool = buildWordPool(languages);
  if (!pool.tenLetter.length) {
    return "";
  }
  return pool.tenLetter[safeModulo(index, pool.tenLetter.length)];
};
