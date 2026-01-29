import {
  AppGameState,
  BonusRoundState,
  GuessResult,
  WordRoundConfig,
  WordRoundResult,
} from "./types";
import {
  createBingoCard,
  createBonusRoundState,
  initializeWordRound,
  processWordGuess,
  updateWordRoundElapsed,
} from "./engine";

export type GameSessionConfig = {
  gridNumbers: number[][];
  preMarkedNumbers: number[];
  initialBallPool: number[];
  wordRoundConfigs: WordRoundConfig[];
  bonusWord: string;
};

export type GameSession = {
  appState: AppGameState;
  config: GameSessionConfig;
  nextWordRoundPointer: number;
};

export type WordRoundEvent =
  | {
      type: "CONTINUE";
      guessResult: GuessResult;
    }
  | {
      type: "COMPLETE";
      roundResult: WordRoundResult;
      ballsToDraw: number;
      guessResult?: GuessResult;
    };

export type WordRoundUpdate = {
  session: GameSession;
  event?: WordRoundEvent;
};

export type BonusRoundEvent =
  | {
      type: "GUESS";
      guessResult: GuessResult;
      solved: boolean;
      scoreDelta: number;
    }
  | {
      type: "FAILED";
      attemptsUsed: number;
      guessResult: GuessResult;
    };

const filterBallPool = (pool: number[], preMarked: number[]): number[] =>
  pool.filter((ball) => !preMarked.includes(ball));

const buildInitialAppState = (
  config: GameSessionConfig
): AppGameState => ({
  phase: "SETUP",
  roundIndex: 1,
  totalScore: 0,
  bingoCard: createBingoCard(config.gridNumbers, config.preMarkedNumbers),
  ballPool: filterBallPool(config.initialBallPool, config.preMarkedNumbers),
  completedLines: [],
  wordRoundResults: [],
  activeWordRound: null,
  bonusRound: null,
});

export const createGameSession = (config: GameSessionConfig): GameSession => ({
  appState: buildInitialAppState(config),
  config,
  nextWordRoundPointer: 0,
});

export const startNextWordRound = (
  session: GameSession
): GameSession => {
  if (session.nextWordRoundPointer >= session.config.wordRoundConfigs.length) {
    return session;
  }

  const nextConfig =
    session.config.wordRoundConfigs[session.nextWordRoundPointer];
  const activeWordRound = initializeWordRound(nextConfig);

  return {
    ...session,
    nextWordRoundPointer: session.nextWordRoundPointer + 1,
    appState: {
      ...session.appState,
      phase: "WORD_ROUND",
      roundIndex: session.nextWordRoundPointer + 1,
      activeWordRound,
    },
  };
};

const transitionToBallDraw = (
  session: GameSession,
  roundResult: WordRoundResult
): GameSession => {
  return {
    ...session,
    appState: {
      ...session.appState,
      phase: "BALL_DRAW",
      activeWordRound: null,
      wordRoundResults: [...session.appState.wordRoundResults, roundResult],
    },
  };
};

export const handleWordGuess = (
  session: GameSession,
  guess: string,
  timestampMs: number
): WordRoundUpdate => {
  const { appState } = session;
  if (
    appState.phase !== "WORD_ROUND" ||
    !appState.activeWordRound ||
    appState.activeWordRound.timeLimitMs <= appState.activeWordRound.elapsedMs
  ) {
    return { session };
  }

  const result = processWordGuess(
    appState.activeWordRound,
    guess,
    timestampMs,
    appState.roundIndex
  );

  let updatedSession: GameSession = {
    ...session,
    appState: {
      ...appState,
      activeWordRound: result.round,
    },
  };

  if (result.roundEnded) {
    updatedSession = transitionToBallDraw(updatedSession, result.roundEnded);
    updatedSession.appState.totalScore += 0;
    const ballsToDraw = 2 + result.roundEnded.correctWords;

    return {
      session: updatedSession,
      event: {
        type: "COMPLETE",
        roundResult: result.roundEnded,
        ballsToDraw,
        guessResult: result.guessResult,
      },
    };
  }

  return {
    session: updatedSession,
    event: {
      type: "CONTINUE",
      guessResult: result.guessResult,
    },
  };
};

export const updateElapsedTime = (
  session: GameSession,
  elapsedMs: number
): WordRoundUpdate => {
  const { appState } = session;
  if (appState.phase !== "WORD_ROUND" || !appState.activeWordRound) {
    return { session };
  }

  const update = updateWordRoundElapsed(
    appState.activeWordRound,
    elapsedMs,
    appState.roundIndex
  );

  let updatedSession: GameSession = {
    ...session,
    appState: {
      ...appState,
      activeWordRound: update.round,
    },
  };

  if (update.finished && update.result) {
    updatedSession = transitionToBallDraw(updatedSession, update.result);
    const ballsToDraw = 2 + update.result.correctWords;

    return {
      session: updatedSession,
      event: {
        type: "COMPLETE",
        roundResult: update.result,
        ballsToDraw,
      },
    };
  }

  return { session: updatedSession };
};

export const completeBallDraw = (session: GameSession): GameSession => {
  if (session.appState.phase !== "BALL_DRAW") {
    return session;
  }

  const hasMoreWordRounds =
    session.nextWordRoundPointer < session.config.wordRoundConfigs.length;

  if (hasMoreWordRounds) {
    return startNextWordRound(session);
  }

  return {
    ...session,
    appState: {
      ...session.appState,
      phase: "BONUS_WORD",
      bonusRound: createBonusRoundState(
        session.config.bonusWord,
        session.appState.wordRoundResults
      ),
    },
  };
};

export const applyBonusGuess = (
  session: GameSession,
  guess: string,
  timestampMs: number
): { session: GameSession; event?: BonusRoundEvent } => {
  const { appState } = session;
  if (appState.phase !== "BONUS_WORD" || !appState.bonusRound) {
    return { session };
  }

  const normalizedGuess = guess.trim().toLowerCase();
  const normalizedTarget = appState.bonusRound.targetWord.toLowerCase();
  const isCorrect = normalizedGuess === normalizedTarget;

  const updatedAttempts = appState.bonusRound.attemptsUsed + 1;
  const updatedRound: BonusRoundState = {
    ...appState.bonusRound,
    attemptsUsed: updatedAttempts,
    guesses: [
      ...appState.bonusRound.guesses,
      {
        guess,
        isCorrect,
        timestampMs,
      },
    ],
    solved: isCorrect,
  };

  let updatedState: AppGameState = {
    ...appState,
    bonusRound: updatedRound,
  };

  const guessResult: GuessResult = {
    guess,
    isCorrect,
    timestampMs,
  };

  if (isCorrect) {
    updatedState = {
      ...updatedState,
      totalScore: updatedState.totalScore + 500,
    };

    return {
      session: {
        ...session,
        appState: updatedState,
      },
      event: {
        type: "GUESS",
        guessResult,
        solved: true,
        scoreDelta: 500,
      },
    };
  }

  const event: BonusRoundEvent = updatedAttempts >= updatedRound.maxAttempts
    ? {
        type: "FAILED",
        attemptsUsed: updatedAttempts,
        guessResult,
      }
    : {
        type: "GUESS",
        guessResult,
        solved: false,
        scoreDelta: 0,
      };

  return {
    session: {
      ...session,
      appState: updatedState,
    },
    event,
  };
};
