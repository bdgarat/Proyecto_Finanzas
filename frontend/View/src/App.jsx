import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './Pages/loginPage/LoginPage';
import Register from './Pages/register/Register'
import Dashboard from './Pages/dashboard/Dashboard.';
import Gastos from './Pages/gastos/Gastos';
import Ingresos from './Pages/ingresos/Ingresos';
import Calculos from './Pages/calculos/Calculos';
import './App.css'
import Protected from './Pages/Protected';
import { AuthProvider } from './Auth/AuthProvider';
import IngresarGasto from './Pages/gastos/IngresarGasto';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
  },
  
  {
    path: 'register',
    element: <Register />
  },
  {
    path: '/',
    element: <Protected/>,
    children: [
      {
        path:"dashboard",
        element:<Dashboard/>
      }
    ]
  },
  {
    path:"gastos",
    element:<Gastos/>
  },
  {
    path:"ingresarGasto",
    element:<IngresarGasto/>
  },
  {
    path:"ingresos",
    element:<Ingresos/>
  },
  {
    path:"calculos",
    element:<Calculos/>
  }
  
])

export default function App() {
  return (
    <div>
        <AuthProvider>
          <RouterProvider router={router} />  
        </AuthProvider>
    </div>
  );
}