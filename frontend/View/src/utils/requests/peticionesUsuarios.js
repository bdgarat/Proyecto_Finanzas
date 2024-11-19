import axios from "axios";
import {url} from './../../global'
export async function obtenerUsuarioLogeado(access)
{
    try{
        const response = await axios({
            method:"GET",
            url:`${url}usuarios/whoami`,
            headers:{
                "x-access-token": access,
            },
        })
        return response;
    }catch(error)
    {
        console.log(error);
    }
}
export async function actualizarUsuario(access, data)
{
    var response = null;
    try{
        response = axios({
            method:"PUT",
            url:`${url}usuarios/update`,
            headers:{
                "x-access-token": access,
            },
            data:{
                data
            }
        })
    console.log(response);
    }catch(error)
    {
        console.log(error)
    }
}