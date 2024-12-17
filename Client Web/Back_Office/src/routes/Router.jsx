import {createBrowserRouter} from 'react-router-dom';

import LoginScreen from "../screens/Login.jsx";
import Bidondon from "../screens/Bidondon.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Logout from "../components/Logout.jsx";

import Dashboard from "../screens/Dashboard.jsx";
import CarKeyTable from "../components/tables/CarKeyTable.jsx";
import TextDashBoard from "../components/TextDashBoard.jsx";

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
        <Dashboard>
          <TextDashBoard/>
        </Dashboard>
      </ProtectedRoute>)
  },
  {
    path: '/person',
    element: (
      <ProtectedRoute>
        <Dashboard >
          <Bidondon />
        </Dashboard>
      </ProtectedRoute>)
  },
  {
    path: '/vehicle',
    element: (
      <ProtectedRoute>
        <Dashboard >
          <Bidondon />
        </Dashboard>
      </ProtectedRoute>)
  },
  {
    path: '/carKey',
    element: (
      <ProtectedRoute>
        <Dashboard >
          <CarKeyTable />
        </Dashboard>
      </ProtectedRoute>)
  },
  {
    path: '/subscription',
    element: (
      <ProtectedRoute>
        <Dashboard >
          <Bidondon />
        </Dashboard>
      </ProtectedRoute>)
  },
  {
    path: '/sponsoring',
    element: (
      <ProtectedRoute>
        <Dashboard >
          <Bidondon />
        </Dashboard>
      </ProtectedRoute>)
  },
  {
    path: '/trip',
    element: (
      <ProtectedRoute>
        <Dashboard >
          <Bidondon />
        </Dashboard>
      </ProtectedRoute>)
  },
  {
    path: '/personSubscription',
    element: (
      <ProtectedRoute>
        <Dashboard >
          <Bidondon />
        </Dashboard>
      </ProtectedRoute>
    )
  }
])
export default router;
