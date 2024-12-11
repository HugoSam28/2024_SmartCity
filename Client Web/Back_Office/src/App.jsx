import './App.css'
import TokenContext from "./contexts/tokenContext.jsx";
import {LanguageContextProvider} from "./contexts/languageContext.jsx";
import LanguageSelect from "./components/LanguageSelect.jsx";
import {useState} from "react";
import {RouterProvider} from "react-router-dom";
import router from "./routes/router.jsx";


function App() {
  const [token, setToken] = useState("noToken");
  return (
    <>
      <LanguageContextProvider>
        <TokenContext.Provider value={{token, setToken}}>
          <LanguageSelect/>
          <RouterProvider router={router}></RouterProvider>
        </TokenContext.Provider>
      </LanguageContextProvider>
    </>
  )
}

export default App
