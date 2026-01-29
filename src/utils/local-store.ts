const BEST_SCORE_KEY = "wordingo:best-score";

const safeWindow = () => (typeof window !== "undefined" ? window : null);

export const readBestScore = (): number => {
  const win = safeWindow();
  if (!win) {
    return 0;
  }

  const raw = win.localStorage.getItem(BEST_SCORE_KEY);
  if (!raw) {
    return 0;
  }

  const parsed = Number(raw);
  return Number.isNaN(parsed) ? 0 : parsed;
};

export const writeBestScore = (score: number) => {
  const win = safeWindow();
  if (!win) {
    return;
  }

  win.localStorage.setItem(BEST_SCORE_KEY, String(score));
};
