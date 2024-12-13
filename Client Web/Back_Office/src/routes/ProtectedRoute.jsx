import {Navigate} from "react-router-dom";

function ProtectedRoute({children}) {
const token = "";

  if(token === "noToken") {
    return <Navigate to="/login" replace/>;
  }

  return children;
}

export default ProtectedRoute;