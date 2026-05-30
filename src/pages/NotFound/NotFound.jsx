import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import Button from "../../components/ui/Button";
import SEO from "../../components/common/SEO";
import PageMasthead from "../../components/common/PageMasthead";

const NotFound = () => {
  const ref = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    // Send 404 signal to crawlers that execute JS (e.g. pre-rendering proxies).
    if (typeof window !== "undefined") {
      window.prerenderReady = true;
    }
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      ".nf-line",
      { y: "110%" },
      { y: "0%", duration: 1.1, stagger: 0.08, ease: "power2.out", delay: 0.2 }
    );
    gsap.from(".nf-fade", {
      opacity: 0,
      y: 18,
      duration: 1.0,
      stagger: 0.07,
      delay: 0.55,
      ease: "power2.out",
    });
  }, { scope: ref });

  const indexLinks = [
    ["home", "/"],
    ["about", "/about"],
    ["services", "/services"],
    ["projects", "/projects"],
    ["contact", "/contact"],
  ];

  return (
    <>
      <SEO
        title="Page not charted (404)"
        description="The page you were looking for does not exist on the Amma Lines site."
        path="/404"
        noindex
      />

      <main
        ref={ref}
        className="w-full min-h-screen overflow-hidden"
        style={{
          backgroundColor: "var(--color-bone)",
          color: "var(--color-ink)",
        }}
      >
        <PageMasthead
          chapter={t("notFound.title")}
          title={t("notFound.subtitle")}
          page={t("notFound.code")}
        />

        {/* Lede */}
        <section className="px-6 md:px-12 lg:px-16 pt-12 md:pt-20 pb-24 md:pb-32">
          <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 md:col-span-3">
              <p className="nf-fade caption text-[var(--color-ink-50)]">
                {t("notFound.kicker")}
              </p>
              <p className="nf-fade caption tabular text-[var(--color-ink-40)] mt-3">
                {t("notFound.bearing")}
              </p>
            </div>

            <div className="col-span-12 md:col-span-9">
              <h1 className="font-display text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.95] tracking-[-0.02em]">
                <span className="reveal-line">
                  <span className="nf-line block">{t("notFound.headlineA")}</span>
                </span>
                <span className="reveal-line">
                  <span className="nf-line block italic text-[var(--color-marine)]">
                    {t("notFound.headlineAItalic")}
                  </span>
                </span>
              </h1>

              <p className="nf-fade mt-10 max-w-2xl text-[17px] md:text-[19px] leading-[1.6] text-[var(--color-ink-70)]">
                {t("notFound.body")}
              </p>

              <div className="nf-fade mt-10 md:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <Button to="/" variant="primary">
                  {t("buttons.returnHome")}
                </Button>
                <Button to="/projects" variant="ghost">
                  {t("buttons.browseProjects")}
                </Button>
              </div>

              {/* Site index */}
              <div className="nf-fade mt-16 md:mt-20 border-t border-[var(--color-ink-12)] pt-8">
                <p className="caption text-[var(--color-ink-50)] mb-5">
                  {t("notFound.indexLabel")}
                </p>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
                  {indexLinks.map(([key, to]) => (
                    <li key={key}>
                      <a
                        href={to}
                        className="caption text-[var(--color-ink-70)] hover:text-[var(--color-marine)] transition-colors"
                      >
                        {t(`nav.${key}`)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default NotFound;
