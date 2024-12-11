import {createBrowserRouter} from 'react-router-dom';

import LoginScreen from "../screens/login.jsx";
import Bidondon from "../screens/bidondon.jsx";

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginScreen/>
  },
  {
    path: '/bidondon',
    element: <Bidondon/>
  }
])
export default router;
