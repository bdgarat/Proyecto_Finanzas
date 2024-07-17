import React from 'react'
import { useAuth } from '../../Auth/AuthProvider'
import { useNavigate } from 'react-router-dom';
import DefaultPage from '../../components/defaultPage/DefaultPage';
function Dashboard() {
  const auth = useAuth();
  const navigate = useNavigate();
  function borrarCredenciales()
  {
    localStorage.removeItem("access");
    auth.isAuth = false;
    navigate('/');
  }
  console.log(auth.isAuth);
  return (
    <div>
      <DefaultPage>
        <button onClick={borrarCredenciales}>Deslogearse</button>
      </DefaultPage>

    </div>
  )
}

export default Dashboard