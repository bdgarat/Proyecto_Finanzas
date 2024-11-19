import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/loginPage/LoginPage";
import Register from "./Pages/register/Register";
import Dashboard from "./Pages/dashboard/Dashboard.";
import Gastos from "./Pages/gastos/Gastos";
import Ingresos from "./Pages/ingresos/Ingresos";
import "./App.css";
import Protected from "./Pages/Protected";
import { AuthProvider } from "./Auth/AuthProvider";
import CardsProvider from "./utils/context/CardsProvider";
import FilterProvider from "./utils/context/FilterProvider";
import PaginadoProvider from "./utils/context/PaginadoProvider";
import EditProfile from "./Pages/editProfile/EditProfile";

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
      {
        path: "gastos",
        element: <Gastos />,
      },
      {
        path: "ingresos",
        element: <Ingresos />,
      },
      {
        path: "editarPerfil",
        element: <EditProfile />,
      },
    ],
  },
]);

export default function App() {
  return (
    <PaginadoProvider>
      <FilterProvider>
        <CardsProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </CardsProvider>
      </FilterProvider>
    </PaginadoProvider>
  );
}
