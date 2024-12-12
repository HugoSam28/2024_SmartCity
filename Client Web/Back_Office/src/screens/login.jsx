import {useLanguageContext} from "../contexts/languageContext.jsx";
import './css/login.css';
import {useContext, useState} from "react";
import TokenContext from "../contexts/tokenContext";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";

export default function LoginScreen() {
  const {t} = useLanguageContext();
  const {setToken} = useContext(TokenContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault(); //empeche le rechargement de la page
    setError(""); // Reset error

    try {
      const response = await fetch('http://localhost:3267/v1/person/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error(t("connectionApiError"))
      }
      const token = await response.text();
      const decodedToken = jwt_decode(token);
      if (decodedToken.role !== "ROLE_ADMIN") {
        throw new Error(t("wrongPassword"));
      }
      setToken(token);
      navigate("/bidondon")
    } catch(e) {
      console.error(e);
      setError(e.message);
    }
  }

  return (
    <div id="loginContainer">
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input name="email"
               id="email"
               type="email"
               placeholder="johnsmith@gmail.com"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
        />
        <label htmlFor="password">{t("password")}</label>
        <input name="password"
               id="password"
               type="password"
               placeholder="Strong.Passw0rd"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">{t("login")}</button>
      </form>
    </div>
  )
}