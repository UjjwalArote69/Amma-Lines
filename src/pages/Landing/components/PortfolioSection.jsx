import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router";
import Button from "../../../components/ui/Button";
import { projects } from "../../../data/projects";

gsap.registerPlugin(ScrollTrigger);

/* Curated selection — chronological spread across breakwaters, jetties and dredging. */
const selection = [
  "Floating Breakwater (Guide-bund)",
  "Elephanta Island Jetty",
  "Ennore Port Breakwaters",
  "North & South Breakwaters",
  "Dredging & Reclamation", // Reliance Industries Hazira 2016
  "North Field Expansion (NFXP)",
]
  .map((t) => projects.find((p) => p.title === t))
  .filter(Boolean)
  .map((p, i) => ({
    n: String(i + 1).padStart(2, "0"),
    title: p.title,
    location: p.location,
    type: p.category + (p.metric ? ` · ${p.metric}` : ""),
    year: p.year,
    img: p.img,
  }));

const PortfolioSection = () => {
  const ref = useRef(null);
  const previewRef = useRef(null);
  const [hover, setHover] = useState(null);

  useGSAP(() => {
    gsap.fromTo(
      ".pf-line",
      { y: "105%" },
      {
        y: "0%",
        duration: 1,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: ".pf-header", start: "top 80%" },
      }
    );
    gsap.from(".pf-fade", {
      scrollTrigger: { trigger: ".pf-header", start: "top 80%" },
      opacity: 0,
      y: 14,
      duration: 0.8,
      stagger: 0.05,
      ease: "power3.out",
    });
    gsap.from(".pf-row", {
      scrollTrigger: { trigger: ".pf-list", start: "top 75%" },
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.06,
      ease: "power3.out",
    });

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const xTo = gsap.quickTo(previewRef.current, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(previewRef.current, "y", { duration: 0.5, ease: "power3.out" });

      const onMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        xTo(e.clientX - rect.left);
        yTo(e.clientY - rect.top);
      };
      const el = ref.current;
      el.addEventListener("mousemove", onMove);
      return () => {
        el.removeEventListener("mousemove", onMove);
      };
    }
  }, { scope: ref });

  const current = hover !== null ? selection[hover] : null;

  return (
    <section
      ref={ref}
      id="portfolio"
      className="relative w-full px-6 md:px-12 lg:px-16 py-28 md:py-40 overflow-hidden"
      style={{ backgroundColor: "var(--color-bone)" }}
    >
      <div className="max-w-[1500px] mx-auto">
        <div className="pf-header grid grid-cols-12 gap-4 md:gap-6 mb-16 md:mb-20">
          <div className="col-span-12 md:col-span-3">
            <p className="pf-fade caption text-[var(--color-ink-50)]">
              V · Selected works
            </p>
            <p className="pf-fade caption tabular text-[var(--color-ink-40)] mt-3">
              1988 — 2024
            </p>
          </div>
          <div className="col-span-12 md:col-span-9 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display text-5xl md:text-7xl lg:text-[6rem] leading-[1] max-w-3xl">
              <span className="reveal-line">
                <span className="pf-line block">A chronology</span>
              </span>
              <span className="reveal-line">
                <span className="pf-line block italic text-[var(--color-ink-70)]">
                  of tide and stone.
                </span>
              </span>
            </h2>
            <div className="pf-fade self-start md:self-auto">
              <Button to="/projects" variant="primary">
                Full archive
              </Button>
            </div>
          </div>
        </div>

        <ul className="pf-list flex flex-col border-t border-[var(--color-ink-20)]">
          {selection.map((p, i) => (
            <li
              key={`${p.title}-${p.year}`}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="pf-row"
            >
              <Link
                to="/projects"
                className="group grid grid-cols-12 gap-4 md:gap-8 items-center py-7 md:py-9 border-b border-[var(--color-ink-12)] hover:border-[var(--color-ink)] transition-colors"
              >
                <span className="col-span-2 md:col-span-1 caption tabular text-[var(--color-ink-40)]">
                  / {p.n}
                </span>

                <div className="col-span-10 md:col-span-6">
                  <h3 className="font-display text-3xl md:text-5xl lg:text-[3.6rem] leading-[1.02] text-[var(--color-ink)] transition-all duration-500 group-hover:translate-x-4">
                    {p.title}
                    <span
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 italic text-[var(--color-ink-50)] ml-3"
                      aria-hidden
                    >
                      ↗
                    </span>
                  </h3>
                </div>

                <div className="col-span-6 md:col-span-3 hidden md:block">
                  <p className="caption text-[var(--color-ink-70)]">{p.type}</p>
                  <p className="caption text-[var(--color-ink-40)] mt-1">
                    {p.location}
                  </p>
                </div>

                <div className="col-span-6 md:col-span-2 flex md:justify-end">
                  <span className="font-display tabular text-xl md:text-2xl text-[var(--color-ink)]">
                    {p.year}
                  </span>
                </div>

                <div className="col-span-12 md:hidden">
                  <p className="caption text-[var(--color-ink-70)]">{p.type}</p>
                  <p className="caption text-[var(--color-ink-40)] mt-1">
                    {p.location}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Cursor-follow preview */}
      <div
        ref={previewRef}
        className="pointer-events-none absolute top-0 left-0 hidden md:block"
        style={{ zIndex: 5, transform: "translate3d(0,0,0)" }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 w-[320px] h-[200px] overflow-hidden transition-opacity duration-300"
          style={{ opacity: current ? 1 : 0 }}
        >
          {current && (
            <img loading="lazy" decoding="async"
              src={current.img}
              alt={current.title}
              className="w-full h-full object-cover duotone"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
