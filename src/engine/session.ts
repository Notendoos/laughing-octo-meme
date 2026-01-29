import {
  AppGameState,
  BonusRoundState,
  GameSession,
  GameSessionConfig,
  GuessResult,
  WordRoundResult,
} from "./types";
import {
  createBingoCard,
  createBonusRoundState,
  initializeWordRound,
  processWordGuess,
  updateWordRoundElapsed,
} from "./engine";

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

const buildInitialAppState = (config: GameSessionConfig): AppGameState => {
  const initialPhase = config.phaseSequence[0];

  return {
    phaseId: initialPhase?.id ?? "setup",
    phaseKind: initialPhase?.kind ?? "SETUP",
    phaseLabel: initialPhase?.label,
    roundIndex: 0,
    totalScore: 0,
    bingoCard: createBingoCard(config.gridNumbers, config.preMarkedNumbers),
    ballPool: config.initialBallPool.filter(
      (ball) => !config.preMarkedNumbers.includes(ball)
    ),
    completedLines: [],
    wordRoundResults: [],
    activeWordRound: null,
    bonusRound: null,
  };
};

const applyPhaseDefinition = (
  session: GameSession,
  phaseIndex: number
): GameSession => {
  const nextDefinition = session.config.phaseSequence[phaseIndex];

  if (!nextDefinition) {
    return session;
  }

  let activeWordRound = null;
  let bonusRound: BonusRoundState | null = session.appState.bonusRound;
  let roundIndex = session.appState.roundIndex;

  if (nextDefinition.kind === "WORD_ROUND") {
    const configIndex = nextDefinition.wordRoundConfigIndex;
    const roundConfig = session.config.wordRoundConfigs[configIndex];
    activeWordRound = initializeWordRound(roundConfig);
    roundIndex = configIndex + 1;
  } else if (nextDefinition.kind === "BONUS_WORD") {
    bonusRound = createBonusRoundState(
      session.config.bonusWord,
      session.appState.wordRoundResults
    );
  } else if (nextDefinition.kind === "SETUP") {
    activeWordRound = null;
    bonusRound = null;
    roundIndex = 0;
  } else if (nextDefinition.kind === "BALL_DRAW") {
    activeWordRound = null;
  }

  return {
    ...session,
    phaseIndex,
    appState: {
      ...session.appState,
      phaseId: nextDefinition.id,
      phaseKind: nextDefinition.kind,
      phaseLabel: nextDefinition.label,
      activeWordRound,
      bonusRound,
      roundIndex,
    },
  };
};

export const createGameSession = (config: GameSessionConfig): GameSession => {
  if (config.phaseSequence.length === 0) {
    throw new Error("phaseSequence must include at least one phase definition");
  }

  const session: GameSession = {
    appState: buildInitialAppState(config),
    config,
    phaseIndex: 0,
  };

  return applyPhaseDefinition(session, 0);
};

export const advancePhase = (session: GameSession): GameSession => {
  if (session.config.phaseSequence.length === 0) {
    return session;
  }

  const nextIndex = Math.min(
    session.phaseIndex + 1,
    session.config.phaseSequence.length - 1
  );

  if (nextIndex === session.phaseIndex) {
    return session;
  }

  return applyPhaseDefinition(session, nextIndex);
};

const transitionAfterWordRound = (
  session: GameSession,
  roundResult: WordRoundResult
): GameSession => {
  const updatedSession: GameSession = {
    ...session,
    appState: {
      ...session.appState,
      activeWordRound: null,
      wordRoundResults: [...session.appState.wordRoundResults, roundResult],
    },
  };

  return advancePhase(updatedSession);
};

export const handleWordGuess = (
  session: GameSession,
  guess: string,
  timestampMs: number
): WordRoundUpdate => {
  const { appState } = session;

  if (
    appState.phaseKind !== "WORD_ROUND" ||
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
    updatedSession = transitionAfterWordRound(updatedSession, result.roundEnded);
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

  if (appState.phaseKind !== "WORD_ROUND" || !appState.activeWordRound) {
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
    updatedSession = transitionAfterWordRound(updatedSession, update.result);
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
  if (session.appState.phaseKind !== "BALL_DRAW") {
    return session;
  }

  return advancePhase(session);
};

export const applyBonusGuess = (
  session: GameSession,
  guess: string,
  timestampMs: number
): { session: GameSession; event?: BonusRoundEvent } => {
  const { appState } = session;

  if (appState.phaseKind !== "BONUS_WORD" || !appState.bonusRound) {
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

    const finishedSession = advancePhase({
      ...session,
      appState: updatedState,
    });

    return {
      session: finishedSession,
      event: {
        type: "GUESS",
        guessResult,
        solved: true,
        scoreDelta: 500,
      },
    };
  }

  const baseSession: GameSession = {
    ...session,
    appState: updatedState,
  };

  if (updatedAttempts >= updatedRound.maxAttempts) {
    const finishedSession = advancePhase(baseSession);

    return {
      session: finishedSession,
      event: {
        type: "FAILED",
        attemptsUsed: updatedAttempts,
        guessResult,
      },
    };
  }

  return {
    session: baseSession,
    event: {
      type: "GUESS",
      guessResult,
      solved: false,
      scoreDelta: 0,
    },
  };
};
