import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './Routes/LoginPage/LoginPage';
import Home from './Routes/Home/Home';
import Register from './Routes/Register/Register'
import Gastos from './Routes/Home/Gastos/Gastos';
import { UserContextProvider } from './Context/UserContext';
import './App.css'
import ProtectedRoutes from './Routes/ProtectedRoutes';

const router = createBrowserRouter([
  {
    path: "/",
    render: {},
    element: <LoginPage />
  },
  {
    path: "home",
    element: <ProtectedRoutes />,
    children:{ 
      path:"/home",
      element:<Home/>
    }

  },
  {
    path: 'register',
    element: <Register />
  },
  {
    path: 'gastos',
    element: <Gastos />
  }
])

export default function App() {
  return (
    <div>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </div>
  );
}