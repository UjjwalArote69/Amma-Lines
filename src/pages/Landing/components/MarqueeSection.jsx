import { useTranslation } from "react-i18next";
import { projects } from "../../../data/projects";

/* Representative line-up — our most cited delivered works plus the active NFXP assignment. */
const selectedSlugs = [
  "jnpt-floating-breakwater",
  "ennore-breakwaters",
  "karaikal-breakwaters",
  "elephanta-jetty",
  "ongc-trenching",
  "nfxp",
];

const selectedSources = selectedSlugs
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter(Boolean);

const Dash = () => (
  <span
    aria-hidden
    className="inline-block mx-6 md:mx-10 font-display italic text-[var(--color-marine-soft)]"
  >
    §
  </span>
);

const MarqueeSection = () => {
  const { t } = useTranslation();

  const marqueeItems = selectedSources.map((p) => {
    const title = t(`projects.catalog.${p.slug}.title`);
    const location = t(`projects.catalog.${p.slug}.location`);
    return {
      loc: location,
      work: title.replace(/\s*[—].*$/, "").replace("(Guide-bund)", "").trim(),
      year: p.year,
    };
  });
  const line = [...marqueeItems, ...marqueeItems];

  return (
    <section
      className="w-full border-y py-6 md:py-8 overflow-hidden"
      style={{
        backgroundColor: "var(--color-ink)",
        color: "var(--color-bone)",
        borderColor: "var(--color-ink-12)",
      }}
    >
      <div className="flex items-center px-6 md:px-12 lg:px-16 mb-3">
        <div className="flex items-center gap-3">
          <span
            className="h-[6px] w-[6px] rounded-full animate-pulse"
            style={{ backgroundColor: "var(--color-marine-soft)" }}
          />
          <span className="caption text-[var(--color-bone-70)]">
            {t("marquee.kicker")}
          </span>
        </div>
        <span className="caption text-[var(--color-bone-50)] ms-auto tabular">
          {t("marquee.region")}
        </span>
      </div>
      <div className="relative w-full">
        <div className="flex whitespace-nowrap font-display text-3xl md:text-5xl lg:text-6xl leading-none tracking-[-0.01em] animate-marquee md:animate-marquee-fast will-change-transform motion-reduce:animate-none">
          {line.map((d, i) => (
            <span key={i} className="flex items-center">
              <span className="text-[var(--color-bone)]">{d.work}</span>
              <span className="caption text-[var(--color-bone-50)] ms-4 md:ms-6 -translate-y-2 md:-translate-y-3 tabular">
                {d.loc} · {d.year}
              </span>
              <Dash />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
