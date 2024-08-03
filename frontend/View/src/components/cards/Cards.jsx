import React, { useContext, useEffect, useState } from "react";
import style from "./cards.module.css";
import Card from "../card/Card";
import NewComponent from "../inComponent/NewComponent";
import { CardsContext } from "../../utils/context/CardsProvider";
import { PaginadoContext } from "../../utils/context/PaginadoProvider";
import Swal from "sweetalert2";
function Cards({ data, handleRemove, requestEdit, requestAdd, obtenerDatos }) {
  const context = useContext(CardsContext);
  const pagationContext = useContext(PaginadoContext);
  const [isMessage, setIsMessage] = useState(false);
  const [isTextInfo,setIsTextInfo] = useState(true);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setIsMessage(false);
      setIsTextInfo(false)
    }, 3000);
  }, [isMessage, isTextInfo]);
  useEffect(() => {
    setIsMessage(true);
    context.setIsEdit(false);
    context.setIsNew(false);
  }, []);
  return (
    <div className={style.cards}>
      <div className={style.paginationButton}>
        
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
      {isTextInfo ? (
          <p>
            Se están mostrando la página {context.data.page} de{" "}
            {context.data.total_pages} páginas
          </p>
        ) : null}
        {isTextInfo ? (
          <p>
            Se están mostrando {context.data.page_size>context.data.total_entries?context.data.total_entries:context.data.page_size} entradas de {" "}
            {context.data.total_entries}  entradas en total
          </p>
        ) : null}
      </div>
      {context.isNew ? (
        <div className={style.new_component}>
          <NewComponent newRequest={requestAdd} />
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
            />
          ))
        ) : (
          <h3>No hay nada para mostrar</h3>
        )}
      </ul>
      <div className={style.paginationButton}>
        <button
          className={style.buttonPagination}
          onClick={async () => {
            if (pagationContext.getPage() == 1) {
              setMessage("ya me encuentro en la primera pagina");
              setIsMessage(true);
            } else {
              pagationContext.setPage(() => {
                pagationContext.getPage() - pagationContext.getPage() - 1;
              });
              await obtenerDatos();
            }
          }}
        >
          Primera página
        </button>
        <button
          className={style.buttonPagination}
          onClick={async () => {
            if (pagationContext.getPage() == 1) {
              setMessage("No hay página anterior");
              setIsMessage(true);
            } else {
              pagationContext.setPage(pagationContext.getPage() - 1);
              await obtenerDatos();
            }
          }}
        >
          Página anterior
        </button>
        <button
          className={style.buttonPagination}
          onClick={async () => {
            if (pagationContext.getNextPage() == null) {
              setMessage("No hay página siguiente");
              setIsMessage(true);
            } else {
              pagationContext.setPage(pagationContext.getPage() + 1);
              await obtenerDatos();
            }
          }}
        >
          Página siguiente
        </button>
        <button
          className={style.buttonPagination}
          onClick={async () => {
            if (pagationContext.getNextPage() == null) {
              setMessage("Ya te encontras en la última página");
              setIsMessage(true);
            } else {
              let pageO = pagationContext.getLastPage();
              pagationContext.setPage(pageO);
              await obtenerDatos();
            }
          }}
        >
          Última página
        </button>
      </div>
      {isMessage ? <span className={style.message}>{message}</span> : null}
    </div>
  );
}

export default Cards;
