import React from 'react'
import { Link } from 'react-router-dom';
function DefaultPage({children}) {
  return (
    <div>
      <header>
        <h1>Aplicacion Finanzas</h1>
        <nav>
          <div className="Barra-Usuario">
            <ul className="Barra-Navegacion-Links">
              <Link to="/gastos" className="">
                Gastos
              </Link>
              <Link to="/ingresos" className="">
                Ingresos
              </Link>
              <Link to="/calculos" className="">
                Calculos
              </Link>
            </ul>
            <icon className="">Icono</icon>
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <h3>Aplicacion Finanzas</h3>
        <p>Autores: Brian Garat y Sebastián Butcovich</p>
      </footer>
    </div>
  );
}

export default DefaultPage;