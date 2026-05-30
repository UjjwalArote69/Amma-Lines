import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import Button from "../../../components/ui/Button";
import { introDelay } from "../../../utils/preloader";
import { projects } from "../../../data/projects";

gsap.registerPlugin(ScrollTrigger);

/* Featured triptych — three real, representative works, looked up by slug
   so the structural fields (image, year, metric) stay language-agnostic
   while title/location are resolved at render time via i18n. */
const triptychSlugs = [
  "karaikal-breakwaters",
  "ennore-breakwaters",
  "elephanta-jetty",
];
const triptychSources = triptychSlugs
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter(Boolean);

gsap.registerPlugin(ScrollTrigger);

const HeroTile = ({ work, index, active, setActive, className = "", heightClass }) => (
  <Link
    to="/projects"
    onMouseEnter={() => setActive(index)}
    onMouseLeave={() => setActive(null)}
    className={`h-tile group relative block opacity-0 ${className}`}
  >
    <div
      className={`relative overflow-hidden ${heightClass}`}
      style={{ backgroundColor: "var(--color-paper)" }}
    >
      <div className="h-mask absolute inset-0 [clip-path:inset(100%_0%_0%_0%)]">
        <img loading="lazy" decoding="async"
          src={work.img}
          alt={work.title}
          className={`w-full h-full object-cover transition-all duration-[1200ms] ease-out ${
            active === index
              ? "scale-[1.04] grayscale-0 contrast-100"
              : "scale-[1.0] grayscale contrast-[1.05]"
          } ${
            active !== null && active !== index ? "opacity-55" : "opacity-100"
          }`}
        />
      </div>

      {/* Index chip */}
      <div className="absolute top-3 start-3 md:top-4 md:start-4">
        <span
          className="h-6 px-2 flex items-center caption tabular"
          style={{
            backgroundColor: "rgba(231,235,240,0.92)",
            color: "var(--color-ink)",
          }}
        >
          /{work.n}
        </span>
      </div>

      {/* Hover arrow */}
      <div
        className={`absolute top-3 end-3 md:top-4 md:end-4 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-500 ${
          active === index ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
        style={{ backgroundColor: "var(--color-marine)", color: "#fff" }}
      >
        <span className="rtl-flip">↗</span>
      </div>

      {/* Caption pill */}
      <div className="absolute start-3 end-3 bottom-3 md:start-4 md:end-4 md:bottom-4">
        <div
          className="inline-flex flex-col px-3 py-2 backdrop-blur-md"
          style={{
            backgroundColor: "rgba(231,235,240,0.92)",
            color: "var(--color-ink)",
          }}
        >
          <span className="caption text-[var(--color-ink)] leading-tight">
            {work.title}
          </span>
          <span className="caption text-[9px] text-[var(--color-ink-50)] tabular mt-[2px]">
            {work.meta}
          </span>
        </div>
      </div>
    </div>

    <div className="mt-3 flex items-baseline justify-between gap-2">
      <span className="caption text-[var(--color-ink-70)]">{work.type}</span>
      <span className="caption tabular text-[var(--color-ink-40)]">
        {work.n}
      </span>
    </div>
  </Link>
);

const HeroSection = () => {
  const ref = useRef(null);
  const [activeTile, setActiveTile] = useState(null);
  const { t } = useTranslation();

  /* Resolve the triptych's translated title/location/category at render
     time. Keep the structural fields (img, year, metric) from the data. */
  const triptych = triptychSources.map((p, i) => {
    const location = t(`projects.catalog.${p.slug}.location`);
    return {
      n: String(i + 1).padStart(2, "0"),
      title: location.replace(/,.*$/, ""),
      meta: `${t(`projects.catalog.${p.slug}.state`)} · ${p.year}`,
      type: `${t(`projects.categories.${p.categoryKey}`)} · ${p.metric}`,
      img: p.img,
    };
  });

  const trustStats = [
    { n: "1978", l: t("hero.trustStats.foundedLabel") },
    { n: "13 M m³", l: t("hero.trustStats.dredgedLabel") },
    { n: "2", l: t("hero.trustStats.countriesLabel") },
    { n: "ISO", l: t("hero.trustStats.isoLabel") },
  ];

  useGSAP(() => {
    /* Preloader runs ~2.6s total. Start the hero while it's still
       fading so the handover feels continuous.

       Pre-paint hidden state: the JSX paints opacity-0 / clip-path on
       its own, but the headline's y-offset must be enforced through
       the `transform` property (GSAP's channel) — Tailwind v4's
       `translate-y-*` writes the modern `translate` property, which
       GSAP doesn't manage, so it can leak through during the
       introDelay window. Setting `yPercent` here pins the line
       hidden via `transform` before the first paint. */
    gsap.set(".h-line", { yPercent: 120 });

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      delay: introDelay(0.2, 2.3),
    });

    tl.fromTo(
      ".h-kicker > *",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.05 }
    )
      .fromTo(
        ".h-line",
        { yPercent: 120 },
        { yPercent: 0, duration: 1.1, stagger: 0.08 },
        "-=0.4"
      )
      .fromTo(
        ".h-tile",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "power2.out",
        },
        "-=0.6"
      )
      .fromTo(
        ".h-tile .h-mask",
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          stagger: 0.12,
          ease: "power2.inOut",
        },
        "<"
      )
      .fromTo(
        ".h-lower > *",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 },
        "-=0.8"
      );
  }, { scope: ref });

  return (
    <section
      ref={ref}
      className="relative w-full flex flex-col"
      style={{ backgroundColor: "var(--color-bone)", color: "var(--color-ink)" }}
    >
      {/* Masthead block */}
      <div className="pt-28 md:pt-32 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1500px] mx-auto">
          <div
            className="h-[1px] w-full"
            style={{ backgroundColor: "var(--color-ink-30)" }}
          />
          <div className="flex items-center justify-between gap-4 py-3">
            <div className="h-kicker flex items-center gap-3 md:gap-6 min-w-0 [&>*]:opacity-0">
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="h-[6px] w-[6px] rounded-full shrink-0"
                  style={{ backgroundColor: "var(--color-marine)" }}
                />
                <span className="caption text-[var(--color-ink-70)] truncate">
                  <span className="sm:hidden">{t("hero.kickerShort")}</span>
                  <span className="hidden sm:inline">
                    {t("hero.kicker")}
                  </span>
                </span>
              </div>
              <span className="caption text-[var(--color-ink-40)] hidden lg:inline shrink-0">
                {t("hero.flagship")}
              </span>
            </div>
            <span className="h-kicker caption text-[var(--color-ink-40)] tabular hidden md:block shrink-0">
              {t("hero.selected")}
            </span>
          </div>
          <div
            className="h-[1px] w-full"
            style={{ backgroundColor: "var(--color-ink-12)" }}
          />
        </div>
      </div>

      {/* Headline */}
      <div className="px-6 md:px-12 lg:px-16 pt-10 md:pt-14">
        <div className="max-w-[1500px] mx-auto">
          <h1 className="font-display leading-[0.94] tracking-[-0.02em] text-[10vw] sm:text-[12vw] md:text-[7.8vw] lg:text-[6vw]">
            <span className="reveal-line">
              <span className="h-line block">
                {t("hero.headlineA")}{" "}
                <em
                  className="italic"
                  style={{ color: "var(--color-marine)" }}
                >
                  {t("hero.headlineAItalic")}
                </em>
              </span>
            </span>
            <span className="reveal-line">
              <span className="h-line block">
                {t("hero.headlineB")}{" "}
                <em
                  className="italic"
                  style={{ color: "var(--color-marine)" }}
                >
                  {t("hero.headlineBItalic")}
                </em>
              </span>
            </span>
          </h1>
        </div>
      </div>

      {/* Triptych of works */}
      <div className="px-6 md:px-12 lg:px-16 pt-10 md:pt-14">
        <div className="max-w-[1500px] mx-auto">
          <div className="grid grid-cols-12 gap-4 md:gap-5">
            <HeroTile
              work={triptych[0]}
              index={0}
              active={activeTile}
              setActive={setActiveTile}
              className="col-span-12 md:col-span-7"
              heightClass="h-[360px] md:h-[500px] lg:h-[580px]"
            />
            <div className="col-span-12 md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-5">
              <HeroTile
                work={triptych[1]}
                index={1}
                active={activeTile}
                setActive={setActiveTile}
                heightClass="h-[260px] md:h-[242px] lg:h-[282px]"
              />
              <HeroTile
                work={triptych[2]}
                index={2}
                active={activeTile}
                setActive={setActiveTile}
                heightClass="h-[260px] md:h-[242px] lg:h-[282px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lower: description + CTAs */}
      <div className="px-6 md:px-12 lg:px-16 pt-14 md:pt-20 pb-16 md:pb-20">
        <div className="max-w-[1500px] mx-auto h-lower grid grid-cols-12 gap-6 md:gap-10 [&>*]:opacity-0">
          <p className="col-span-12 md:col-span-6 text-[17px] md:text-[20px] leading-[1.55] text-[var(--color-ink-70)] max-w-xl">
            {t("hero.summary")}
          </p>

          <div className="col-span-12 md:col-span-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:justify-end">
            <Button to="/projects" variant="primary">
              {t("buttons.browseProjects")}
            </Button>
            <Button to="/contact" variant="ghost">
              {t("buttons.startProject")}
            </Button>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div
        className="border-t"
        style={{ borderColor: "var(--color-ink-12)" }}
      >
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-16 py-6 md:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6 md:gap-x-10">
            {trustStats.map((s, i) => (
              <div
                key={s.l}
                className={`flex items-baseline gap-3 md:gap-4 ${
                  i !== 0 ? "md:ps-10 md:border-s" : ""
                }`}
                style={i !== 0 ? { borderColor: "var(--color-ink-12)" } : {}}
              >
                <span className="font-display tabular text-[26px] sm:text-[30px] md:text-[38px] lg:text-[42px] leading-none text-[var(--color-ink)] shrink-0">
                  {s.n}
                </span>
                <span className="caption text-[var(--color-ink-70)] leading-[1.35] max-w-[20ch] break-words">
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
