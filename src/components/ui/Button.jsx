import { Link } from "react-router";

/**
 * Unified CTA button — mirrors the Navbar's premium pill language.
 *
 * variant:
 *   - "primary"       → marine-blue filled pill (for light surfaces)
 *   - "primary-light" → bone filled pill with ink text (for dark surfaces)
 *   - "ghost"         → text + arrow, animated underline (for inline links)
 *   - "ghost-light"   → ghost on dark surfaces
 *
 * arrow: boolean (default true) — includes the chevron plate / arrow.
 *
 * RTL: directional utilities use `ps/pe`, hover translates swap sign via
 * `ltr:` / `rtl:` variants, and arrow glyphs wear `.rtl-flip` so "→" reads
 * as "←" in Arabic layouts.
 */

const Shimmer = () => (
  <span
    className="absolute inset-0 ltr:-translate-x-full rtl:translate-x-full ltr:group-hover:translate-x-full rtl:group-hover:-translate-x-full transition-transform duration-[1200ms] ease-out pointer-events-none"
    style={{
      background:
        "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
    }}
  />
);

const ChevronPlate = ({ variant }) => {
  if (variant === "primary" || variant === "primary-light") {
    const dark = variant === "primary-light";
    return (
      <span
        className="relative h-8 w-8 rounded-full flex items-center justify-center transition-transform duration-500 ltr:group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 shrink-0"
        style={{
          backgroundColor: dark
            ? "rgba(11,24,40,0.12)"
            : "rgba(255,255,255,0.22)",
          color: dark ? "var(--color-ink)" : "#fff",
        }}
      >
        <span className="rtl-flip">→</span>
      </span>
    );
  }
  return null;
};

const Button = ({
  to,
  href,
  onClick,
  type = "button",
  variant = "primary",
  arrow = true,
  className = "",
  children,
  ariaLabel,
  ...rest
}) => {
  // ========= PRIMARY (marine on light) =========
  if (variant === "primary") {
    const classes = `group relative inline-flex items-center gap-3 ps-5 ${
      arrow ? "pe-1.5" : "pe-5"
    } py-2 min-h-[44px] md:min-h-0 rounded-full transition-all overflow-hidden ${className}`;
    const style = {
      backgroundColor: "var(--color-marine)",
      color: "#fff",
      boxShadow: "0 4px 14px -4px rgba(30,128,184,0.5)",
    };
    const inner = (
      <>
        <Shimmer />
        <span className="caption text-white relative whitespace-nowrap">
          {children}
        </span>
        {arrow && <ChevronPlate variant="primary" />}
      </>
    );
    if (to)
      return (
        <Link to={to} className={classes} style={style} aria-label={ariaLabel} {...rest}>
          {inner}
        </Link>
      );
    if (href)
      return (
        <a href={href} className={classes} style={style} aria-label={ariaLabel} {...rest}>
          {inner}
        </a>
      );
    return (
      <button
        type={type}
        onClick={onClick}
        className={classes}
        style={style}
        aria-label={ariaLabel}
        {...rest}
      >
        {inner}
      </button>
    );
  }

  // ========= PRIMARY-LIGHT (bone on dark) =========
  if (variant === "primary-light") {
    const classes = `group relative inline-flex items-center gap-3 ps-5 ${
      arrow ? "pe-1.5" : "pe-5"
    } py-2 min-h-[44px] md:min-h-0 rounded-full transition-all overflow-hidden ${className}`;
    const style = {
      backgroundColor: "var(--color-bone)",
      color: "var(--color-ink)",
      boxShadow: "0 4px 14px -4px rgba(10,28,46,0.4)",
    };
    const inner = (
      <>
        <span
          className="absolute inset-0 ltr:-translate-x-full rtl:translate-x-full ltr:group-hover:translate-x-full rtl:group-hover:-translate-x-full transition-transform duration-[1200ms] ease-out pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(30,128,184,0.18), transparent)",
          }}
        />
        <span className="caption relative whitespace-nowrap" style={{ color: "var(--color-ink)" }}>
          {children}
        </span>
        {arrow && <ChevronPlate variant="primary-light" />}
      </>
    );
    if (to)
      return (
        <Link to={to} className={classes} style={style} aria-label={ariaLabel} {...rest}>
          {inner}
        </Link>
      );
    if (href)
      return (
        <a href={href} className={classes} style={style} aria-label={ariaLabel} {...rest}>
          {inner}
        </a>
      );
    return (
      <button
        type={type}
        onClick={onClick}
        className={classes}
        style={style}
        aria-label={ariaLabel}
        {...rest}
      >
        {inner}
      </button>
    );
  }

  // ========= GHOST (text + underline, light surface) =========
  if (variant === "ghost") {
    const classes = `group inline-flex items-center gap-3 caption text-[var(--color-ink)] border-b border-[var(--color-ink-30)] hover:border-[var(--color-marine)] pb-2 pt-2 min-h-[44px] md:min-h-0 transition-colors ${className}`;
    const inner = (
      <>
        <span className="group-hover:text-[var(--color-marine)] transition-colors">
          {children}
        </span>
        {arrow && (
          <span className="text-[var(--color-ink-70)] group-hover:text-[var(--color-marine)] ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all">
            <span className="rtl-flip">→</span>
          </span>
        )}
      </>
    );
    if (to)
      return (
        <Link to={to} className={classes} aria-label={ariaLabel} {...rest}>
          {inner}
        </Link>
      );
    if (href)
      return (
        <a href={href} className={classes} aria-label={ariaLabel} {...rest}>
          {inner}
        </a>
      );
    return (
      <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel} {...rest}>
        {inner}
      </button>
    );
  }

  // ========= GHOST-LIGHT (text + underline, dark surface) =========
  if (variant === "ghost-light") {
    const classes = `group inline-flex items-center gap-3 caption text-[var(--color-bone)] border-b border-[var(--color-bone-30)] hover:border-[var(--color-marine-soft)] pb-2 pt-2 min-h-[44px] md:min-h-0 transition-colors ${className}`;
    const inner = (
      <>
        <span className="group-hover:text-[var(--color-marine-soft)] transition-colors">
          {children}
        </span>
        {arrow && (
          <span className="text-[var(--color-bone-70)] group-hover:text-[var(--color-marine-soft)] ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all">
            <span className="rtl-flip">→</span>
          </span>
        )}
      </>
    );
    if (to)
      return (
        <Link to={to} className={classes} aria-label={ariaLabel} {...rest}>
          {inner}
        </Link>
      );
    if (href)
      return (
        <a href={href} className={classes} aria-label={ariaLabel} {...rest}>
          {inner}
        </a>
      );
    return (
      <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel} {...rest}>
        {inner}
      </button>
    );
  }

  return null;
};

export default Button;
