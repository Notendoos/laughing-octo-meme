import { describe, expect, it } from "vitest";
import {
  applyBonusGuess,
  completeBallDraw,
  createGameSession,
  handleWordGuess,
  startNextWordRound,
} from "../src/engine/session";

const buildConfig = () => ({
  gridNumbers: Array.from({ length: 5 }, (_, row) =>
    Array.from({ length: 5 }, (_, col) => row * 5 + col + 1)
  ),
  preMarkedNumbers: [],
  initialBallPool: Array.from({ length: 20 }, (_, index) => index + 1),
  wordRoundConfigs: [
    {
      timeLimitMs: 5_000,
      wordLength: 5,
      maxAttemptsPerWord: 2,
      wordQueue: ["alpha"],
    },
    {
      timeLimitMs: 5_000,
      wordLength: 5,
      maxAttemptsPerWord: 2,
      wordQueue: ["bravo"],
    },
    {
      timeLimitMs: 5_000,
      wordLength: 5,
      maxAttemptsPerWord: 2,
      wordQueue: ["charlie"],
    },
  ],
  bonusWord: "handshake",
});

describe("Game session controller", () => {
  it("starts a word round and updates the round index", () => {
    const session = createGameSession(buildConfig());
    const running = startNextWordRound(session);

    expect(running.appState.phase).toBe("WORD_ROUND");
    expect(running.appState.roundIndex).toBe(1);
    expect(running.appState.activeWordRound).not.toBeNull();
  });

  it("transitions from word round to ball draw after a correct guess", () => {
    const session = startNextWordRound(createGameSession(buildConfig()));
    const result = handleWordGuess(session, "alpha", 100, 1);

    expect(result.session.appState.phase).toBe("BALL_DRAW");
    expect(result.event?.type).toBe("COMPLETE");
    expect(result.event?.ballsToDraw).toBe(3);
  });

  it("starts the next word round after ball draw completes", () => {
    const initialSession = startNextWordRound(createGameSession(buildConfig()));
    const firstComplete = handleWordGuess(initialSession, "alpha", 100, 1);
    const ballDrawPhase = firstComplete.session;
    const nextSession = completeBallDraw(ballDrawPhase);

    expect(nextSession.appState.phase).toBe("WORD_ROUND");
    expect(nextSession.appState.roundIndex).toBe(2);
    expect(nextSession.appState.activeWordRound).not.toBeNull();
  });

  it("moves to bonus round after third round ball draw", () => {
    const config = buildConfig();
    let session = startNextWordRound(createGameSession(config));

    session = handleWordGuess(session, "alpha", 100, 1).session;
    session = completeBallDraw(session);

    session = handleWordGuess(session, "bravo", 200, 2).session;
    session = completeBallDraw(session);

    session = handleWordGuess(session, "charlie", 300, 3).session;
    session = completeBallDraw(session);

    expect(session.appState.phase).toBe("BONUS_WORD");
    expect(session.appState.bonusRound).not.toBeNull();
    expect(session.appState.bonusRound?.maxAttempts).toBeGreaterThan(6);
  });

  it("records a solved bonus guess and awards points", () => {
    const config = buildConfig();
    let session = startNextWordRound(createGameSession(config));
    session = handleWordGuess(session, "alpha", 100, 1).session;
    session = completeBallDraw(session);
    session = handleWordGuess(session, "bravo", 200, 2).session;
    session = completeBallDraw(session);
    session = handleWordGuess(session, "charlie", 300, 3).session;
    session = completeBallDraw(session);

    const bonusResult = applyBonusGuess(session, "handshake", 400);

    expect(bonusResult.event?.solved).toBe(true);
    expect(bonusResult.session.appState.totalScore).toBe(500);
  });
});
