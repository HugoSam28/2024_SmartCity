import {useState} from "react";
import {useLocation} from "react-router-dom";

import AddPersonForm from "./addForm/AddPersonForm.jsx";
import AddVehicleForm from "./addForm/AddVehicleForm.jsx";
import AddSubscriptionForm from "./addForm/AddSubscriptionForm.jsx";
import AddSponsoringForm from "./addForm/AddSponsoringForm.jsx";
import AddCarKeyForm from "./addForm/AddCarKeyForm.jsx";
import AddPersonSubscriptionForm from "./addForm/AddPersonSubscription.jsx";
import AddTripForm from "./addForm/AddTripForm.jsx";
import {Button, Modal} from "antd";
import { IoAdd } from "react-icons/io5";
import {useLanguageContext} from "../contexts/LanguageContext.jsx";
import Model from "./Model.jsx";


function AddButton() {

  const {t} = useLanguageContext();

  const location = useLocation();
  const renderForms =(callback) => {
    switch (location.pathname) {
      case "/person":
        return <AddPersonForm callback={callback} />;
      case "/vehicle":
        return <AddVehicleForm callback={callback} />;
      case "/subscription":
        return <AddSubscriptionForm callback={callback} />;
      case "/sponsoring":
        return <AddSponsoringForm callback={callback} />;
      case "/carKey":
        return <AddCarKeyForm callback={callback} />;
      case "/personSubscription":
        return <AddPersonSubscriptionForm callback={callback} />;
      case "/trip":
        return <AddTripForm callback={callback} />;
      case "/dashboard":
        return <p>{t('goToMenu')}</p>
      default:
        return null;
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button
        size="large"
        icon={<IoAdd />}
        onClick={() => setModalOpen(true)}
        style={{border: "1px solid grey", marginLeft: 7 }}
      >{t('add')}</Button>
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
export default AddButton;