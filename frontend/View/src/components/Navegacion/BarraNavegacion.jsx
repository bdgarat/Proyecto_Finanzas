import React from 'react'
import './Navegacion.css'
import { Link } from 'react-router-dom'
function BarraNavegacion() {
  return (
    <div className='Barra-Navegacion'>
        <div className='Barra-Usuario'>
            <div className="Barra-Navegacion-Links">
              <Link to="gastos"   className="">Gastos</Link>
              <Link to="ingresos" className="">Ingresos</Link>
              <Link to="calculos" className="">Calculos</Link>
            </div>
            <icon className="">Icono</icon>
        </div>
    </div>
  )
}
export default BarraNavegacion