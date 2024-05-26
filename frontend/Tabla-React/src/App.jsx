import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import Home from './components/Home/Home';
import Register from './components/Register/Register'
import Gastos from './components/Home/Gastos/Gastos';
import { UserContextProvider } from './Context/UserContext';
import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    render: {},
    element: <div><LoginPage /></div>
  },
  {
    path: "home",
    element: <div><Home /></div>
  },
  {
    path: 'register',
    element: <div><Register /></div>
  },
  {
    path: 'gastos',
    element: <div><Gastos /></div>
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