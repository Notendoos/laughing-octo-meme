import type { AppGameState } from "../engine/types.ts";
import type { BonusProgress } from "../engine/types.ts";

export type BonusUnlockConfig = {
  minScore?: number;
  minCorrectWords?: number;
};

export const computeBonusProgress = (
  state: AppGameState,
  config?: BonusUnlockConfig
): BonusProgress => {
  const minScore = config?.minScore ?? 0;
  const minCorrectWords = config?.minCorrectWords ?? 0;
  const totalScore = state.totalScore;
  const correctWords = state.wordRoundResults.reduce(
    (sum, result) => sum + result.correctWords,
    0
  );
  const scorePercent = minScore === 0 ? 1 : Math.min(totalScore / minScore, 1);
  const wordPercent =
    minCorrectWords === 0
      ? 1
      : Math.min(correctWords / minCorrectWords, 1);
  const overallPercent =
    minScore === 0 && minCorrectWords === 0
      ? 1
      : Math.min(scorePercent, wordPercent);
  const unlocked = totalScore >= minScore && correctWords >= minCorrectWords;
  return {
    currentScore: totalScore,
    targetScore: minScore,
    currentWords: correctWords,
    targetWords: minCorrectWords,
    scorePercent,
    wordPercent,
    overallPercent,
    unlocked,
  };
};
