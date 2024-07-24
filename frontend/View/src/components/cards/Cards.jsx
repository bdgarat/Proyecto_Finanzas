import React from "react";
import style from "./cards.module.css";
function Card({ data, handleEdit, handleRemove }) {
  return (
    <ul>
      {data.map((element) => (
        <li className={style.card}>
        <div>
          {element.monto}
          {new Date(element.fecha).toLocaleDateString()}
        </div>
        {element.tipo}
        {element.descripcion}
        <button
          onClick={() => {
            handleEdit(element);
          }}
        >
          Editar
        </button>
        <button
          onClick={() => {
            handleRemove(element.id);
          }}
        >
          Eliminar
        </button>
      </li>
      ))}
    </ul>
  );
}

export default Card;
