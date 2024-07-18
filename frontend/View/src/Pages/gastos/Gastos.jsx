import React from 'react'
import {useNavigate} from 'react-router-dom'
import DefaultPage from '../../components/defaultPage/DefaultPage';
function Gastos() {
  const goTo = useNavigate();
  return (
    <div>
      <DefaultPage>
        <button onClick={()=>goTo('/ingresarGasto')}>Agregar un nuevo gasto</button>

      </DefaultPage>
      
    </div>
  )
}
export default Gastos