import { MdOutlineBikeScooter, MdOutlineSpaceDashboard } from "react-icons/md";
import { FiUser, FiUsers } from "react-icons/fi";
import { LuTag } from "react-icons/lu";
import { LiaUserTagSolid } from "react-icons/lia";
import { BiKey, BiTrip } from "react-icons/bi";

const Icon = () => {
  switch (location.pathname) {
    case "/vehicle":
      return <MdOutlineBikeScooter/>;
    case "/subscription":
      return <LuTag/>;
    case "/sponsoring":
      return <FiUsers/>;
    case "/carKey":
      return <BiKey/>;
    case "/personSubscription":
      return <LiaUserTagSolid/>;
    case "/trip":
      return <BiTrip/>;
    case "/person":
      return <FiUser/>;
    case "/dashboard":
      return <MdOutlineSpaceDashboard />
    default:
      return null;
  }
};
export default Icon;