import {Navigate} from "react-router-dom";

function ProtectedRoute({children}) {
  if(!sessionStorage.getItem('token')) {
    return <Navigate to="/login" replace/>;
  }
  return children;
}

export default ProtectedRoute;