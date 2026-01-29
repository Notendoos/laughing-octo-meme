import { describe, expect, it } from "vitest";
import {
  createBingoCard,
  drawBalls,
  initializeWordRound,
  processWordGuess,
  updateWordRoundElapsed,
} from "../src/engine/engine";
import { AppGameState, WordRoundConfig } from "../src/engine/types";

describe("Engine - timed word round progression", () => {
  it("ends the round when time expires", () => {
    const config: WordRoundConfig = {
      timeLimitMs: 10_000,
      wordLength: 5,
      maxAttemptsPerWord: 2,
      wordQueue: ["alpha", "bravo"],
    };

    const initialRound = initializeWordRound(config);
    const guessResult = processWordGuess(initialRound, "alpha", 1_000, 1);

    expect(guessResult.solved).toBe(true);
    expect(guessResult.round.correctWordCount).toBe(1);
    expect(guessResult.round.currentWord?.targetWord).toBe("bravo");

    const timeUpdate = updateWordRoundElapsed(
      guessResult.round,
      11_000,
      1
    );

    expect(timeUpdate.finished).toBe(true);
    expect(timeUpdate.result).toBeDefined();
    expect(timeUpdate.result?.correctWords).toBe(1);
    expect(timeUpdate.round.currentWord).toBeNull();
  });

  it("finishes immediately when the queue empties", () => {
    const config: WordRoundConfig = {
      timeLimitMs: 5_000,
      wordLength: 5,
      maxAttemptsPerWord: 1,
      wordQueue: ["delta"],
    };

    const initialRound = initializeWordRound(config);
    const guessResult = processWordGuess(initialRound, "delta", 2_000, 2);

    expect(guessResult.round.correctWordCount).toBe(1);
    expect(guessResult.roundEnded).toBeDefined();
    expect(guessResult.roundEnded?.roundIndex).toBe(2);
    expect(guessResult.round.currentWord).toBeNull();
  });
});

describe("Engine - bingo ball draw", () => {
  it("marks balls, completes a line, and awards score", () => {
    const gridNumbers = Array.from({ length: 5 }, (_, row) =>
      Array.from({ length: 5 }, (_, col) => row * 5 + col + 1)
    );

    const state: AppGameState = {
      phase: "SETUP",
      roundIndex: 1,
      totalScore: 0,
      bingoCard: createBingoCard(gridNumbers, []),
      ballPool: [1, 2, 3, 4, 5, 6, 7],
      completedLines: [],
      wordRoundResults: [],
      activeWordRound: null,
      bonusRound: null,
    };

    const drawOutcome = drawBalls(state, 5);

    expect(drawOutcome.ballsDrawn).toBe(5);
    expect(drawOutcome.drawnNumbers).toEqual([1, 2, 3, 4, 5]);
    expect(drawOutcome.scoreDelta).toBe(200);
    expect(drawOutcome.newLines).toHaveLength(1);
    expect(drawOutcome.newLines[0].id).toBe("row-0");
    expect(drawOutcome.state.totalScore).toBe(200);
    expect(drawOutcome.state.ballPool).toEqual([6, 7]);
    expect(drawOutcome.state.completedLines).toHaveLength(1);
  });
});
