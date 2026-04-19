import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LOCALES } from "../../i18n";

/**
 * Compact language switcher — a small pill that reveals a dropdown of
 * supported locales. Styled to match the navbar's pill language so it
 * reads as part of the header, not an afterthought.
 */
const LocaleSwitcher = ({ inline = false }) => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current =
    SUPPORTED_LOCALES.find((l) => l.code === i18n.resolvedLanguage) ||
    SUPPORTED_LOCALES[0];

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const pick = (code) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("locale.switcher")}
        className={`group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
          inline
            ? "hover:bg-[var(--color-ink-05)]"
            : "hover:bg-[var(--color-bone-15)]"
        }`}
      >
        <span
          className="caption tabular"
          style={{
            color: inline ? "var(--color-ink-70)" : "var(--color-bone-70)",
          }}
        >
          {current.code.toUpperCase()}
        </span>
        <span
          className={`text-[9px] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          style={{
            color: inline ? "var(--color-ink-40)" : "var(--color-bone-50)",
          }}
          aria-hidden
        >
          ▾
        </span>
      </button>

      <div
        className={`absolute right-0 mt-2 min-w-[140px] transition-[opacity,transform] duration-200 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
        style={{ zIndex: 55 }}
      >
        <ul
          role="listbox"
          className="py-2 border backdrop-blur-xl"
          style={{
            backgroundColor: "rgba(231,235,240,0.97)",
            borderColor: "var(--color-ink-12)",
            boxShadow: "0 10px 30px -12px rgba(10,28,46,0.18)",
          }}
        >
          {SUPPORTED_LOCALES.map((l) => {
            const active = l.code === current.code;
            return (
              <li key={l.code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => pick(l.code)}
                  className="w-full text-left flex items-baseline justify-between gap-4 px-4 py-2 hover:bg-[var(--color-ink-05)] transition-colors"
                  dir={l.dir}
                >
                  <span
                    className={`text-[15px] ${
                      active
                        ? "text-[var(--color-marine-deep)]"
                        : "text-[var(--color-ink-80)]"
                    }`}
                  >
                    {l.label}
                  </span>
                  <span className="caption tabular text-[var(--color-ink-40)]">
                    {l.code.toUpperCase()}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default LocaleSwitcher;
