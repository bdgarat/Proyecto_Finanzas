import React,{useContext,createContext,useState,useEffect} from 'react'
const AuthContext = createContext({
    isAuth: false,
    cambiarEstado:(estado)=>{}
})
export function AuthProvider({children}) {
    const [isAuth, setIsAuth] = useState(false);
  function cambiarEstado(estado)
  {
    setIsAuth(estado);
  }
  return  <AuthContext.Provider value={{isAuth,cambiarEstado}}>{children} </AuthContext.Provider>
}
export const  useAuth = ()=> {return useContext(AuthContext)};
