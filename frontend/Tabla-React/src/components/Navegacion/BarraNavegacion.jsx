import React from 'react'
import './Navegacion.css'
import  imgLogin from '../../recursos/imgNavBar/usuario2.png'
function BarraNavegacion() {
  return (
    <div className='Barra-Navegacion'>
        <div className='Barra-Usuario'>
          <div className="contenedor-titulo-navBar">
            <h1 className="titulo-navBar">Aplicacion Finanzas</h1>
          </div>
            <div className="Barra_Navegacion_Links">
              <a href="" className="">Gastos</a>
              <a href="" className="">Ingresos</a>
              < a href="" className="">Sobre nosotros</a>
              <a href="" className=""></a>
            </div>
            <div className="contenedor-usuario">
              <img className='logo_usuario' src={imgLogin}alt=""/>
              <span>Nombre del usuario</span>
            </div>
        </div>
    </div>
  )
}
export default BarraNavegacion