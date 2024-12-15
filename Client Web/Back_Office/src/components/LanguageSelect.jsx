import { useLanguageContext } from "../contexts/LanguageContext.jsx";
const LanguageSelect = () => {
  const { languages, onClickLanguageChange } = useLanguageContext();
  return (
    <select
      style={{
        width: "125px",
        position: "absolute",
        top: 10,
        left: 10,
        height: "40px",
        borderRadius: 9,
        zIndex: 1,
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