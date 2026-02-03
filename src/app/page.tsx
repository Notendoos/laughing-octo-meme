"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
} from "react";
import { gsap } from "gsap";
import {
  applyDrawNumbers,
  drawBalls,
  createBingoCard,
  BINGO_SIZE,
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
import type {
  CustomPhaseMetadata,
  GameSession,
  GameSessionConfig,
  GuessResult,
  PhaseDefinition,
} from "../engine/types.ts";
import BallDrawPanel, {
  BallDrawReport,
} from "../components/BallDrawPanel/BallDrawPanel.tsx";
import BonusPanel from "../components/BonusPanel/BonusPanel.tsx";
import BingoGrid from "../components/BingoGrid/BingoGrid.tsx";
import Scoreboard from "../components/Scoreboard/Scoreboard.tsx";
import WordRoundPanel from "../components/WordRoundPanel/WordRoundPanel.tsx";
import type { GuessInputRowHandle } from "../components/GuessPanel/GuessInputRow.tsx";
import { countGuessLetters } from "../components/GuessPanel/GuessInputRow.tsx";
import { CustomPhasePanel } from "../components/CustomPhase/CustomPhasePanel.tsx";
import { SettingsModal } from "../components/SettingsModal/SettingsModal.tsx";
import { Settings as SettingsIcon } from "lucide-react";
import { Button } from "../components/ui/Button/Button.tsx";
import { buildRoundQueue, sampleBonusWord } from "../utils/word-queue.ts";
import { readBestScore, writeBestScore } from "../utils/local-store.ts";
import * as styles from "./page.css.ts";
import {
  chromaVariants,
  DEFAULT_THEME,
  ThemeKey,
  ThemePreference,
  themeContract,
} from "../styles/theme.css.ts";
import {
  DEFAULT_LANGUAGES,
  languageLabels,
  LanguageKey,
  wordCollections,
} from "../utils/word-pool.ts";
import { computeBonusProgress } from "../utils/bonus-unlock.ts";
import { formatTimecode } from "../utils/time.ts";
import clsx from "clsx";
import ConfettiLayer, { type ConfettiHandle } from "../components/Confetti/Confetti.tsx";

type ConfettiOptions = Parameters<ConfettiHandle["fire"]>[0];

const GRID_NUMBERS = Array.from({ length: 5 }, (_, row) =>
  Array.from({ length: 5 }, (_, col) => row * 5 + col + 1)
);

const DEFAULT_WORD_ROUND_SECONDS = 60;
const MIN_WORD_ROUND_SECONDS = 5;
const MAX_WORD_ROUND_SECONDS = 90;
const WORDS_PER_ROUND = 10;

const PRE_MARKED_NUMBERS: number[] = [];
const INITIAL_DRAW_COUNT = 8;
const THEME_STORAGE_KEY = "wordingo-theme";
const LANGUAGE_STORAGE_KEY = "wordingo-languages";
const BONUS_UNLOCK_REQUIREMENTS = {
  minCorrectWords: 6,
  minScore: 800,
};

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

const createDeterministicBingoCard = (
  gridNumbers: number[][],
  preMarkedNumbers: number[]
): BingoCard => {
  return gridNumbers.slice(0, BINGO_SIZE).map((row) =>
    row.slice(0, BINGO_SIZE).map((number) => ({
      number,
      marked: preMarkedNumbers.includes(number),
    }))
  );
};

const createDeterministicSession = (
  config: GameSessionConfig
): GameSession => {
  const baseSession = createGameSession(config);
  return {
    ...baseSession,
    appState: {
      ...baseSession.appState,
      bingoCard: createDeterministicBingoCard(
        config.gridNumbers,
        config.preMarkedNumbers
      ),
    },
  };
};

// const waitMs = (ms: number): Promise<void> =>
//   new Promise((resolve) => setTimeout(resolve, ms));

const PHASE_SEQUENCE: GameSessionConfig["phaseSequence"] = [
  { id: "setup", kind: "SETUP", label: "Setup" },
  { id: "word-round-1", kind: "WORD_ROUND", wordRoundConfigIndex: 0, label: "Word Round 1" },
  { id: "ball-draw-1", kind: "BALL_DRAW", label: "Ball Draw 1" },
  {
    id: "trivia-break-1",
    kind: "CUSTOM",
    label: "Trivia Break",
    metadata: {
      description: "Catch your breath while the host fires a quick trivia question.",
      detail: "Use this pause to look up stray letters, then continue.",
      actionLabel: "Continue to Round 2",
    },
  },
  { id: "word-round-2", kind: "WORD_ROUND", wordRoundConfigIndex: 1, label: "Word Round 2" },
  { id: "ball-draw-2", kind: "BALL_DRAW", label: "Ball Draw 2" },
  {
    id: "trivia-break-2",
    kind: "CUSTOM",
    label: "Quick Fire",
    metadata: {
      description: "Take a short breather and check your bingo board.",
      detail: "Ready for the final word push? Hit continue to proceed.",
      actionLabel: "Start Word Round 3",
    },
  },
  { id: "word-round-3", kind: "WORD_ROUND", wordRoundConfigIndex: 2, label: "Word Round 3" },
  { id: "ball-draw-3", kind: "BALL_DRAW", label: "Ball Draw 3" },
  { id: "bonus", kind: "BONUS_WORD", label: "Bonus Round" },
  { id: "game-over", kind: "GAME_OVER", label: "Game Over" },
];

const buildWordRoundConfigs = (
  baseSeconds: number,
  languages: LanguageKey[] = DEFAULT_LANGUAGES,
) => {
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
    wordQueue: buildRoundQueue(index, WORDS_PER_ROUND, languages),
  }));
};

const createSessionConfig = (
  baseSeconds: number,
  languages: LanguageKey[] = DEFAULT_LANGUAGES,
): GameSessionConfig => ({
  gridNumbers: GRID_NUMBERS,
  preMarkedNumbers: PRE_MARKED_NUMBERS,
  initialBallPool: Array.from({ length: 75 }, (_, index) => index + 1),
  wordRoundConfigs: buildWordRoundConfigs(baseSeconds, languages),
  phaseSequence: PHASE_SEQUENCE,
  bonusWord: sampleBonusWord(languages),
  bonusUnlock: BONUS_UNLOCK_REQUIREMENTS,
});

export default function Page(): ReactElement {
  const initialSessionConfig = useMemo(
    () => createSessionConfig(DEFAULT_WORD_ROUND_SECONDS, DEFAULT_LANGUAGES),
    []
  );
  const sessionConfigRef = useRef(initialSessionConfig);
  const [wordRoundSeconds, setWordRoundSeconds] = useState(
    DEFAULT_WORD_ROUND_SECONDS
  );
  const [session, setSession] = useState<GameSession>(() =>
    createDeterministicSession(initialSessionConfig)
  );
  const [currentGuess, setCurrentGuess] = useState("");
  const [bonusGuess, setBonusGuess] = useState("");
  const [bonusMessage, setBonusMessage] = useState("");
  const [timerPaused, setTimerPaused] = useState(false);
  type ThemePreference = ThemeKey | "auto";
  const [themePreference, setThemePreference] = useState<ThemePreference>(() => {
    if (typeof window === "undefined") {
      return DEFAULT_THEME;
    }
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "auto") {
      return "auto";
    }
    if (stored && stored in chromaVariants) {
      return stored as ThemeKey;
    }
    return DEFAULT_THEME;
  });
  const [systemTheme, setSystemTheme] = useState<ThemeKey>(() => {
    if (typeof window === "undefined") {
      return DEFAULT_THEME;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const resolvedTheme =
    themePreference === "auto" ? systemTheme : themePreference;
  const activeTheme = resolvedTheme;
  const [selectedLanguages, setSelectedLanguages] = useState<LanguageKey[]>(() => {
    if (typeof window === "undefined") {
      return DEFAULT_LANGUAGES;
    }
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (
          Array.isArray(parsed) &&
          parsed.every((entry) => entry in wordCollections)
        ) {
          return parsed as LanguageKey[];
        }
      } catch {
        // ignore invalid data
      }
    }
    return DEFAULT_LANGUAGES;
  });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const guessInputRef = useRef<GuessInputRowHandle | null>(null);
  const [wordRoundEvent, setWordRoundEvent] = useState<WordRoundEvent | null>(
    null
  );
  const [ballDrawReport, setBallDrawReport] = useState<BallDrawReport | null>(
    null
  );
  const [pendingCorrectGuess, setPendingCorrectGuess] =
    useState<GuessResult | null>(null);
  const [showCorrectWordAnimation, setShowCorrectWordAnimation] =
    useState(false);
  const [bestScore, setBestScore] = useState(0);
  const [bestScoreHydrated, setBestScoreHydrated] = useState(false);
  const [animatedDrawNumbers, setAnimatedDrawNumbers] = useState<number[]>([]);
  const [initialDrawRunning, setInitialDrawRunning] = useState(false);
  const [celebrationActive, setCelebrationActive] = useState(false);
  type TimerId = ReturnType<typeof globalThis.setTimeout>;
  const drawAnimationTimers = useRef<TimerId[]>([]);
  const confettiRef = useRef<ConfettiHandle | null>(null);

  const sessionRef = useRef(session);
  const initialDrawPerformedRef = useRef(false);
  const pendingPostWordTransitionRef = useRef<GameSession | null>(null);
  const autoPauseMetaRef = useRef({
    active: false,
    shouldResume: false,
    userOverridden: false,
  });

  useEffect(() => {
    if (typeof window === undefined) {
      return;
    }
    const storedBest = readBestScore();
    const id = requestAnimationFrame(() => {
      setBestScore(storedBest);
      setBestScoreHydrated(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

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
    drawAnimationTimers.current.forEach((timer) => globalThis.clearTimeout(timer));
    drawAnimationTimers.current = [];
  }, []);

  const playDrawAnimation = useCallback(
    (numbers: number[]) => {
      clearDrawAnimation();
      setAnimatedDrawNumbers([]);
      numbers.forEach((value, index) => {
        const timer = globalThis.setTimeout(() => {
          setAnimatedDrawNumbers((current) => [...current, value]);
        }, index * 260);
        drawAnimationTimers.current.push(timer);
      });
    },
    [clearDrawAnimation],
  );

  const resolveConfettiPalette = useCallback(() => {
    if (typeof window === "undefined") {
      return [
        chromaVariants[DEFAULT_THEME].color.confettiPrimary,
        chromaVariants[DEFAULT_THEME].color.confettiSecondary,
      ];
    }
    const computed = getComputedStyle(document.documentElement);
    const primary = computed
      .getPropertyValue(themeContract.color.confettiPrimary)
      .trim();
    const secondary = computed
      .getPropertyValue(themeContract.color.confettiSecondary)
      .trim();
    return [
      primary || chromaVariants[DEFAULT_THEME].color.confettiPrimary,
      secondary || chromaVariants[DEFAULT_THEME].color.confettiSecondary,
    ];
  }, []);

  const fireConfetti = useCallback(
    (options?: ConfettiOptions) => {
      const [primary, secondary] = resolveConfettiPalette();
      confettiRef.current?.fire({
        colors: [primary, secondary],
        ...options,
      });
    },
    [resolveConfettiPalette],
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
    if (ballDrawReport?.lines && ballDrawReport.lines.length > 0) {
      fireConfetti({
        particleCount: 200,
        spread: 140,
        origin: { y: 0.25 },
      });
    }
  }, [ballDrawReport?.lines, fireConfetti]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? "dark" : "light");
    };
    mql.addEventListener?.("change", handleChange);
    mql.addListener?.(handleChange);
    return () => {
      mql.removeEventListener?.("change", handleChange);
      mql.removeListener?.(handleChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    document.documentElement.setAttribute("data-theme", activeTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, themePreference);
  }, [activeTheme, themePreference]);


  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(
      LANGUAGE_STORAGE_KEY,
      JSON.stringify(selectedLanguages),
    );
  }, [selectedLanguages]);

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
    sessionConfigRef.current = createSessionConfig(
      wordRoundSeconds,
      selectedLanguages,
    );
  }, [wordRoundSeconds, selectedLanguages]);

  const resetSession = useCallback(() => {
    commitSession(createGameSession(sessionConfigRef.current));
    setWordRoundEvent(null);
    clearDrawAnimation();
    setBallDrawReport(null);
    setBonusMessage("");
    setCurrentGuess("");
    setBonusGuess("");
    setPendingCorrectGuess(null);
    setShowCorrectWordAnimation(false);
    setTimerPaused(false);
    initialDrawPerformedRef.current = false;
    setInitialDrawRunning(false);
    pendingPostWordTransitionRef.current = null;
    autoPauseMetaRef.current = {
      active: false,
      shouldResume: false,
      userOverridden: false,
    };
    setCelebrationActive(false);
  }, [commitSession, clearDrawAnimation]);

  const hydratedRef = useRef(false);
  useEffect(() => {
    if (hydratedRef.current) {
      return;
    }
    hydratedRef.current = true;
    resetSession();
  }, [resetSession]);

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

  const flushPendingWordTransition = useCallback(() => {
    if (!pendingPostWordTransitionRef.current) {
      return;
    }
    const pending = pendingPostWordTransitionRef.current;
    pendingPostWordTransitionRef.current = null;
    commitSession(pending);
  }, [commitSession]);

  const handleCorrectWordAnimationComplete = useCallback(() => {
    if (
      autoPauseMetaRef.current.active &&
      autoPauseMetaRef.current.shouldResume &&
      !autoPauseMetaRef.current.userOverridden
    ) {
      setTimerPaused(false);
    }
    autoPauseMetaRef.current = {
      active: false,
      shouldResume: false,
      userOverridden: false,
    };
    setCelebrationActive(false);
    setShowCorrectWordAnimation(false);
    setPendingCorrectGuess(null);
    flushPendingWordTransition();
  }, [flushPendingWordTransition]);

  const celebrateCorrectWord = useCallback(
    (guessResult: GuessResult) => {
      setPendingCorrectGuess(guessResult);
      setShowCorrectWordAnimation(true);
      setCelebrationActive(true);
      setTimerPaused((prevPaused) => {
        autoPauseMetaRef.current = {
          active: true,
          shouldResume: !prevPaused,
          userOverridden: false,
        };
        return true;
      });
      fireConfetti({
        particleCount: 220,
        spread: 150,
        origin: { y: 0.2 },
      });
    },
    [fireConfetti],
  );

  const applyWordRoundUpdate = useCallback(
    (update: WordRoundUpdate) => {
      if (update.event?.type === "COMPLETE") {
        setWordRoundEvent(update.event);
        const finished = finalizeBallDraw(update.session, update.event);
        if (update.event.guessResult?.isCorrect) {
          pendingPostWordTransitionRef.current = finished;
          celebrateCorrectWord(update.event.guessResult);
        } else {
          pendingPostWordTransitionRef.current = null;
          commitSession(finished);
        }
        return;
      }

      if (update.event) {
        setWordRoundEvent(update.event);
      }

      commitSession(update.session);
    },
    [finalizeBallDraw, commitSession, celebrateCorrectWord]
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
    if (
      activeRound &&
      countGuessLetters(currentGuess, selectedLanguages.includes("dutch")) !==
        activeRound.wordLength
    ) {
      return;
    }

    const update = handleWordGuess(
      session,
      currentGuess,
      performance.now()
    );
    applyWordRoundUpdate(update);
    setCurrentGuess("");
    guessInputRef.current?.focusFirstEmpty();
  };

  const handleBonusSubmit = () => {
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
    setCelebrationActive(false);
    setTimerPaused((prev) => {
      if (autoPauseMetaRef.current.active) {
        autoPauseMetaRef.current.userOverridden = true;
        autoPauseMetaRef.current.active = false;
      }
      return !prev;
    });
  };

  const toggleLanguageSelection = useCallback((lang: LanguageKey) => {
    setSelectedLanguages((current) => {
      if (current.includes(lang)) {
        const next = current.filter((value) => value !== lang);
        return next.length ? next : current;
      }
      return [...current, lang];
    });
  }, []);

  const activeRound = session.appState.activeWordRound;
  const phaseKind = session.appState.phaseKind;
  const phaseLabel = session.appState.phaseLabel ?? phaseKind;
  const currentPhaseDefinition = session.config.phaseSequence[session.phaseIndex];
  const isCustomPhase =
    phaseKind === "CUSTOM" && currentPhaseDefinition?.kind === "CUSTOM";
  const customPhaseMetadata: CustomPhaseMetadata | undefined =
    isCustomPhase ? currentPhaseDefinition?.metadata : undefined;

  const MAIN_TAB_WORD = "word";
  const MAIN_TAB_BINGO = "bingo";
  type MainTabKey = typeof MAIN_TAB_WORD | typeof MAIN_TAB_BINGO;
  const [tabSelection, setTabSelection] = useState<
    { tab: MainTabKey; phase: string } | null
  >(null);
  const defaultTab = MAIN_TAB_WORD;
  const activeMainTab =
    tabSelection?.phase === phaseKind ? tabSelection.tab : defaultTab;

  const showPauseOverlay =
    timerPaused && phaseKind === "WORD_ROUND" && !celebrationActive;

  const multiLanguageMode = selectedLanguages.length > 1;
  const activeLanguageKey =
    activeRound?.currentWord?.language ?? activeRound?.wordQueue[0]?.language ?? null;
  const currentLanguageLabel = activeLanguageKey
    ? languageLabels[activeLanguageKey]
    : null;
  const showLanguageChip = multiLanguageMode && Boolean(currentLanguageLabel);
  const dutchInputEnabled = selectedLanguages.includes("dutch");

  const completeCustomPhase = useCallback(() => {
    if (!isCustomPhase) {
      return;
    }
    commitSessionUpdate((current) => advancePhase(current));
  }, [commitSessionUpdate, isCustomPhase]);

  const handleThemePreferenceChange = useCallback(
    (value: ThemePreference) => {
      setThemePreference(value);
    },
    [],
  );

  const remainingTime = activeRound
    ? Math.max(0, activeRound.timeLimitMs - activeRound.elapsedMs)
    : 0;
  const overlayTimeString = formatTimecode(remainingTime);

  const bonusRound = session.appState.bonusRound;
  const computedBonusProgress =
    session.appState.bonusProgress ??
    computeBonusProgress(session.appState, session.config.bonusUnlock);
  const bonusLocked =
    session.appState.bonusLocked ??
    (computedBonusProgress.unlocked ? false : true);
  const roundDisplay =
    phaseKind === "BONUS_WORD"
      ? "Bonus"
      : phaseKind === "GAME_OVER"
      ? "Completed"
      : session.appState.roundIndex;
  const roundDurations = `${wordRoundSeconds}s / ${wordRoundSeconds + 1}s / ${
    wordRoundSeconds + 2
  }s`;
  const completedLineCount = session.appState.completedLines.length;
  const hasBingo = completedLineCount > 0;
  const bingoExhausted = completedLineCount >= TOTAL_BINGO_LINES;
  const displayedBestScore = bestScoreHydrated ? bestScore : undefined;

  useEffect(() => {
    if (bonusRound?.solved) {
      fireConfetti({
        particleCount: 260,
        spread: 160,
        origin: { y: 0.35 },
      });
    }
  }, [bonusRound?.solved, fireConfetti]);

  return (
    <div className={styles.shell}>
      <ConfettiLayer ref={confettiRef} />
      <header className={styles.header}>
        <Scoreboard
          phaseLabel={phaseLabel}
          roundLabel={roundDisplay}
          totalScore={session.appState.totalScore}
          ballPoolCount={session.appState.ballPool.length}
          linesCompleted={session.appState.completedLines.length}
          bestScore={displayedBestScore}
        />
        <div className={styles.headerContent}>
          <div className={styles.headerPanel}>
            <p className={styles.headerPhaseLabel}>{phaseLabel}</p>
            <p className={styles.headerCaption}>
              Focus on the board · round {roundDisplay}
            </p>
          </div>
          <div className={styles.headerActions}>
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
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.tabBar}>
          <button
            type="button"
            className={clsx(
              styles.tabButton,
              activeMainTab === MAIN_TAB_WORD && styles.tabButtonActive,
            )}
            aria-pressed={activeMainTab === MAIN_TAB_WORD}
            onClick={() => setTabSelection({ tab: MAIN_TAB_WORD, phase: phaseKind })}
          >
            Word round
          </button>
          <button
            type="button"
            className={clsx(
              styles.tabButton,
              activeMainTab === MAIN_TAB_BINGO && styles.tabButtonActive,
            )}
            aria-pressed={activeMainTab === MAIN_TAB_BINGO}
            onClick={() => setTabSelection({ tab: MAIN_TAB_BINGO, phase: phaseKind })}
          >
            Bingo board
          </button>
        </div>
        <div className={styles.tabPanels}>
          <section
            className={clsx(
              styles.panel,
              styles.primaryPanel,
              activeMainTab !== MAIN_TAB_WORD && styles.tabHidden,
              showPauseOverlay && styles.panelBlurred,
            )}
          >
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
            {isCustomPhase && currentPhaseDefinition ? (
              <CustomPhasePanel
                label={currentPhaseDefinition.label}
                metadata={customPhaseMetadata}
                onComplete={completeCustomPhase}
              />
            ) : ballDrawReport ? (
              <BallDrawPanel
                report={ballDrawReport}
                displayNumbers={animatedDrawNumbers}
              />
            ) : phaseKind === "WORD_ROUND" && activeRound ? (
              <WordRoundPanel
                phaseKind={phaseKind}
                activeRound={activeRound}
                queueRemaining={activeRound.wordQueue.length}
                remainingTimeMs={remainingTime}
                currentGuess={currentGuess}
                onGuessChange={setCurrentGuess}
                onSubmitGuess={handleSubmitGuess}
                wordRoundEvent={wordRoundEvent}
                roundNumber={session.appState.roundIndex}
                timerPaused={timerPaused}
                allowDutch={dutchInputEnabled}
                languageLabel={currentLanguageLabel ?? undefined}
                showLanguageChip={showLanguageChip}
                guessInputRef={guessInputRef}
                onToggleTimer={toggleTimerPause}
                pendingGuess={pendingCorrectGuess}
                showCorrectWordAnimation={showCorrectWordAnimation}
                onCorrectWordAnimationComplete={handleCorrectWordAnimationComplete}
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
            {showPauseOverlay && (
              <button
                type="button"
                className={styles.pauseOverlay}
                onClick={toggleTimerPause}
              >
                <span className={styles.overlayTime}>{overlayTimeString}</span>
                <p className={styles.overlayLabel}>Session paused</p>
                <p className={styles.overlayCaption}>
                  Resume to continue the current word round.
                </p>
                <span className={styles.overlayAction}>Resume session</span>
                <span className={styles.overlayHint}>Tap anywhere to resume</span>
              </button>
            )}
          </section>
          <section
            className={clsx(
              styles.panel,
              styles.secondaryPanel,
              activeMainTab !== MAIN_TAB_BINGO && styles.tabHidden,
            )}
          >
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
        </div>
      </main>

      <section className={styles.bonusPanel}>
        {phaseKind === "BONUS_WORD" ? (
          <BonusPanel
            bonusRound={bonusRound}
            currentGuess={bonusGuess}
            onGuessChange={setBonusGuess}
            onSubmitGuess={handleBonusSubmit}
            message={bonusMessage}
            bonusLocked={bonusLocked}
            bonusProgress={computedBonusProgress}
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
        maxSeconds={MAX_WORD_ROUND_SECONDS}
        onResetSession={resetSession}
        themePreference={themePreference}
        appliedTheme={activeTheme}
        onThemePreferenceChange={handleThemePreferenceChange}
        selectedLanguages={selectedLanguages}
        onToggleLanguage={toggleLanguageSelection}
      />
    </div>
  ) as ReactElement;
}
