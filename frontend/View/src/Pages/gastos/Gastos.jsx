import React, { useContext, useEffect, useState } from 'react'
import DefaultPage from '../../components/defaultPage/DefaultPage';
import { obtenerGastos, removeGasto } from '../../utils/requests/peticionGastos';
import EditarGastos from './EditarGastos';
import { GastosContext } from '../../utils/context/GastosContextP';
import IngresarGasto from './IngresarGasto';
import Swal from 'sweetalert2';
import FilterMenu from '../../components/FilterMenu';
import { useAuth } from '../../Auth/AuthProvider';
function Gastos() {
  const context = useContext(GastosContext);
  const auth = useAuth();
   async function obtenerLosGastos(){
    var response = await obtenerGastos(auth.getAccess());
    if(response.status == 401)
    {
      auth.updateToken();
      response = await obtenerGastos(auth.getAccess());
    }
    context.setData(response.data.Gastos);
  }
  useEffect(()=>{
    obtenerLosGastos();
  },[])
  function handleEdit(element)
  {
    context.isEdit ? context.setIsEdit(false):context.setIsEdit(true);
    context.setDataEditable(element);
  }
  async function handleRemove(id)
  {
    let response = await removeGasto(id,auth.getAccess());
    if(response == 401)
    {
      auth.updateToken();
      response = await removeGasto(id,auth.getAccess());
    }
    if (response == 200) {
      Swal.fire({
        title: "Se elimino correctamente",
        text: "Se elimino su gasto correctamente",
        icon: "success",
      })
    } else {
      Swal.fire({
        title: "No se pudo eliminar",
        text: "No se pudo conectar al servidor. Espere mientras trabajamos en una solución",
        icon: "error",
      });
    }
  }
  
  return (
    <div>
      <DefaultPage>
        <FilterMenu/>
        <button onClick={() => context.isNew? context.setIsNew(false):context.setIsNew(true)}>
          Agregar un nuevo gasto
        </button>
        {context.isNew? <IngresarGasto/>:null}
        <div className="container-gasto">
          <ul>
            {context.data.map((element) => (
              <div key={element.id}>
                <li>
                  <p>{element.fecha}</p>
                  <p>{element.monto}</p>
                  <p>{element.tipo}</p>
                  <p>{element.descripcion}</p>
                </li>
                <button onClick={()=>handleEdit(element)}>Editar</button>
                <button onClick={()=>{handleRemove(element.id)}}>Eliminar</button>
              </div>
            ))}
          </ul>
        </div>
        {context.isEdit ? (
            <div>
                <EditarGastos />
            </div>
          ) : null}
      </DefaultPage>
    </div>
  );
}
export default Gastos