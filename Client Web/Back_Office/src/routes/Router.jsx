import {createBrowserRouter} from 'react-router-dom';

import LoginScreen from "../screens/login.jsx";
import Bidondon from "../screens/bidondon.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Logout from "../components/logout.jsx";

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
        <Bidondon />
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
  }
])
export default router;
