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
  const renderForms =() => {
    switch (location.pathname) {
      case "/person":
        return <AddPersonForm/>;
      case "/vehicle":
        return <AddVehicleForm/>;
      case "/subscription":
        return <AddSubscriptionForm/>;
      case "/sponsoring":
        return <AddSponsoringForm/>;
      case "/carKey":
        return <AddCarKeyForm/>;
      case "/personSubscription":
        return <AddPersonSubscriptionForm/>;
      case "/trip":
        return <AddTripForm/>;
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
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        {renderForms()}
      </Modal>
    </>
  )
}
export default AddButton;