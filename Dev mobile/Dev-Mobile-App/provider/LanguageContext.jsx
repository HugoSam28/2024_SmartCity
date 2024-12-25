import {
  createContext,
  useContext, useState,
} from "react";
import {fr} from '../translations/French';
import {en} from '../translations/English';
import {I18n} from 'i18n-js';

export const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState('fr');
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