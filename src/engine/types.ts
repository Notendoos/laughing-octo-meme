import type { LanguageKey } from "../utils/word-pool.ts";

export type GamePhaseKind =
  | "SETUP"
  | "WORD_ROUND"
  | "BALL_DRAW"
  | "BONUS_WORD"
  | "GAME_OVER"
  | "CUSTOM";

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

export type LetterFeedback = "exact" | "present" | "absent";

export type GuessResult = {
  guess: string;
  isCorrect: boolean;
  timestampMs: number;
  letterFeedback: LetterFeedback[];
};

export type WordQueueEntry = {
  word: string;
  language: LanguageKey;
};

export type WordAttemptState = {
  targetWord: string;
  language: LanguageKey;
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
  wordQueue: WordQueueEntry[];
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
  wordQueue: WordQueueEntry[];
};

export type BonusRoundState = {
  targetWord: string;
  wordLength: 10;
  maxAttempts: number;
  attemptsUsed: number;
  guesses: GuessResult[];
  solved: boolean;
};

export type BonusProgress = {
  currentScore: number;
  targetScore: number;
  currentWords: number;
  targetWords: number;
  scorePercent: number;
  wordPercent: number;
  overallPercent: number;
  unlocked: boolean;
};

export type CustomPhaseMetadata = {
  description?: string;
  actionLabel?: string;
  detail?: string;
};

export type PhaseDefinition =
  | {
      id: string;
      kind: "SETUP";
      label?: string;
    }
  | {
      id: string;
      kind: "WORD_ROUND";
      wordRoundConfigIndex: number;
      label?: string;
    }
  | {
      id: string;
      kind: "BALL_DRAW";
      label?: string;
    }
  | {
      id: string;
      kind: "BONUS_WORD";
      label?: string;
    }
  | {
      id: string;
      kind: "GAME_OVER";
      label?: string;
    }
  | {
      id: string;
      kind: "CUSTOM";
      label: string;
      metadata?: CustomPhaseMetadata;
    };

export type AppGameState = {
  phaseId: string;
  phaseKind: GamePhaseKind;
  phaseLabel?: string;
  roundIndex: number;
  totalScore: number;
  bingoCard: BingoCard;
  ballPool: number[];
  completedLines: Line[];
  wordRoundResults: WordRoundResult[];
  activeWordRound: ActiveWordRound | null;
  bonusRound: BonusRoundState | null;
  bonusLocked?: boolean;
  bonusProgress?: BonusProgress | null;
};

export type GameSessionConfig = {
  gridNumbers: number[][];
  preMarkedNumbers: number[];
  initialBallPool: number[];
  wordRoundConfigs: WordRoundConfig[];
  bonusWord: string;
  phaseSequence: PhaseDefinition[];
  bonusUnlock?: {
    minScore?: number;
    minCorrectWords?: number;
  };
};

export type GameSession = {
  appState: AppGameState;
  config: GameSessionConfig;
  phaseIndex: number;
};
