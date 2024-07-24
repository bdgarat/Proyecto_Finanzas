import React from "react";
import { Link } from "react-router-dom";
import style from "./defaultPage.module.css";
function DefaultPage({ children }) {
  return (
    <div className={style.container}>
      <header className={style.header_container}>
        <h1 className={style.titulo_principal}>Aplicacion Finanzas</h1>
        <nav className={style.nav_container}>
          <ul className={style.barra_navegacion_links}>
            <Link className={style.navBar_link} to="/dashboard">
              Dashboard
            </Link>
            <Link className={style.navBar_link} to="/gastos">
              Gastos
            </Link>
            <Link className={style.navBar_link} to="/ingresos">
              Ingresos
            </Link>
          </ul>
        </nav>
        <div className={style.dataUser}>
          <span>{localStorage.getItem("user")}</span>
          <img src="#" alt="Foto o imagen del usuario" />
        </div>
      </header>
      <main className={style.principal}>{children}</main>
      <footer className={style.footer_container}>
        <h3>Aplicacion Finanzas</h3>
        <p>Autores: Brian Garat y Sebastián Butcovich</p>
      </footer>
    </div>
  );
}

export default DefaultPage;
