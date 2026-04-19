import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Button from "../../../components/ui/Button";
import { services } from "../../../data/services";

gsap.registerPlugin(ScrollTrigger);

/* Six representative disciplines — picked from the full twelve so a
   homepage glance communicates range without duplicating the Services page. */
const featured = [
  "breakwater-construction",
  "pile-jetties",
  "dredging",
  "caisson-construction",
  "sheet-piling",
  "soil-improvement",
]
  .map((slug) => services.find((s) => s.slug === slug))
  .filter(Boolean);

const ExpertiseSection = () => {
  const ref = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".exp-line",
      { y: "105%" },
      {
        y: "0%",
        duration: 1,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 72%" },
      }
    );
    gsap.from(".exp-fade", {
      scrollTrigger: { trigger: ref.current, start: "top 72%" },
      opacity: 0,
      y: 16,
      duration: 0.8,
      stagger: 0.05,
      ease: "power3.out",
    });
    gsap.from(".exp-item", {
      scrollTrigger: { trigger: ".exp-grid", start: "top 80%" },
      y: 30,
      opacity: 0,
      duration: 0.85,
      stagger: 0.06,
      ease: "power3.out",
    });
  }, { scope: ref });

  return (
    <section
      ref={ref}
      id="expertise"
      className="w-full px-6 md:px-12 lg:px-16 py-28 md:py-40 border-t"
      style={{
        backgroundColor: "var(--color-ink)",
        color: "var(--color-bone)",
        borderColor: "var(--color-ink-12)",
      }}
    >
      <div className="max-w-[1500px] mx-auto">
        <div className="grid grid-cols-12 gap-4 md:gap-6 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-3">
            <p className="exp-fade caption text-[var(--color-bone-50)]">
              VI · Capabilities
            </p>
            <p className="exp-fade caption tabular text-[var(--color-bone-50)] mt-3">
              Six of twelve disciplines
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-5xl md:text-7xl lg:text-[6rem] leading-[1.03] max-w-4xl">
              <span className="reveal-line">
                <span className="exp-line block">Delivered by</span>
              </span>
              <span className="reveal-line">
                <span className="exp-line block italic text-[var(--color-bone-70)]">
                  our own crews.
                </span>
              </span>
            </h2>
            <p className="exp-fade mt-10 max-w-xl text-lg text-[var(--color-bone-70)] leading-relaxed">
              Every discipline below is executed by our own engineers, crews
              and fleet — under an ISO-certified QHSE system.
            </p>
          </div>
        </div>

        <ul className="exp-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-bone-15)] border border-[var(--color-bone-15)]">
          {featured.map((it) => (
            <li
              key={it.slug}
              className="exp-item p-8 md:p-10 flex flex-col gap-6 min-h-[320px] group relative overflow-hidden"
              style={{ backgroundColor: "var(--color-ink)" }}
            >
              <div className="flex items-center justify-between">
                <span className="caption tabular text-[var(--color-bone-50)]">
                  / {it.n}
                </span>
                <span
                  className="h-[1px] flex-1 ml-4 transition-colors duration-500 group-hover:bg-[var(--color-marine-soft)]"
                  style={{ backgroundColor: "var(--color-bone-15)" }}
                />
              </div>
              <h3 className="font-display text-3xl md:text-4xl leading-tight text-[var(--color-bone)] transition-transform duration-500 group-hover:-translate-y-1">
                {it.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-bone-70)]">
                {it.body}
              </p>
              <ul className="mt-auto flex flex-col gap-1 border-t border-[var(--color-bone-15)] pt-4">
                {it.deliverables.slice(0, 3).map((d) => (
                  <li
                    key={d}
                    className="flex items-baseline gap-3 caption text-[var(--color-bone-50)]"
                  >
                    <span className="tabular text-[var(--color-bone-30)]">—</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <p className="max-w-xl text-[var(--color-bone-70)] leading-relaxed">
            Six more — RO-RO jetties, block jetties, caissons, cofferdams,
            well sinking and technical-advisory services — are detailed on
            the full Services page.
          </p>
          <div className="self-start">
            <Button to="/services" variant="primary-light">
              All twelve services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
