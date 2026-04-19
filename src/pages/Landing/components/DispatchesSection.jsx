import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Button from "../../../components/ui/Button";
import { awards } from "../../../data/company";

gsap.registerPlugin(ScrollTrigger);

const DispatchesSection = () => {
  const ref = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".d-line",
      { y: "105%" },
      {
        y: "0%",
        duration: 1,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      }
    );
    gsap.from(".d-row", {
      scrollTrigger: { trigger: ".d-list", start: "top 80%" },
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.07,
      ease: "power3.out",
    });
  }, { scope: ref });

  return (
    <section
      ref={ref}
      className="w-full px-6 md:px-12 lg:px-16 py-28 md:py-40"
      style={{ backgroundColor: "var(--color-paper)" }}
    >
      <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 md:col-span-3 mb-8 md:mb-0">
          <p className="caption text-[var(--color-ink-50)]">
            VII · Recognition
          </p>
          <p className="caption tabular text-[var(--color-ink-40)] mt-3">
            Selected awards &amp; milestones
          </p>
        </div>

        <div className="col-span-12 md:col-span-9">
          <h2 className="font-display text-4xl md:text-6xl lg:text-[5rem] leading-[1.04] max-w-[18ch]">
            <span className="reveal-line">
              <span className="d-line block">The work we do,</span>
            </span>
            <span className="reveal-line">
              <span className="d-line block italic text-[var(--color-ink-70)]">
                and what it earns.
              </span>
            </span>
          </h2>

          <ul className="d-list mt-14 md:mt-20 flex flex-col border-t border-[var(--color-ink-20)]">
            {awards.map((a) => (
              <li
                key={`${a.year}-${a.title}`}
                className="d-row grid grid-cols-12 gap-4 md:gap-6 py-8 md:py-10 border-b border-[var(--color-ink-12)]"
              >
                <div className="col-span-4 md:col-span-2">
                  <p className="caption tabular text-[var(--color-ink-70)]">
                    {a.year}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <p className="caption text-[var(--color-ink-50)] mb-2">
                    Award
                  </p>
                  <p className="font-display text-xl md:text-2xl leading-tight">
                    {a.title}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-4 md:text-right">
                  <p className="caption text-[var(--color-ink-50)]">
                    {a.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <Button to="/about" variant="primary">
              Read the practice story
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DispatchesSection;
