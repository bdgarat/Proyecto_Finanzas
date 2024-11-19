import React, { useContext, useState } from "react";
import { CardsContext } from "../../utils/context/CardsProvider";
import style from "./inComponent.module.css";
import Swal from "sweetalert2";
import { useAuth } from "../../Auth/AuthProvider";
function NewComponent({ newRequest }) {
  const context = useContext(CardsContext);
  const auth = useAuth();
  const [data, setData] = useState({
    monto: 0,
    tipo: "",
    descripcion: "",
  });
  function handleInputs(evento) {
    
    if(evento.target.value == "Agregar un tipo nuevo" && !context.isSelect)
      {
        context.setIsSelect(true);
      }
      else{
        const { name, value } = evento.target;
        setData({
          ...data,
          [name]: value,
        });
      }
  }
  async function handleSubmit(event) {
    event.preventDefault();
    let respuesta = await newRequest(data, auth.getAccess());
    if (respuesta == 401) {
       let access = await auth.updateToken();
       respuesta = await newRequest(data, access);
    }
    if (respuesta == 201) {
      Swal.fire({
        title: "Se ingreso correctamente",
        text: "Se ingreso un nuevo monto correctamente",
        icon: "success",
      }).then((event) => {
        if (event.isConfirmed) {
          context.setUpdateTypes(true);
          context.setIsSelect(false);
          context.setIsNew(false);
          context.setIsUpdate(true);
        }
      });
    } else {
      Swal.fire({
        title: "No se pudo ingresar",
        text: "No se pudo conectar al servidor. Espere mientras trabajamos en una solución",
        icon: "error",
      });
    }
  }

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
      className={style.container}
    >
      <label>Monto</label>
      <input
      className={style.input_inComponent}
        type="number"
        name="monto"
        placeholder="ingrese el monto"
        value={data.monto}
        onChange={(e) => {
          handleInputs(e);
        }}
      />
      {/*<!--Una alternativa seria definir el tipo como un select. Tener algunos
      valores precargados y que el usuario pueda seleccionar entre esos valores
      y darde un valor-->*/}
      <label>Tipo</label>
      {!context.isSelect ? (<select name="tipo" onChange={(e)=>{handleInputs(e)}} className={style.select_inComponent}>
        <option>Selecciona un tipo </option>
        {context.listTypes !=null && context.listTypes.length !=0 && Array.isArray(context.listTypes) ? context.listTypes.map(element =>(
          <option key={element}>{element}</option>
        )):null}
        <option>Agregar un tipo nuevo</option>
      </select>):(<div className={style.container_type}>
      <input
        className={style.input_inComponent}
        type="text"
        name="tipo"
        value={data.tipo}
        onChange={(e) => {
          handleInputs(e);
        }}
      />
      <a className={style.button_type} onClick={()=>context.setIsSelect(false)}>Volver</a>
      </div>)}
      <label>Descripción</label>
      <textarea
     className={style.textArea_inComponent}
        value={data.descripcion}
        name="descripcion"
        onChange={(e) => {
          handleInputs(e);
        }}
        placeholder="describa de donde proviene el ingreso"
      ></textarea>
      <div className={style.container_button}>
         <button className={style.button_enviar} type="submit">Enviar</button> 
    
        <a
          className={style.button_volver}
          onClick={() => {
            context.setIsNew(false);
            context.setIsSelect(false);
          }}
        >
          Volver
        </a>
      </div>
    </form>
  );
}

export default NewComponent;
