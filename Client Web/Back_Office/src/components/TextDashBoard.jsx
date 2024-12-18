import {useLanguageContext} from "../contexts/LanguageContext.jsx";
import gifImage from '../assets/back-office-whiteboard.gif';

function TextDashBoard() {
  const {t} = useLanguageContext()
  return (
      <>
          <p>{t("dashboardText")}</p>
          <p>{t('bestinLightTheme')}</p>

          <div className="gif-container" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
          }}>
              <img src={gifImage} alt="Animated GIF" className="gif"/>
          </div>
      </>
  )
}

export default TextDashBoard;