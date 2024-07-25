import React, { useContext } from "react";
import style from "./cards.module.css";
import Card from "../card/Card";
import NewComponent from "../inComponent/NewComponent";
import { CardsContext} from "../../utils/context/CardsProvider";
function Cards({ data, handleRemove, requestEdit,requestAdd }) {
  const context = useContext(CardsContext);
  return (
    <div className={style.cards}>
      <button
          onClick={() =>{
            if(context.isNew){
              context.setIsNew(false); 
            }else if(!context.isEdit)
            {
              context.setIsNew(true);
            } 
          }}
        >
          Agregar
        </button>
        {context.isNew  ? <NewComponent newRequest={requestAdd} /> : null}
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
        <button>Primera pagina</button>
        <button>Pagina anterior</button>
        <button>Pagina siguiente</button>
        <button>Ultima paginas</button>
      </div>
    </div>
  );
}

export default Cards;
