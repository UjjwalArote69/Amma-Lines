import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import { certifications } from "../../../data/company";
import { derivedStats } from "../../../data/projects";

gsap.registerPlugin(ScrollTrigger);

const StatsSection = () => {
  const ref = useRef(null);
  const { t } = useTranslation();

  const stats = [
    {
      n: t("stats.card1Number"),
      unit: "",
      label: t("stats.card1Label"),
      method: t("stats.card1Method"),
    },
    {
      n: `${derivedStats.dredgedVolumeMillionM3}`,
      unit: t("stats.card2Unit"),
      label: t("stats.card2Label"),
      method: t("stats.card2Method"),
    },
    {
      n: "5.7",
      unit: t("stats.card3Unit"),
      label: t("stats.card3Label"),
      method: t("stats.card3Method"),
    },
    {
      n: t("stats.card4Number"),
      unit: t("stats.card4Unit"),
      label: t("stats.card4Label"),
      method: t("stats.card4Method"),
    },
  ];

  useGSAP(() => {
    gsap.from(".st", {
      scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: "power2.out",
    });
    gsap.from(".cert-row", {
      scrollTrigger: { trigger: ".certs-block", start: "top 85%", once: true },
      opacity: 0,
      y: 12,
      duration: 0.7,
      stagger: 0.05,
      ease: "power3.out",
    });
  }, { scope: ref });

  return (
    <section
      ref={ref}
      className="w-full px-6 md:px-12 lg:px-16 py-20 md:py-28 border-y"
      style={{
        backgroundColor: "var(--color-bone)",
        borderColor: "var(--color-ink-12)",
      }}
    >
      <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 md:col-span-3 mb-8 md:mb-0">
          <p className="caption text-[var(--color-ink-50)]">
            {t("stats.kicker")}
          </p>
          <p className="caption tabular text-[var(--color-ink-40)] mt-3">
            {t("stats.subtitle")}
          </p>
        </div>

        <div className="col-span-12 md:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-10">
          {stats.map((s, i) => (
            <div
              key={i}
              className="st flex flex-col border-t border-[var(--color-ink-20)] pt-4"
            >
              <span className="caption tabular text-[var(--color-ink-40)] mb-4">
                / {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-display tabular leading-[0.9] text-[var(--color-ink)] text-[56px] md:text-[78px] lg:text-[92px]">
                  {s.n}
                </span>
                {s.unit && (
                  <span className="caption tabular text-[var(--color-ink-70)]">
                    {s.unit}
                  </span>
                )}
              </div>
              <span className="caption mt-3 text-[var(--color-ink-80)]">
                {s.label}
              </span>
              <span className="text-[13px] leading-[1.55] text-[var(--color-ink-50)] mt-2 max-w-[26ch]">
                {s.method}
              </span>
            </div>
          ))}
        </div>

        <div className="col-span-12 mt-16 md:mt-20 certs-block">
          <div className="grid grid-cols-12 gap-4 md:gap-6 items-start">
            <p className="col-span-12 md:col-span-3 caption text-[var(--color-ink-50)]">
              {t("stats.accredited")}
            </p>
            <dl className="col-span-12 md:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {certifications.map((c, i) => (
                <div
                  key={c.k}
                  className="cert-row flex items-baseline gap-6 border-t border-[var(--color-ink-12)] pt-4"
                >
                  <span className="caption tabular text-[var(--color-ink-40)]">
                    /0{i + 1}
                  </span>
                  <div className="flex flex-col">
                    <dt className="caption text-[var(--color-ink-50)]">
                      {t(`certifications.${c.k}`, c.k)}
                    </dt>
                    <dd className="font-display text-xl md:text-2xl text-[var(--color-ink)] mt-1">
                      {c.v}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
