import wordLists from "../data/word-lists.json";

const { fiveLetter } = wordLists;

export const buildRoundQueue = (roundIndex: number, wordsPerRound: number) => {
  const startIndex = (roundIndex * wordsPerRound) % fiveLetter.length;
  return Array.from({ length: wordsPerRound }, (_, offset) => {
    const idx = (startIndex + offset) % fiveLetter.length;
    return fiveLetter[idx];
  });
};

export const sampleBonusWord = (index = 0) =>
  wordLists.tenLetter[index % wordLists.tenLetter.length];
