/**
 * Verified projects from ammalines.com.
 * Only real, attributable works. Numbers are as published on the source site.
 *
 * Translatable fields (title, location, state, note, metricLabel, category,
 * status) are referenced by slug/key and resolved via i18n at render time —
 * see src/i18n/locales/*.json (projects.catalog, projects.metricLabels,
 * projects.categories, projects.status).
 */

export const projects = [
  {
    slug: "jnpt-floating-breakwater",
    categoryKey: "Breakwaters",
    year: "1988",
    statusKey: "Delivered",
    metric: "650 m",
    metricLabelKey: "breakwater length",
    img: "/hero/karaikal_port.webp",
  },
  {
    slug: "elephanta-jetty",
    categoryKey: "Jetties",
    year: "1990",
    statusKey: "Delivered",
    metric: "560 m",
    metricLabelKey: "jetty length",
    img: "/hero/elephanta_jetty.webp",
  },
  {
    slug: "ennore-breakwaters",
    categoryKey: "Breakwaters",
    year: "1999",
    statusKey: "Delivered",
    metric: "4 km",
    metricLabelKey: "total breakwater length",
    img: "/hero/ennore_port.webp",
  },
  {
    slug: "seabird-amadalli",
    categoryKey: "Jetties",
    year: "2007",
    statusKey: "Delivered",
    metric: "206 m",
    metricLabelKey: "pile jetty",
    img: "/hero/vision_section.webp",
  },
  {
    slug: "karaikal-breakwaters",
    categoryKey: "Breakwaters",
    year: "2009",
    statusKey: "Delivered",
    metric: "1,300 m",
    metricLabelKey: "total breakwater length",
    img: "/hero/karaikal_port.webp",
  },
  {
    slug: "karaikal-dredging",
    client: "Karaikal Port",
    categoryKey: "Dredging",
    year: "2009",
    statusKey: "Delivered",
    metric: "666,500 m³",
    metricLabelKey: "dredged volume",
    img: "/hero/karaikal_port.webp",
  },
  {
    slug: "hazira-outfitting-jetty",
    client: "L&T Shipbuilding",
    categoryKey: "Jetties",
    year: "2011",
    statusKey: "Delivered",
    metric: "190 m",
    metricLabelKey: "jetty length",
    img: "/hero/elephanta_jetty.webp",
  },
  {
    slug: "hazira-dredging-lt",
    client: "L&T Shipbuilding",
    categoryKey: "Dredging",
    year: "2011",
    statusKey: "Delivered",
    metric: "5.5 M m³",
    metricLabelKey: "dredged volume",
    img: "/hero/ennore_port.webp",
  },
  {
    slug: "kochi-naval",
    categoryKey: "Dredging",
    year: "2014",
    statusKey: "Delivered",
    metric: "1 M m³",
    metricLabelKey: "dredged volume",
    img: "/hero/ennore_port.webp",
  },
  {
    slug: "hazira-dredging-ril",
    client: "Reliance Industries",
    categoryKey: "Dredging",
    year: "2016",
    statusKey: "Delivered",
    metric: "2 M m³",
    metricLabelKey: "dredged volume",
    img: "/hero/ennore_port.webp",
  },
  {
    slug: "ongc-trenching",
    client: "ONGC",
    categoryKey: "Dredging",
    year: "2019",
    statusKey: "Delivered",
    metric: "4.4 M m³",
    metricLabelKey: "trenched & back-filled",
    img: "/hero/cargo-ship-sailing-ocean.webp",
  },
  {
    slug: "nfxp",
    client: "RLIC Qatar",
    categoryKey: "Dredging",
    year: "2024",
    statusKey: "Ongoing",
    metric: "Offshore",
    metricLabelKey: "pre-lay trenching & backfilling",
    img: "/hero/cargo-ship-sailing-ocean.webp",
  },
];

/** Category keys used for filter buttons. The first entry is the "all" state. */
export const projectFilterKeys = ["allWorks", "Breakwaters", "Jetties", "Dredging"];

/** Totals computed from the dataset — used in stat strips and hero. */
export const derivedStats = {
  totalProjects: projects.length, // 12 documented; real total is larger
  yearsInPractice: 47,
  dredgedVolumeMillionM3: 13.6, // 0.666 + 5.5 + 1 + 2 + 4.4
  countriesServed: 2, // India + Qatar
};
