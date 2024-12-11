import {
  createContext,
  useContext,
} from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";


export const LanguageContext = createContext(undefined);

export const LanguageContextProvider = ({ children }) => {
  const languages = {
    fr: { nativeName: "French" },
    en: { nativeName: "English" },
};
  const { t, i18n } = useTranslation();

  const onClickLanguageChange = (e) => {
    const language = e.target.value;
    i18next.changeLanguage(language);
  };

  return (
    <LanguageContext.Provider
      value={{ t, i18n, onClickLanguageChange, languages }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => useContext(LanguageContext);