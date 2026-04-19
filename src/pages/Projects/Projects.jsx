import { useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects, projectFilters } from "../../data/projects";
import SEO from "../../components/common/SEO";

gsap.registerPlugin(ScrollTrigger);

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Amma Lines — Selected Works",
  url: "https://ammalines.com/projects",
  description:
    "A register of 12 documented marine infrastructure works delivered by Amma Lines between 1988 and 2024 — breakwaters, jetties, deepwater dredging.",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: projects.length,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${p.title} — ${p.location}`,
    })),
  },
};

const Projects = () => {
  const ref = useRef(null);
  const [active, setActive] = useState("All works");
  const [view, setView] = useState("grid");

  const displayed = useMemo(() => {
    return active === "All works"
      ? projects
      : projects.filter((p) => p.category === active);
  }, [active]);

  useGSAP(() => {
    gsap.fromTo(
      ".p-title-line",
      { y: "110%" },
      { y: "0%", duration: 1.2, stagger: 0.08, ease: "power2.out", delay: 0.2 }
    );
    gsap.from(".p-fade", {
      opacity: 0,
      y: 16,
      duration: 1,
      stagger: 0.08,
      delay: 0.6,
      ease: "power3.out",
    });
  }, { scope: ref });

  useGSAP(() => {
    if (view !== "grid") return;
    ScrollTrigger.refresh();

    const cards = gsap.utils.toArray(".p-card");
    cards.forEach((card) => {
      const wrap = card.querySelector(".p-img-wrap");
      const img = card.querySelector("img");
      if (!wrap || !img) return;
      gsap.fromTo(
        wrap,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.3,
          ease: "power2.inOut",
          scrollTrigger: { trigger: card, start: "top 88%" },
        }
      );
      gsap.fromTo(
        img,
        { y: "-6%" },
        {
          y: "6%",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
  }, { scope: ref, dependencies: [active, view] });

  return (
    <>
      <SEO
        title="Selected Works"
        description="A chronology of 12 documented marine works from Amma Lines: JNPT, Ennore, Karaikal, Elephanta, Hazira, Kochi, Kakinada and the ongoing North Field Expansion in Qatar."
        path="/projects"
        jsonLd={projectsJsonLd}
        jsonLdId="ld-projects"
      />
      <main
        ref={ref}
        className="w-full min-h-screen overflow-hidden"
        style={{ backgroundColor: "var(--color-bone)", color: "var(--color-ink)" }}
      >
      {/* Masthead */}
      <div className="px-6 md:px-12 lg:px-16 pt-32 md:pt-40">
        <div className="max-w-[1500px] mx-auto">
          <div
            className="h-[1px] w-full"
            style={{ backgroundColor: "var(--color-ink)" }}
          />
          <div className="flex items-center justify-between py-3">
            <span className="caption text-[var(--color-ink)]">
              IV · Projects
            </span>
            <span className="caption text-[var(--color-ink-50)] hidden md:inline">
              Selected works · 1988 — 2024
            </span>
            <span className="caption tabular text-[var(--color-ink-50)]">
              {projects.length} documented works
            </span>
          </div>
          <div
            className="h-[1px] w-full"
            style={{ backgroundColor: "var(--color-ink-12)" }}
          />
        </div>
      </div>

      {/* Lede */}
      <section className="px-6 md:px-12 lg:px-16 pt-12 md:pt-20 pb-16 md:pb-20">
        <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 md:col-span-3">
            <p className="p-fade caption text-[var(--color-ink-50)]">
              The register
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h1 className="font-display text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.95] tracking-[-0.02em]">
              <span className="reveal-line">
                <span className="p-title-line block">Breakwaters, jetties</span>
              </span>
              <span className="reveal-line">
                <span className="p-title-line block italic text-[var(--color-ink-70)]">
                  and deepwater works
                </span>
              </span>
              <span className="reveal-line">
                <span className="p-title-line block">since 1988.</span>
              </span>
            </h1>
            <p className="p-fade mt-10 max-w-2xl text-[17px] md:text-[19px] leading-relaxed text-[var(--color-ink-70)]">
              A selection of documented works — from the 650-metre floating
              breakwater at JNPT to the ongoing North Field Expansion
              trenching in Qatar. This register shows {projects.length} cited
              projects; our full delivered-works list is larger.
            </p>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section
        className="sticky top-16 md:top-20 z-20 px-6 md:px-12 lg:px-16 py-4 md:py-5 border-y backdrop-blur-md"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--color-bone) 85%, transparent)",
          borderColor: "var(--color-ink-12)",
        }}
      >
        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {projectFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`caption pb-1 border-b transition-colors ${
                  active === f
                    ? "text-[var(--color-ink)] border-[var(--color-ink)]"
                    : "text-[var(--color-ink-50)] border-transparent hover:text-[var(--color-ink)]"
                }`}
              >
                {f}
                <span className="ml-2 tabular text-[var(--color-ink-40)]">
                  {f === "All works"
                    ? String(projects.length).padStart(2, "0")
                    : String(
                        projects.filter((p) => p.category === f).length
                      ).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="caption text-[var(--color-ink-40)]">View</span>
            {[
              ["grid", "Grid"],
              ["index", "Index"],
            ].map(([k, label]) => (
              <button
                key={k}
                onClick={() => setView(k)}
                className={`caption pb-1 border-b transition-colors ${
                  view === k
                    ? "text-[var(--color-ink)] border-[var(--color-ink)]"
                    : "text-[var(--color-ink-50)] border-transparent hover:text-[var(--color-ink)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Works */}
      <section className="px-6 md:px-12 lg:px-16 py-16 md:py-24">
        {view === "grid" ? (
          <div className="max-w-[1500px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16 md:gap-y-20">
            {displayed.map((p, i) => (
              <article key={`${p.title}-${p.year}`} className="p-card group">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="caption tabular text-[var(--color-ink-40)]">
                    / {String(i + 1).padStart(3, "0")}
                  </span>
                  <span className="caption text-[var(--color-ink-50)]">
                    {p.category}
                  </span>
                </div>
                <div className="p-img-wrap overflow-hidden w-full h-[360px] md:h-[420px] bg-[var(--color-ink-06)]">
                  <img loading="lazy" decoding="async"
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover scale-[1.1] grayscale group-hover:grayscale-0 transition-all duration-[1200ms] ease-out"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl md:text-2xl leading-tight text-[var(--color-ink)]">
                      {p.title}
                    </h3>
                    <p className="caption text-[var(--color-ink-50)] mt-2">
                      {p.location} · {p.state}
                    </p>
                    {p.client && (
                      <p className="caption text-[var(--color-ink-40)] mt-1">
                        Client · {p.client}
                      </p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <span className="caption tabular text-[var(--color-ink-70)] block">
                      {p.year}
                    </span>
                    <span
                      className={`caption mt-1 block ${
                        p.status === "Ongoing"
                          ? "text-[var(--color-marine)]"
                          : "text-[var(--color-ink-50)]"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                </div>
                {p.metric && (
                  <div className="mt-4 pt-3 border-t border-[var(--color-ink-12)] flex items-baseline justify-between">
                    <span className="caption text-[var(--color-ink-50)]">
                      {p.metricLabel}
                    </span>
                    <span className="font-display tabular text-lg text-[var(--color-ink)]">
                      {p.metric}
                    </span>
                  </div>
                )}
              </article>
            ))}
            {displayed.length === 0 && (
              <div className="col-span-full text-center py-24 border border-dashed border-[var(--color-ink-20)]">
                <p className="caption text-[var(--color-ink-50)]">
                  No works indexed in this category.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-[1500px] mx-auto">
            {/* Column header — md+ only, mobile shows stacked cards */}
            <div className="hidden md:grid grid-cols-12 gap-4 caption text-[var(--color-ink-50)] border-b border-[var(--color-ink-20)] pb-3">
              <span className="col-span-1">№</span>
              <span className="col-span-4">Project</span>
              <span className="col-span-3">Location</span>
              <span className="col-span-2">Scale</span>
              <span className="col-span-1 text-right">Year</span>
              <span className="col-span-1 text-right">Status</span>
            </div>
            <ul>
              {displayed.map((p, i) => (
                <li
                  key={`${p.title}-${p.year}`}
                  className="border-b border-[var(--color-ink-12)] py-5 hover:bg-[var(--color-ink-06)] transition-colors"
                >
                  {/* Desktop — table row */}
                  <div className="hidden md:grid grid-cols-12 gap-4 items-baseline">
                    <span className="col-span-1 caption tabular text-[var(--color-ink-40)]">
                      {String(i + 1).padStart(3, "0")}
                    </span>
                    <span className="col-span-4 font-display text-lg md:text-xl leading-tight">
                      {p.title}
                    </span>
                    <span className="col-span-3 text-sm text-[var(--color-ink-70)]">
                      {p.location} · {p.state}
                    </span>
                    <span className="col-span-2 caption tabular text-[var(--color-ink-70)]">
                      {p.metric || "—"}
                    </span>
                    <span className="col-span-1 text-right caption tabular text-[var(--color-ink-70)]">
                      {p.year}
                    </span>
                    <span
                      className={`col-span-1 text-right caption ${
                        p.status === "Ongoing"
                          ? "text-[var(--color-marine)]"
                          : "text-[var(--color-ink-50)]"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>

                  {/* Mobile — stacked card */}
                  <div className="md:hidden flex flex-col gap-2">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="caption tabular text-[var(--color-ink-40)]">
                        {String(i + 1).padStart(3, "0")}
                      </span>
                      <div className="flex items-baseline gap-3">
                        <span className="caption tabular text-[var(--color-ink-70)]">
                          {p.year}
                        </span>
                        <span
                          className={`caption ${
                            p.status === "Ongoing"
                              ? "text-[var(--color-marine)]"
                              : "text-[var(--color-ink-50)]"
                          }`}
                        >
                          {p.status}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-display text-xl leading-tight">
                      {p.title}
                    </h3>
                    <p className="text-sm text-[var(--color-ink-70)]">
                      {p.location} · {p.state}
                    </p>
                    {p.metric && (
                      <p className="caption tabular text-[var(--color-ink-70)]">
                        {p.metricLabel || "Scale"} · {p.metric}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      </main>
    </>
  );
};

export default Projects;
