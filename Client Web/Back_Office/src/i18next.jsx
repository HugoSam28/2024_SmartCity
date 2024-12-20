import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import English from "./translation/English.json";
import French from "./translation/French.json";

const resources = {
  fr: {
    translation: French,
  },
  en: {
    translation: English,
  },
}

i18next.use(initReactI18next)
  .init({
    resources,
    lng:"fr",
  });

export default i18next;