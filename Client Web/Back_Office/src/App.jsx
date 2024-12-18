import './App.css'
import {LanguageContextProvider} from "./contexts/LanguageContext.jsx";
import LanguageSelect from "./components/LanguageSelect.jsx";
import {RouterProvider} from "react-router-dom";
import router from "./routes/router.jsx";
import {DataProvider} from "./contexts/DataTransferContext.jsx";


function App() {
    return (
        <>
            <LanguageContextProvider>
                <DataProvider>
                    <LanguageSelect/>
                    <RouterProvider router={router}></RouterProvider>
                </DataProvider>
            </LanguageContextProvider>
        </>
    )
}

export default App