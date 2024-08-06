import React, { useState } from "react";
export const FilterContext = React.createContext({});

export default function FilterProvider({ children }) {
  const [dataFilter, setDataFilter] = useState({
    monto: "",
    tipo: "",
    fecha_inicio: "",
    fecha_fin: "",
  });
  const [isFilter, setIsFilter] = useState(false);
  function getDataFilter() {
    return dataFilter;
  }
  function getIsFilter() {
    return isFilter;
  }
  return (
    <FilterContext.Provider
      value={{ getDataFilter, getIsFilter, setIsFilter, setDataFilter }}
    >
      {children}
    </FilterContext.Provider>
  );
}
