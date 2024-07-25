import React, { useContext,useState } from 'react'
import style from './card.module.css'
import { CardsContext} from '../../utils/context/CardsProvider';
import UpdateComponent from '../inComponent/UpdateComponent';
function Card({element,handleRemove,requestEdit}) {
    const context = useContext(CardsContext);
    const [isEdit,setIsEdit] = useState(false);
    function handleEdit(element) {
       if(isEdit && context.isEdit){
        setIsEdit(false) 
        context.setIsEdit(false);
       }else if(!isEdit && !context.isEdit && !context.isNew){
        setIsEdit(true);
        context.setIsEdit(true);
       }
       
        context.setDataEditable(element);
      }
  return (
    <div className={style.container}>
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
      {isEdit ? (
          <div>
            <UpdateComponent editRequest={requestEdit} editFunction={setIsEdit} />
          </div>
        ) : null}
    </div>
  )
}

export default Card