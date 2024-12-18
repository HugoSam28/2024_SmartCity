import {useLocation} from "react-router-dom";
import {Button, Modal, notification} from "antd";
import { FiEdit } from "react-icons/fi";
import {useLanguageContext} from "../contexts/LanguageContext.jsx";

import UpdatePersonForm from "./updateForm/UpdatePersonForm.jsx";
import UpdateVehicleForm from "./updateForm/UpdateVehicleForm.jsx";
import UpdateSponsoringForm from "./updateForm/UpdateSponsoringForm.jsx";
import UpdatePersonSubscriptionForm from "./updateForm/UpdatePersonSubscription.jsx";
import UpdateCarKeyForm from "./updateForm/UpdateCarKeyForm.jsx";
import UpdateTripForm from "./updateForm/UpdateTripForm.jsx";
import UpdateSubscriptionForm from "./updateForm/UpdateSubscriptionForm.jsx";
import Model from "./Model.jsx";
import {useDataContext} from "../contexts/DataTransferContext.jsx";
import {useState} from "react";

function UpdateButton() {
  const {t} = useLanguageContext();
  const {rowsToUpdate} = useDataContext();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: t('error'),
      description:
          t('messageError'),
    });
  };
  const location = useLocation();
  const renderForms =(callback) => {
    switch (location.pathname) {
      case "/person":
        return <UpdatePersonForm callback={callback} />;
      case "/vehicle":
        return <UpdateVehicleForm callback={callback} />;
      case "/subscription":
        return <UpdateSubscriptionForm callback={callback} />;
      case "/sponsoring":
        return <UpdateSponsoringForm callback={callback} />;
      case "/carKey":
        return <UpdateCarKeyForm callback={callback} />;
      case "/personSubscription":
        return <UpdatePersonSubscriptionForm callback={callback} />;
      case "/trip":
        return <UpdateTripForm callback={callback} />;
      case "/dashboard":
        return <p>{t('goToMenu')}</p>
      default:
        return null;
    }
  };

  const onClick =() => {
    if(rowsToUpdate.length !== 1) {
      openNotificationWithIcon("error");
    }else{
      setModalOpen(true);
    }
  }
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      {contextHolder}
      <Button
        size="large"
        icon={<FiEdit />}
        onClick={onClick}
        style={{border: "1px solid grey" }}
      >{t('update')}</Button>
      <Modal
        title={Model()}
        centered
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        {renderForms(() => setModalOpen(false))}
      </Modal>
    </>
  )
}
export default UpdateButton;