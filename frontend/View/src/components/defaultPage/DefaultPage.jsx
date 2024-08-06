import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import style from "./defaultPage.module.css";
import iconUser from "./../../assets/avatar_png.png";
import { useAuth } from "../../Auth/AuthProvider";
function DefaultPage({ children }) {
  const[isMenu,setIsMenu] = useState(false);
  const auth = useAuth();
  function borrarCredenciales()
  {
    localStorage.removeItem("refresh");
    auth.setIsAuth(false);
    navigate("/");
  }
  return (
    <div className={style.container}>
      <header className={style.header_container}>
        <h1 className={style.titulo_principal}>Aplicación Finanzas</h1>
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
          <span className={style.userName}>{localStorage.getItem("user")}</span>
          <div className={style.container_userMenu}>
          <img
              src={iconUser}
              alt="Foto o imagen del usuario"
              className={style.user_image}
              onClick={()=>{isMenu? setIsMenu(false):setIsMenu(true)}}
            />
            {isMenu ? <div className={style.userMenu}>
              <a className={style.button_deslog} onClick={borrarCredenciales}>Desloguearse</a>
            </div>:null}
          </div>
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
