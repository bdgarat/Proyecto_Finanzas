import React, { useContext,useState } from 'react'
import style from './card.module.css'
import { GastosContext } from '../../utils/context/GastosContextP';
import UpdateComponent from '../inComponent/UpdateComponent';
function Card({element,handleRemove,requestEdit}) {
    const context = useContext(GastosContext);
    const [isEdit,setIsEdit] = useState(false);
    function handleEdit(element) {
       isEdit? setIsEdit(false):setIsEdit(true);
        context.setDataEditable(element);
      }
  return (
    <div >
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