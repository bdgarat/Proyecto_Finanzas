import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../Auth/AuthProvider";
export default function Protected(){
    const auth = useAuth();

    return auth ? <Outlet/> : <Navigate to="/"/>
}