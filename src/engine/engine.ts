import {
  ActiveWordRound,
  AppGameState,
  BingoCard,
  BonusRoundState,
  LetterFeedback,
  Line,
  WordAttemptState,
  WordRoundConfig,
  WordRoundResult,
  GuessResult,
} from "./types";

export const BINGO_SIZE = 5;
export const BINGO_LINE_SCORE = 200;
export const BONUS_BASE_ATTEMPTS = 6;

const shuffleArray = <T>(items: T[]): T[] => {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const createWordAttempt = (
  targetWord: string,
  maxAttemptsPerWord: number
): WordAttemptState => ({
  targetWord,
  attemptsUsed: 0,
  maxAttempts: maxAttemptsPerWord,
  guesses: [],
  solved: false,
});

export const computeLetterFeedback = (
  guess: string,
  targetWord: string
): LetterFeedback[] => {
  const normalizedGuess = guess.toLowerCase();
  const normalizedTarget = targetWord.toLowerCase();
  const counts: Record<string, number> = {};
  for (const char of normalizedTarget) {
    counts[char] = (counts[char] ?? 0) + 1;
  }

  const feedback: LetterFeedback[] = [];

  // first pass exact matches
  for (let i = 0; i < normalizedGuess.length; i += 1) {
    const guessChar = normalizedGuess[i];
    if (normalizedTarget[i] === guessChar) {
      feedback.push("exact");
      counts[guessChar] -= 1;
    } else {
      feedback.push("absent");
    }
  }

  // second pass for present letters
  for (let i = 0; i < normalizedGuess.length; i += 1) {
    const guessChar = normalizedGuess[i];
    if (feedback[i] === "exact") {
      continue;
    }

    if (counts[guessChar] > 0) {
      feedback[i] = "present";
      counts[guessChar] -= 1;
    }
  }

  return feedback;
};

export const advanceToNextWord = (
  round: ActiveWordRound
): ActiveWordRound => {
  if (round.wordQueue.length === 0) {
    return { ...round, currentWord: null };
  }

  const [nextWord, ...remainingQueue] = round.wordQueue;
  return {
    ...round,
    wordQueue: remainingQueue,
    currentWord: createWordAttempt(nextWord, round.maxAttemptsPerWord),
  };
};

export const initializeWordRound = (config: WordRoundConfig): ActiveWordRound => {
  const initialRound: ActiveWordRound = {
    timeLimitMs: config.timeLimitMs,
    elapsedMs: 0,
    wordLength: config.wordLength,
    maxAttemptsPerWord: config.maxAttemptsPerWord,
    wordQueue: [...config.wordQueue],
    currentWord: null,
    correctWordCount: 0,
  };

  return advanceToNextWord(initialRound);
};

export type WordGuessResult = {
  round: ActiveWordRound;
  guessResult: GuessResult;
  solved: boolean;
  roundEnded?: WordRoundResult;
};

export const processWordGuess = (
  round: ActiveWordRound,
  guess: string,
  timestampMs: number,
  roundIndex: number
): WordGuessResult => {
  if (!round.currentWord) {
    return {
      round,
      guessResult: {
        guess,
        isCorrect: false,
        timestampMs,
        letterFeedback: [],
      },
      solved: false,
    };
  }

  const normalizedGuess = guess.trim();
  const normalizedTarget = round.currentWord.targetWord;
  const rawGuess = normalizedGuess.toLowerCase();
  const rawTarget = normalizedTarget.toLowerCase();
  const isCorrect = rawGuess === rawTarget;

  const letterFeedback = computeLetterFeedback(guess, round.currentWord.targetWord);

  const updatedWord: WordAttemptState = {
    ...round.currentWord,
    attemptsUsed: round.currentWord.attemptsUsed + 1,
    guesses: [
      ...round.currentWord.guesses,
        {
          guess,
          isCorrect,
          timestampMs,
          letterFeedback,
        },
    ],
    solved: isCorrect,
  };

  let updatedRound: ActiveWordRound;

  if (isCorrect) {
    updatedRound = {
      ...round,
      correctWordCount: round.correctWordCount + 1,
      currentWord: updatedWord,
    };
    updatedRound = advanceToNextWord(updatedRound);
  } else if (updatedWord.attemptsUsed >= updatedWord.maxAttempts) {
    updatedRound = {
      ...round,
      currentWord: updatedWord,
    };
    updatedRound = advanceToNextWord(updatedRound);
  } else {
    updatedRound = {
      ...round,
      currentWord: updatedWord,
    };
  }

  const guessResult: GuessResult = {
    guess,
    isCorrect,
    timestampMs,
    letterFeedback,
  };

  const shouldEnd =
    (updatedRound.currentWord === null &&
      updatedRound.wordQueue.length === 0) ||
    updatedRound.elapsedMs >= updatedRound.timeLimitMs;

  if (shouldEnd) {
    const wordRoundResult: WordRoundResult = {
      roundIndex,
      correctWords: updatedRound.correctWordCount,
      timeLimitMs: updatedRound.timeLimitMs,
    };

    return {
      round: { ...updatedRound, currentWord: null },
      guessResult,
      solved: isCorrect,
      roundEnded: wordRoundResult,
    };
  }

  return {
    round: updatedRound,
    guessResult,
    solved: isCorrect,
  };
};

export type WordRoundUpdateResult = {
  round: ActiveWordRound;
  finished: boolean;
  result?: WordRoundResult;
};

export const updateWordRoundElapsed = (
  round: ActiveWordRound,
  elapsedMs: number,
  roundIndex: number
): WordRoundUpdateResult => {
  const clampedElapsedMs = Math.min(elapsedMs, round.timeLimitMs);
  const maxElapsedMs = Math.max(round.elapsedMs, clampedElapsedMs);
  const timeExpired = maxElapsedMs >= round.timeLimitMs;

  const ranOutOfWords =
    round.currentWord === null && round.wordQueue.length === 0;

  if (timeExpired || ranOutOfWords) {
    const wordRoundResult: WordRoundResult = {
      roundIndex,
      correctWords: round.correctWordCount,
      timeLimitMs: round.timeLimitMs,
    };

    return {
      round: { ...round, elapsedMs: maxElapsedMs, currentWord: null },
      finished: true,
      result: wordRoundResult,
    };
  }

  return {
    round: {
      ...round,
      elapsedMs: maxElapsedMs,
    },
    finished: false,
  };
};

export const createBingoCard = (
  gridNumbers: number[][],
  preMarkedNumbers: number[]
): BingoCard => {
  const flattened = gridNumbers.flat();
  const shuffled = shuffleArray(flattened);
  const selected = shuffled.slice(0, BINGO_SIZE * BINGO_SIZE);

  const card: BingoCard = [];
  for (let row = 0; row < BINGO_SIZE; row += 1) {
    const rowNumbers = selected.slice(
      row * BINGO_SIZE,
      (row + 1) * BINGO_SIZE
    );
    const cells = rowNumbers.map((number) => ({
      number,
      marked: preMarkedNumbers.includes(number),
    }));
    card.push(cells);
  }
  return card;
};

export const markNumberOnCard = (
  card: BingoCard,
  number: number
): { card: BingoCard; marked: boolean } => {
  let marked = false;
  const updatedCard = card.map((row) =>
    row.map((cell) => {
      if (cell.number === number && !cell.marked) {
        marked = true;
        return { ...cell, marked: true };
      }
      return cell;
    })
  );
  return { card: updatedCard, marked };
};

export const buildDefaultLines = (): Line[] => {
  const lines: Line[] = [];

  // Rows
  for (let row = 0; row < BINGO_SIZE; row += 1) {
    lines.push({
      id: `row-${row}`,
      order: row,
      cells: Array.from({ length: BINGO_SIZE }, (_, col) => ({ row, col })),
    });
  }

  // Columns
  for (let col = 0; col < BINGO_SIZE; col += 1) {
    lines.push({
      id: `col-${col}`,
      order: BINGO_SIZE + col,
      cells: Array.from({ length: BINGO_SIZE }, (_, row) => ({ row, col })),
    });
  }

  // Diagonals
  lines.push({
    id: "diag-main",
    order: BINGO_SIZE * 2,
    cells: Array.from({ length: BINGO_SIZE }, (_, index) => ({
      row: index,
      col: index,
    })),
  });
  lines.push({
    id: "diag-anti",
    order: BINGO_SIZE * 2 + 1,
    cells: Array.from({ length: BINGO_SIZE }, (_, index) => ({
      row: index,
      col: BINGO_SIZE - 1 - index,
    })),
  });

  return lines;
};

const defaultLines = buildDefaultLines();
export const TOTAL_BINGO_LINES = defaultLines.length;

export const isLineComplete = (line: Line, card: BingoCard): boolean => {
  return line.cells.every(
    ({ row, col }) => card[row]?.[col]?.marked === true
  );
};

export const drawBalls = (
  state: AppGameState,
  ballsToDraw: number
): {
  state: AppGameState;
  ballsDrawn: number;
  newLines: Line[];
  scoreDelta: number;
  drawnNumbers: number[];
} => {
  return applyDrawNumbers(state, selectRandomNumbers(state.ballPool, ballsToDraw));
};

const selectRandomNumbers = (pool: number[], count: number) => {
  const playPool = [...pool];
  const result: number[] = [];
  for (let i = 0; i < count && playPool.length > 0; i += 1) {
    const index = Math.floor(Math.random() * playPool.length);
    const [value] = playPool.splice(index, 1);
    if (value !== undefined) {
      result.push(value);
    }
  }
  return result;
};

export const applyDrawNumbers = (
  state: AppGameState,
  drawNumbers: number[]
): {
  state: AppGameState;
  ballsDrawn: number;
  newLines: Line[];
  scoreDelta: number;
  drawnNumbers: number[];
} => {
  const filtered = drawNumbers.filter((num) => state.ballPool.includes(num));
  const updatedPool = state.ballPool.filter((ball) => !filtered.includes(ball));
  let updatedCard = state.bingoCard;
  const completedLineIds = new Set(state.completedLines.map((line) => line.id));
  const collectedLines: Line[] = [];
  let scoreDelta = 0;

  filtered.forEach((ballNumber) => {
    const result = markNumberOnCard(updatedCard, ballNumber);
    updatedCard = result.card;
    defaultLines.forEach((line) => {
      if (completedLineIds.has(line.id)) {
        return;
      }
      if (isLineComplete(line, updatedCard)) {
        completedLineIds.add(line.id);
        collectedLines.push(line);
        scoreDelta += BINGO_LINE_SCORE;
      }
    });
  });

  return {
    state: {
      ...state,
      ballPool: updatedPool,
      bingoCard: updatedCard,
      completedLines: [...state.completedLines, ...collectedLines],
      totalScore: state.totalScore + scoreDelta,
    },
    ballsDrawn: filtered.length,
    newLines: collectedLines,
    scoreDelta,
    drawnNumbers: filtered,
  };
};

export const createBonusRoundState = (
  targetWord: string,
  pastRounds: WordRoundResult[]
): BonusRoundState => {
  const bonusAttempts = pastRounds.reduce(
    (sum, round) => sum + round.correctWords,
    0
  );

  return {
    targetWord,
    wordLength: 10,
    maxAttempts: BONUS_BASE_ATTEMPTS + bonusAttempts,
    attemptsUsed: 0,
    guesses: [],
    solved: false,
  };
};
