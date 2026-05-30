import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import Button from "../../../components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const specKeys = [
  "project",
  "location",
  "commissioned",
  "discipline",
  "breakwaterLength",
  "dredgedVolume",
  "client",
  "scope",
];

const FeatureProjectSection = () => {
  const ref = useRef(null);
  const { t } = useTranslation();

  useGSAP(() => {
    gsap.fromTo(
      ".f-line",
      { y: "105%" },
      {
        y: "0%",
        duration: 1.0,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 72%", once: true },
      }
    );

    gsap.from(".f-fade", {
      scrollTrigger: { trigger: ref.current, start: "top 72%", once: true },
      opacity: 0,
      y: 16,
      duration: 0.9,
      stagger: 0.05,
      ease: "power3.out",
    });

    const wraps = gsap.utils.toArray(".f-mask");
    wraps.forEach((w, i) => {
      gsap.fromTo(
        w,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power2.inOut",
          delay: i * 0.08,
          scrollTrigger: { trigger: w, start: "top 85%", once: true },
        }
      );
    });

    const isFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    if (isFinePointer) {
      gsap.to(".f-parallax-a", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".f-parallax-b", {
        yPercent: 10,
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
      className="relative w-full px-6 md:px-12 lg:px-16 py-20 md:py-40"
      style={{ backgroundColor: "var(--color-bone)" }}
    >
      <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 md:col-span-3">
          <p className="f-fade caption text-[var(--color-ink-50)]">
            {t("feature.kicker")}
          </p>
          <p className="f-fade caption tabular text-[var(--color-ink-40)] mt-3">
            {t("feature.study")}
          </p>
        </div>

        <div className="col-span-12 md:col-span-9">
          <h2 className="font-display text-5xl md:text-7xl lg:text-[7rem] leading-[1.0] tracking-[-0.02em]">
            <span className="reveal-line">
              <span className="f-line block">{t("feature.headlineA")}</span>
            </span>
            <span className="reveal-line">
              <span className="f-line block italic text-[var(--color-ink-70)]">
                {t("feature.headlineAItalic")}
              </span>
            </span>
            <span className="reveal-line">
              <span className="f-line block">{t("feature.headlineB")}</span>
            </span>
          </h2>
        </div>
      </div>

      {/* Image triptych */}
      <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-4 md:gap-6 mt-16 md:mt-24">
        <figure className="col-span-12 md:col-span-7 relative">
          <div className="f-mask overflow-hidden h-[420px] md:h-[640px] bg-[var(--color-ink-08)]">
            <img loading="lazy" decoding="async"
              src="/hero/karaikal_port.webp"
              alt={t("feature.fig1")}
              className="f-parallax-a w-full h-full object-cover duotone scale-[1.08]"
            />
          </div>
          <figcaption className="mt-3 flex items-start justify-between gap-4 caption text-[var(--color-ink-50)]">
            <span>{t("feature.fig1")}</span>
            <span className="tabular">{t("feature.fig1Metric")}</span>
          </figcaption>
        </figure>

        <div className="col-span-12 md:col-span-5 flex flex-col gap-6 md:gap-8">
          <figure>
            <div className="f-mask overflow-hidden h-[220px] md:h-[300px] bg-[var(--color-ink-08)]">
              <img loading="lazy" decoding="async"
                src="/hero/ennore_port.webp"
                alt={t("feature.fig2")}
                className="f-parallax-b w-full h-full object-cover duotone scale-[1.08]"
              />
            </div>
            <figcaption className="mt-3 caption text-[var(--color-ink-50)]">
              {t("feature.fig2")}
            </figcaption>
          </figure>

          <figure>
            <div className="f-mask overflow-hidden h-[220px] md:h-[300px] bg-[var(--color-ink-08)]">
              <img loading="lazy" decoding="async"
                src="/hero/vision_section.webp"
                alt={t("feature.fig3")}
                className="w-full h-full object-cover duotone scale-[1.08]"
              />
            </div>
            <figcaption className="mt-3 caption text-[var(--color-ink-50)]">
              {t("feature.fig3")}
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Narrative + specification */}
      <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-4 md:gap-6 mt-20 md:mt-28">
        <div className="col-span-12 md:col-span-7">
          <p className="f-fade font-display text-2xl md:text-4xl leading-[1.25] text-[var(--color-ink-80)] max-w-2xl">
            {t("feature.narrative1")}
          </p>

          <p className="f-fade mt-6 text-[17px] leading-relaxed text-[var(--color-ink-70)] max-w-xl">
            {t("feature.narrative2")}
          </p>

          <div className="f-fade mt-10">
            <Button to="/projects" variant="primary">
              {t("buttons.reviewArchive")}
            </Button>
          </div>
        </div>

        <div className="col-span-12 md:col-span-5">
          <p className="f-fade caption text-[var(--color-ink-50)] mb-6">
            {t("feature.specification")}
          </p>
          <dl className="f-fade divide-y divide-[var(--color-ink-12)] border-y border-[var(--color-ink-12)]">
            {specKeys.map((k) => (
              <div
                key={k}
                className="grid grid-cols-12 gap-4 py-3 text-[15px]"
              >
                <dt className="col-span-5 caption text-[var(--color-ink-50)] pt-[3px]">
                  {t(`feature.spec.${k}`)}
                </dt>
                <dd className="col-span-7 text-[var(--color-ink)] tabular">
                  {t(`feature.spec.${k}Value`)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default FeatureProjectSection;
