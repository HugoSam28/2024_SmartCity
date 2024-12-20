import {createBrowserRouter, Navigate} from 'react-router-dom';

import LoginScreen from "../screens/Login.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Logout from "../components/Logout.jsx";
import Dashboard from "../screens/Dashboard.jsx";
import CarKeyTable from "../components/tables/CarKeyTable.jsx";
import TextDashBoard from "../components/TextDashBoard.jsx";
import PersonTable from "../components/tables/PersonTable.jsx";
import VehicleTable from "../components/tables/VehicleTable.jsx";
import SubscriptionTable from "../components/tables/SubscriptionTable.jsx";
import PersonSubscriptionTable from "../components/tables/PersonSubscriptionTable.jsx"
import SponsoringTable from "../components/tables/SponsoringTable.jsx"


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Navigate to="/dashboard" replace = {true}/>
      </ProtectedRoute>)
  },
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
            <PersonTable/>
        </Dashboard>
      </ProtectedRoute>)
  },
  {
    path: '/vehicle',
    element: (
      <ProtectedRoute>
        <Dashboard >
          <VehicleTable/>
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
          <SubscriptionTable />
        </Dashboard>
      </ProtectedRoute>)
  },
  {
    path: '/sponsoring',
    element: (
      <ProtectedRoute>
        <Dashboard >
          <
        </Dashboard>
      </ProtectedRoute>)
  },
  {
    path: '/trip',
    element: (
      <ProtectedRoute>
        <Dashboard >

        </Dashboard>
      </ProtectedRoute>)
  },
  {
    path: '/personSubscription',
    element: (
      <ProtectedRoute>
        <Dashboard >
          <PersonSubscriptionTable/>
        </Dashboard>
      </ProtectedRoute>
    )
  }
])
export default router;
