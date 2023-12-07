import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./translations/en";
import { es } from "./translations/es";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en,
  es,
};

i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    keySeparator: false,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
