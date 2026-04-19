import { Link } from "react-router";

/**
 * Shared shell for legal pages (Privacy, Terms).
 * Matches the dossier masthead / typography used elsewhere.
 */
const LegalLayout = ({ chapter, title, page, lastUpdated, children }) => (
  <main
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
          <span className="caption text-[var(--color-ink)]">{chapter}</span>
          <span className="caption text-[var(--color-ink-50)] hidden md:inline">
            {title}
          </span>
          <span className="caption tabular text-[var(--color-ink-50)]">
            {page}
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
          <p className="caption text-[var(--color-ink-50)]">Legal</p>
          <p className="caption tabular text-[var(--color-ink-40)] mt-3">
            Last updated · {lastUpdated}
          </p>
          <div className="mt-6 hidden md:flex flex-col gap-1">
            <Link
              to="/privacy"
              className="caption text-[var(--color-ink-70)] hover:text-[var(--color-marine)] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="caption text-[var(--color-ink-70)] hover:text-[var(--color-marine)] transition-colors"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9">
          <h1 className="font-display text-5xl md:text-7xl lg:text-[6rem] leading-[0.98] tracking-[-0.02em]">
            {title}
          </h1>
          <div className="mt-10 md:mt-14 max-w-[68ch] text-[16px] md:text-[17px] leading-[1.75] text-[var(--color-ink-80)] legal-prose">
            {children}
          </div>
        </div>
      </div>
    </section>

    <style>{`
      .legal-prose h2 {
        font-family: var(--font-display);
        font-size: 1.75rem;
        line-height: 1.2;
        color: var(--color-ink);
        margin-top: 2.5rem;
        margin-bottom: 1rem;
      }
      .legal-prose h3 {
        font-family: var(--font-sans);
        font-size: 11px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--color-ink-50);
        margin-top: 1.75rem;
        margin-bottom: 0.5rem;
      }
      .legal-prose p {
        margin-bottom: 1rem;
      }
      .legal-prose a {
        color: var(--color-marine);
        border-bottom: 1px solid rgba(30,128,184,0.4);
      }
      .legal-prose a:hover { border-bottom-color: var(--color-marine); }
      .legal-prose ul { list-style: none; padding-left: 0; margin: 1rem 0; }
      .legal-prose ul li {
        padding-left: 1.5rem;
        position: relative;
        margin-bottom: 0.5rem;
      }
      .legal-prose ul li::before {
        content: "—";
        position: absolute;
        left: 0;
        color: var(--color-ink-40);
      }
    `}</style>
  </main>
);

export default LegalLayout;
