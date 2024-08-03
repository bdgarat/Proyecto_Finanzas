import React, { useContext, useEffect, useState } from "react";
import style from "./card.module.css";
import eye from "./../../assets/show.png";
import not_eye from "./../../assets/not_show.png";
import { CardsContext } from "../../utils/context/CardsProvider";
import UpdateComponent from "../inComponent/UpdateComponent";
import Swal from "sweetalert2";
function Card({ element, handleRemove, requestEdit }) {
  const context = useContext(CardsContext);
  const [isEdit, setIsEdit] = useState(false);
  const [actual, setActual] = useState(-1);
  useEffect(() => {
    if (context.lastEdit.id == element.id) {
      console.log("cierro elemento anterior", element.id);
      setIsEdit(false);
      setActual(-1);
      if(context.isNew)
      {
        context.setLastEdit({id:-1});
      }
    }
    if (actual != -1) {
      if (actual == element.id) {
        context.setLastEdit({ id: element.id });
        setIsEdit(true);
      }
    }
    context.setOtherEdit(false);
  }, [context.otherEdit]);
  function handleEdit(element) {
    console.log(isEdit);
    console.log(context.isEdit);
    if (isEdit && context.isEdit) {
      setIsEdit(false);
      context.setIsEdit(false);
    } else if (!isEdit && !context.isEdit) {
      if (context.isNew) {
        Swal.fire({
          title: "Quiere dejar de agregar",
          text: "Si deja de agregar perdera todos los datos",
          confirmButtonText: "Confirmar",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: "red",
        }).then((event) => {
          if (event.isConfirmed) {
            context.setIsNew(false);
            context.setLastEdit({ id: element.id });
            setIsEdit(true);
            context.setIsEdit(true);
          }
        });
      } else {
        context.setLastEdit({ id: element.id });
        setIsEdit(true);
        context.setIsEdit(true);
      }
    } else {
      Swal.fire({
        title: "Esta seguro que quiere  dejar de editar?",
        text: "Perdera todos sus datos",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "red",
      }).then((event) => {
        if (event.isConfirmed) {
          setIsEdit(false);
          setActual(() => element.id);
          context.setOtherEdit(true);
          context.setIsNew(false);
        }
      });
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
            <p
              className={
                context.getType() ? style.montoGasto : style.montoIngreso
              }
            >
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
