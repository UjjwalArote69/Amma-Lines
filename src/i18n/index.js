import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import hi from "./locales/hi.json";
import ar from "./locales/ar.json";

export const SUPPORTED_LOCALES = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "hi", label: "हिन्दी", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
];

export const getDirForLocale = (code) =>
  SUPPORTED_LOCALES.find((l) => l.code === code)?.dir || "ltr";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      ar: { translation: ar },
    },
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LOCALES.map((l) => l.code),
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "amma-lines:locale",
    },
  });

const applyDir = (lng) => {
  if (typeof document === "undefined") return;
  const dir = getDirForLocale(lng);
  document.documentElement.setAttribute("lang", lng);
  document.documentElement.setAttribute("dir", dir);
};

// Apply on boot + whenever language changes.
applyDir(i18n.resolvedLanguage || i18n.language || "en");
i18n.on("languageChanged", applyDir);

export default i18n;
