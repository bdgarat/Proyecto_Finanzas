import React, { useState } from "react";
export const FilterContext = React.createContext({});

export default function FilterProvider({ children }) {
  const [dataFilter, setDataFilter] = useState({
    monto_inicial: "",
    monto_final: "",
    tipo: "",
    fecha_inicio: "",
    fecha_fin: "",
    currency: "",
    currency_type: "",
  });
  //Esta la utilizo para buscar cuando se esta filtrando 
  const [isFilter, setIsFilter] = useState(false);
  const [otherCoins, setOtherCoins] = useState(false);
  //Sirve para mostrar la moneada seleccionada del select en pantalla, por defecto se va a mostrar el valor del dólar blue
  const [indexSelec, setIndexSelec] = useState(0);
  function getDataFilter() {
    return dataFilter;
  }
  function getIsFilter() {
    return isFilter;
  }
  return (
    <FilterContext.Provider
      value={{
        getDataFilter,
        getIsFilter,
        setIsFilter,
        setDataFilter,
        otherCoins,
        setOtherCoins,
        indexSelec,
        setIndexSelec,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
