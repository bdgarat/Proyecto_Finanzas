import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import Register from './Pages/Register/Register'
import Dashboard from './Pages/Dashboard/Dashboard.';
import { UserContextProvider } from './Context/UserContext';
import './App.css'
import Protected from './Pages/Protected';
import { AuthProvider } from './Auth/AuthProvider';

const router = createBrowserRouter([
  {
    path: "/",
    render: {},
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
  }
  
])

export default function App() {
  return (
    <div>
      <UserContextProvider>
        <AuthProvider>
          <RouterProvider router={router} />  
        </AuthProvider>

      </UserContextProvider>
    </div>
  );
}