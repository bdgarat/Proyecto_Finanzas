import React, { useState } from "react";
export const CardsContext = React.createContext({});

export default function CardsProvider({ children }) {
  //Esta constante sirve para mostrar el componente para editar
  const [isEdit, setIsEdit] = useState(false);
  //Esta constante sirve para mostrar el componente para agregar
  const [isNew, setIsNew] = useState(false);
  //Esta constante sirve para guardar los datos que se quieren editar
  const [dataEditable, setDataEditable] = useState({});
  //Esta constante sirve guardar los datos de una lista en general
  const [data, setData] = useState([]);
  //Esta constante sirve indicar que se tiene que actuarlizar el contenido de una lista
  const [isUpdate, setIsUpdate] = useState(false);
  const [isViewSaldo, setIsViewSaldo] = useState(true);
  const[type,setType] = useState(true);
  const [lastEdit,setLastEdit] = useState({});
  const[otherEdit,setOtherEdit] = useState(false);
  function getType() {
    return type;
  }
  return (
    <CardsContext.Provider
      value={{
        isEdit,
        setIsEdit,
        dataEditable,
        setDataEditable,
        data,
        setData,
        isNew,
        setIsNew,
        isUpdate,
        setIsUpdate,
        isViewSaldo,
        setIsViewSaldo,
        setType,
        getType,
        lastEdit,
        setLastEdit,
        otherEdit,
        setOtherEdit
      }}
    >
      {children}
    </CardsContext.Provider>
  );
}
