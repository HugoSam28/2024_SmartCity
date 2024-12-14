import {useContext} from "react";
import {Navigate} from "react-router-dom";

export default function Logout() {
  return <Navigate to='/login' replace/>
}