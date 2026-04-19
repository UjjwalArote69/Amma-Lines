export const PRELOADER_SESSION_KEY = "amma-lines:preloader-seen";

/**
 * True if the preloader has already played in this browser session.
 * Other intro animations use this to shorten their delay when the
 * preloader is skipped.
 */
export const hasSeenPreloaderThisSession = () => {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(PRELOADER_SESSION_KEY) === "1";
  } catch {
    return false;
  }
};

/**
 * Delay (seconds) before page-intro animations should start.
 * Long when the preloader is running, short when it's been skipped.
 */
export const introDelay = (whenSkipped = 0.2, whenPlaying = 3.2) =>
  hasSeenPreloaderThisSession() ? whenSkipped : whenPlaying;
