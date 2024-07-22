import React, { useEffect,useContext } from 'react'
import DefaultPage from '../../components/defaultPage/DefaultPage';
import { GastosContext } from '../../utils/context/GastosContextP';
import { getIngresos, removeIngreso } from '../../utils/requests/peticionesIngresos';
import NuevoIngreso from './NuevoIngreso';
import EditarIngresos from './EditarIngresos';
import Swal from 'sweetalert2';
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
  function handleEdit(element)
  {
    context.isEdit ? context.setIsEdit(false):context.setIsEdit(true);
    context.setDataEditable(element);
  }
  async function handleRemove(id)
  {
    const response = await removeIngreso(id);
    if (response == 200) {
      Swal.fire({
        title: "Se elimino correctamente",
        text: "Se elimino su gasto correctamente",
        icon: "success",
        cancelButtonText:"Cancelar"
      }).then(async(event)=>{
        if(event.isConfirmed)
        {
          context.setData( await obtenerIngresos());
        }
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
        <button onClick={()=>{context.isNew? context.setIsNew(false):context.setIsNew(true)}}>Agregar un nuevo ingreso</button>
        {context.isNew? <NuevoIngreso/>:null}
        <ul>
          {context.data.map((element)=>(
            
            <div key={element.id}>
              <li>{element.monto}{element.tipo}{element.fecha}{element.descripcion}</li>
              <button onClick={()=>{handleEdit(element)}}>Eidtar</button>
              <button onClick={()=>{handleRemove(element.id)}}>Eliminar</button>
            </div>
          ))}
        </ul>
        {context.isEdit?<EditarIngresos/>:null}
      </DefaultPage>
    </div>
  );
}

export default Ingresos