import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { introDelay } from "../../utils/preloader";
import { services } from "../../data/services";
import LocaleSwitcher from "../common/LocaleSwitcher";

/* Services list — titles are resolved per-locale inside the component. */
const servicesSlugs = services.map((s) => s.slug);

const navLinks = [
  { key: "home", path: "/", kind: "link" },
  { key: "about", path: "/about", kind: "link" },
  { key: "projects", path: "/projects", kind: "link" },
  { key: "services", path: "/services", kind: "dropdown" },
  {
    key: "careers",
    href: "https://meka.com/careers",
    kind: "link",
    external: true,
  },
  { key: "contact", path: "/contact", kind: "cta" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const containerRef = useRef(null);
  const closeTimer = useRef(null);
  const tl = useRef(null);
  const { pathname } = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(() => {
    gsap.from(".nv-shell", {
      y: -24,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
      delay: introDelay(0.1, 3.2),
    });

    tl.current = gsap
      .timeline({ paused: true })
      .to(".nv-overlay", {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.9,
        ease: "power2.inOut",
      })
      .fromTo(
        ".nv-row",
        { y: "110%" },
        { y: "0%", duration: 0.9, stagger: 0.06, ease: "power2.out" },
        "-=0.5"
      );
  }, { scope: containerRef });

  useEffect(() => {
    if (!tl.current) return;
    if (open) {
      tl.current.play();
      document.body.style.overflow = "hidden";
    } else {
      tl.current.reverse();
      document.body.style.overflow = "unset";
    }
  }, [open]);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleCloseServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesOpen(false), 180);
  };

  const isRouteActive = (path) => {
    if (!path) return false;
    return path === "/" ? pathname === "/" : pathname.startsWith(path);
  };

  return (
    <div ref={containerRef}>
      <header
        className={`nv-shell fixed top-0 left-0 w-full z-50 transition-[background-color,border-color,backdrop-filter,box-shadow,padding] duration-500 ${
          scrolled || open || servicesOpen
            ? "bg-[var(--color-bone)]/90 backdrop-blur-xl border-b border-[var(--color-ink-08)]"
            : "bg-transparent border-b border-transparent"
        }`}
        style={{
          paddingTop: "env(safe-area-inset-top)",
          ...(scrolled || servicesOpen
            ? {
                boxShadow:
                  "0 1px 0 rgba(10,28,46,0.04), 0 10px 30px -12px rgba(10,28,46,0.08)",
              }
            : {}),
        }}
      >
        <div
          className={`px-6 md:px-10 lg:px-14 flex items-center justify-between gap-6 transition-all duration-500 ${
            scrolled ? "py-3 md:py-3.5" : "py-4 md:py-5"
          }`}
        >
          {/* LEFT — Logo */}
          <Link
            to="/"
            className="shrink-0 group"
            aria-label="Amma Lines — Home"
          >
            <div
              className={`flex items-center justify-center transition-all duration-500 ${
                scrolled ? "h-10 w-10" : "h-12 w-12 md:h-14 md:w-14"
              }`}
            >
              <img loading="lazy" decoding="async"
                src="/logo/meka_amma_lines-removebg-preview.webp"
                alt="Amma Lines"
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
          </Link>

          {/* RIGHT — Inline nav (md+) — wraps nav + locale as one right-side cluster */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
          <nav className="flex items-center gap-1 lg:gap-2">
            {navLinks.map((l) => {
              const active = isRouteActive(l.path);

              /* ========= CTA ========= */
              if (l.kind === "cta") {
                return (
                  <Link
                    key={l.key}
                    to={l.path}
                    aria-current={active ? "page" : undefined}
                    className="group relative inline-flex items-center gap-2 ps-5 pe-1.5 py-1.5 rounded-full transition-all duration-400 ms-2 lg:ms-3 overflow-hidden"
                    style={{
                      backgroundColor: active
                        ? "var(--color-marine-deep)"
                        : "var(--color-marine)",
                      color: "#fff",
                      boxShadow: active
                        ? "inset 0 0 0 1px rgba(255,255,255,0.28)"
                        : "0 4px 14px -4px rgba(30,128,184,0.5)",
                    }}
                  >
                    {/* Shimmer on hover */}
                    <span
                      className="absolute inset-0 ltr:-translate-x-full rtl:translate-x-full ltr:group-hover:translate-x-full rtl:group-hover:-translate-x-full transition-transform duration-[1200ms] ease-out"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                      }}
                    />
                    <span className="caption text-white relative">
                      {t(`nav.${l.key}`)}
                    </span>
                    <span
                      className="relative h-7 w-7 rounded-full flex items-center justify-center transition-transform duration-500 ltr:group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.22)",
                        color: "#fff",
                      }}
                    >
                      <span className="rtl-flip">→</span>
                    </span>
                  </Link>
                );
              }

              /* ========= DROPDOWN (Services) ========= */
              if (l.kind === "dropdown") {
                return (
                  <div
                    key={l.key}
                    className="relative"
                    onMouseEnter={openServices}
                    onMouseLeave={scheduleCloseServices}
                  >
                    <Link
                      to={l.path}
                      aria-current={active ? "page" : undefined}
                      aria-expanded={servicesOpen}
                      className={`group relative flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-full transition-colors duration-300 ${
                        active
                          ? ""
                          : "hover:bg-[var(--color-ink-05)]"
                      }`}
                      style={
                        active
                          ? { backgroundColor: "rgba(30,128,184,0.10)" }
                          : {}
                      }
                    >
                      {/* Active top-bar */}
                      <span
                        className={`absolute left-1/2 -top-[2px] h-[2px] w-6 -translate-x-1/2 rounded-full transition-all duration-400 ${
                          active
                            ? "opacity-100 scale-x-100"
                            : "opacity-0 scale-x-0"
                        }`}
                        style={{ backgroundColor: "var(--color-marine)" }}
                      />
                      <span
                        className={`caption transition-colors ${
                          active
                            ? "text-[var(--color-marine-deep)]"
                            : servicesOpen
                            ? "text-[var(--color-ink)]"
                            : "text-[var(--color-ink-70)] group-hover:text-[var(--color-ink)]"
                        }`}
                      >
                        {t(`nav.${l.key}`)}
                      </span>
                      <span
                        className={`text-[9px] transition-[transform,color] duration-300 ${
                          servicesOpen ? "rotate-180" : ""
                        } ${
                          active
                            ? "text-[var(--color-marine)]"
                            : "text-[var(--color-ink-40)]"
                        }`}
                      >
                        ▾
                      </span>
                    </Link>
                  </div>
                );
              }

              /* ========= LINK ========= */
              const linkClass = `group relative px-3 lg:px-4 py-2 rounded-full transition-colors duration-300 inline-flex items-center gap-1.5 ${
                active ? "" : "hover:bg-[var(--color-ink-05)]"
              }`;
              const linkStyle = active
                ? { backgroundColor: "rgba(30,128,184,0.10)" }
                : {};

              const linkContent = (
                <>
                  {/* Active top-bar */}
                  <span
                    className={`absolute left-1/2 -top-[2px] h-[2px] w-6 -translate-x-1/2 rounded-full transition-all duration-400 ${
                      active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                    }`}
                    style={{ backgroundColor: "var(--color-marine)" }}
                  />
                  <span
                    className={`caption transition-colors ${
                      active
                        ? "text-[var(--color-marine-deep)]"
                        : "text-[var(--color-ink-70)] group-hover:text-[var(--color-ink)]"
                    }`}
                  >
                    {t(`nav.${l.key}`)}
                  </span>
                  {l.external && (
                    <span
                      aria-hidden
                      className="caption text-[9px] text-[var(--color-ink-40)] group-hover:text-[var(--color-marine)] transition-colors -translate-y-[1px]"
                    >
                      ↗
                    </span>
                  )}
                </>
              );

              if (l.external) {
                return (
                  <a
                    key={l.key}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                    style={linkStyle}
                  >
                    {linkContent}
                  </a>
                );
              }

              return (
                <Link
                  key={l.key}
                  to={l.path}
                  aria-current={active ? "page" : undefined}
                  className={linkClass}
                  style={linkStyle}
                >
                  {linkContent}
                </Link>
              );
            })}
          </nav>
            <LocaleSwitcher inline />
          </div>

          {/* Mobile trigger */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t("nav.close") : t("nav.menu")}
            aria-expanded={open}
            className="md:hidden relative z-[60] group flex items-center gap-3 shrink-0"
          >
            <span className="caption text-[var(--color-ink)]">
              {open ? t("nav.close") : t("nav.menu")}
            </span>
            <span
              className={`relative h-10 w-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
                open
                  ? "bg-[var(--color-ink)] border-[var(--color-ink)]"
                  : "border-[var(--color-ink-30)] group-hover:border-[var(--color-ink)]"
              }`}
            >
              <span
                className={`absolute h-[1.5px] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  open
                    ? "w-4 bg-[var(--color-bone)] rotate-45"
                    : "w-4 bg-[var(--color-ink)] -translate-y-[3px]"
                }`}
              />
              <span
                className={`absolute h-[1.5px] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  open
                    ? "w-4 bg-[var(--color-bone)] -rotate-45"
                    : "w-3 bg-[var(--color-ink)] translate-y-[3px]"
                }`}
              />
            </span>
          </button>
        </div>

        {/* Services dropdown (md+) */}
        <div
          className={`hidden md:block absolute top-full left-0 w-full transition-[opacity,transform] duration-400 ${
            servicesOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-3 pointer-events-none"
          }`}
          onMouseEnter={openServices}
          onMouseLeave={scheduleCloseServices}
        >
          <div
            className="w-full border-b backdrop-blur-xl"
            style={{
              backgroundColor: "rgba(231,235,240,0.97)",
              borderColor: "var(--color-ink-08)",
              boxShadow: "0 20px 40px -20px rgba(10,28,46,0.14)",
            }}
          >
            <div className="max-w-[1500px] mx-auto px-6 md:px-10 lg:px-14 py-9 md:py-11">
              <div className="grid grid-cols-12 gap-6 lg:gap-10">
                <div className="col-span-12 md:col-span-3">
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="h-[6px] w-[6px] rounded-full"
                      style={{ backgroundColor: "var(--color-marine)" }}
                    />
                    <p className="caption text-[var(--color-ink-50)]">
                      {t("nav.servicesPanel.kicker")}
                    </p>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl leading-[1.1] text-[var(--color-ink)]">
                    {t("nav.servicesPanel.title")}{" "}
                    <em className="italic text-[var(--color-marine-deep)]">
                      {t("nav.servicesPanel.titleItalic")}
                    </em>
                  </h3>
                  <Link
                    to="/services"
                    onClick={() => setServicesOpen(false)}
                    className="mt-6 group inline-flex items-center gap-3 ps-4 pe-1 py-1 rounded-full transition-all"
                    style={{
                      backgroundColor: "var(--color-marine)",
                      color: "#fff",
                    }}
                  >
                    <span className="caption text-white">
                      {t("nav.servicesPanel.viewAll")}
                    </span>
                    <span
                      className="h-6 w-6 rounded-full flex items-center justify-center transition-transform duration-500 ltr:group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.22)",
                        color: "#fff",
                      }}
                    >
                      <span className="rtl-flip">→</span>
                    </span>
                  </Link>
                </div>

                <ul className="col-span-12 md:col-span-9 grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-0">
                  {servicesSlugs.map((slug, i) => (
                    <li key={slug}>
                      <Link
                        to={`/services#${slug}`}
                        onClick={() => setServicesOpen(false)}
                        className="group flex items-center gap-4 py-3 px-3 -mx-3 rounded-lg border-b border-[var(--color-ink-08)] transition-colors hover:bg-[var(--color-ink-05)]"
                      >
                        <span className="caption tabular text-[var(--color-ink-40)] shrink-0 w-6 group-hover:text-[var(--color-marine)] transition-colors">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[15px] text-[var(--color-ink-80)] group-hover:text-[var(--color-marine-deep)] transition-colors flex-1">
                          {t(`services.catalog.${slug}.title`)}
                        </span>
                        <span
                          className="text-[var(--color-marine)] opacity-0 ltr:-translate-x-2 rtl:translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                          aria-hidden
                        >
                          <span className="rtl-flip">→</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen overlay — mobile only */}
      <div
        className="nv-overlay fixed inset-0 z-40 flex flex-col md:hidden"
        style={{
          clipPath: "inset(0% 0% 100% 0%)",
          backgroundColor: "var(--color-bone)",
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <nav className="flex-1 flex flex-col pt-24 sm:pt-28 pb-10 px-6 overflow-y-auto">
          <ul className="flex flex-col">
            {navLinks.map((l) => {
              const active = isRouteActive(l.path);
              const isServices = l.kind === "dropdown";
              const isCta = l.kind === "cta";

              return (
                <li
                  key={l.key}
                  className="border-t border-[var(--color-ink-12)] last:border-b"
                >
                  <div className="py-4 flex items-baseline justify-between overflow-hidden pb-[calc(1rem+0.2em)]">
                    <span className="overflow-hidden flex items-baseline gap-3 pb-[0.2em]">
                      {active && (
                        <span
                          className="nv-row inline-block h-2 w-2 rounded-full translate-y-[-4px]"
                          style={{ backgroundColor: "var(--color-marine)" }}
                        />
                      )}
                      {l.external ? (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpen(false)}
                          className="nv-row block"
                        >
                          <span className="font-display text-4xl leading-[0.96] text-[var(--color-ink)]">
                            {t(`nav.${l.key}`)}
                            <span
                              aria-hidden
                              className="inline-block ms-3 text-2xl text-[var(--color-ink-40)] align-baseline"
                            >
                              <span className="rtl-flip">↗</span>
                            </span>
                          </span>
                        </a>
                      ) : (
                        <Link
                          to={l.path}
                          onClick={() => {
                            if (!isServices) setOpen(false);
                          }}
                          className="nv-row block"
                        >
                          <span
                            className={`font-display text-4xl leading-[0.96] ${
                              active
                                ? "text-[var(--color-marine)]"
                                : isCta
                                ? "text-[var(--color-marine-deep)] italic"
                                : "text-[var(--color-ink)]"
                            }`}
                          >
                            {t(`nav.${l.key}`)}
                          </span>
                        </Link>
                      )}
                    </span>
                    <span className="overflow-hidden">
                      {isServices ? (
                        <button
                          onClick={() =>
                            setMobileServicesOpen((o) => !o)
                          }
                          className="nv-row block text-2xl text-[var(--color-ink-40)] transition-transform"
                          aria-label="Toggle services list"
                          style={{
                            transform: mobileServicesOpen
                              ? "rotate(180deg)"
                              : "rotate(0)",
                          }}
                        >
                          ▾
                        </button>
                      ) : l.external ? (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpen(false)}
                          className="nv-row block text-2xl text-[var(--color-ink-40)]"
                          aria-hidden
                        >
                          <span className="rtl-flip">↗</span>
                        </a>
                      ) : (
                        <Link
                          to={l.path}
                          onClick={() => setOpen(false)}
                          className="nv-row block text-2xl text-[var(--color-ink-40)]"
                        >
                          <span className="rtl-flip">→</span>
                        </Link>
                      )}
                    </span>
                  </div>

                  {/* Mobile services sub-list */}
                  {isServices && (
                    <div
                      className={`overflow-hidden transition-[max-height,opacity] duration-500 ${
                        mobileServicesOpen
                          ? "max-h-[640px] opacity-100 pb-4"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="ps-1 flex flex-col">
                        {servicesSlugs.map((slug, i) => (
                          <li
                            key={slug}
                            className="border-t border-[var(--color-ink-08)]"
                          >
                            <Link
                              to={`/services#${slug}`}
                              onClick={() => setOpen(false)}
                              className="py-2.5 flex items-baseline gap-3"
                            >
                              <span className="caption tabular text-[var(--color-ink-40)]">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span className="text-[15px] text-[var(--color-ink-80)]">
                                {t(`services.catalog.${slug}.title`)}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
