import React, { useContext, useState } from "react";
import style from "./card.module.css";
import eye from "./../../assets/show.png";
import not_eye from "./../../assets/not_show.png";
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
    }else
    {
      window.alert("Empezaste a crear un elemento. Cerra el elemento que estas creando para poder editar un elemento");
    }

    context.setDataEditable(element);
  }
  function handleViewSaldo() {
    context.isViewSaldo
      ? context.setIsViewSaldo(false)
      : context.setIsViewSaldo(true);
  }
  return (
    <div className={style.container}>
      <li className={style.card}>
        <div className={style.monto_fecha}>
          {context.isViewSaldo ? (
            <p className={style.monto}>
              {element.monto}
              <img
                className={style.icon_saldo}
                src={eye}
                onClick={() => {
                  handleViewSaldo();
                }}
              />{" "}
            </p>
          ) : (
            <img
              className={style.icon_saldo}
              src={not_eye}
              onClick={() => {
                handleViewSaldo();
              }}
            />
          )}
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
