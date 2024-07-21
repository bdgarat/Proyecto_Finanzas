import React ,{ useState}from "react";
export const GastosContext = React.createContext({})

export default function GastosContextP({children}){
  const [isEdit, setIsEdit] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [dataEditable,setDataEditable] = useState({});
  const [dataGastos,setDataGastos] = useState([]);
    return <GastosContext.Provider value={{ isEdit, setIsEdit, dataEditable, setDataEditable, dataGastos, setDataGastos,isNew,setIsNew }}>{children}</GastosContext.Provider>;
}