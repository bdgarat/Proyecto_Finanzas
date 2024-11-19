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
  //Esta constante sirve para indicar si se esta mostrando los montos o se estan ocultando
  const [isViewSaldo, setIsViewSaldo] = useState(true);
  //Sirve para condicionar los estilos de gasto e ingresos
  const[type,setType] = useState(true);
  //Sirve para saber quién es la ultima carte que se le apreto el bóton editar
  const [lastEdit,setLastEdit] = useState({});
  //Sirve para indiciar si hay otra carta que se este editando 
  const[otherEdit,setOtherEdit] = useState(false);
  //Sirve para guardar los tipos de gasto o ingresos 
  const[listTypes,setListTypes] = useState([]);
  //Sirve para indicar si el usuario va usar los tipos ya cargados o agregar uno nuevo
  const[isSelect,setIsSelect] = useState(false);
  //Me permite indicar cuando hay que obtener los tipos nuevos 
  const[updateTypes,setUpdateTypes] = useState(false);
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
        setOtherEdit,
        listTypes,
        setListTypes,
        isSelect,
        setIsSelect,
        updateTypes,
        setUpdateTypes,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
}
