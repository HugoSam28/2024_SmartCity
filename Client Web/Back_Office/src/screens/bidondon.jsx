import {useContext} from "react";
import TokenContext from "../contexts/tokenContext.jsx";

export default function Bidondon() {
  const {token} = useContext(TokenContext);

  return (
    <p>{token}</p>
  )
}