import {
  createContext,
  useContext, useState,
} from "react";
import {fr} from '../translations/French';
import {en} from '../translations/English';
import {I18n} from 'i18n-js';
import {getLocales} from "expo-localization";

export const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {
  const languages = ['en', 'fr'];
  const userLocale = getLocales()[0].languageCode; // Code de la langue principale de l'appareil
  const [locale, setLocale] = useState(languages.includes(userLocale) ? userLocale : 'en');
  const i18n = new I18n({fr, en});
  i18n.fallbacks = true;
  i18n.locale = locale;

  const languageChange = (language) => {
    setLocale(language);
  };

  return (
    <LanguageContext.Provider value={{ i18n, languageChange, locale }}>
      {children}
    </LanguageContext.Provider>
  );
};
export const useLanguageContext = () => useContext(LanguageContext);