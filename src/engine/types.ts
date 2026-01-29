export type GamePhase = "SETUP" | "WORD_ROUND" | "BALL_DRAW" | "BONUS_WORD" | "GAME_OVER";

export type LineId = string;

export type BingoCell = {
  number: number;
  marked: boolean;
};

export type BingoCard = BingoCell[][];

export type Line = {
  id: LineId;
  order: number;
  cells: { row: number; col: number }[];
};

export type GuessResult = {
  guess: string;
  isCorrect: boolean;
  timestampMs: number;
};

export type WordAttemptState = {
  targetWord: string;
  attemptsUsed: number;
  maxAttempts: number;
  guesses: GuessResult[];
  solved: boolean;
};

export type ActiveWordRound = {
  timeLimitMs: number;
  elapsedMs: number;
  wordLength: number;
  maxAttemptsPerWord: number;
  wordQueue: string[];
  currentWord: WordAttemptState | null;
  correctWordCount: number;
};

export type WordRoundResult = {
  roundIndex: number;
  correctWords: number;
  timeLimitMs: number;
};

export type WordRoundConfig = {
  timeLimitMs: number;
  wordLength: number;
  maxAttemptsPerWord: number;
  wordQueue: string[];
 };

export type BonusRoundState = {
  targetWord: string;
  wordLength: 10;
  maxAttempts: number;
  attemptsUsed: number;
  guesses: GuessResult[];
  solved: boolean;
};

export type AppGameState = {
  phase: GamePhase;
  roundIndex: number;
  totalScore: number;
  bingoCard: BingoCard;
  ballPool: number[];
  completedLines: Line[];
  wordRoundResults: WordRoundResult[];
  activeWordRound: ActiveWordRound | null;
  bonusRound: BonusRoundState | null;
};
