import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { gsap } from "gsap";
import { drawBalls } from "../engine/engine";
import {
  applyBonusGuess,
  advancePhase,
  completeBallDraw,
  createGameSession,
  GameSession,
  GameSessionConfig,
  handleWordGuess,
  updateElapsedTime,
  WordRoundEvent,
  WordRoundUpdate,
} from "../engine/session";
import { BallDrawReport } from "../components/BallDrawPanel/BallDrawPanel";
import BonusPanel from "../components/BonusPanel/BonusPanel";
import BingoGrid from "../components/BingoGrid/BingoGrid";
import Scoreboard from "../components/Scoreboard/Scoreboard";
import WordRoundPanel from "../components/WordRoundPanel/WordRoundPanel";
import { buildRoundQueue, sampleBonusWord } from "../utils/word-queue";

const GRID_NUMBERS = Array.from({ length: 5 }, (_, row) =>
  Array.from({ length: 5 }, (_, col) => row * 5 + col + 1)
);

const ROUND_TIME_WINDOWS = [8_000, 9_000, 10_000];
const WORDS_PER_ROUND = 3;

const ROUND_CONFIGS = ROUND_TIME_WINDOWS.map((timeLimitMs, index) => ({
  timeLimitMs,
  wordLength: 5,
  maxAttemptsPerWord: 2,
  wordQueue: buildRoundQueue(index, WORDS_PER_ROUND),
}));

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

const CONFIG: GameSessionConfig = {
  gridNumbers: GRID_NUMBERS,
  preMarkedNumbers: [2, 6, 9, 11, 13, 17, 20, 24],
  initialBallPool: Array.from({ length: 75 }, (_, index) => index + 1),
  wordRoundConfigs: ROUND_CONFIGS,
  phaseSequence: PHASE_SEQUENCE,
  bonusWord: sampleBonusWord(),
};

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
    if (session.appState.phaseKind !== "WORD_ROUND") {
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
  }, [session.appState.phaseKind, session.appState.roundIndex, applyWordRoundUpdate]);

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

    setSession(nextSession);
    setBonusGuess("");
  };

  const startGame = () => {
    setWordRoundEvent(null);
    setBallDrawReport(null);
    setSession((current) => advancePhase(current));
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

  return (
    <div className="app-shell">
      <header className="card">
        <Scoreboard
          phaseLabel={phaseLabel}
          roundLabel={roundDisplay}
          totalScore={session.appState.totalScore}
          ballPoolCount={session.appState.ballPool.length}
          linesCompleted={session.appState.completedLines.length}
        />
      </header>

      <section className="card panel-grid">
        <div>
          <h2>Word Round</h2>
          {phaseKind === "SETUP" && (
            <button onClick={startGame}>Start Round 1</button>
          )}
          {phaseKind === "WORD_ROUND" && activeRound && (
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
            />
          )}
          {phaseKind === "BALL_DRAW" && ballDrawReport && (
            <BallDrawPanel report={ballDrawReport} />
          )}
        </div>
        <div>
          <h2>Bingo Board</h2>
          <BingoGrid card={session.appState.bingoCard} />
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
        {phaseKind === "BONUS_WORD" && bonusRound ? (
          <BonusPanel
            bonusRound={bonusRound}
            guessValue={bonusGuess}
            onGuessChange={setBonusGuess}
            onSubmitGuess={handleBonusSubmit}
            message={bonusMessage}
          />
        ) : phaseKind === "GAME_OVER" ? (
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
