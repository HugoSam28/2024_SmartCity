import {Navigate} from "react-router-dom";

export default function Logout() {
  sessionStorage.removeItem('token');
  return <Navigate to='/login' replace/>
}