import React, { useEffect,useContext } from 'react'
import DefaultPage from '../../components/defaultPage/DefaultPage';
import { GastosContext } from '../../utils/context/GastosContextP';
import { getIngresos } from '../../utils/requests/peticionesIngresos';
import NuevoIngreso from './NuevoIngreso';

function Ingresos() {
  const context = useContext(GastosContext);
  useEffect(()=>{
     obtenerIngresos();
  },[])
  async function obtenerIngresos()
  {
    const response = await getIngresos();
    context.setData(response);
  }
  return (
    <div>
      <DefaultPage>
        <button onClick={()=>{context.isNew? context.setIsNew(false):context.setIsNew(true)}}>Agregar un nuevo ingreso</button>
        {context.isNew? <NuevoIngreso/>:null}
        <ul>
          {context.data.map((element)=>(
            
            <div key={element.id}>
              <li>{element.monto}{element.tipo}{element.fecha}{element.descripcion}</li>
              <button>Eidtar</button>
              <button>Eliminar</button>
            </div>
          ))}
        </ul>
      </DefaultPage>
    </div>
  );
}

export default Ingresos