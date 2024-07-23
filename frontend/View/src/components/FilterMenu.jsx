import React, {useContext} from 'react'
import { GastosContext } from '../utils/context/GastosContextP'
import { obtenerGastoPorMonto, obtenerGastoPorTipo } from '../utils/requests/peticionGastos';
import {useAuth} from '../Auth/AuthProvider'
function FilterMenu() {
    const context = useContext(GastosContext);
    const auth = useAuth();
    async function busquedaPorTipo(value)
    {
        if(value != "")
        {
            let response = await obtenerGastoPorTipo(value,auth.getAccess());
            if(response.status == 401){
                auth.updateToken();
                response = await obtenerGastoPorTipo(value,auth.getAccess());
            }
            console.log(response);
            context.setData(response.data.gastos); 
        }
    }
    async function busquedaPorMonto(value)
    {
        if(value != "")
        {
            let response = await obtenerGastoPorMonto(value,auth.getAccess());
            if(response.status == 401){
                auth.updateToken();
                response = await obtenerGastoPorMonto(value,auth.getAccess());
            }
            context.setData(response.data.gastos); 
        }
    }
    return (
    <div>
        <form>
            <label>Monto</label>
            <input type="number" onBlur={(event)=>{busquedaPorMonto(event.target.value)}} />
            <label>Tipo</label>
            <input type="text" onBlur={(event)=>{busquedaPorTipo(event.target.value)}}/>
            <label>Fecha inicial</label>
            <input type="date"/>
            <label>Fecha final</label>
            <input type="date"/>
            <label>Solo el primero</label>
            <input type="checkbox"/>
        </form>
    </div>
  )
}

export default FilterMenu