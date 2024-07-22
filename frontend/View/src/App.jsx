import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './Pages/loginPage/LoginPage';
import Register from './Pages/register/Register'
import Dashboard from './Pages/dashboard/Dashboard.';
import Gastos from './Pages/gastos/Gastos';
import Ingresos from './Pages/ingresos/Ingresos';
import './App.css'
import Protected from './Pages/Protected';
import { AuthProvider } from './Auth/AuthProvider';
import IngresarGasto from './Pages/gastos/IngresarGasto';
import GastosContextP from './utils/context/GastosContextP';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },

  {
    path: "register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Protected />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <Protected />,
    children: [
      {
        path: "gastos",
        element: <Gastos />,
      },
    ],
  },
  {
    path: "/",
    element: <Protected />,
    children: [
      {
        path: "ingresarGasto",
        element: <IngresarGasto />,
      },
    ],
  },
  {
    path: "/",
    element: <Protected />,
    children: [
      {
        path: "ingresos",
        element: <Ingresos />,
      },
    ],
  },
]);

export default function App() {
  return (
    <div>
      <GastosContextP>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </GastosContextP>
    </div>
  );
}