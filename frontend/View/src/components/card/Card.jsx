import React, { useContext, useState } from "react";
import style from "./card.module.css";
import { CardsContext } from "../../utils/context/CardsProvider";
import UpdateComponent from "../inComponent/UpdateComponent";
function Card({ element, handleRemove, requestEdit }) {
  const context = useContext(CardsContext);
  const [isEdit, setIsEdit] = useState(false);
  function handleEdit(element) {
    if (isEdit && context.isEdit) {
      setIsEdit(false);
      context.setIsEdit(false);
    } else if (!isEdit && !context.isEdit && !context.isNew) {
      setIsEdit(true);
      context.setIsEdit(true);
    }

    context.setDataEditable(element);
  }
  return (
    <div className={style.container}>
      <li className={style.card}>
        <div className={style.monto_fecha}>
          <p className={style.monto}>{element.monto}</p>
          <p className={style.tipo}>Tipo:{element.tipo}</p>
          <p className={style.descripcion}>
            Descripción: {element.descripcion}
          </p>
          <p className={style.fecha}>
            {new Date(element.fecha).toLocaleDateString()}
          </p>
        </div>

        <div className={style.container_button}>
          <button
            className={style.button}
            onClick={() => {

              handleEdit(element);
            }}
          >
            Editar
          </button>
          <button
            className={style.button}
            onClick={() => {
              handleRemove(element.id);
            }}
          >
            Eliminar
          </button>
        </div>
      </li>
      {isEdit ? (
        <div className={style.container_edit_card}>
          <UpdateComponent editRequest={requestEdit} editFunction={setIsEdit} />
        </div>
      ) : null}
    </div>
  );
}

export default Card;
