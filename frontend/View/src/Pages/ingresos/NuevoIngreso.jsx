import React, { useContext,useState } from 'react'
import { GastosContext } from '../../utils/context/GastosContextP';
import { getIngresos, setIngreso } from '../../utils/requests/peticionesIngresos';
import Swal from 'sweetalert2';
import { useAuth } from '../../Auth/AuthProvider';
function NuevoIngreso() {
    const context = useContext(GastosContext);
    const auth = useAuth();
    const [data,setData] = useState({
        ingreso:0,
        tipo:"",
        descripcion:""
    });
    function handleInputs(evento) {
        const { name, value } = evento.target;
        setData({
          ...data,
          [name]: value,
        });
      }
      async function handleSubmit(event) {
        event.preventDefault();
        let respuesta = await setIngreso(data,auth.getAccess());
        if(respuesta == 401)
        {
          auth.updateToken();
          respuesta = await setIngreso(data,auth.getAccess());
        }
        if(respuesta == 201)
        {
            Swal.fire({
                title:"Se ingreso correctamente",
                text:"Se ingreso un nuevo monto correctamente",
                icon:"success"
            }).then((event)=>{
              if(event.isConfirmed){
                context.setIsNew(false);
              }
            })
        }else
        {
            Swal.fire({
                title:"No se pudo ingresar",
                text:"No se pudo conectar al servidor. Espere mientras trabajamos en una solución",
                icon:"error"
            })
        }
      }
  return (
    <form onSubmit={(event)=>{handleSubmit(event)}}>
        <label>Ingreso</label>
      <input
        type="number"
        name="ingreso"
        placeholder="ingrese el monto"
        value={data.gasto}
        onChange={(e) => {
          handleInputs(e);
        }}
      />
      {/*<!--Una alternativa seria definir el tipo como un select. Tener algunos
      valores precargados y que el usuario pueda seleccionar entre esos valores
      y darde un valor-->*/}
      <label>Tipo</label>
      <input
        type="text"
        name="tipo"
        value={data.tipo}
        onChange={(e) => {
          handleInputs(e);
        }}
      />
      <label>Descripción</label>
      <textarea
        value={data.descripcion}
        name="descripcion"
        onChange={(e) => {
          handleInputs(e);
        }}
        placeholder="describa de donde proviene el ingreso"
      ></textarea>
      <input type="submit" content="enviar" />
      <button onClick={()=>{context.setIsNew(false)}}>Volver</button>
    </form>
  )
}

export default NuevoIngreso