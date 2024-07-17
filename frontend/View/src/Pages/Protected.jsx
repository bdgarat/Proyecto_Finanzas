import React from "react";
import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../Auth/AuthProvider";
export default function Protected(){
    const auth = useAuth();

    return auth.isAuth ? <Outlet/>:<Navigate to="/"/>
}