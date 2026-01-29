import { buildWordPool, DEFAULT_LANGUAGES, type LanguageKey } from "./word-pool.ts";
import type { WordQueueEntry } from "../engine/types.ts";

const safeModulo = (value: number, modulo: number): number =>
  ((value % modulo) + modulo) % modulo;

export const buildRoundQueue = (
  roundIndex: number,
  wordsPerRound: number,
  languages: LanguageKey[] = DEFAULT_LANGUAGES,
): WordQueueEntry[] => {
  const entries: WordQueueEntry[] = [];
  languages.forEach((lang) => {
    const pool = buildWordPool([lang]);
    pool.fiveLetter.forEach((word) => {
      entries.push({ word, language: lang });
    });
  });
  if (!entries.length) {
    return [];
  }
  const startIndex = safeModulo(roundIndex * wordsPerRound, entries.length);
  return Array.from({ length: wordsPerRound }, (_, offset) => {
    const idx = safeModulo(startIndex + offset, entries.length);
    return entries[idx];
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
