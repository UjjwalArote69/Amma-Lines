import { useRef, useState, useMemo, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import Button from "../../components/ui/Button";
import SEO from "../../components/common/SEO";
import PageMasthead from "../../components/common/PageMasthead";
import { contact, certifications } from "../../data/company";
import { services } from "../../data/services";

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Amma Lines",
  url: "https://ammalines.com/contact",
  mainEntity: {
    "@type": "Organization",
    name: "Amma Lines Pvt. Ltd.",
    telephone: "+91-22-4089-0000",
    email: "mail@meka.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "20 Madhuli, Dr. A. B. Road, Worli",
      addressLocality: "Mumbai",
      postalCode: "400018",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    openingHours: "Mo-Fr 09:30-18:30",
  },
};

const topicKeys = [
  "breakwater",
  "jetty",
  "dredging",
  "piling",
  "caisson",
  "technical",
  "general",
];

const BRIEF_MAX = 2000;

/* Derive whether the Mumbai office is currently open (Mon–Fri 09:30–18:30 IST).
   Recomputed on mount; if the user leaves the tab open past a state change,
   they'll see the last snapshot — acceptable for this display, not worth a
   live ticker. */
const getMumbaiOpen = () => {
  const now = new Date();
  const mumbai = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  const day = mumbai.getDay(); // 0=Sun … 6=Sat
  const minutes = mumbai.getHours() * 60 + mumbai.getMinutes();
  const weekday = day >= 1 && day <= 5;
  return weekday && minutes >= 9 * 60 + 30 && minutes < 18 * 60 + 30;
};

/* Shared input classes — bottom-border style that glows marine on focus.
   Mobile gets extra height for tap comfort. */
const inputClass =
  "w-full bg-transparent outline-none text-lg text-[var(--color-ink)] " +
  "placeholder:text-[var(--color-ink-40)] py-3 min-h-[44px] " +
  "border-b border-[var(--color-ink-12)] " +
  "focus:border-[var(--color-marine)] focus:placeholder:text-[var(--color-ink-30)] " +
  "transition-colors duration-300";

const SidePanel = ({ label, children, meta, className = "" }) => (
  <div className={`border-t border-[var(--color-ink-12)] pt-5 ${className}`}>
    <div className="flex items-baseline justify-between gap-4 mb-3">
      <p className="caption text-[var(--color-ink-50)]">{label}</p>
      {meta && <p className="caption tabular text-[var(--color-ink-40)]">{meta}</p>}
    </div>
    {children}
  </div>
);

/* Minimalist nautical bearing diagram — range rings + cardinal crosshair
   with a pulsing marine dot at centre (Mumbai). Decorative only; the
   aria-label carries the meaning. */
const BearingMark = ({ label }) => (
  <svg
    viewBox="0 0 120 120"
    className="h-[96px] w-[96px] md:h-[110px] md:w-[110px] shrink-0"
    role="img"
    aria-label={label}
  >
    {/* Range rings */}
    <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
    <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
    <circle cx="60" cy="60" r="16" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
    {/* Cardinal crosshair */}
    <line x1="4" y1="60" x2="116" y2="60" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
    <line x1="60" y1="4" x2="60" y2="116" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
    {/* Cardinal ticks */}
    <g fill="currentColor" fillOpacity="0.4">
      <rect x="59" y="0" width="2" height="6" />
      <rect x="59" y="114" width="2" height="6" />
      <rect x="0" y="59" width="6" height="2" />
      <rect x="114" y="59" width="6" height="2" />
    </g>
    {/* N label */}
    <text
      x="60"
      y="12"
      textAnchor="middle"
      fontSize="8"
      fontFamily="monospace"
      fill="currentColor"
      fillOpacity="0.5"
      letterSpacing="0.15em"
    >
      N
    </text>
    {/* Centre pulse — Mumbai */}
    <circle cx="60" cy="60" r="6" fill="var(--color-marine)" opacity="0.2">
      <animate
        attributeName="r"
        values="6;14;6"
        dur="2.6s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0.28;0;0.28"
        dur="2.6s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="60" cy="60" r="4" fill="var(--color-marine)" />
  </svg>
);

/* Big tactile contact tile — replaces the small tel/email side-by-side
   blocks with proper tappable targets. */
const ContactTile = ({ icon, label, value, href, tooltip }) => (
  <a
    href={href}
    aria-label={tooltip}
    className="group flex flex-col gap-3 p-5 border border-[var(--color-ink-12)] rounded-sm bg-[var(--color-bone)] hover:border-[var(--color-marine)] transition-colors duration-300"
  >
    <div className="flex items-center justify-between gap-3">
      <p className="caption text-[var(--color-ink-50)]">{label}</p>
      <span
        className="text-[var(--color-ink-30)] group-hover:text-[var(--color-marine)] transition-colors"
        aria-hidden
      >
        {icon}
      </span>
    </div>
    <p className="font-display tabular text-lg md:text-xl text-[var(--color-ink)] group-hover:text-[var(--color-marine-deep)] transition-colors break-all">
      {value}
    </p>
  </a>
);

/* Inline icon SVGs — single-path glyphs, inherit colour via currentColor. */
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293a1 1 0 0 1-1.21.38 12.035 12.035 0 0 1-7.143-7.143 1 1 0 0 1 .38-1.21l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
);

const Contact = () => {
  const ref = useRef(null);
  const { t } = useTranslation();
  const [topic, setTopic] = useState(topicKeys[0]);
  const [brief, setBrief] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isOpen = useMemo(() => getMumbaiOpen(), []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.fromTo(
      ".c-title-line",
      { y: "110%" },
      { y: "0%", duration: 1.2, stagger: 0.08, delay: 0.2 }
    )
      .fromTo(
        ".c-fade",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.06 },
        "-=0.8"
      )
      .fromTo(
        ".form-field",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 },
        "-=0.6"
      );
  }, { scope: ref });

  /* Animate the success panel in when submitted. */
  useEffect(() => {
    if (!submitted) return;
    const el = document.querySelector(".c-success");
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
    );
  }, [submitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setBrief("");
    setTopic(topicKeys[0]);
  };

  const briefCount = brief.length;
  const briefOver = briefCount > BRIEF_MAX;

  return (
    <>
      <SEO
        title="Contact"
        description="Write to Amma Lines. Head office: 20 Madhuli, Dr. A. B. Road, Worli, Mumbai 400 018. Telephone +91 22 4089 0000. Email mail@meka.com."
        path="/contact"
        jsonLd={contactJsonLd}
        jsonLdId="ld-contact"
      />
      <main
        ref={ref}
        className="w-full min-h-screen overflow-hidden"
        style={{ backgroundColor: "var(--color-bone)", color: "var(--color-ink)" }}
      >
      <PageMasthead
        chapter={t("contact.chapter")}
        title={t("contact.title")}
        page={t("contact.region")}
      />

      {/* Lede */}
      <section className="px-6 md:px-12 lg:px-16 pt-12 md:pt-20 pb-14 md:pb-20">
        <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 md:col-span-3">
            <p className="c-fade caption text-[var(--color-ink-50)]">
              {t("contact.ledeKicker")}
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h1 className="font-display text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.95] tracking-[-0.02em]">
              <span className="reveal-line">
                <span className="c-title-line block">{t("contact.ledeHeadlineA")}</span>
              </span>
              <span className="reveal-line">
                <span className="c-title-line block italic text-[var(--color-ink-70)]">
                  {t("contact.ledeHeadlineAItalic")}
                </span>
              </span>
            </h1>

            <p className="c-fade mt-10 max-w-2xl text-lg leading-relaxed text-[var(--color-ink-70)]">
              {t("contact.ledeBody")}
            </p>

            {/* Status row — reply promise + live Mumbai office status */}
            <div className="c-fade mt-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-3 border border-[var(--color-ink-12)] ps-3 pe-4 py-2 rounded-full">
                <span
                  className="h-[7px] w-[7px] rounded-full animate-pulse"
                  style={{ backgroundColor: "var(--color-marine)" }}
                  aria-hidden
                />
                <span className="caption text-[var(--color-ink-70)]">
                  {t("contact.replyBadge")}
                </span>
              </span>
              <span className="inline-flex items-center gap-3 ps-3 pe-4 py-2">
                <span
                  className="h-[7px] w-[7px] rounded-full"
                  style={{
                    backgroundColor: isOpen
                      ? "#34d399" /* emerald green */
                      : "var(--color-ink-30)",
                  }}
                  aria-hidden
                />
                <span className="caption text-[var(--color-ink-70)]">
                  {isOpen ? t("contact.openNow") : t("contact.opensAt")}
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Detail grid */}
      <section className="border-y" style={{ borderColor: "var(--color-ink-12)" }}>
        <div className="max-w-[1500px] mx-auto flex flex-col lg:grid lg:grid-cols-12">
          {/* Sidebar — dossier panel on paper. Sits left on desktop; below form on mobile. */}
          <aside
            className="order-2 lg:order-1 lg:col-span-5 p-8 md:p-12 lg:p-16 border-t lg:border-t-0 lg:border-e flex flex-col gap-10"
            style={{
              borderColor: "var(--color-ink-12)",
              backgroundColor: "var(--color-paper)",
            }}
          >
            {/* Header of the sidebar — address paired with a bearing diagram */}
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-3">
                <p className="caption text-[var(--color-marine-deep)]">
                  {t("contact.region")}
                </p>
                <p className="caption tabular text-[var(--color-ink-40)]">
                  {t("contact.coordinates")}
                </p>
              </div>
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <h2 className="font-display text-3xl md:text-4xl leading-[1.1] text-[var(--color-ink)]">
                    {t("contact.headOffice")}
                  </h2>
                  <address className="not-italic mt-5 font-display text-xl md:text-2xl leading-[1.4] text-[var(--color-ink-80)]">
                    {contact.address.line1}
                    <br />
                    {contact.address.line2}
                    <br />
                    {contact.address.city} {contact.address.pin} ·{" "}
                    {contact.address.country}
                  </address>
                </div>
                <div className="text-[var(--color-ink)] shrink-0">
                  <BearingMark label={t("contact.bearingLabel")} />
                </div>
              </div>
            </div>

            {/* Quick-contact tiles — big tappable targets replacing the
                small tel/email text pair. Call + Email are the fastest
                paths for urgent enquiries on mobile. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ContactTile
                icon={<PhoneIcon />}
                label={t("contact.directLine")}
                value={contact.phoneDisplay}
                href={`tel:${contact.phoneTel}`}
                tooltip={t("contact.callTooltip")}
              />
              <ContactTile
                icon={<MailIcon />}
                label={t("contact.directMail")}
                value={contact.emailGeneral}
                href={`mailto:${contact.emailGeneral}`}
                tooltip={t("contact.mailTooltip")}
              />
            </div>

            <SidePanel
              label={t("contact.hours")}
              meta={isOpen ? t("contact.openNow") : t("contact.closed")}
            >
              <p className="text-[15px] leading-relaxed text-[var(--color-ink-70)] tabular">
                {t("contact.hoursValue")}
              </p>
            </SidePanel>

            <SidePanel label={t("contact.accreditation")}>
              <ul className="flex flex-col gap-1.5 text-[15px] leading-relaxed text-[var(--color-ink-70)]">
                {certifications.map((c) => (
                  <li key={c.k} className="flex items-baseline gap-3">
                    <span className="caption tabular text-[var(--color-ink-40)] shrink-0 min-w-[88px]">
                      {t(`certifications.${c.k}`, c.k)}
                    </span>
                    <span className="tabular">{c.v}</span>
                  </li>
                ))}
              </ul>
            </SidePanel>

            <SidePanel label={t("contact.careers")}>
              <a
                href={`mailto:${contact.emailCareers}`}
                className="text-[15px] text-[var(--color-ink)] border-b border-[var(--color-ink-20)] hover:border-[var(--color-marine)] hover:text-[var(--color-marine)] transition-colors break-all"
              >
                {contact.emailCareers}
              </a>
            </SidePanel>
          </aside>

          {/* Form column */}
          <div className="order-1 lg:order-2 lg:col-span-7 p-8 md:p-12 lg:p-16">
            {submitted ? (
              <div className="c-success flex flex-col gap-8 py-8 md:py-16">
                <div className="flex items-center gap-3">
                  <span
                    className="h-[10px] w-[10px] rounded-full"
                    style={{ backgroundColor: "#34d399" }}
                    aria-hidden
                  />
                  <p className="caption text-[var(--color-marine-deep)]">
                    {t("contact.formKicker")} / {t("contact.sectionProject")}
                  </p>
                </div>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                  {t("contact.successTitle")}
                </h2>
                <p className="max-w-xl text-[17px] leading-[1.7] text-[var(--color-ink-70)]">
                  {t("contact.successBody")}
                </p>
                <div className="pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={resetForm}
                    arrow={false}
                  >
                    {t("contact.successAgain")}
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-end justify-between gap-4 mb-10">
                  <div>
                    <p className="caption text-[var(--color-ink-50)] mb-2">
                      {t("contact.formKicker")}
                    </p>
                    <h2 className="font-display text-3xl md:text-4xl leading-tight">
                      {t("contact.formHeadline")}
                    </h2>
                  </div>
                  <p className="caption tabular text-[var(--color-ink-40)] shrink-0">
                    {services.length} {t("contact.formDisciplinesSuffix")}
                  </p>
                </div>

                <form
                  className="flex flex-col gap-12"
                  onSubmit={handleSubmit}
                >
                  {/* Section 1 — About you */}
                  <fieldset className="flex flex-col gap-6">
                    <legend className="caption text-[var(--color-marine-deep)] mb-2">
                      / {t("contact.sectionYou")}
                    </legend>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-field">
                        <label
                          htmlFor="first-name"
                          className="caption text-[var(--color-ink-50)] block mb-2"
                        >
                          {t("contact.firstName")}
                        </label>
                        <input
                          id="first-name"
                          type="text"
                          autoComplete="given-name"
                          placeholder={t("contact.firstNamePlaceholder")}
                          className={inputClass}
                        />
                      </div>

                      <div className="form-field">
                        <label
                          htmlFor="last-name"
                          className="caption text-[var(--color-ink-50)] block mb-2"
                        >
                          {t("contact.lastName")}
                        </label>
                        <input
                          id="last-name"
                          type="text"
                          autoComplete="family-name"
                          placeholder={t("contact.lastNamePlaceholder")}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label
                        htmlFor="organisation"
                        className="caption text-[var(--color-ink-50)] block mb-2"
                      >
                        {t("contact.organisation")}
                      </label>
                      <input
                        id="organisation"
                        type="text"
                        autoComplete="organization"
                        placeholder={t("contact.organisationPlaceholder")}
                        className={inputClass}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-field">
                        <label
                          htmlFor="email"
                          className="caption text-[var(--color-ink-50)] block mb-2"
                        >
                          {t("contact.emailLabel")}
                        </label>
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          placeholder={t("contact.emailPlaceholder")}
                          className={inputClass}
                        />
                      </div>

                      <div className="form-field">
                        <label
                          htmlFor="phone"
                          className="caption text-[var(--color-ink-50)] block mb-2"
                        >
                          {t("contact.phone")}
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder={t("contact.phonePlaceholder")}
                          className={`${inputClass} tabular`}
                        />
                      </div>
                    </div>
                  </fieldset>

                  {/* Section 2 — About the project */}
                  <fieldset className="flex flex-col gap-6">
                    <legend className="caption text-[var(--color-marine-deep)] mb-2">
                      / {t("contact.sectionProject")}
                    </legend>

                    <div className="form-field">
                      <p className="caption text-[var(--color-ink-50)] mb-3">
                        {t("contact.discipline")}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {topicKeys.map((k) => {
                          const isActive = topic === k;
                          return (
                            <button
                              key={k}
                              type="button"
                              onClick={() => setTopic(k)}
                              className={`caption px-4 py-2 min-h-[40px] rounded-full border transition-all duration-200 ${
                                isActive
                                  ? "text-white border-transparent"
                                  : "text-[var(--color-ink-70)] border-[var(--color-ink-20)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
                              }`}
                              style={
                                isActive
                                  ? { backgroundColor: "var(--color-marine)" }
                                  : undefined
                              }
                            >
                              {t(`contact.topics.${k}`)}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="form-field">
                      <div className="flex items-baseline justify-between mb-2">
                        <label
                          htmlFor="msg"
                          className="caption text-[var(--color-ink-50)]"
                        >
                          {t("contact.brief")}
                        </label>
                        <span
                          className={`caption tabular ${
                            briefOver
                              ? "text-[var(--color-marine-deep)]"
                              : "text-[var(--color-ink-40)]"
                          }`}
                          aria-live="polite"
                        >
                          {t("contact.briefCount", {
                            count: briefCount,
                            max: BRIEF_MAX,
                          })}
                        </span>
                      </div>
                      <textarea
                        id="msg"
                        rows={5}
                        value={brief}
                        onChange={(e) => setBrief(e.target.value)}
                        placeholder={t("contact.briefPlaceholder")}
                        className={`${inputClass} resize-none leading-relaxed`}
                      />
                    </div>
                  </fieldset>

                  <div className="form-field flex flex-col sm:flex-row sm:items-center sm:justify-between pt-6 gap-5 border-t border-[var(--color-ink-12)]">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-[6px] w-[6px] rounded-full"
                        style={{ backgroundColor: "var(--color-marine)" }}
                        aria-hidden
                      />
                      <p className="caption text-[var(--color-ink-70)] max-w-xs">
                        {t("contact.reply")}
                      </p>
                    </div>
                    <div className="self-start sm:self-auto">
                      <Button type="submit" variant="primary">
                        {t("buttons.sendEnquiry")}
                      </Button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
      </main>
    </>
  );
};

export default Contact;
