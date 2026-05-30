/**
 * Shared page masthead — the editorial chapter-band that sits
 * at the top of every inner page (About, Services, Projects,
 * Contact, NotFound, Legal).
 *
 * Three slots, rendered between two hairlines:
 *   left   — marine dot + chapter label (e.g. "II · Practice")
 *   middle — subtitle/title, in small caps
 *   right  — tabular meta (page number, CIN, region, etc.)
 *
 * Mobile stacks them vertically so the title stays visible
 * instead of being hidden by `hidden md:inline`. The top line
 * is ink-strong; the bottom is a subdued ink-12 so the band
 * reads as a single editorial unit, not a table row.
 */
const PageMasthead = ({ chapter, title, page }) => (
  <div className="px-6 md:px-12 lg:px-16 pt-32 md:pt-40">
    <div className="max-w-[1500px] mx-auto">
      <div
        className="h-[1px] w-full"
        style={{ backgroundColor: "var(--color-ink)" }}
      />
      <div className="flex flex-col gap-2 py-4 md:flex-row md:items-center md:justify-between md:gap-6 md:py-4">
        {/* Left: accent dot + chapter */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span
            className="h-[7px] w-[7px] rounded-full shrink-0"
            style={{ backgroundColor: "var(--color-marine)" }}
            aria-hidden
          />
          <span className="caption text-[var(--color-ink)]">{chapter}</span>
        </div>

        {/* Middle: title (now visible on all sizes) */}
        {title && (
          <span className="caption text-[var(--color-ink-50)] md:flex-1 md:text-center md:px-4">
            {title}
          </span>
        )}

        {/* Right: tabular meta */}
        {page && (
          <span className="caption tabular text-[var(--color-ink-70)] shrink-0">
            {page}
          </span>
        )}
      </div>
      <div
        className="h-[1px] w-full"
        style={{ backgroundColor: "var(--color-ink-12)" }}
      />
    </div>
  </div>
);

export default PageMasthead;
