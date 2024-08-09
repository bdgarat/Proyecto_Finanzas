import React, { useContext, useEffect, useState } from "react";
import style from "./cards.module.css";
import Card from "../card/Card";
import NewComponent from "../inComponent/NewComponent";
import { CardsContext } from "../../utils/context/CardsProvider";
import { PaginadoContext } from "../../utils/context/PaginadoProvider";
import Swal from "sweetalert2";
function Cards({ data, handleRemove, requestEdit, requestAdd, obtenerDatos,obtenerTypes }) {
  const context = useContext(CardsContext);
  const paginationContext = useContext(PaginadoContext);
  const [isMessage, setIsMessage] = useState(false);
  const [isTextInfo, setIsTextInfo] = useState(true);
  const [isSelected, setIsSelected] = useState({
    onePage: true,
    previusPage: false,
    nextPage: false,
    lastPage: false,
  });
  const [message, setMessage] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setIsMessage(false);
      setIsTextInfo(false);
    }, 3000);
  }, [isMessage, isTextInfo]);
  useEffect(() => {
    setIsMessage(true);
    context.setIsEdit(false);
    context.setIsNew(false);
  }, []);
  return (
    <div className={style.cards}>
      <div className={style.container_button_add}>
        <button
          className={style.buttonAdd}
          onClick={() => {
            if (context.isNew) {
              context.setIsNew(false);
            } else if (!context.isEdit) {
              context.setIsNew(true);
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
                  context.setOtherEdit(true);
                  context.setIsEdit(false);
                  context.setIsNew(true);
                }
              });
            }
          }}
        >
          Agregar
        </button>
      </div>
      <div className={style.message_entradas}>
        <p>
          Se están mostrando la página {context.data.page} de{" "}
          {context.data.total_pages} páginas
        </p>

        <p>
          Se están mostrando {data ? data.length : null} entradas de las{" "}
          {context.data.total_entries} entradas en total
        </p>
      </div>
      {context.isNew ? (
        <div className={style.new_component}>
          <NewComponent newRequest={requestAdd} getTypesParam={obtenerTypes} />
        </div>
      ) : null}
      <ul className={style.card}>
        {data != null && data.length != 0 ? (
          data.map((element) => (
            <Card
              key={element.id}
              element={element}
              handleRemove={handleRemove}
              requestEdit={requestEdit}
              obtenerTypes={obtenerTypes}
            />
          ))
        ) : (
          <h3>No hay nada para mostrar</h3>
        )}
      </ul>
      <div className={style.paginationButton}>
        {paginationContext.getPage() - 1 != 0 ? (
          <a
            className={style.buttonPagination_border_start}
            onClick={async () => {
              if (paginationContext.getPage() == 1) {
                setMessage("ya me encuentro en la primera pagina");
                setIsMessage(true);
              } else {
                paginationContext.setPage(() => {
                  paginationContext.getPage() -
                    (paginationContext.getPage() - 1);
                });
                let value = isSelected.onePage ? false : true;
                console.log(value);
                setIsSelected({
                  ...isSelected,
                  onePage: value,
                  previusPage: false,
                  nextPage: false,
                  lastPage: false,
                });
                await obtenerDatos();
              }
            }}
          >
            {1}
          </a>
        ) : null}

        {paginationContext.getPage() - 1 > 1 ? (
          <a
            className={style.buttonPagination}
            onClick={async () => {
              if (paginationContext.getPage() == 1) {
                setMessage("No hay página anterior");
                setIsMessage(true);
              } else {
                paginationContext.setPage(paginationContext.getPage() - 1);
                let value = isSelected.previusPage ? false : true;
                setIsSelected({
                  ...isSelected,
                  onePage: false,
                  previusPage: value,
                  nextPage: false,
                  lastPage: false,
                });
                await obtenerDatos();
              }
            }}
          >
            {paginationContext.getPage() - 1}
          </a>
        ) : null}
        <a className={paginationContext.getPage()==1?style.buttonPagination_activate_start:paginationContext.getPage()==paginationContext.getLastPage()?style.buttonPagination_activate_end:style.buttonPagination_activate}>
          {paginationContext.getPage()}
        </a>
        {paginationContext.getLastPage() > paginationContext.getPage() + 1 ? (
          <a
            className={style.buttonPagination}
            onClick={async () => {
              if (paginationContext.getNextPage() == null) {
                setMessage("No hay página siguiente");
                setIsMessage(true);
              } else {
                paginationContext.setPage(paginationContext.getPage() + 1);
                let value = isSelected.nextPage ? false : true;
                setIsSelected({
                  ...isSelected,
                  onePage: false,
                  previusPage: false,
                  nextPage: value,
                  lastPage: false,
                });
                await obtenerDatos();
              }
            }}
          >
            {paginationContext.getPage() + 1}
          </a>
        ) : null}
        {paginationContext.getLastPage()>paginationContext.getPage()+2 ? (<a className={style.buttonPagination}>
          ...
        </a>):null}
        {paginationContext.getLastPage() > paginationContext.getPage() ? (
          <a
            className={style.buttonPagination_border_end}
            onClick={async () => {
              if (paginationContext.getNextPage() == null) {
                setMessage("Ya te encontras en la última página");
                setIsMessage(true);
              } else {
                let pageO = paginationContext.getLastPage();
                paginationContext.setPage(pageO);
                let value = isSelected.lastPage ? false : true;
                setIsSelected({
                  ...isSelected,
                  onePage: false,
                  previusPage: false,
                  nextPage: false,
                  lastPage: value,
                });
                await obtenerDatos();
              }
            }}
          >
            {paginationContext.getLastPage()}
          </a>
        ) : null}
      </div>
      {isMessage ? <span className={style.message}>{message}</span> : null}
    </div>
  );
}

export default Cards;
