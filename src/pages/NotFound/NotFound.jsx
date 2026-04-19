import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "../../components/ui/Button";
import SEO from "../../components/common/SEO";

const NotFound = () => {
  const ref = useRef(null);

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
        {/* Masthead */}
        <div className="px-6 md:px-12 lg:px-16 pt-32 md:pt-40">
          <div className="max-w-[1500px] mx-auto">
            <div
              className="h-[1px] w-full"
              style={{ backgroundColor: "var(--color-ink)" }}
            />
            <div className="flex items-center justify-between py-3">
              <span className="caption text-[var(--color-ink)]">
                Page not found
              </span>
              <span className="caption text-[var(--color-ink-50)] hidden md:inline">
                The address is not on the chart
              </span>
              <span className="caption tabular text-[var(--color-ink-50)]">
                Err. 404
              </span>
            </div>
            <div
              className="h-[1px] w-full"
              style={{ backgroundColor: "var(--color-ink-12)" }}
            />
          </div>
        </div>

        {/* Lede */}
        <section className="px-6 md:px-12 lg:px-16 pt-12 md:pt-20 pb-24 md:pb-32">
          <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 md:col-span-3">
              <p className="nf-fade caption text-[var(--color-ink-50)]">
                A chart error
              </p>
              <p className="nf-fade caption tabular text-[var(--color-ink-40)] mt-3">
                Bearing · unknown
              </p>
            </div>

            <div className="col-span-12 md:col-span-9">
              <h1 className="font-display text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.95] tracking-[-0.02em]">
                <span className="reveal-line">
                  <span className="nf-line block">This page was</span>
                </span>
                <span className="reveal-line">
                  <span className="nf-line block italic text-[var(--color-marine)]">
                    never charted.
                  </span>
                </span>
              </h1>

              <p className="nf-fade mt-10 max-w-2xl text-[17px] md:text-[19px] leading-[1.6] text-[var(--color-ink-70)]">
                The address you followed does not exist on the Amma Lines
                site. It may have been moved, renamed, or the link may be
                mistyped. Every documented work and page sits on the paths
                below.
              </p>

              <div className="nf-fade mt-10 md:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <Button to="/" variant="primary">
                  Return home
                </Button>
                <Button to="/projects" variant="ghost">
                  Browse projects
                </Button>
              </div>

              {/* Site index */}
              <div className="nf-fade mt-16 md:mt-20 border-t border-[var(--color-ink-12)] pt-8">
                <p className="caption text-[var(--color-ink-50)] mb-5">
                  Index
                </p>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
                  {[
                    ["Home", "/"],
                    ["About", "/about"],
                    ["Services", "/services"],
                    ["Projects", "/projects"],
                    ["Contact", "/contact"],
                  ].map(([label, to]) => (
                    <li key={label}>
                      <a
                        href={to}
                        className="caption text-[var(--color-ink-70)] hover:text-[var(--color-marine)] transition-colors"
                      >
                        {label}
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
