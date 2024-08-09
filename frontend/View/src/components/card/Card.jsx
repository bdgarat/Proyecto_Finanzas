import React, { useContext, useEffect, useState } from "react";
import style from "./card.module.css";
import { CardsContext } from "../../utils/context/CardsProvider";
import UpdateComponent from "../inComponent/UpdateComponent";
import asterisco from './../../assets/asterisco.png'
import Swal from "sweetalert2";
function Card({ element, handleRemove, requestEdit }) {
  const context = useContext(CardsContext);
  const [isEdit, setIsEdit] = useState(false);
  const [actual, setActual] = useState(-1);
  useEffect(() => {
    if (context.lastEdit.id == element.id) {
      setIsEdit(false);
      setActual(-1);
      if (context.isNew) {
        context.setLastEdit({ id: -1 });
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

  return (
    <div className={style.container}>
      <li className={style.card}>
        <div className={style.monto_fecha}>
          {context.isViewSaldo ? (<p
            className={
              context.getType() ? style.montoGasto : style.montoIngreso
            }
          >
            {element.monto}
          </p>):<div><img className={style.icon_saldo} src ={asterisco}/>
          <img className={style.icon_saldo} src ={asterisco}/>
          <img className={style.icon_saldo} src ={asterisco}/></div>}
          <p className={style.tipo}>Tipo:{element.tipo}</p>
          <p className={style.descripcion}>
            Descripción: {element.descripcion}
          </p>
          <p className={style.fecha}>
            {new Date(element.fecha).toLocaleDateString()}
          </p>
        </div>

        {!isEdit ? (
          <div className={style.container_button}>
            <a
              className={style.button_edit}
              onClick={() => {
                handleEdit(element);
              }}
            >
              Editar
            </a>
            <a
              className={style.button_deleted}
              onClick={() => {
                Swal.fire({
                  title: "Estas seguro que deseas borrar está entrada?",
                  text: "Una vez confirmada la acción no podras recuperar estos datos",
                  showCancelButton: true,
                  cancelButtonText: "Cancelar",
                  cancelButtonColor: "red",
                  confirmButtonText: "Confirmar",
                }).then((event) => {
                  if (event.isConfirmed) {
                    handleRemove(element.id);
                  }
                });
              }}
            >
              Borrar
            </a>
          </div>
        ) : null}
        {isEdit ? (
          <div className={style.container_edit_card}>
            <UpdateComponent
              editRequest={requestEdit}
              editFunction={setIsEdit}
            />
          </div>
        ) : null}
      </li>
    </div>
  );
}

export default Card;
