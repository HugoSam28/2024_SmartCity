import {useState} from "react";
import {useLocation} from "react-router-dom";
import {Button, Modal} from "antd";
import { FiEdit } from "react-icons/fi";
import {useLanguageContext} from "../contexts/LanguageContext.jsx";

import UpdatePersonForm from "./updateForm/UpdatePersonForm.jsx";
import UpdateVehicleForm from "./updateForm/UpdateVehicleForm.jsx";
import UpdateSponsoringForm from "./updateForm/UpdateSponsoringForm.jsx";
import UpdatePersonSubscriptionForm from "./updateForm/UpdatePersonSubscription.jsx";
import UpdateCarKeyForm from "./updateForm/UpdateCarKeyForm.jsx";
import UpdateTripForm from "./updateForm/UpdateTripForm.jsx";
import UpdateSubscriptionForm from "./updateForm/UpdateSubscriptionForm.jsx";


function AddButton() {

  const {t} = useLanguageContext();

  const location = useLocation();
  const renderForms =() => {
    switch (location.pathname) {
      case "/person":
        return <UpdatePersonForm/>;
      case "/vehicle":
        return <UpdateVehicleForm/>;
      case "/subscription":
        return <UpdateSubscriptionForm/>;
      case "/sponsoring":
        return <UpdateSponsoringForm/>;
      case "/carKey":
        return <UpdateCarKeyForm/>;
      case "/personSubscription":
        return <UpdatePersonSubscriptionForm/>;
      case "/trip":
        return <UpdateTripForm/>;
      default:
        return null;
    }
  };
  const model = () => {
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
      default:
        return null;
    }
  };


  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button
        size="large"
        icon={<FiEdit />}
        onClick={() => setModalOpen(true)}
        style={{border: "1px solid grey" }}
      >{t('update')}</Button>
      <Modal
        title={model()}
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        {renderForms()}
      </Modal>
    </>
  )
}
export default AddButton;