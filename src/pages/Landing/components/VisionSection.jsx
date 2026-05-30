import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import { company } from "../../../data/company";

gsap.registerPlugin(ScrollTrigger);

const VisionSection = () => {
  const ref = useRef(null);
  const { t } = useTranslation();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
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

    /* Scroll-scrubbed parallax is expensive on mobile — each touchmove
       triggers a full GSAP update. Restrict to devices with a fine
       pointer (desktop with mouse). */
    const isFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    if (isFinePointer) {
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
    }
  }, { scope: ref });

  return (
    <section
      ref={ref}
      id="vision"
      className="relative w-full px-6 md:px-12 lg:px-16 py-20 md:py-40"
      style={{ backgroundColor: "var(--color-paper)", color: "var(--color-ink)" }}
    >
      <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 md:col-span-3">
          <p className="v-fade caption text-[var(--color-ink-50)]">
            {t("vision.kicker")}
          </p>
          <p className="v-fade caption tabular text-[var(--color-ink-40)] mt-3">
            {t("vision.section")}
          </p>
        </div>

        <div className="col-span-12 md:col-span-9">
          <h2 className="font-display text-4xl md:text-6xl lg:text-[5.2rem] leading-[1.04] text-[var(--color-ink)] max-w-[22ch]">
            <span className="reveal-line">
              <span className="v-line block">{t("vision.headlineA")}</span>
            </span>
            <span className="reveal-line">
              <span className="v-line block italic text-[var(--color-ink-70)]">
                {t("vision.headlineAItalic")}
              </span>
            </span>
            <span className="reveal-line">
              <span className="v-line block">{t("vision.headlineB")}</span>
            </span>
            <span className="reveal-line">
              <span className="v-line block">{t("vision.headlineC")}</span>
            </span>
          </h2>

          <div className="mt-16 md:mt-24 grid grid-cols-12 gap-6 md:gap-10 items-start">
            <figure className="col-span-12 md:col-span-5">
              <div className="v-mask overflow-hidden h-[440px] md:h-[560px] bg-[var(--color-ink-08)]">
                <img loading="lazy" decoding="async"
                  src="/hero/vision_section.webp"
                  alt={t("vision.figCaption")}
                  className="v-parallax w-full h-full object-cover duotone scale-[1.08]"
                />
              </div>
              <figcaption className="mt-3 flex items-start justify-between gap-4 caption text-[var(--color-ink-50)]">
                <span>{t("vision.figCaption")}</span>
                <span className="tabular">{t("vision.figCaptionSince")}</span>
              </figcaption>
            </figure>

            <div className="col-span-12 md:col-span-7 md:pt-8">
              <p className="v-fade dropcap text-[17px] md:text-[19px] leading-[1.7] text-[var(--color-ink-80)] max-w-[56ch]">
                {t("vision.body1", { founder: company.founder })}
              </p>

              <p className="v-fade mt-6 text-[17px] md:text-[19px] leading-[1.7] text-[var(--color-ink-70)] max-w-[56ch]">
                {t("vision.body2")}
              </p>

              <div className="v-fade mt-10 grid grid-cols-3 gap-6 border-t border-[var(--color-ink-12)] pt-8">
                <div>
                  <p className="caption text-[var(--color-ink-50)] mb-2">
                    {t("vision.founded")}
                  </p>
                  <p className="font-display tabular text-2xl md:text-3xl">
                    1978
                  </p>
                </div>
                <div>
                  <p className="caption text-[var(--color-ink-50)] mb-2">
                    {t("vision.registered")}
                  </p>
                  <p className="font-display text-2xl md:text-3xl">
                    {t("vision.registeredValue")}
                  </p>
                </div>
                <div>
                  <p className="caption text-[var(--color-ink-50)] mb-2">
                    {t("vision.group")}
                  </p>
                  <p className="font-display text-2xl md:text-3xl">
                    {t("vision.groupValue")}
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
