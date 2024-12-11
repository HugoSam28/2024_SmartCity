import {createBrowserRouter} from 'react-router-dom';
import LoginScreen from "../screens/login.jsx";

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginScreen/>
  }
])
export default router;
