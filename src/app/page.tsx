"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactElement,
} from "react";
import { gsap } from "gsap";
import {
  applyDrawNumbers,
  drawBalls,
  createBingoCard,
  TOTAL_BINGO_LINES,
} from "../engine/engine.ts";
import {
  applyBonusGuess,
  advancePhase,
  completeBallDraw,
  createGameSession,
  handleWordGuess,
  updateElapsedTime,
  WordRoundEvent,
  WordRoundUpdate,
} from "../engine/session.ts";
import type { GameSession, GameSessionConfig } from "../engine/types.ts";
import BallDrawPanel, {
  BallDrawReport,
} from "../components/BallDrawPanel/BallDrawPanel.tsx";
import BonusPanel from "../components/BonusPanel/BonusPanel.tsx";
import BingoGrid from "../components/BingoGrid/BingoGrid.tsx";
import Scoreboard from "../components/Scoreboard/Scoreboard.tsx";
import WordRoundPanel from "../components/WordRoundPanel/WordRoundPanel.tsx";
import { SettingsModal } from "../components/SettingsModal/SettingsModal.tsx";
import { TimerDisplay } from "../components/TimerDisplay/TimerDisplay.tsx";
import { Settings as SettingsIcon } from "lucide-react";
import { Button } from "../components/ui/Button/Button.tsx";
import { buildRoundQueue, sampleBonusWord } from "../utils/word-queue.ts";
import { readBestScore, writeBestScore } from "../utils/local-store.ts";
import * as styles from "./page.css.ts";
import { chromaVariants, DEFAULT_THEME, ThemeKey } from "../styles/theme.css.ts";

const GRID_NUMBERS = Array.from({ length: 5 }, (_, row) =>
  Array.from({ length: 5 }, (_, col) => row * 5 + col + 1)
);

const DEFAULT_WORD_ROUND_SECONDS = 60;
const MIN_WORD_ROUND_SECONDS = 5;
const MAX_WORD_ROUND_SECONDS = 90;
const WORDS_PER_ROUND = 3;

const PRE_MARKED_NUMBERS: number[] = [];
const INITIAL_DRAW_COUNT = 8;
const THEME_STORAGE_KEY = "wordingo-theme";

const waitMs = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const shuffleArray = <T,>(items: T[]): T[] => {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const createRandomBallPool = (): number[] => {
  const pool = Array.from({ length: 75 }, (_, index) => index + 1);
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
};

// const waitMs = (ms: number): Promise<void> =>
//   new Promise((resolve) => setTimeout(resolve, ms));

const PHASE_SEQUENCE: GameSessionConfig["phaseSequence"] = [
  { id: "setup", kind: "SETUP", label: "Setup" },
  { id: "word-round-1", kind: "WORD_ROUND", wordRoundConfigIndex: 0, label: "Word Round 1" },
  { id: "ball-draw-1", kind: "BALL_DRAW", label: "Ball Draw 1" },
  { id: "trivia-break-1", kind: "CUSTOM", label: "Trivia Break" },
  { id: "word-round-2", kind: "WORD_ROUND", wordRoundConfigIndex: 1, label: "Word Round 2" },
  { id: "ball-draw-2", kind: "BALL_DRAW", label: "Ball Draw 2" },
  { id: "trivia-break-2", kind: "CUSTOM", label: "Quick Fire" },
  { id: "word-round-3", kind: "WORD_ROUND", wordRoundConfigIndex: 2, label: "Word Round 3" },
  { id: "ball-draw-3", kind: "BALL_DRAW", label: "Ball Draw 3" },
  { id: "bonus", kind: "BONUS_WORD", label: "Bonus Round" },
  { id: "game-over", kind: "GAME_OVER", label: "Game Over" },
];

const buildWordRoundConfigs = (baseSeconds: number) => {
  const clampedSeconds = Math.max(
    MIN_WORD_ROUND_SECONDS,
    Math.min(MAX_WORD_ROUND_SECONDS, baseSeconds)
  );
  const timeWindows = [0, 1, 2].map((offset) =>
    Math.min(clampedSeconds + offset, MAX_WORD_ROUND_SECONDS) * 1_000
  );

  return timeWindows.map((timeLimitMs, index) => ({
    timeLimitMs,
    wordLength: 5,
    maxAttemptsPerWord: 5,
    wordQueue: buildRoundQueue(index, WORDS_PER_ROUND),
  }));
};

const createSessionConfig = (baseSeconds: number): GameSessionConfig => ({
  gridNumbers: GRID_NUMBERS,
  preMarkedNumbers: PRE_MARKED_NUMBERS,
  initialBallPool: Array.from({ length: 75 }, (_, index) => index + 1),
  wordRoundConfigs: buildWordRoundConfigs(baseSeconds),
  phaseSequence: PHASE_SEQUENCE,
  bonusWord: sampleBonusWord(),
});

export default function Page(): ReactElement {
  const initialSessionConfig = createSessionConfig(DEFAULT_WORD_ROUND_SECONDS);
const sessionConfigRef = useRef(initialSessionConfig);
const [wordRoundSeconds, setWordRoundSeconds] = useState(
  DEFAULT_WORD_ROUND_SECONDS
);
const [session, setSession] = useState<GameSession>(() =>
  createGameSession(initialSessionConfig)
);
const [currentGuess, setCurrentGuess] = useState("");
const [bonusGuess, setBonusGuess] = useState("");
const [bonusMessage, setBonusMessage] = useState("");
const [timerPaused, setTimerPaused] = useState(false);
const [dutchMode, setDutchMode] = useState(false);
const [activeTheme, setActiveTheme] = useState<ThemeKey>(() => {
  if (typeof window === "undefined") {
    return DEFAULT_THEME;
  }
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored && stored in chromaVariants) {
    return stored as ThemeKey;
  }
  return DEFAULT_THEME;
});
const [settingsOpen, setSettingsOpen] = useState(false);
  const [wordRoundEvent, setWordRoundEvent] = useState<WordRoundEvent | null>(
    null
  );
  const [ballDrawReport, setBallDrawReport] = useState<BallDrawReport | null>(
    null
  );
  const [bestScore, setBestScore] = useState(() => readBestScore());
  const [animatedDrawNumbers, setAnimatedDrawNumbers] = useState<number[]>([]);
  const [initialDrawRunning, setInitialDrawRunning] = useState(false);
  const drawAnimationTimers =
    useRef<ReturnType<typeof setTimeout>[]>([]);

  const sessionRef = useRef(session);
  const initialDrawPerformedRef = useRef(false);

  const updateBestScoreIfHigher = useCallback((score: number) => {
    setBestScore((current) => {
      if (score > current) {
        writeBestScore(score);
        return score;
      }
      return current;
    });
  }, []);

  const commitSession = useCallback(
    (nextSession: GameSession) => {
      setSession(nextSession);
      updateBestScoreIfHigher(nextSession.appState.totalScore);
    },
    [updateBestScoreIfHigher],
  );

  const commitSessionUpdate = useCallback(
    (updater: (current: GameSession) => GameSession) => {
      setSession((current) => {
        const next = updater(current);
        updateBestScoreIfHigher(next.appState.totalScore);
        return next;
      });
    },
    [updateBestScoreIfHigher],
  );

  const clearDrawAnimation = useCallback(() => {
    drawAnimationTimers.current.forEach((timer) => clearTimeout(timer));
    drawAnimationTimers.current = [];
  }, []);

  const playDrawAnimation = useCallback(
    (numbers: number[]) => {
      clearDrawAnimation();
      setAnimatedDrawNumbers([]);
      numbers.forEach((value, index) => {
        const timer = window.setTimeout(() => {
          setAnimatedDrawNumbers((current) => [...current, value]);
        }, index * 260);
        drawAnimationTimers.current.push(timer);
      });
    },
    [clearDrawAnimation],
  );

  useEffect(() => {
    return () => {
      clearDrawAnimation();
    };
  }, [clearDrawAnimation]);

  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    document.documentElement.setAttribute("data-theme", activeTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, activeTheme);
  }, [activeTheme]);

  const startInitialDraw = useCallback(async () => {
    if (initialDrawPerformedRef.current) {
      return;
    }
    initialDrawPerformedRef.current = true;
    setInitialDrawRunning(true);

    const currentSession = sessionRef.current;
    const cardNumbers = currentSession.appState.bingoCard.flatMap((row) =>
      row.map((cell) => cell.number)
    );
    const poolSet = new Set(currentSession.appState.ballPool);
    const available = cardNumbers.filter((number) => poolSet.has(number));
    const shuffled = shuffleArray(available);
    const initialDraw = shuffled.slice(0, INITIAL_DRAW_COUNT);
    const drawResult = applyDrawNumbers(currentSession.appState, initialDraw);

    commitSession({
      ...currentSession,
      appState: drawResult.state,
    });
    setBallDrawReport({
      drawnNumbers: drawResult.drawnNumbers,
      lines: drawResult.newLines,
      scoreDelta: drawResult.scoreDelta,
    });
    playDrawAnimation(drawResult.drawnNumbers);

    const totalAnimationMs = Math.max(
      1000,
      drawResult.drawnNumbers.length * 200
    );
    await waitMs(totalAnimationMs);
    clearDrawAnimation();
    setBallDrawReport(null);
    setInitialDrawRunning(false);
    setTimerPaused(false);
    commitSessionUpdate((current) => advancePhase(current));
  }, [
    commitSession,
    commitSessionUpdate,
    playDrawAnimation,
    clearDrawAnimation,
  ]);

  useEffect(() => {
    sessionConfigRef.current = createSessionConfig(wordRoundSeconds);
  }, [wordRoundSeconds]);

  const resetSession = () => {
    commitSession(createGameSession(sessionConfigRef.current));
    setWordRoundEvent(null);
    clearDrawAnimation();
    setBallDrawReport(null);
    setBonusMessage("");
    setCurrentGuess("");
    setBonusGuess("");
    setTimerPaused(false);
    initialDrawPerformedRef.current = false;
    setInitialDrawRunning(false);
  };

  const resetBingoBoard = useCallback(() => {
    const newPool = createRandomBallPool();
    const newCard = createBingoCard(GRID_NUMBERS, PRE_MARKED_NUMBERS);
    commitSessionUpdate((current) => ({
      ...current,
      appState: {
        ...current.appState,
        bingoCard: newCard,
        ballPool: newPool,
        completedLines: [],
      },
    }));
    clearDrawAnimation();
    setBallDrawReport(null);
    initialDrawPerformedRef.current = false;
  }, [commitSessionUpdate, clearDrawAnimation]);

  const finalizeBallDraw = useCallback(
    (candidate: GameSession, event: WordRoundEvent): GameSession => {
      if (event.type !== "COMPLETE") {
        return candidate;
      }

      const drawResult = drawBalls(candidate.appState, event.ballsToDraw);
      setBallDrawReport({
        drawnNumbers: drawResult.drawnNumbers,
        lines: drawResult.newLines,
        scoreDelta: drawResult.scoreDelta,
      });
      playDrawAnimation(drawResult.drawnNumbers);
      return completeBallDraw({
        ...candidate,
        appState: drawResult.state,
      });
    },
    [playDrawAnimation, setBallDrawReport]
  );

  const applyWordRoundUpdate = useCallback(
    (update: WordRoundUpdate) => {
      if (update.event?.type === "COMPLETE") {
        setWordRoundEvent(update.event);
        const finished = finalizeBallDraw(update.session, update.event);
        commitSession(finished);
        return;
      }

      if (update.event) {
        setWordRoundEvent(update.event);
      }

      commitSession(update.session);
    },
    [finalizeBallDraw, commitSession]
  );

  useEffect(() => {
    if (timerPaused || session.appState.phaseKind !== "WORD_ROUND") {
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
      if (current.appState.phaseKind !== "WORD_ROUND") {
        return;
      }

      const active = current.appState.activeWordRound;
      if (!active) {
        return;
      }

      const targetElapsed = active.elapsedMs + delta;
      const update = updateElapsedTime(current, targetElapsed);
      applyWordRoundUpdate(update);

      if (update.event?.type !== "COMPLETE") {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [
    session.appState.phaseKind,
    session.appState.roundIndex,
    session.appState.activeWordRound,
    applyWordRoundUpdate,
    timerPaused,
  ]);

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

  const handleSubmitGuess = () => {
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
          phaseKind: "GAME_OVER",
          phaseLabel: "Game Over",
        },
      };
    } else if (result.event?.type === "FAILED") {
      setBonusMessage("Bonus word missed. Game over.");
      nextSession = {
        ...result.session,
        appState: {
          ...result.session.appState,
          phaseKind: "GAME_OVER",
          phaseLabel: "Game Over",
        },
      };
    } else {
      setBonusMessage(
        `Attempts ${result.session.appState.bonusRound?.attemptsUsed ?? 0}/${result.session.appState.bonusRound?.maxAttempts ?? 0}`
      );
    }

    commitSession(nextSession);
    setBonusGuess("");
  };

  const startGame = () => {
    setWordRoundEvent(null);
    setBallDrawReport(null);
    setTimerPaused(true);
    startInitialDraw();
  };

  const toggleTimerPause = () => {
    if (phaseKind !== "WORD_ROUND") {
      return;
    }
    setTimerPaused((prev) => !prev);
  };

  const activeRound = session.appState.activeWordRound;
  const phaseKind = session.appState.phaseKind;
  const phaseLabel = session.appState.phaseLabel ?? phaseKind;

  const timerProgress =
    activeRound && activeRound.timeLimitMs > 0
      ? Math.min(100, (activeRound.elapsedMs / activeRound.timeLimitMs) * 100)
      : 0;

  const remainingTime = activeRound
    ? Math.max(0, activeRound.timeLimitMs - activeRound.elapsedMs)
    : 0;

  const bonusRound = session.appState.bonusRound;
  const roundDisplay =
    phaseKind === "BONUS_WORD"
      ? "Bonus"
      : phaseKind === "GAME_OVER"
      ? "Completed"
      : session.appState.roundIndex;
  const timerStatusText =
    phaseKind === "WORD_ROUND"
      ? timerPaused
        ? "Timer paused"
        : "Timer running"
      : "Timer idle";
  const roundDurations = `${wordRoundSeconds}s / ${wordRoundSeconds + 1}s / ${
    wordRoundSeconds + 2
  }s`;
  const completedLineCount = session.appState.completedLines.length;
  const hasBingo = completedLineCount > 0;
  const bingoExhausted = completedLineCount >= TOTAL_BINGO_LINES;

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerPanel}>
          <Scoreboard
            phaseLabel={phaseLabel}
            roundLabel={roundDisplay}
            totalScore={session.appState.totalScore}
            ballPoolCount={session.appState.ballPool.length}
            linesCompleted={session.appState.completedLines.length}
            bestScore={bestScore}
          />
        </div>
        <div className={styles.headerActions}>
          <div className={styles.timerWrapper}>
            <TimerDisplay
              remainingMs={remainingTime}
              onToggle={toggleTimerPause}
              paused={timerPaused}
            />
          </div>
          <div className={styles.settingsRow}>
            <Button variant="ghost" onClick={() => setSettingsOpen(true)}>
              <SettingsIcon size={16} />
              Settings
            </Button>
            <Button variant="ghost" onClick={resetSession}>
              Reset
            </Button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={`${styles.panel} ${styles.primaryPanel}`}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelLabel}>Word Round</p>
              <h2 className={styles.panelTitle}>{phaseLabel}</h2>
            </div>
            <div className={styles.buttonGroup}>
              {phaseKind === "SETUP" && (
                <Button
                  variant="primary"
                  onClick={startGame}
                  disabled={initialDrawRunning}
                >
                  {initialDrawRunning ? "Drawing balls…" : "Start Session"}
                </Button>
              )}
            </div>
          </div>
          {ballDrawReport ? (
            <BallDrawPanel
              report={ballDrawReport}
              displayNumbers={animatedDrawNumbers}
            />
          ) : phaseKind === "WORD_ROUND" && activeRound ? (
            <WordRoundPanel
              phaseKind={phaseKind}
              activeRound={activeRound}
              queueRemaining={activeRound.wordQueue.length}
              timerProgress={timerProgress}
              remainingTimeMs={remainingTime}
              currentGuess={currentGuess}
              onGuessChange={setCurrentGuess}
              onSubmitGuess={handleSubmitGuess}
              wordRoundEvent={wordRoundEvent}
              roundNumber={session.appState.roundIndex}
              timerPaused={timerPaused}
              dutchMode={dutchMode}
            />
          ) : (
            <div className={styles.placeholder}>
              {phaseKind === "SETUP" ? (
                <p className={styles.helperText}>
                  Configure the timers and start a session to begin the timed word
                  rounds.
                </p>
              ) : (
                <p className={styles.helperText}>
                  Awaiting the next phase.
                </p>
              )}
            </div>
          )}
        </section>

        <section className={`${styles.panel} ${styles.secondaryPanel}`}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelLabel}>Bingo</p>
              <h3 className={styles.panelTitle}>Bingo board</h3>
            </div>
          </div>
          <BingoGrid card={session.appState.bingoCard} />
          <div className={styles.ballSummary}>
            <p>
              Ball pool: {session.appState.ballPool.length} remaining
            </p>
            {ballDrawReport && (
              <p>
                Last draw: {ballDrawReport.drawnNumbers.length} balls · +{" "}
                {ballDrawReport.scoreDelta}
              </p>
            )}
            {hasBingo && !bingoExhausted && (
              <Button variant="ghost" onClick={resetBingoBoard}>
                Reset bingo card
              </Button>
            )}
            {bingoExhausted && (
              <p className={styles.helperText}>
                All {TOTAL_BINGO_LINES} lines complete — no more bingo bonuses.
              </p>
            )}
          </div>
        </section>
      </main>

      <section className={styles.bonusPanel}>
        {phaseKind === "BONUS_WORD" && bonusRound ? (
          <BonusPanel
            bonusRound={bonusRound}
            guessValue={bonusGuess}
            onGuessChange={setBonusGuess}
            onSubmitGuess={handleBonusSubmit}
            message={bonusMessage}
          />
        ) : phaseKind === "GAME_OVER" ? (
          <div>
            <h2 className={styles.panelTitle}>Game Over</h2>
            <p className={styles.helperText}>
              Total Score: {session.appState.totalScore}
            </p>
            <Button variant="primary" onClick={resetSession}>
              Play again
            </Button>
          </div>
        ) : (
          <p className={styles.helperText}>
            Complete the final word rounds to unlock the bonus challenge.
          </p>
        )}
      </section>

      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        wordRoundSeconds={wordRoundSeconds}
        setWordRoundSeconds={setWordRoundSeconds}
        dutchMode={dutchMode}
        setDutchMode={setDutchMode}
        maxSeconds={MAX_WORD_ROUND_SECONDS}
        timerPaused={timerPaused}
        onToggleTimerPause={toggleTimerPause}
        onResetSession={resetSession}
        timerStatusText={timerStatusText}
        themeKey={activeTheme}
        onThemeChange={(value) => setActiveTheme(value)}
      />
    </div>
  ) as ReactElement;
}
