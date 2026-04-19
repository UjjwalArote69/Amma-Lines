/**
 * Single source of truth — verified from ammalines.com.
 * Every page / component pulls copy, addresses, phone, email, leadership,
 * awards etc. from here. Do not duplicate these facts elsewhere.
 */

export const company = {
  name: "Amma Lines",
  fullName: "Amma Lines Pvt. Ltd.",
  parent: "Meka Group",
  incorporated: "13 December 1978",
  incorporatedYear: 1978,
  cin: "U74999TN1978PTC007674",
  founder: "Dr. Meka Papa Rao",
  tagline: "Services for the Marine Infrastructure Sector",
  legacyYears: 47, // 1978 → 2025
  legacyLabel: "Over four decades", // the way the real site phrases it
  notableClaim:
    "We have built most of India's major breakwaters — including the longest, at Tuticorin Port.",
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
  hours: "Monday — Friday · 09:30 — 18:30 IST",
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

export const leadership = [
  {
    img: "/about/hmr.webp",
    role: "Director",
    name: "Hemanth Meka Rao",
    bio: "Mechanical Engineer, Georgia Institute of Technology, USA. Leads the practice with a focus on innovative, cost-effective marine solutions — elevating a family legacy that began in 1978.",
  },
  {
    img: "/about/basusir.webp",
    role: "Vice President",
    name: "Arindam Basu",
    bio: "Thirty-five-plus years of expertise in HDPE pipeline installation, heavy marine infrastructure and EPC-project delivery. Oversees technical execution across all active sites.",
  },
  {
    img: "/about/rayudusir.webp",
    role: "Head of Dredging",
    name: "Capt. M. K. Rayudu",
    bio: "Forty-plus years of specialised experience in large-scale dredging operations and marine infrastructure. Directs the fleet and the firm's approach to weather-window planning.",
  },
];

export const values = [
  {
    n: "01",
    title: "Quality Construction",
    body: "Every project is delivered to global engineering standards — durable, safe, inspected, and built to last in the harshest marine environments.",
  },
  {
    n: "02",
    title: "Mutual Partnership",
    body: "Long-term collaborations with owners, EPC contractors and authorities — built on absolute trust, transparent reporting, and shared accountability.",
  },
  {
    n: "03",
    title: "Proactive Safety",
    body: "An ISO-certified QHSE management system. Safety is the measure of engineering, not a box to be ticked at hand-over.",
  },
  {
    n: "04",
    title: "Teamwork",
    body: "Collaboration, innovation and excellence through skilled crews, modern equipment and hands-on leadership — the same teams, year after year.",
  },
];

export const timeline = [
  {
    year: "1978",
    title: "Foundation",
    body:
      "Incorporated on 13 December 1978 by Dr. Meka Papa Rao, as the pioneering marine construction company that would become the flagship of the Meka Group.",
  },
  {
    year: "1988",
    title: "Floating Breakwater, JNPT",
    body:
      "The 650-metre floating breakwater (guide-bund) at Jawaharlal Nehru Port, Navi Mumbai — the firm's first landmark marine work.",
  },
  {
    year: "1990",
    title: "Elephanta Island Jetty",
    body:
      "The 560-metre passenger jetty at Elephanta Island, Mumbai Harbour.",
  },
  {
    year: "1999",
    title: "Ennore Port",
    body:
      "Four kilometres of breakwaters at Ennore Port, Tamil Nadu.",
  },
  {
    year: "2009",
    title: "Karaikal Port",
    body:
      "1,300 metres of north & south breakwaters and 666,500 m³ of dredging at Karaikal Port, Puducherry.",
  },
  {
    year: "2024",
    title: "ETInfra Awards",
    body:
      "Recognised by The Economic Times ETInfra Awards for Best Infrastructure Company — Marine Industry (Small Cap) and Excellence in Transportation Infrastructure — Marine.",
  },
];

export const awards = [
  {
    year: "2024",
    title: "Best Infrastructure Company — Marine (Small Cap)",
    body: "The Economic Times ETInfra Awards.",
  },
  {
    year: "2024",
    title: "Excellence in Transportation Infrastructure — Marine",
    body: "The Economic Times ETInfra Awards.",
  },
  {
    year: "2023",
    title: "10 Million Work Hours LTI-Free",
    body:
      "Felicitated by McDermott for contribution to a 10 million work-hours Lost-Time-Injury-free milestone.",
  },
];

export const certifications = [
  { k: "Quality", v: "ISO 9001:2015" },
  { k: "Environment", v: "ISO 14001:2015" },
  { k: "OHS", v: "ISO 45001:2018" },
];
