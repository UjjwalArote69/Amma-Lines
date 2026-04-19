import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "../../components/ui/Button";
import SEO from "../../components/common/SEO";
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

const topics = [
  "Breakwater",
  "Jetty",
  "Dredging",
  "Piling",
  "Caisson / Cofferdam",
  "Technical services",
  "General enquiry",
];

const Contact = () => {
  const ref = useRef(null);
  const [topic, setTopic] = useState(topics[0]);

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
      {/* Masthead */}
      <div className="px-6 md:px-12 lg:px-16 pt-32 md:pt-40">
        <div className="max-w-[1500px] mx-auto">
          <div
            className="h-[1px] w-full"
            style={{ backgroundColor: "var(--color-ink)" }}
          />
          <div className="flex items-center justify-between py-3">
            <span className="caption text-[var(--color-ink)]">
              V · Correspondence
            </span>
            <span className="caption text-[var(--color-ink-50)] hidden md:inline">
              Write to the Practice
            </span>
            <span className="caption tabular text-[var(--color-ink-50)]">
              Mumbai · India
            </span>
          </div>
          <div
            className="h-[1px] w-full"
            style={{ backgroundColor: "var(--color-ink-12)" }}
          />
        </div>
      </div>

      {/* Lede */}
      <section className="px-6 md:px-12 lg:px-16 pt-12 md:pt-20 pb-20 md:pb-28">
        <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 md:col-span-3">
            <p className="c-fade caption text-[var(--color-ink-50)]">
              The letter desk
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h1 className="font-display text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.95] tracking-[-0.02em]">
              <span className="reveal-line">
                <span className="c-title-line block">Write to us.</span>
              </span>
              <span className="reveal-line">
                <span className="c-title-line block italic text-[var(--color-ink-70)]">
                  We answer every letter.
                </span>
              </span>
            </h1>

            <p className="c-fade mt-12 max-w-2xl text-lg leading-relaxed text-[var(--color-ink-70)]">
              For project enquiries, technical collaboration or press — our
              engineering team reads incoming mail within a working day.
            </p>
          </div>
        </div>
      </section>

      {/* Detail grid */}
      <section className="border-y" style={{ borderColor: "var(--color-ink-12)" }}>
        <div className="max-w-[1500px] mx-auto grid grid-cols-12">
          {/* Details */}
          <aside
            className="col-span-12 lg:col-span-5 p-8 md:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r flex flex-col gap-12"
            style={{ borderColor: "var(--color-ink-12)" }}
          >
            <div>
              <p className="caption text-[var(--color-ink-50)] mb-4">
                Head office
              </p>
              <p className="font-display text-2xl leading-snug">
                {contact.address.line1}
                <br />
                {contact.address.line2}
                <br />
                {contact.address.city} {contact.address.pin} ·{" "}
                {contact.address.country}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="caption text-[var(--color-ink-50)] mb-3">
                  Telephone
                </p>
                <a
                  href={`tel:${contact.phoneTel}`}
                  className="text-[15px] leading-relaxed text-[var(--color-ink-80)] hover:text-[var(--color-marine)] transition-colors tabular"
                >
                  {contact.phoneDisplay}
                </a>
              </div>
              <div>
                <p className="caption text-[var(--color-ink-50)] mb-3">Email</p>
                <a
                  href={`mailto:${contact.emailGeneral}`}
                  className="text-[15px] text-[var(--color-ink)] border-b border-[var(--color-ink-20)] hover:border-[var(--color-marine)] hover:text-[var(--color-marine)] transition-colors"
                >
                  {contact.emailGeneral}
                </a>
              </div>
            </div>

            <div className="border-t border-[var(--color-ink-12)] pt-8">
              <p className="caption text-[var(--color-ink-50)] mb-3">Hours</p>
              <p className="text-[15px] leading-relaxed text-[var(--color-ink-70)]">
                {contact.hours}
              </p>
            </div>

            <div className="border-t border-[var(--color-ink-12)] pt-8">
              <p className="caption text-[var(--color-ink-50)] mb-3">
                Accreditation
              </p>
              <ul className="flex flex-col gap-1 text-[15px] leading-relaxed text-[var(--color-ink-70)]">
                {certifications.map((c) => (
                  <li key={c.k} className="flex items-baseline gap-3">
                    <span className="caption tabular text-[var(--color-ink-40)]">
                      {c.k}
                    </span>
                    <span>{c.v}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[var(--color-ink-12)] pt-8">
              <p className="caption text-[var(--color-ink-50)] mb-3">
                Careers
              </p>
              <a
                href={`mailto:${contact.emailCareers}`}
                className="text-[15px] text-[var(--color-ink)] border-b border-[var(--color-ink-20)] hover:border-[var(--color-marine)] hover:text-[var(--color-marine)] transition-colors"
              >
                {contact.emailCareers}
              </a>
            </div>
          </aside>

          {/* Form */}
          <div className="col-span-12 lg:col-span-7 p-8 md:p-12 lg:p-16">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="caption text-[var(--color-ink-50)] mb-2">
                  Project enquiry
                </p>
                <h2 className="font-display text-3xl md:text-4xl leading-tight">
                  Tell us about the work.
                </h2>
              </div>
              <p className="caption tabular text-[var(--color-ink-40)]">
                {services.length} disciplines
              </p>
            </div>

            <form
              className="flex flex-col gap-10"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="form-field grid grid-cols-12 gap-4 border-b border-[var(--color-ink-12)] pb-4">
                <label
                  htmlFor="first-name"
                  className="col-span-12 md:col-span-3 caption text-[var(--color-ink-50)] pt-3"
                >
                  First name
                </label>
                <input
                  id="first-name"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Aditi"
                  className="col-span-12 md:col-span-9 bg-transparent border-none outline-none text-lg text-[var(--color-ink)] placeholder:text-[var(--color-ink-40)] py-2"
                />
              </div>

              <div className="form-field grid grid-cols-12 gap-4 border-b border-[var(--color-ink-12)] pb-4">
                <label
                  htmlFor="last-name"
                  className="col-span-12 md:col-span-3 caption text-[var(--color-ink-50)] pt-3"
                >
                  Last name
                </label>
                <input
                  id="last-name"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Rao"
                  className="col-span-12 md:col-span-9 bg-transparent border-none outline-none text-lg text-[var(--color-ink)] placeholder:text-[var(--color-ink-40)] py-2"
                />
              </div>

              <div className="form-field grid grid-cols-12 gap-4 border-b border-[var(--color-ink-12)] pb-4">
                <label
                  htmlFor="organisation"
                  className="col-span-12 md:col-span-3 caption text-[var(--color-ink-50)] pt-3"
                >
                  Organisation
                </label>
                <input
                  id="organisation"
                  type="text"
                  autoComplete="organization"
                  placeholder="Port authority, EPC contractor, owner"
                  className="col-span-12 md:col-span-9 bg-transparent border-none outline-none text-lg text-[var(--color-ink)] placeholder:text-[var(--color-ink-40)] py-2"
                />
              </div>

              <div className="form-field grid grid-cols-12 gap-4 border-b border-[var(--color-ink-12)] pb-4">
                <label
                  htmlFor="email"
                  className="col-span-12 md:col-span-3 caption text-[var(--color-ink-50)] pt-3"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="a.rao@example.com"
                  className="col-span-12 md:col-span-9 bg-transparent border-none outline-none text-lg text-[var(--color-ink)] placeholder:text-[var(--color-ink-40)] py-2"
                />
              </div>

              <div className="form-field grid grid-cols-12 gap-4 border-b border-[var(--color-ink-12)] pb-4">
                <label
                  htmlFor="phone"
                  className="col-span-12 md:col-span-3 caption text-[var(--color-ink-50)] pt-3"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91 …"
                  className="col-span-12 md:col-span-9 bg-transparent border-none outline-none text-lg text-[var(--color-ink)] placeholder:text-[var(--color-ink-40)] py-2 tabular"
                />
              </div>

              <div className="form-field grid grid-cols-12 gap-4 border-b border-[var(--color-ink-12)] pb-4">
                <span className="col-span-12 md:col-span-3 caption text-[var(--color-ink-50)] pt-1">
                  Discipline
                </span>
                <div className="col-span-12 md:col-span-9 flex flex-wrap gap-x-4 gap-y-2">
                  {topics.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(t)}
                      className={`caption pb-1 border-b transition-colors ${
                        topic === t
                          ? "text-[var(--color-marine)] border-[var(--color-marine)]"
                          : "text-[var(--color-ink-50)] border-transparent hover:text-[var(--color-ink)]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-field grid grid-cols-12 gap-4 border-b border-[var(--color-ink-12)] pb-4">
                <label
                  htmlFor="msg"
                  className="col-span-12 md:col-span-3 caption text-[var(--color-ink-50)] pt-3"
                >
                  Brief
                </label>
                <textarea
                  id="msg"
                  rows={5}
                  placeholder="Site, scope, approximate programme."
                  className="col-span-12 md:col-span-9 bg-transparent border-none outline-none text-lg text-[var(--color-ink)] placeholder:text-[var(--color-ink-40)] py-2 resize-none"
                />
              </div>

              <div className="form-field flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 gap-5">
                <p className="caption text-[var(--color-ink-50)] max-w-xs">
                  We reply within one working day.
                </p>
                <div className="self-start sm:self-auto">
                  <Button type="submit" variant="primary">
                    Send enquiry
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      </main>
    </>
  );
};

export default Contact;
