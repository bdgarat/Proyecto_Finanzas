import React, {useContext} from 'react'
import { GastosContext } from '../utils/context/GastosContextP'
import { obtenerGastoPorTipo } from '../utils/requests/peticionGastos';
function FilterMenu() {
    const context = useContext(GastosContext);
    async function busquedaPorTipo(value)
    {
        const response = await obtenerGastoPorTipo(value);
        console.log(response);
    }
    return (
    <div>
        <form>
            <label>Monto</label>
            <input type="number"/>
            <label>Tipo</label>
            <input type="text" onChange={(event)=>{busquedaPorTipo(event.target.value)}}/>
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