import {useLanguageContext} from "../contexts/LanguageContext.jsx";


const Model = () => {
  const {t} = useLanguageContext();
  switch (location.pathname) {
    case "/vehicle":
      return t("vehicles");
    case "/subscription":
      return t("subscriptions");
    case "/sponsoring":
      return t("sponsoring");
    case "/carKey":
      return t("carKeys");
    case "/personSubscription":
      return t("personSubscriptions");
    case "/trip":
      return t("trips");
    case "/person":
      return t("persons");
    case "/dashboard":
      return t("dashboard");
    default:
      return null;
  }
};
export default Model