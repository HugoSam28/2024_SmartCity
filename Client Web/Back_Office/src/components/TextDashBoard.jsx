import {useLanguageContext} from "../contexts/LanguageContext.jsx";

function TextDashBoard() {
  const {t} = useLanguageContext()
  return (
    <p>{t("dashboardText")}</p>
  )
}
export default TextDashBoard;