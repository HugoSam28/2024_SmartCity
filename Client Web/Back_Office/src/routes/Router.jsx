import {createBrowserRouter} from 'react-router-dom';

import LoginScreen from "../screens/Login.jsx";
import Bidondon from "../screens/Bidondon.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Logout from "../components/Logout.jsx";
import {MainMenu} from "../components/MainMenu.jsx";
import AddPersonForm from "../components/addForm/addPersonForm.jsx";
import AddCarKeyForm from "../components/addForm/addCarKeyForm.jsx";
import AddSubscriptionForm from "../components/addForm/addSubscriptionForm.jsx";
import AddSponsoringForm from "../components/addForm/addSponsoringForm.jsx";
import AddVehicleForm from "../components/addForm/addVehicleForm.jsx";

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginScreen/>
  },
  {
    path: '/logout',
    element: <Logout/>
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <MainMenu />
      </ProtectedRoute>)
  },
  {
    path: '/persons',
    element: (
      <ProtectedRoute>
        <Bidondon />
      </ProtectedRoute>)
  },
  {
    path: '/vehicles',
    element: (
      <ProtectedRoute>
        <Bidondon />
      </ProtectedRoute>)
  },
  {
    path: '/carkeys',
    element: (
      <ProtectedRoute>
        <Bidondon />
      </ProtectedRoute>)
  },
  {
    path: '/subscriptions',
    element: (
      <ProtectedRoute>
        <Bidondon />
      </ProtectedRoute>)
  },
  {
    path: '/sponsoring',
    element: (
      <ProtectedRoute>
        <Bidondon />
      </ProtectedRoute>)
  },
  {
    path: '/trips',
    element: (
      <ProtectedRoute>
        <Bidondon />
      </ProtectedRoute>)
  },
  {
    path: '/bidondon',
    element: (
      <ProtectedRoute>
        <Bidondon />
      </ProtectedRoute>)
  },
  {
    path:'/AddVehicleForm',
    element: <AddVehicleForm/>
  }
])
export default router;
