import React,{useContext,createContext,useState} from 'react'
import { refreshToken } from '../utils/requests/peticionAuth';
const AuthContext = createContext({})
export function AuthProvider({children}) {
    const [isAuth, setIsAuth] = useState(false);
    const [access,setAccess] = useState("")
  function getAuth()
  {
    return isAuth;
  }
   function getAccess(){
    return access;
  }
  async function updateToken()
  {
    let refresh = localStorage.getItem("refresh");
    let accessA = await refreshToken(refresh);
    setAccess(accessA);
    return accessA;
  }
  return  <AuthContext.Provider value={{getAuth,setIsAuth,getAccess,setAccess,updateToken}}>{children} </AuthContext.Provider>
}
export const  useAuth = ()=> {return useContext(AuthContext)};
