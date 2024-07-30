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
  //Esta estado sirve para guardar datos del paginado 
  const [page, setPage] = useState(1);
  const [nextPage,setNextPage] = useState(0);
  const [lastPage,setLastPage] = useState(0);
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
        page,
        setPage,
        nextPage,
        setNextPage,
        lastPage,
        setLastPage
      }}
    >
      {children}
    </CardsContext.Provider>
  );
}
