import { useEffect } from "react";

const SITE_URL = "https://ammalines.com";
const DEFAULT_TITLE = "Amma Lines — Marine Infrastructure since 1978";
const DEFAULT_DESCRIPTION =
  "Flagship marine-construction firm of the Meka Group. Breakwaters, jetties, deepwater dredging and port development across India and international waters. Incorporated 13 December 1978.";
const DEFAULT_OG_IMAGE = "/hero/karaikal_port.webp";

const setMeta = (selectorKey, key, value, attr = "name") => {
  if (!value) return;
  const sel = `meta[${attr}="${selectorKey}"]`;
  let el = document.head.querySelector(sel);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, selectorKey);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
  // key is unused but kept for readability at call-sites
  void key;
};

const setCanonical = (url) => {
  if (!url) return;
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", url);
};

const setJsonLd = (id, data) => {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
};

const removeJsonLd = (id) => {
  const el = document.getElementById(id);
  if (el) el.remove();
};

/**
 * Set per-page SEO meta.
 *
 * Props:
 *  - title       — page title; " — Amma Lines" is appended automatically
 *  - description — meta description (keep ≤160 chars)
 *  - path        — absolute URL path, e.g. "/about" (for canonical + og:url)
 *  - image       — OG image path; defaults to /hero/karaikal_port.webp
 *  - jsonLd      — optional structured-data object injected as <script type="application/ld+json">
 *  - jsonLdId    — unique DOM id for the JSON-LD script (so page changes replace, not stack)
 *  - noindex     — boolean; set true for 404 and error pages
 */
const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  jsonLd,
  jsonLdId,
  noindex = false,
}) => {
  useEffect(() => {
    const fullTitle = title ? `${title} — Amma Lines` : DEFAULT_TITLE;
    document.title = fullTitle;

    const absoluteUrl = `${SITE_URL}${path}`;
    const absoluteImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

    setMeta("description", "description", description);
    setMeta("robots", "robots", noindex ? "noindex, nofollow" : "index, follow");

    setMeta("og:title", "og:title", fullTitle, "property");
    setMeta("og:description", "og:description", description, "property");
    setMeta("og:url", "og:url", absoluteUrl, "property");
    setMeta("og:image", "og:image", absoluteImage, "property");
    setMeta("og:type", "og:type", "website", "property");
    setMeta("og:site_name", "og:site_name", "Amma Lines", "property");

    setMeta("twitter:card", "twitter:card", "summary_large_image");
    setMeta("twitter:title", "twitter:title", fullTitle);
    setMeta("twitter:description", "twitter:description", description);
    setMeta("twitter:image", "twitter:image", absoluteImage);

    setCanonical(absoluteUrl);

    if (jsonLd && jsonLdId) {
      setJsonLd(jsonLdId, jsonLd);
    }

    return () => {
      if (jsonLdId) removeJsonLd(jsonLdId);
    };
  }, [title, description, path, image, jsonLd, jsonLdId, noindex]);

  return null;
};

export default SEO;
