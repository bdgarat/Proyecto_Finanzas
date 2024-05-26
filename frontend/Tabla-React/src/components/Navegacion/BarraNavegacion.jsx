import React from 'react'
import './Navegacion.css'
import  imgLogin from '../../recursos/imgNavBar/usuario2.png'
import  { Link, useNavigate } from "react-router-dom"
function BarraNavegacion(p) {
  const navigate = useNavigate();
  function goGastos(){
    navigate('/gastos');
  }
  return (
    <div className='Barra-Navegacion'>
        <div className='Barra-Usuario'>
          <div className="contenedor-titulo-navBar">
            <h1 className="titulo-navBar">Aplicacion Finanzas</h1>
          </div>
            <div className="Barra_Navegacion_Links">
              <Link to="/gastos">Gastos</Link>
              <Link to="/ingreso">Ingresos</Link>
              <Link to="/sobre_nosotros">Sobre nosotros</Link>
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