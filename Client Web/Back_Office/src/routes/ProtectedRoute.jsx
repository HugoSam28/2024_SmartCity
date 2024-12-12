import {useContext} from "react";
import TokenContext from "../contexts/tokenContext.jsx";
import {Navigate} from "react-router-dom";

function ProtectedRoute({children}) {
  const {token} = useContext(TokenContext);


  if(token === "noToken") {
    return <Navigate to="/login" replace/>;
  }

  return children;
}

export default ProtectedRoute;