import {useLanguageContext} from "../contexts/LanguageContext.jsx";
//import {useNavigate} from "react-router-dom";
import { MdOutlineBikeScooter } from "react-icons/md";
import { FiUser, FiUsers } from "react-icons/fi";
import { LuTag } from "react-icons/lu";
import { LiaUserTagSolid } from "react-icons/lia";
import { BiKey, BiTrip } from "react-icons/bi";
import {Menu} from "antd";

export function MainMenu() {
  const {t} = useLanguageContext();
  //const navigate = useNavigate();

  const items = [
    {
      key:'person',
      label:t('users'),
      icon: <FiUser />
    },
    {
      key:'vehicle',
      label:t('vehicles'),
      icon: <MdOutlineBikeScooter />
    },
    {
      key:'trip',
      label:t('trips'),
      icon: <BiTrip />
    },
    {
      key:'subscription',
      label:t('subscriptions'),
      icon: <LuTag />
    },
    {
      key:'person_subscription',
      label:t('personSubscriptions'),
      icon: <LiaUserTagSolid />
    },
    {
      key:'sponsoring',
      label:t('sponsorings'),
      icon: <FiUsers />
    },
    {
      key:'car_key',
      label:t('carKeys'),
      icon: <BiKey />
    }
  ]
  return (
    <>
      <Menu
        items={items}/>
    </>
  )
}