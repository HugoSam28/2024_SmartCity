import './App.css'
import {LanguageContextProvider} from "./contexts/languageContext.jsx";
import LanguageSelect from "./components/LanguageSelect.jsx";
import {RouterProvider} from "react-router-dom";
import router from "./routes/router.jsx";


function App() {
  return (
    <>
      <LanguageContextProvider>
        <LanguageSelect/>
        <RouterProvider router={router}></RouterProvider>
      </LanguageContextProvider>
    </>
  )
}

export default App
