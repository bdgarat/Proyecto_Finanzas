import React from "react";
import { useContext, useState } from "react";
import { CardsContext } from "../../utils/context/CardsProvider";
import Swal from "sweetalert2";
import { useAuth } from "../../Auth/AuthProvider";
import style from "./inComponent.module.css";
function UpdateComponent({ editRequest, editFunction }) {
  const context = useContext(CardsContext);
  const auth = useAuth();
  const [data, setData] = useState({
    id: context.dataEditable.id,
    monto: context.dataEditable.monto,
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
    let respuesta = await editRequest(data, auth.getAccess());
    if (respuesta == 401) {
      let access = auth.updateToken();
      respuesta = await editRequest(data, access);
    }
    if (respuesta == 200) {
      Swal.fire({
        title: "Se edito correctamente",
        text: "Se edito su gasto correctamente",
        icon: "success",
      }).then((event) => {
        if (event.isConfirmed) {
          editFunction(false);
          context.setIsUpdate(true);
          context.setIsEdit(false);
        }
      });
    } else {
      Swal.fire({
        title: "No se pudo editar",
        text: "No se pudo conectar al servidor. Espere mientras trabajamos en una solución",
        icon: "error",
      });
    }
  }
  return (
    <form onSubmit={handleSubmit} className={style.container}>
      <label>Monto</label>
      <input
        type="number"
        name="monto"
        placeholder="ingrese el monto en el que gasto"
        value={data.monto}
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
      <div className={style.container_button}>
        <button type="submit" className={style.button} >Enviar</button>
        <button
          className={style.button}
          onClick={() => {
            editFunction(false);
            context.setIsEdit(false);
          }}
        >
          Volver
        </button>
      </div>
    </form>
  );
}

export default UpdateComponent;
