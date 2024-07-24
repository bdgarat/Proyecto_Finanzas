import React from 'react'

function Target({element,handleEdit,handleRemove}) {
    console.log(element);
  return (
    <div key={element.id}>
              <li>
                <div>
                  {element.monto}
                  {new Date(element.fecha).toLocaleDateString()}
                </div>
                {element.tipo}
                {element.descripcion}
              </li>
              <button
                onClick={() => {
                  handleEdit(element);
                }}
              >
                Eidtar
              </button>
              <button
                onClick={() => {
                  handleRemove(element.id);
                }}
              >
                Eliminar
              </button>
            </div>
  )
}

export default Target