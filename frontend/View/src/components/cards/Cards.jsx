import React, { useContext } from "react";
import style from "./cards.module.css";
import Card from "../card/Card";
import NewComponent from "../inComponent/NewComponent";
import { CardsContext } from "../../utils/context/CardsProvider";
function Cards({ data, handleRemove, requestEdit, requestAdd }) {
  const context = useContext(CardsContext);
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
            }
          }}
        >
          Agregar
        </button>
      </div>
      {context.isNew ? (
        <div className={style.new_component}>
          <NewComponent newRequest={requestAdd} />
        </div>
      ) : null}
      <ul className={style.card}>
        {data.map((element) => (
          <Card
            key={element.id}
            element={element}
            handleRemove={handleRemove}
            requestEdit={requestEdit}
          />
        ))}
      </ul>
      <div className={style.paginationButton}>
        <button className={style.buttonPagination}>Primera pagina</button>
        <button className={style.buttonPagination}>Pagina anterior</button>
        <button className={style.buttonPagination}>Pagina siguiente</button>
        <button className={style.buttonPagination}>Ultima paginas</button>
      </div>
    </div>
  );
}

export default Cards;
