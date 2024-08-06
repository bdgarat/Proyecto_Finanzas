import React from 'react'
import { useAuth } from '../../Auth/AuthProvider'
import { useNavigate } from 'react-router-dom';
import DefaultPage from '../../components/defaultPage/DefaultPage';
function Dashboard() {
  const auth = useAuth();
  const navigate = useNavigate();
 
  return (
    <div>
      <DefaultPage>
      </DefaultPage>
    </div>
  )
}

export default Dashboard