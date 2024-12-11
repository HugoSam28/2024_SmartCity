import './App.css'
import TokenContext from "./contexts/tokenContext.jsx";
import {LanguageContextProvider} from "./contexts/languageContext.jsx";
import LanguageSelect from "./components/LanguageSelect.jsx";
import LoginScreen from "./screens/login.jsx";
import {useState} from "react";


function App() {
  const [token, setToken] = useState("");
  return (
    <>
      <LanguageContextProvider>
        <TokenContext.Provider value={token}>
          <LanguageSelect/>
          <LoginScreen callback={(token) => setToken(token)} />
        </TokenContext.Provider>
      </LanguageContextProvider>
    </>
  )
}

export default App
