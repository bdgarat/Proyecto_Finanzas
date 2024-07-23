import React,{useContext, useState} from 'react'
import Swal from 'sweetalert2';
import { GastosContext } from '../../utils/context/GastosContextP';
import { editGasto, obtenerGastos } from '../../utils/requests/peticionGastos';
import { useAuth } from '../../Auth/AuthProvider';
function EditarGastos() {
    //const mostratEditar= useContext(Mycontext)
    const auth = useAuth();
    const context = useContext(GastosContext);
    const [data, setData] = useState({
      id: context.dataEditable.id,
      gasto: context.dataEditable.monto,
      tipo: context.dataEditable.tipo,
      descripcion: context.dataEditable.descripcion,
    });
  //Esta función se ejecuta cada ves que cambia el valor de los inputs. Guarda los valores en el estado data
  //Se utiliza la etiqueta "name" de cada input para que se pueda referenciar al campo correcto de data,
  //y se toma el campo value que es el que tiene el valor del contenido actual del campo
  function handleInputs(evento) {
    const { name, value } = evento.target;
    setData({
      ...data,
      [name]: value,
    });
  }
  //Esta función se ejecuta cuando el usuario da un click en el boton enviar
  async function handleSubmit(event) {
    event.preventDefault();
    let access = auth.getAccess();
    let respuesta = await editGasto(data,access);
    if(respuesta == 401){
      auth.updateToken();
      respuesta = await editGasto(data,access);
    }
    if(respuesta == 200)
    {
        Swal.fire({
            title:"Se edito correctamente",
            text:"Se edito su gasto correctamente",
            icon:"success"
        }).then((event)=>{
          if(event.isConfirmed)
          {
            context.setIsEdit(false);
          }
        })    
    }else
    {
        Swal.fire({
            title:"No se pudo editar",
            text:"No se pudo conectar al servidor. Espere mientras trabajamos en una solución",
            icon:"error"
        })
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>Gasto</label>
      <input
        type="number"
        name="gasto"
        placeholder="ingrese el monto en el que gasto"
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
        placeholder="describa que fue en lo que gasto"
      ></textarea>
      <input type="submit" content="enviar"  />
      <button
        onClick={() => {
          context.setIsEdit(false);
        }}
      >
        Volver
      </button>
    </form>
  );
}

export default EditarGastos