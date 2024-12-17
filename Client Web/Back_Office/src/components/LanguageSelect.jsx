import { useLanguageContext } from "../contexts/LanguageContext.jsx";
const LanguageSelect = () => {
  const { languages, onClickLanguageChange } = useLanguageContext();
  return (
    <select
      style={{
        width: "125px",
        position: "fixed",
        top: 20,
        left: 20,
        height: "40px",
        borderRadius: 9,
        zIndex: 5,
        id: "languageSelect",
      }}
      onChange={onClickLanguageChange}
    >
      {Object.keys(languages).map((lng) => (
        <option key={languages[lng].nativeName} value={lng}>
          {languages[lng].nativeName}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelect;