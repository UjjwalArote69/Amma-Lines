import { projects } from "../../../data/projects";

/* Representative line-up — our most cited delivered works plus the active NFXP assignment. */
const selectedTitles = [
  "Floating Breakwater (Guide-bund)",
  "Ennore Port Breakwaters",
  "North & South Breakwaters",
  "Elephanta Island Jetty",
  "ONGC 98/2 — Pre-lay Trenching",
  "North Field Expansion (NFXP)",
];

const marqueeItems = selectedTitles
  .map((t) => projects.find((p) => p.title === t))
  .filter(Boolean)
  .map((p) => ({
    loc: `${p.location}`,
    work: p.title.replace(/\s*[—].*$/, "").replace("(Guide-bund)", "").trim(),
    year: p.year,
    status: p.status,
  }));

const Dash = () => (
  <span
    aria-hidden
    className="inline-block mx-6 md:mx-10 font-display italic text-[var(--color-marine-soft)]"
  >
    §
  </span>
);

const MarqueeSection = () => {
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
            Delivered &amp; ongoing works
          </span>
        </div>
        <span className="caption text-[var(--color-bone-50)] ml-auto tabular">
          India &amp; Qatar
        </span>
      </div>
      <div className="relative w-full">
        <div className="marquee-track flex whitespace-nowrap font-display text-3xl md:text-5xl lg:text-6xl leading-none tracking-[-0.01em]">
          {line.map((d, i) => (
            <span key={i} className="flex items-center">
              <span className="text-[var(--color-bone)]">{d.work}</span>
              <span className="caption text-[var(--color-bone-50)] ml-4 md:ml-6 -translate-y-2 md:-translate-y-3 tabular">
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
