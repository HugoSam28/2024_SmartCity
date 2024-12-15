import {useLanguageContext} from "../contexts/LanguageContext.jsx";
import {useNavigate} from "react-router-dom";
import { MdOutlineBikeScooter } from "react-icons/md";
import { FiUser, FiUsers } from "react-icons/fi";
import { LuTag } from "react-icons/lu";
import { LiaUserTagSolid } from "react-icons/lia";
import { BiKey, BiTrip } from "react-icons/bi";
import {Menu} from "antd";

export function MainMenu({children}) {
  const {t} = useLanguageContext();
  const navigate = useNavigate();

  const items = [
    {
      key:'person',
      label:t('persons'),
      icon: <FiUser />,
      onClick: () =>{navigate('/person', {replace:true})}
    },
    {
      key:'vehicle',
      label:t('vehicles'),
      icon: <MdOutlineBikeScooter />,
      onClick: () =>{navigate('/vehicle', {replace:true})}
    },
    {
      key:'trip',
      label:t('trips'),
      icon: <BiTrip />,
      onClick: () =>{navigate('/trip', {replace:true})}
    },
    {
      key:'subscription',
      label:t('subscriptions'),
      icon: <LuTag />,
      onClick: () =>{navigate('/subscription', {replace:true})}
    },
    {
      key:'person_subscription',
      label:t('personSubscriptions'),
      icon: <LiaUserTagSolid />,
      onClick: () =>{navigate('/personSubscription', {replace:true})}
    },
    {
      key:'sponsoring',
      label:t('sponsorings'),
      icon: <FiUsers />,
      onClick: () =>{navigate('/sponsoring', {replace:true})}
    },
    {
      key:'car_key',
      label:t('carKeys'),
      icon: <BiKey />,
      onClick: () =>{navigate('/carKey', {replace:true})}
    }
  ]
  return (
    <>
      <div id="menuContainer" style={{
        height: "100%",
        left: 0,
        top: 0,
        position: "fixed",
        zIndex: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        paddingTop: "auto",
        width: "257px",
      }}>
        <Menu
          id="menu"
          items={items}
          style={{
          }}
        />
        <a style={{position: "fixed", bottom:35}} href={"/logout"}>{t('logout')}</a>
      </div>
      <div style={{
        height: "100%",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        marginLeft: "257px",
        zIndex: 0,
      }}>
        {children}
      </div>
    </>
  )
}