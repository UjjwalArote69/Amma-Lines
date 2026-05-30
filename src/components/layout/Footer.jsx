import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import { company, contact, social, certifications } from "../../data/company";

gsap.registerPlugin(ScrollTrigger);

const navIndex = [
  { key: "home", to: "/" },
  { key: "about", to: "/about" },
  { key: "projects", to: "/projects" },
  { key: "services", to: "/services" },
  { key: "careers", href: "https://meka.com/careers", external: true },
  { key: "contact", to: "/contact" },
];

const Footer = () => {
  const ref = useRef(null);
  const { t } = useTranslation();

  useGSAP(() => {
    /* Using gsap.from (not fromTo) + small pixel offsets — if a tween
       somehow doesn't play, elements remain at their natural, visible
       position. No trap-door state where content stays offscreen. */
    gsap.from(".ft-reveal", {
      opacity: 0,
      y: 28,
      duration: 1.0,
      stagger: 0.06,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        once: true,
      },
    });
  }, { scope: ref });

  const year = new Date().getFullYear();

  return (
    <footer
      ref={ref}
      className="relative w-full border-t"
      style={{
        backgroundColor: "var(--color-ink)",
        color: "var(--color-bone)",
        borderColor: "var(--color-ink-12)",
      }}
    >
      {/* Masthead call */}
      <div
        className="px-6 md:px-12 lg:px-16 pt-20 md:pt-28 pb-14 md:pb-20 border-b"
        style={{ borderColor: "var(--color-bone-15)" }}
      >
        <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 md:col-span-3">
            <p className="ft-reveal caption text-[var(--color-bone-50)]">
              {t("footer.correspondence")}
            </p>
            <p className="ft-reveal caption tabular text-[var(--color-bone-50)] mt-3">
              {t("footer.imprint")}
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="ft-reveal font-display text-5xl md:text-7xl lg:text-[6.5rem] leading-[1.0] text-[var(--color-bone)] max-w-4xl">
              {t("footer.leadHeadline")}{" "}
              <em className="italic text-[var(--color-bone-70)]">
                {t("footer.leadHeadlineItalic")}
              </em>
            </h2>

            <div className="ft-reveal mt-10 md:mt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <p className="max-w-xl text-[17px] leading-relaxed text-[var(--color-bone-70)]">
                {t("footer.leadBody")}
              </p>
              <div className="self-start">
                <Button to="/contact" variant="primary-light">
                  {t("buttons.beginProject")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Imprint grid */}
      <div
        className="px-6 md:px-12 lg:px-16 py-14 md:py-20 border-b"
        style={{ borderColor: "var(--color-bone-15)" }}
      >
        <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-8 md:gap-6">
          {/* Office */}
          <div className="ft-reveal col-span-12 md:col-span-4">
            <p className="caption text-[var(--color-bone-50)] mb-5">
              {t("footer.headOffice")}
            </p>
            <address className="not-italic font-display text-xl md:text-2xl leading-[1.35] text-[var(--color-bone)]">
              {contact.address.line1}
              <br />
              {contact.address.line2}
              <br />
              {contact.address.city} {contact.address.pin} ·{" "}
              {contact.address.country}
            </address>
          </div>

          {/* Direct */}
          <div className="ft-reveal col-span-6 md:col-span-3">
            <p className="caption text-[var(--color-bone-50)] mb-5">
              {t("footer.direct")}
            </p>
            <a
              href={`tel:${contact.phoneTel}`}
              className="text-[15px] leading-relaxed text-[var(--color-bone-70)] hover:text-[var(--color-bone)] transition-colors tabular block"
            >
              {contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${contact.emailGeneral}`}
              className="mt-3 inline-block text-[15px] text-[var(--color-bone)] border-b border-[var(--color-bone-30)] hover:border-[var(--color-bone)] transition-colors"
            >
              {contact.emailGeneral}
            </a>
            <p className="caption text-[var(--color-bone-50)] mt-5 leading-relaxed">
              {t("contact.hoursValue")}
            </p>
          </div>

          {/* Index */}
          <div className="ft-reveal col-span-6 md:col-span-2">
            <p className="caption text-[var(--color-bone-50)] mb-5">
              {t("nav.index")}
            </p>
            <ul className="flex flex-col gap-2">
              {navIndex.map((item) =>
                item.external ? (
                  <li key={item.key}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] text-[var(--color-bone-70)] hover:text-[var(--color-bone)] transition-colors inline-flex items-baseline gap-1.5"
                    >
                      {t(`nav.${item.key}`)}
                      <span
                        aria-hidden
                        className="text-[11px] text-[var(--color-bone-50)]"
                      >
                        <span className="rtl-flip">↗</span>
                      </span>
                    </a>
                  </li>
                ) : (
                  <li key={item.key}>
                    <Link
                      to={item.to}
                      className="text-[15px] text-[var(--color-bone-70)] hover:text-[var(--color-bone)] transition-colors"
                    >
                      {t(`nav.${item.key}`)}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Accreditation + Social */}
          <div className="ft-reveal col-span-12 md:col-span-3">
            <p className="caption text-[var(--color-bone-50)] mb-5">
              {t("footer.accreditation")}
            </p>
            <ul className="flex flex-col gap-1 text-[15px] leading-relaxed text-[var(--color-bone-70)]">
              {certifications.map((c) => (
                <li key={c.k} className="flex items-baseline gap-3">
                  <span className="caption tabular text-[var(--color-bone-50)] shrink-0 min-w-[72px]">
                    {c.k}
                  </span>
                  <span>{c.v}</span>
                </li>
              ))}
            </ul>
            <p className="caption text-[var(--color-bone-50)] mt-6 mb-3">
              {t("footer.follow")}
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="caption text-[var(--color-bone-70)] hover:text-[var(--color-bone)] transition-colors inline-flex items-baseline gap-1"
                >
                  {s.label}
                  <span
                    aria-hidden
                    className="text-[10px] text-[var(--color-bone-50)]"
                  >
                    <span className="rtl-flip">↗</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Oversized wordmark with seal */}
      <div
        className="px-6 md:px-12 lg:px-16 py-10 md:py-16 border-b"
        style={{ borderColor: "var(--color-bone-15)" }}
      >
        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h3
            className="font-display text-[18vw] sm:text-[22vw] md:text-[12vw] lg:text-[10vw] leading-[0.92] tracking-[-0.03em] text-[var(--color-bone)] pb-[0.05em]"
            aria-label={`${company.name} — a ${company.parent} company`}
          >
            Amma<span className="italic text-[var(--color-bone-70)]"> Lines</span>
          </h3>
          <div className="flex items-end md:flex-col md:items-end gap-4 md:gap-3 md:pb-3 shrink-0">
            <div
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center rounded-full p-1.5 md:p-2 shrink-0"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <img loading="lazy" decoding="async"
                src="/logo/meka_amma_lines-removebg-preview.webp"
                alt="Amma Lines seal"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="caption text-[var(--color-bone-50)] tabular self-end md:self-auto">
              {t("footer.since")}
            </span>
          </div>
        </div>
      </div>

      {/* Colophon */}
      <div className="px-6 md:px-12 lg:px-16 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <p className="caption text-[var(--color-bone-50)]">
          {t("footer.copyright", {
            year,
            name: company.fullName,
            parent: company.parent,
          })}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link
            to="/privacy"
            className="caption text-[var(--color-bone-50)] hover:text-[var(--color-bone)] transition-colors"
          >
            {t("footer.privacy")}
          </Link>
          <Link
            to="/terms"
            className="caption text-[var(--color-bone-50)] hover:text-[var(--color-bone)] transition-colors"
          >
            {t("footer.terms")}
          </Link>
          <span className="caption text-[var(--color-bone-50)] tabular">
            CIN · {company.cin}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
