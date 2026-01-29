"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { drawBalls } from "../engine/engine";
import {
  applyBonusGuess,
  completeBallDraw,
  createGameSession,
  GameSession,
  GameSessionConfig,
  handleWordGuess,
  startNextWordRound,
  updateElapsedTime,
  WordRoundEvent,
  WordRoundUpdate,
} from "../engine/session";
import { Line } from "../engine/types";
import wordLists from "../data/word-lists.json";
import { gsap } from "gsap";

const GRID_NUMBERS = Array.from({ length: 5 }, (_, row) =>
  Array.from({ length: 5 }, (_, col) => row * 5 + col + 1)
);

const FIVE_LETTER_WORDS = wordLists.fiveLetter;
const TEN_LETTER_WORDS = wordLists.tenLetter;
const WORDS_PER_ROUND = 3;
const ROUND_TIME_WINDOWS = [8_000, 9_000, 10_000];

const getWordQueueForRound = (roundIndex: number): string[] => {
  const startIndex = (roundIndex * WORDS_PER_ROUND) % FIVE_LETTER_WORDS.length;
  return Array.from({ length: WORDS_PER_ROUND }, (_, offset) => {
    const idx = (startIndex + offset) % FIVE_LETTER_WORDS.length;
    return FIVE_LETTER_WORDS[idx];
  });
};

const ROUND_CONFIGS = ROUND_TIME_WINDOWS.map((timeLimitMs, index) => ({
  timeLimitMs,
  wordLength: 5,
  maxAttemptsPerWord: 2,
  wordQueue: getWordQueueForRound(index),
}));

const CONFIG: GameSessionConfig = {
  gridNumbers: GRID_NUMBERS,
  preMarkedNumbers: [2, 6, 9, 11, 13, 17, 20, 24],
  initialBallPool: Array.from({ length: 75 }, (_, index) => index + 1),
  wordRoundConfigs: ROUND_CONFIGS,
  bonusWord: TEN_LETTER_WORDS[0],
};

type BallDrawReport = {
  drawnNumbers: number[];
  lines: Line[];
  scoreDelta: number;
};

const formatMs = (ms: number) => `${Math.max(0, Math.ceil(ms / 1000))}s`;

export default function Page() {
  const [session, setSession] = useState<GameSession>(() =>
    createGameSession(CONFIG)
  );
  const [currentGuess, setCurrentGuess] = useState("");
  const [bonusGuess, setBonusGuess] = useState("");
  const [bonusMessage, setBonusMessage] = useState("");
  const [wordRoundEvent, setWordRoundEvent] = useState<WordRoundEvent | null>(
    null
  );
  const [ballDrawReport, setBallDrawReport] = useState<BallDrawReport | null>(
    null
  );

  const sessionRef = useRef(session);

  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  const resetSession = () => {
    setSession(createGameSession(CONFIG));
    setWordRoundEvent(null);
    setBallDrawReport(null);
    setBonusMessage("");
    setCurrentGuess("");
    setBonusGuess("");
  };

  const finalizeBallDraw = useCallback(
    (candidate: GameSession, event: WordRoundEvent): GameSession => {
      const drawResult = drawBalls(candidate.appState, event.ballsToDraw);
      setBallDrawReport({
        drawnNumbers: drawResult.drawnNumbers,
        lines: drawResult.newLines,
        scoreDelta: drawResult.scoreDelta,
      });
      return completeBallDraw({
        ...candidate,
        appState: drawResult.state,
      });
    },
    [setBallDrawReport]
  );

  const applyWordRoundUpdate = useCallback(
    (update: WordRoundUpdate) => {
      if (update.event?.type === "COMPLETE") {
        setWordRoundEvent(update.event);
        const finished = finalizeBallDraw(update.session, update.event);
        setSession(finished);
        return;
      }

      if (update.event) {
        setWordRoundEvent(update.event);
      }

      setSession(update.session);
    },
    [finalizeBallDraw]
  );

  useEffect(() => {
    if (session.appState.phase !== "WORD_ROUND") {
      return;
    }

    if (!session.appState.activeWordRound) {
      return;
    }

    let rafId: number;
    let lastTimestamp = performance.now();

    const step = (timestamp: number) => {
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      const current = sessionRef.current;
      if (current.appState.phase !== "WORD_ROUND") {
        return;
      }

      const active = current.appState.activeWordRound;
      if (!active) {
        return;
      }

      const targetElapsed = active.elapsedMs + delta;
      const update = updateElapsedTime(
        current,
        targetElapsed,
        current.appState.roundIndex
      );
      applyWordRoundUpdate(update);

      if (update.event?.type !== "COMPLETE") {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [session.appState.phase, session.appState.roundIndex, applyWordRoundUpdate]);

  useEffect(() => {
    if (!ballDrawReport) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ball-chip",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.08,
          duration: 0.35,
          ease: "back.out(1.7)",
        }
      );
    });

    return () => ctx.revert();
  }, [ballDrawReport]);

  const handleSubmitGuess = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentGuess.trim()) {
      return;
    }

    const update = handleWordGuess(
      session,
      currentGuess,
      performance.now()
    );
    applyWordRoundUpdate(update);
    setCurrentGuess("");
  };

  const handleBonusSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!bonusGuess.trim()) {
      return;
    }

    const result = applyBonusGuess(session, bonusGuess, performance.now());
    let nextSession = result.session;

    if (result.event?.type === "GUESS" && result.event.solved) {
      setBonusMessage("Bonus word solved! +500 points");
      nextSession = {
        ...result.session,
        appState: {
          ...result.session.appState,
          phase: "GAME_OVER",
        },
      };
    } else if (result.event?.type === "FAILED") {
      setBonusMessage("Bonus word missed. Game over.");
      nextSession = {
        ...result.session,
        appState: {
          ...result.session.appState,
          phase: "GAME_OVER",
        },
      };
    } else {
      setBonusMessage(`Attempts ${result.session.appState.bonusRound?.attemptsUsed ?? 0}/${result.session.appState.bonusRound?.maxAttempts ?? 0}`);
    }

    setSession(nextSession);
    setBonusGuess("");
  };

  const startGame = () => {
    setWordRoundEvent(null);
    setBallDrawReport(null);
    setSession((current) => startNextWordRound(current));
  };

  const activeRound = session.appState.activeWordRound;
  const phase = session.appState.phase;

  const timerProgress =
    activeRound && activeRound.timeLimitMs > 0
      ? Math.min(100, (activeRound.elapsedMs / activeRound.timeLimitMs) * 100)
      : 0;

  const remainingTime = activeRound
    ? Math.max(0, activeRound.timeLimitMs - activeRound.elapsedMs)
    : 0;

  const bonusRound = session.appState.bonusRound;

  return (
    <div className="app-shell">
      <header className="card">
        <div className="scoreboard">
          <div className="score-slot">
            <p>Phase</p>
            <strong>{phase}</strong>
          </div>
          <div className="score-slot">
            <p>Round</p>
            <strong>
              {phase === "BONUS_WORD"
                ? "Bonus"
                : phase === "GAME_OVER"
                ? "Completed"
                : session.appState.roundIndex}
            </strong>
          </div>
          <div className="score-slot">
            <p>Total Score</p>
            <strong>{session.appState.totalScore}</strong>
          </div>
          <div className="score-slot">
            <p>Ball Pool</p>
            <strong>{session.appState.ballPool.length}</strong>
          </div>
          <div className="score-slot">
            <p>Lines Scored</p>
            <strong>{session.appState.completedLines.length}</strong>
          </div>
        </div>
      </header>

      <section className="card panel-grid">
        <div>
          <h2>Word Round</h2>
          {phase === "SETUP" && (
            <button onClick={startGame}>Start Round 1</button>
          )}
          {phase === "WORD_ROUND" && activeRound && (
            <>
              <div className="progress-track">
                <div
                  className="progress-bar"
                  style={{ width: `${timerProgress}%` }}
                />
              </div>
              <p>Time left: {formatMs(remainingTime)}</p>
              <p>
                Correct this round: <strong>{activeRound.correctWordCount}</strong>
              </p>
              {wordRoundEvent?.type === "CONTINUE" && (
                <p>
                  Last guess: {wordRoundEvent.guessResult.guess}{" "}
                  {wordRoundEvent.guessResult.isCorrect ? "✅" : "❌"}
                </p>
              )}
              <form className="guess-form" onSubmit={handleSubmitGuess}>
                <label htmlFor="word-guess" className="sr-only">
                  Guess a word
                </label>
                <input
                  id="word-guess"
                  value={currentGuess}
                  onChange={(event) => setCurrentGuess(event.target.value)}
                  placeholder="Guess the word"
                  autoComplete="off"
                />
                <button type="submit">Submit</button>
              </form>
              <p>Queue remaining: {activeRound.wordQueue.length}</p>
            </>
          )}
          {phase === "BALL_DRAW" && ballDrawReport && (
            <>
              <p>Ball draw in progress…</p>
              <div className="ball-draw-list">
                {ballDrawReport.drawnNumbers.map((ball) => (
                  <span key={ball} className="ball-chip">
                    {ball}
                  </span>
                ))}
              </div>
              <p>Lines completed: {ballDrawReport.lines.length}</p>
            </>
          )}
        </div>
        <div>
          <h2>Bingo Board</h2>
          <div className="bingo-grid">
            {session.appState.bingoCard.flatMap((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`bingo-cell ${cell.marked ? "marked" : ""}`}
                >
                  {cell.number}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="card">
        {ballDrawReport && (
          <div>
            <h3>Last Draw</h3>
            <p>
              Balls drawn: {ballDrawReport.drawnNumbers.length} · Score +{" "}
              {ballDrawReport.scoreDelta}
            </p>
            {ballDrawReport.lines.length > 0 ? (
              <ul>
                {ballDrawReport.lines.map((line) => (
                  <li key={line.id}>{line.id}</li>
                ))}
              </ul>
            ) : (
              <p>No new lines this draw.</p>
            )}
          </div>
        )}
      </section>

      <section className="card">
        {phase === "BONUS_WORD" && bonusRound ? (
          <div className="bonus-section">
            <h2>Bonus Round</h2>
            <p>
              Word length: <strong>10</strong> · Attempts:{" "}
              <strong>
                {bonusRound.attemptsUsed}/{bonusRound.maxAttempts}
              </strong>
            </p>
            <form onSubmit={handleBonusSubmit}>
              <label htmlFor="bonus-guess" className="sr-only">
                Enter the bonus word
              </label>
              <input
                id="bonus-guess"
                value={bonusGuess}
                onChange={(event) => setBonusGuess(event.target.value)}
                placeholder="Type the bonus word"
                autoComplete="off"
              />
              <button type="submit" disabled={!bonusGuess.trim()}>
                Submit
              </button>
            </form>
            <p>{bonusMessage}</p>
            {bonusRound.guesses.length > 0 && (
              <ul>
                {bonusRound.guesses.map((guess, index) => (
                  <li key={`${guess.guess}-${index}`}>
                    {guess.guess} · {guess.isCorrect ? "✅" : "❌"}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : phase === "GAME_OVER" ? (
          <div className="game-over">
            <h2>Game Over</h2>
            <p>Total Score: {session.appState.totalScore}</p>
            <button onClick={resetSession}>Play again</button>
          </div>
        ) : (
          <p>Complete the word rounds to unlock the 10-letter bonus.</p>
        )}
      </section>
    </div>
  );
}
