/**
 * Single source of truth — verified from ammalines.com.
 * Every page / component pulls copy, addresses, phone, email, leadership,
 * awards etc. from here. Do not duplicate these facts elsewhere.
 *
 * Translatable fields (value titles & bodies, timeline titles & bodies,
 * leadership role/bio, award titles & bodies) live in
 * src/i18n/locales/*.json and are resolved via i18n at render time. Only
 * language-agnostic identity data stays here.
 */

export const company = {
  name: "Amma Lines",
  fullName: "Amma Lines Pvt. Ltd.",
  parent: "Meka Group",
  incorporated: "13 December 1978",
  incorporatedYear: 1978,
  cin: "U74999TN1978PTC007674",
  founder: "Dr. Meka Papa Rao",
  legacyYears: 47, // 1978 → 2025
};

export const contact = {
  address: {
    line1: "20 Madhuli",
    line2: "Dr. A. B. Road, Worli",
    city: "Mumbai",
    pin: "400 018",
    country: "India",
    full: "20 Madhuli, Dr. A. B. Road, Worli, Mumbai 400 018, India",
  },
  phoneDisplay: "+91 22 4089 0000",
  phoneTel: "+912240890000",
  emailGeneral: "mail@meka.com",
  emailCareers: "careers@meka.com",
};

export const social = [
  { label: "LinkedIn", href: "https://linkedin.com/company/themekagroup/" },
  { label: "Instagram", href: "https://instagram.com/mekacorp/" },
  { label: "Facebook", href: "https://facebook.com/MekaGroup/" },
  { label: "X", href: "https://x.com/mekagroup" },
  {
    label: "YouTube",
    href: "https://youtube.com/channel/UCMwA7YXAItkKBB55xZUaELw",
  },
];

/* Leadership — the `key` references values.leadership.{key} in the
   translation files for role and bio. `name` stays as-is (proper noun). */
export const leadership = [
  { key: "hmr", name: "Hemanth Meka Rao", img: "/about/hmr.webp" },
  { key: "basu", name: "Arindam Basu", img: "/about/basusir.webp" },
  { key: "rayudu", name: "Capt. M. K. Rayudu", img: "/about/rayudusir.webp" },
];

/* Values — key references values.{key}.title / .body in the locales. */
export const values = [
  { n: "01", key: "01" },
  { n: "02", key: "02" },
  { n: "03", key: "03" },
  { n: "04", key: "04" },
];

/* Timeline entries — key references timeline.{year}.title / .body. */
export const timeline = [
  { year: "1978", key: "1978" },
  { year: "1988", key: "1988" },
  { year: "1990", key: "1990" },
  { year: "1999", key: "1999" },
  { year: "2009", key: "2009" },
  { year: "2024", key: "2024" },
];

/* Awards — two entries share 2024; disambiguated by key. */
export const awards = [
  { year: "2024", key: "2024a" },
  { year: "2024", key: "2024b" },
  { year: "2023", key: "2023" },
];

/* Certifications — `k` is both a locale lookup key and the order. `v`
   stays the ISO standard code (not translatable). */
export const certifications = [
  { k: "Quality", v: "ISO 9001:2015" },
  { k: "Environment", v: "ISO 14001:2015" },
  { k: "OHS", v: "ISO 45001:2018" },
];
