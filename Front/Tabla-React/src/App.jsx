import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import Home from './components/Home/Home';
import Register from './components/Register/Register'
import { useState } from 'react';
import './App.css'

const router = createBrowserRouter([
  {
    path:"/",
    element: <div><LoginPage></LoginPage></div>
  },
  {
    path:"home",
    element:<div><Home/></div>
  },
  {
    path:'register',
    element:<div><Register/></div>
  }
])

export default function App() {
  const [user, setUser] = useState([]);
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}