import {useContext} from "react";
import TokenContext from "../contexts/tokenContext.jsx";
import {Navigate} from "react-router-dom";

export default function Logout() {
  const {setToken} = useContext(TokenContext);
  setToken("noToken");
  return <Navigate to='/login' replace/>
}