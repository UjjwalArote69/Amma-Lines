import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { company } from "../../../data/company";

gsap.registerPlugin(ScrollTrigger);

const VisionSection = () => {
  const ref = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: ref.current, start: "top 75%" },
    });

    tl.fromTo(
      ".v-line",
      { y: "105%" },
      { y: "0%", duration: 1, stagger: 0.06, ease: "power2.out" }
    )
      .fromTo(
        ".v-fade",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        ".v-mask",
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power2.inOut" },
        "-=0.9"
      );

    gsap.to(".v-parallax", {
      yPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: ref });

  return (
    <section
      ref={ref}
      id="vision"
      className="relative w-full px-6 md:px-12 lg:px-16 py-28 md:py-40"
      style={{ backgroundColor: "var(--color-paper)", color: "var(--color-ink)" }}
    >
      <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 md:col-span-3">
          <p className="v-fade caption text-[var(--color-ink-50)]">
            III · Practice
          </p>
          <p className="v-fade caption tabular text-[var(--color-ink-40)] mt-3">
            Section 01 / 05
          </p>
        </div>

        <div className="col-span-12 md:col-span-9">
          {/* Lede — the company's own vision, restated. */}
          <h2 className="font-display text-4xl md:text-6xl lg:text-[5.2rem] leading-[1.04] text-[var(--color-ink)] max-w-[22ch]">
            <span className="reveal-line">
              <span className="v-line block">Redefining marine and port</span>
            </span>
            <span className="reveal-line">
              <span className="v-line block italic text-[var(--color-ink-70)]">
                infrastructure
              </span>
            </span>
            <span className="reveal-line">
              <span className="v-line block">with innovation,</span>
            </span>
            <span className="reveal-line">
              <span className="v-line block">reliability &amp; sustainability.</span>
            </span>
          </h2>

          <div className="mt-16 md:mt-24 grid grid-cols-12 gap-6 md:gap-10 items-start">
            <figure className="col-span-12 md:col-span-5">
              <div className="v-mask overflow-hidden h-[440px] md:h-[560px] bg-[var(--color-ink-08)]">
                <img loading="lazy" decoding="async"
                  src="/hero/vision_section.webp"
                  alt="Coastal engineering works"
                  className="v-parallax w-full h-full object-cover duotone scale-[1.08]"
                />
              </div>
              <figcaption className="mt-3 flex items-start justify-between gap-4 caption text-[var(--color-ink-50)]">
                <span>Fig. IV · Coastal works</span>
                <span className="tabular">Since 1978</span>
              </figcaption>
            </figure>

            <div className="col-span-12 md:col-span-7 md:pt-8">
              <p className="v-fade dropcap text-[17px] md:text-[19px] leading-[1.7] text-[var(--color-ink-80)] max-w-[56ch]">
                Incorporated in Mumbai on 13 December 1978 by{" "}
                {company.founder}, Amma Lines grew from a pioneering marine
                construction company into the flagship of the Meka Group.
                Over four decades, we have delivered most of India's major
                breakwaters — including the longest, at Tuticorin Port —
                along with landmark jetties, deepwater dredging and
                reclamation works.
              </p>

              <p className="v-fade mt-6 text-[17px] md:text-[19px] leading-[1.7] text-[var(--color-ink-70)] max-w-[56ch]">
                Our works are delivered by our own engineers, crews and
                fleet under an ISO-certified QHSE management system.
                Dredging is now executed primarily through our sister
                company, Meka Dredging.
              </p>

              <div className="v-fade mt-10 grid grid-cols-3 gap-6 border-t border-[var(--color-ink-12)] pt-8">
                <div>
                  <p className="caption text-[var(--color-ink-50)] mb-2">
                    Founded
                  </p>
                  <p className="font-display tabular text-2xl md:text-3xl">
                    1978
                  </p>
                </div>
                <div>
                  <p className="caption text-[var(--color-ink-50)] mb-2">
                    Registered
                  </p>
                  <p className="font-display text-2xl md:text-3xl">
                    Mumbai
                  </p>
                </div>
                <div>
                  <p className="caption text-[var(--color-ink-50)] mb-2">
                    Group
                  </p>
                  <p className="font-display text-2xl md:text-3xl">
                    Meka
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
