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
      metadata?: Record<string, unknown>;
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
};

export type GameSessionConfig = {
  gridNumbers: number[][];
  preMarkedNumbers: number[];
  initialBallPool: number[];
  wordRoundConfigs: WordRoundConfig[];
  bonusWord: string;
  phaseSequence: PhaseDefinition[];
};

export type GameSession = {
  appState: AppGameState;
  config: GameSessionConfig;
  phaseIndex: number;
};
