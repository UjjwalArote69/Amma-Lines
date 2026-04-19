import { useEffect, useState } from "react";
import { Link } from "react-router";

const STORAGE_KEY = "amma-lines:consent";
const VERSION = "1"; // bump to re-prompt users after a material policy change

/**
 * DPDP-Act-aware cookie + data-processing notice.
 * Stores consent in localStorage; a bumped VERSION re-prompts.
 * We don't load any third-party trackers until consent is "accepted".
 */
const readConsent = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.version !== VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
};

const writeConsent = (status) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: VERSION,
        status,
        at: new Date().toISOString(),
      })
    );
    // Let any listeners (analytics bootstrapper etc.) know.
    window.dispatchEvent(
      new CustomEvent("amma:consent", { detail: { status } })
    );
  } catch {
    /* no-op */
  }
};

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only render on the client, and only if no prior consent recorded.
    const existing = readConsent();
    if (!existing) {
      // Slight delay so the banner doesn't compete with the preloader.
      const t = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    writeConsent("accepted");
    setVisible(false);
  };
  const decline = () => {
    writeConsent("declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie and data-use notice"
      className="fixed inset-x-0 bottom-0 z-[100] px-4 md:px-6 pb-4 md:pb-6"
      style={{
        paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)",
      }}
    >
      <div
        className="max-w-[1500px] mx-auto grid grid-cols-12 gap-4 items-start p-5 md:p-6 border"
        style={{
          backgroundColor: "var(--color-ink)",
          color: "var(--color-bone)",
          borderColor: "var(--color-bone-15)",
          boxShadow: "0 20px 40px -20px rgba(10,28,46,0.35)",
        }}
      >
        <div className="col-span-12 md:col-span-8">
          <p className="caption text-[var(--color-bone-50)] mb-2">
            Notice · Data &amp; cookies
          </p>
          <p className="text-[14px] md:text-[15px] leading-[1.55] text-[var(--color-bone)] max-w-2xl">
            We use a small number of cookies to operate this site, measure how
            it is used, and improve it over time. We process personal data
            only for the purposes set out in our{" "}
            <Link
              to="/privacy"
              className="underline underline-offset-2 hover:text-[var(--color-marine-soft)] transition-colors"
            >
              Privacy Policy
            </Link>
            . By continuing you consent in line with India's Digital Personal
            Data Protection Act, 2023. You can decline non-essential use.
          </p>
        </div>

        <div className="col-span-12 md:col-span-4 flex flex-wrap items-center gap-3 md:justify-end">
          <button
            type="button"
            onClick={decline}
            className="caption text-[var(--color-bone-70)] hover:text-[var(--color-bone)] transition-colors border-b border-[var(--color-bone-30)] hover:border-[var(--color-bone)] pb-1"
          >
            Decline non-essential
          </button>
          <button
            type="button"
            onClick={accept}
            className="inline-flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-full"
            style={{
              backgroundColor: "var(--color-bone)",
              color: "var(--color-ink)",
            }}
          >
            <span className="caption">Accept all</span>
            <span
              className="h-7 w-7 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(10,28,46,0.12)" }}
            >
              ✓
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
