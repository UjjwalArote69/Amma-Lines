import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import Button from "../../components/ui/Button";
import SEO from "../../components/common/SEO";
import PageMasthead from "../../components/common/PageMasthead";
import {
  company,
  timeline,
  values,
  leadership,
  awards,
} from "../../data/company";

gsap.registerPlugin(ScrollTrigger);

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Amma Lines",
  url: "https://ammalines.com/about",
  mainEntity: {
    "@type": "Organization",
    name: "Amma Lines Pvt. Ltd.",
    foundingDate: "1978-12-13",
    founder: { "@type": "Person", name: "Dr. Meka Papa Rao" },
    parentOrganization: { "@type": "Organization", name: "Meka Group" },
    identifier: {
      "@type": "PropertyValue",
      propertyID: "CIN",
      value: "U74999TN1978PTC007674",
    },
  },
};

const About = () => {
  const ref = useRef(null);
  const { t } = useTranslation();

  useGSAP(() => {
    gsap.fromTo(
      ".a-line",
      { y: "110%" },
      { y: "0%", duration: 1.2, stagger: 0.07, ease: "power2.out", delay: 0.2 }
    );
    gsap.from(".a-fade", {
      opacity: 0,
      y: 16,
      duration: 1,
      stagger: 0.07,
      delay: 0.5,
      ease: "power3.out",
    });
    gsap.from(".tl-row", {
      scrollTrigger: { trigger: ".tl-section", start: "top 78%", once: true },
      y: 24,
      opacity: 0,
      duration: 0.8,
      stagger: 0.06,
      ease: "power3.out",
    });
    gsap.from(".val-card", {
      scrollTrigger: { trigger: ".val-section", start: "top 78%", once: true },
      y: 24,
      opacity: 0,
      duration: 0.8,
      stagger: 0.06,
      ease: "power3.out",
    });
    gsap.from(".tm-card", {
      scrollTrigger: { trigger: ".tm-section", start: "top 78%", once: true },
      y: 30,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: "power3.out",
    });
    gsap.from(".aw-row", {
      scrollTrigger: { trigger: ".aw-section", start: "top 80%", once: true },
      y: 18,
      opacity: 0,
      duration: 0.75,
      stagger: 0.06,
      ease: "power3.out",
    });
  }, { scope: ref });

  return (
    <>
      <SEO
        title="The Practice"
        description={`Amma Lines Pvt. Ltd. — incorporated 13 December 1978 by ${company.founder} in Mumbai. Flagship of the Meka Group, ISO-certified, ETInfra 2024 award winner. CIN ${company.cin}.`}
        path="/about"
        jsonLd={aboutJsonLd}
        jsonLdId="ld-about"
      />
      <main
        ref={ref}
        className="w-full min-h-screen overflow-hidden"
        style={{ backgroundColor: "var(--color-bone)", color: "var(--color-ink)" }}
      >
      <PageMasthead
        chapter={t("about.chapter")}
        title={t("about.title")}
        page={`${t("about.pagePrefix")} · ${company.cin}`}
      />

      {/* Lede */}
      <section className="px-6 md:px-12 lg:px-16 pt-12 md:pt-20 pb-24 md:pb-32">
        <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 md:col-span-3">
            <p className="a-fade caption text-[var(--color-ink-50)]">
              {t("about.ledeKicker")}
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h1 className="font-display text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.95] tracking-[-0.02em]">
              <span className="reveal-line">
                <span className="a-line block">{t("about.ledeHeadlineA")}</span>
              </span>
              <span className="reveal-line">
                <span className="a-line block italic text-[var(--color-ink-70)]">
                  {t("about.ledeHeadlineAItalic")}
                </span>
              </span>
            </h1>

            <div className="a-fade mt-14 grid grid-cols-12 gap-6">
              <p className="col-span-12 md:col-span-8 dropcap text-[17px] md:text-[19px] leading-[1.7] text-[var(--color-ink-80)] max-w-[58ch]">
                {t("about.ledeBody", { founder: company.founder })}
              </p>
              <div className="col-span-6 md:col-span-2">
                <p className="caption text-[var(--color-ink-50)] mb-2">
                  {t("about.founded")}
                </p>
                <p className="font-display tabular text-3xl md:text-4xl">
                  {t("about.foundedValue")}
                </p>
              </div>
              <div className="col-span-6 md:col-span-2">
                <p className="caption text-[var(--color-ink-50)] mb-2">
                  {t("about.legacy")}
                </p>
                <p className="font-display text-3xl md:text-4xl">
                  {t("about.legacyValue")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="val-section px-6 md:px-12 lg:px-16 py-16 md:py-32 border-y"
        style={{
          backgroundColor: "var(--color-paper)",
          borderColor: "var(--color-ink-12)",
        }}
      >
        <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-4 md:gap-10">
          <div className="col-span-12 md:col-span-4">
            <p className="caption text-[var(--color-ink-50)] mb-6">
              {t("about.valuesKicker")}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              {t("about.valuesHeadline")}<br />
              <em className="italic text-[var(--color-ink-70)]">{t("about.valuesHeadlineItalic")}</em>
            </h2>
            <p className="mt-6 text-[15px] text-[var(--color-ink-70)] leading-relaxed max-w-md">
              {t("about.valuesBody")}
            </p>
          </div>

          <ul className="col-span-12 md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
            {values.map((v) => (
              <li
                key={v.key}
                className="val-card border-t border-[var(--color-ink-20)] pt-6"
              >
                <p className="caption tabular text-[var(--color-ink-40)] mb-4">
                  / {v.n}
                </p>
                <h3 className="font-display text-2xl md:text-3xl leading-tight mb-4">
                  {t(`values.${v.key}.title`)}
                </h3>
                <p className="text-[14px] leading-[1.7] text-[var(--color-ink-70)]">
                  {t(`values.${v.key}.body`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Timeline */}
      <section className="tl-section px-6 md:px-12 lg:px-16 py-16 md:py-32">
        <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 md:col-span-3">
            <p className="caption text-[var(--color-ink-50)] mb-6">
              {t("about.timelineKicker")}
            </p>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">
              {t("about.timelineHeadline")}<br />
              <em className="italic text-[var(--color-ink-70)]">{t("about.timelineHeadlineItalic")}</em>
            </h2>
          </div>

          <ul className="col-span-12 md:col-span-9 flex flex-col">
            {timeline.map((tl, i) => (
              <li
                key={tl.key}
                className={`tl-row grid grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-t border-[var(--color-ink-12)] ${
                  i === timeline.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="col-span-4 md:col-span-2 font-display tabular text-3xl md:text-5xl leading-none">
                  {tl.year}
                </span>
                <div className="col-span-8 md:col-span-4">
                  <h3 className="caption text-[var(--color-ink)]">
                    {t(`timeline.${tl.key}.title`)}
                  </h3>
                </div>
                <p className="col-span-12 md:col-span-6 text-[15px] md:text-[16px] leading-relaxed text-[var(--color-ink-70)] max-w-[52ch]">
                  {t(`timeline.${tl.key}.body`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recognition */}
      <section
        className="aw-section px-6 md:px-12 lg:px-16 py-16 md:py-32 border-t"
        style={{ borderColor: "var(--color-ink-12)" }}
      >
        <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 md:col-span-3">
            <p className="caption text-[var(--color-ink-50)] mb-6">
              {t("about.recognitionKicker")}
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] max-w-3xl">
              {t("about.recognitionHeadline")}<br />
              <em className="italic text-[var(--color-ink-70)]">{t("about.recognitionHeadlineItalic")}</em>
            </h2>
            <ul className="mt-12 flex flex-col border-t border-[var(--color-ink-20)]">
              {awards.map((a) => (
                <li
                  key={a.key}
                  className="aw-row grid grid-cols-12 gap-4 md:gap-8 py-6 md:py-8 border-b border-[var(--color-ink-12)]"
                >
                  <span className="col-span-3 md:col-span-2 caption tabular text-[var(--color-ink-70)]">
                    {a.year}
                  </span>
                  <h3 className="col-span-9 md:col-span-6 font-display text-xl md:text-2xl leading-tight">
                    {t(`awards.${a.key}.title`)}
                  </h3>
                  <p className="col-span-12 md:col-span-4 caption text-[var(--color-ink-50)] md:text-end">
                    {t(`awards.${a.key}.body`)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section
        className="tm-section px-6 md:px-12 lg:px-16 py-16 md:py-32 border-t"
        style={{ borderColor: "var(--color-ink-12)" }}
      >
        <div className="max-w-[1500px] mx-auto">
          <div className="grid grid-cols-12 gap-4 md:gap-6 mb-16">
            <div className="col-span-12 md:col-span-3">
              <p className="caption text-[var(--color-ink-50)]">
                {t("about.leadershipKicker")}
              </p>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] max-w-3xl">
                {t("about.leadershipHeadline")}<br />
                <em className="italic text-[var(--color-ink-70)]">
                  {t("about.leadershipHeadlineItalic")}
                </em>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {leadership.map((p, i) => (
              <article key={p.key} className="tm-card group">
                <div className="flex items-center justify-between mb-3">
                  <span className="caption tabular text-[var(--color-ink-40)]">
                    / 0{i + 1}
                  </span>
                  <span className="caption text-[var(--color-ink-50)]">
                    {t(`leadership.${p.key}.role`)}
                  </span>
                </div>
                <div className="overflow-hidden h-[440px] md:h-[540px] mb-5 bg-[var(--color-ink-08)]">
                  <img loading="lazy" decoding="async"
                    src={p.img}
                    alt={p.name}
                    className="hover-colorize w-full h-full object-cover duotone group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="font-display text-2xl md:text-3xl mb-3">
                  {p.name}
                </h3>
                <p className="text-[14px] leading-[1.7] text-[var(--color-ink-70)] max-w-sm">
                  {t(`leadership.${p.key}.bio`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-6 md:px-12 lg:px-16 py-16 md:py-32 border-t"
        style={{
          backgroundColor: "var(--color-ink)",
          color: "var(--color-bone)",
          borderColor: "var(--color-ink-12)",
        }}
      >
        <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-9">
            <p className="caption text-[var(--color-bone-50)] mb-6">
              {t("about.ctaKicker")}
            </p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05]">
              {t("about.ctaHeadline")}<br />
              <em className="italic text-[var(--color-bone-70)]">
                {t("about.ctaHeadlineItalic")}
              </em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-3 flex md:justify-end">
            <Button to="/contact" variant="primary-light">
              {t("buttons.beginProject")}
            </Button>
          </div>
        </div>
      </section>
      </main>
    </>
  );
};

export default About;
