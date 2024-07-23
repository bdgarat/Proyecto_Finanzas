import React ,{ useState}from "react";
export const GastosContext = React.createContext({})

export default function GastosContextP({children}){
  const [isEdit, setIsEdit] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [dataEditable,setDataEditable] = useState({});
  const [data,setData] = useState([]);
    return <GastosContext.Provider value={{ isEdit, setIsEdit, dataEditable, setDataEditable, data, setData,isNew,setIsNew }}>{children}</GastosContext.Provider>;
}