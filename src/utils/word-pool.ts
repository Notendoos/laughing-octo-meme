import englishWordLists from "../data/word-lists.json";
import dutchWordLists from "../data/word-lists-nl.json";

export const wordCollections = {
  english: englishWordLists,
  dutch: dutchWordLists,
} as const;

export type LanguageKey = keyof typeof wordCollections;

export const languageLabels: Record<LanguageKey, string> = {
  english: "English",
  dutch: "Dutch",
};

export type WordList = {
  fiveLetter: string[];
  tenLetter: string[];
};

export const DEFAULT_LANGUAGES: LanguageKey[] = ["english"];

const dedupeWords = (items: string[]): string[] => {
  const seen = new Set<string>();
  return items.filter((word) => {
    if (seen.has(word)) {
      return false;
    }
    seen.add(word);
    return true;
  });
};

export const buildWordPool = (languages: LanguageKey[] = DEFAULT_LANGUAGES): WordList => {
  if (!languages.length) {
    languages = DEFAULT_LANGUAGES;
  }
  const fiveLetter: string[] = [];
  const tenLetter: string[] = [];

  languages.forEach((lang) => {
    const collection = wordCollections[lang];
    if (!collection) {
      return;
    }
    fiveLetter.push(...collection.fiveLetter);
    tenLetter.push(...collection.tenLetter);
  });

  return {
    fiveLetter: dedupeWords(fiveLetter),
    tenLetter: dedupeWords(tenLetter),
  };
};
