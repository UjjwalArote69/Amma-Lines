import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLocation } from "react-router";
import Button from "../../components/ui/Button";
import SEO from "../../components/common/SEO";
import { services } from "../../data/services";

gsap.registerPlugin(ScrollTrigger);

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Amma Lines services",
  url: "https://ammalines.com/services",
  numberOfItems: services.length,
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.title,
    url: `https://ammalines.com/services#${s.slug}`,
    description: s.body,
  })),
};

const Services = () => {
  const ref = useRef(null);
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }
  }, [hash]);

  useGSAP(() => {
    gsap.fromTo(
      ".s-line",
      { y: "110%" },
      { y: "0%", duration: 1.2, stagger: 0.07, ease: "power2.out", delay: 0.2 }
    );
    gsap.from(".s-fade", {
      opacity: 0,
      y: 16,
      duration: 1,
      stagger: 0.07,
      delay: 0.5,
      ease: "power3.out",
    });

    const rows = gsap.utils.toArray(".s-row");
    rows.forEach((row) => {
      gsap.fromTo(
        row.querySelector(".s-content"),
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: row, start: "top 85%" },
        }
      );
      const wrap = row.querySelector(".s-img-wrap");
      const img = row.querySelector("img");
      if (wrap && img) {
        gsap.fromTo(
          wrap,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.4,
            ease: "power2.inOut",
            scrollTrigger: { trigger: row, start: "top 80%" },
          }
        );
        gsap.fromTo(
          img,
          { y: "-8%" },
          {
            y: "8%",
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    });
  }, { scope: ref });

  return (
    <>
      <SEO
        title="Services"
        description="Twelve disciplines delivered in-house by Amma Lines — breakwaters, piling, sheet piling, pile jetties, block jetties, RO-RO jetties, cofferdams, caissons, well sinking, dredging, soil improvement and technical services."
        path="/services"
        jsonLd={servicesJsonLd}
        jsonLdId="ld-services"
      />
      <main
        ref={ref}
        className="w-full min-h-screen overflow-hidden"
        style={{ backgroundColor: "var(--color-bone)", color: "var(--color-ink)" }}
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
              III · Services
            </span>
            <span className="caption text-[var(--color-ink-50)] hidden md:inline">
              Twelve Disciplines, In-House
            </span>
            <span className="caption tabular text-[var(--color-ink-50)]">
              01 — 12
            </span>
          </div>
          <div
            className="h-[1px] w-full"
            style={{ backgroundColor: "var(--color-ink-12)" }}
          />
        </div>
      </div>

      {/* Lede */}
      <section className="px-6 md:px-12 lg:px-16 pt-12 md:pt-20 pb-16 md:pb-24">
        <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 md:col-span-3">
            <p className="s-fade caption text-[var(--color-ink-50)]">
              What we practice
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h1 className="font-display text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.95] tracking-[-0.02em]">
              <span className="reveal-line">
                <span className="s-line block">Twelve disciplines</span>
              </span>
              <span className="reveal-line">
                <span className="s-line block italic text-[var(--color-ink-70)]">
                  one practice
                </span>
              </span>
              <span className="reveal-line">
                <span className="s-line block">under one roof.</span>
              </span>
            </h1>

            <p className="s-fade mt-12 max-w-2xl text-[17px] md:text-[19px] leading-relaxed text-[var(--color-ink-70)]">
              Every discipline below is delivered by our own engineers,
              crews and fleet. We do not mediate marine works.
            </p>
          </div>
        </div>
      </section>

      {/* Index */}
      <section
        className="px-6 md:px-12 lg:px-16 py-8 border-y"
        style={{
          backgroundColor: "var(--color-paper)",
          borderColor: "var(--color-ink-12)",
        }}
      >
        <div className="max-w-[1500px] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-3 md:gap-x-6">
          {services.map((s) => (
            <a
              key={s.n}
              href={`#${s.slug}`}
              className="flex items-baseline gap-2 group"
            >
              <span className="caption tabular text-[var(--color-ink-40)]">
                /{s.n}
              </span>
              <span className="caption text-[var(--color-ink-70)] group-hover:text-[var(--color-marine)] transition-colors">
                {s.title}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Services list */}
      <section className="px-6 md:px-12 lg:px-16">
        <div className="max-w-[1500px] mx-auto flex flex-col">
          {services.map((s, i) => (
            <article
              key={s.slug}
              id={s.slug}
              className={`s-row scroll-mt-28 grid grid-cols-12 gap-6 md:gap-10 py-20 md:py-28 ${
                i !== 0 ? "border-t border-[var(--color-ink-12)]" : ""
              }`}
            >
              <div className="col-span-12 md:col-span-2 flex md:flex-col justify-between md:justify-start gap-4 md:gap-10">
                <span className="caption tabular text-[var(--color-ink-40)]">
                  / {s.n}
                </span>
                <span className="caption text-[var(--color-ink-70)]">
                  {s.short}
                </span>
              </div>

              <div className="s-content col-span-12 md:col-span-5 flex flex-col gap-6">
                <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05]">
                  {s.title}
                </h2>
                <p className="text-[17px] leading-relaxed text-[var(--color-ink-70)] max-w-xl">
                  {s.body}
                </p>
                <ul className="mt-2 flex flex-col gap-1">
                  {s.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-3 text-[14px] leading-relaxed text-[var(--color-ink-70)] border-t border-[var(--color-ink-12)] pt-2 first:border-t-0 first:pt-0"
                    >
                      <span className="caption tabular text-[var(--color-ink-40)] pt-[2px]">
                        —
                      </span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <figure className="col-span-12 md:col-span-5">
                <div className="s-img-wrap overflow-hidden w-full h-[360px] md:h-[460px] bg-[var(--color-ink-08)]">
                  <img loading="lazy" decoding="async"
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover scale-[1.08] duotone"
                  />
                </div>
                <figcaption className="mt-3 flex items-start justify-between gap-4 caption text-[var(--color-ink-50)]">
                  <span>
                    Fig. {s.n} · {s.title}
                  </span>
                  <span className="tabular">In-house</span>
                </figcaption>
              </figure>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-6 md:px-12 lg:px-16 py-28 md:py-40 border-t"
        style={{
          backgroundColor: "var(--color-ink)",
          color: "var(--color-bone)",
          borderColor: "var(--color-ink-12)",
        }}
      >
        <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-9">
            <p className="caption text-[var(--color-bone-50)] mb-6">
              Technical enquiry
            </p>
            <h2 className="font-display text-5xl md:text-7xl leading-[1.05]">
              Considering a marine work?<br />
              <em className="italic text-[var(--color-bone-70)]">
                Let us walk the site with you.
              </em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-3 flex md:justify-end">
            <Button to="/contact" variant="primary-light">
              Begin a conversation
            </Button>
          </div>
        </div>
      </section>
      </main>
    </>
  );
};

export default Services;
