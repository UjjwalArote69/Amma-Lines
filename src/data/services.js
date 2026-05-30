/**
 * 12 services from ammalines.com.
 *
 * Translatable fields (title, short, body, deliverables) live in
 * src/i18n/locales/*.json under services.catalog.{slug}.* and are
 * resolved at render time via i18n. Only language-agnostic data is
 * stored here: the display number, slug, and hero image path.
 */

export const services = [
  { n: "01", slug: "breakwater-construction", img: "/hero/karaikal_port.webp" },
  { n: "02", slug: "piling", img: "/hero/elephanta_jetty.webp" },
  { n: "03", slug: "sheet-piling", img: "/hero/ennore_port.webp" },
  { n: "04", slug: "pile-jetties", img: "/hero/elephanta_jetty.webp" },
  { n: "05", slug: "block-jetties", img: "/hero/karaikal_port.webp" },
  { n: "06", slug: "ro-ro-jetties", img: "/hero/elephanta_jetty.webp" },
  { n: "07", slug: "cofferdam-construction", img: "/hero/vision_section.webp" },
  { n: "08", slug: "caisson-construction", img: "/hero/vision_section.webp" },
  { n: "09", slug: "well-sinking", img: "/hero/hero_amma_lines.webp" },
  { n: "10", slug: "dredging", img: "/hero/ennore_port.webp" },
  { n: "11", slug: "soil-improvement", img: "/hero/vision_section.webp" },
  { n: "12", slug: "technical-services", img: "/hero/hero_amma_lines.webp" },
];
