import React, { useContext, useEffect, useState } from 'react'
import DefaultPage from '../../components/defaultPage/DefaultPage';
import { obtenerGastos, removeGasto } from '../../utils/requests/peticionGastos';
import EditarGastos from './EditarGastos';
import { GastosContext } from '../../utils/context/GastosContextP';
import IngresarGasto from './IngresarGasto';
import Swal from 'sweetalert2';
function Gastos() {
  const editContext = useContext(GastosContext);
   async function obtenerLosGastos(){
    const gastos = await obtenerGastos();
    editContext.setData(gastos);
  }
  useEffect(()=>{
    obtenerLosGastos();
  },[])
  function handleEdit(element)
  {
    editContext.isEdit ? editContext.setIsEdit(false):editContext.setIsEdit(true);
    editContext.setDataEditable(element);
  }
  async function handleRemove(id)
  {
    const response = await removeGasto(id);
    if (response == 200) {
      Swal.fire({
        title: "Se elimino correctamente",
        text: "Se elimino su gasto correctamente",
        icon: "success",
      }).then((event) => {
        if (event.isConfirmed) {
          editContext.setIsEdit(false);
        }
      });
      editContext.setDataGastos(await obtenerGastos());
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
        <button onClick={() => editContext.isNew? editContext.setIsNew(false):editContext.setIsNew(true)}>
          Agregar un nuevo gasto
        </button>
        {editContext.isNew? <IngresarGasto/>:null}
        <div className="container-gasto">
          <ul>
            {editContext.data.map((element) => (
              <div key={element.id}>
                <li>
                  {element.fecha}
                  {element.monto}
                  {element.tipo}
                  {element.descripcion}
                </li>
                <button onClick={()=>handleEdit(element)}>Editar</button>
                <button onClick={()=>{handleRemove(element.id)}}>Eliminar</button>
              </div>
            ))}
          </ul>
        </div>
        {editContext.isEdit ? (
            <div>
                <EditarGastos />
            </div>
          ) : null}
      </DefaultPage>
    </div>
  );
}
export default Gastos