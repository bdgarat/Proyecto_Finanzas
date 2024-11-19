import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthProvider";
import { obtenerUsuarioLogeado } from "../../utils/requests/peticionesUsuarios";
import style from "../register/Register.module.css";
function EditProfile() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [user, setUser] = useState({
    username: "",
    email: "",
    lastPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  const [isEqualsPassword, setIsEqualsPassword] = useState(false);
  async function obtenerQuienSoy() {
    var response = null;
    var access = auth.getAccess();
    try {
      response = await obtenerUsuarioLogeado(access);
      if (response.status == 401) {
        access = await auth.updateToken();
        response = await obtenerUsuarioLogeado(access);
      }
      let data = response.data;
      setUser({
        username: data.username,
        email: data.email,
        lastPassword: "",
        newPassword: "",
        repeatNewPassword: "",
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    obtenerQuienSoy();
  }, []);
  function handleInput(event) {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
  }
  function handleEqualPassword() {
    if (user.newPassword != user.repeatNewPassword) {
      setIsEqualsPassword(true);
    } else {
      setIsEqualsPassword(false);
    }
  }
  return (
    <div className={style.container}>
      <div className={style.container_formulario}>
        <h1 className={style.title_formulario}>Editar Usuario</h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className={style.formulario}
        >
          <div className={style.entrada}>
            <label className={style.label_form}>Nombre</label>
            <input
              className={style.input_form}
              type="text"
              value={user.username}
              name="username"
              onChange={(e) => {
                handleInput(e);
              }}
            ></input>
          </div>
          <div className={style.entrada}>
            <label className={style.label_form}>Email</label>
            <input
              className={style.input_form}
              type="emial"
              value={user.email}
              name="email"
              onChange={(e) => {
                handleInput(e);
              }}
            ></input>
          </div>
          <div className={style.entrada}>
            <label className={style.label_form}>Contraseña vieja</label>
            <input
              className={style.input_form}
              type="password"
              value={user.lastPassword}
              name="lastPassword"
              onChange={(e) => {
                handleInput(e);
              }}
            ></input>
          </div>

          <div className={style.entrada}>
            <label className={style.label_form}>Nueva contraseña </label>
            <input
              onBlur={() => {
                handleEqualPassword();
              }}
              className={style.input_form}
              type="password"
              value={user.newPassword}
              name="newPassword"
              onChange={(e) => {
                handleInput(e);
              }}
            ></input>
          </div>

          <div className={style.entrada}>
            <label className={style.label_form}>Repetir nueva contraseña</label>
            <input
              onBlur={() => {
                handleEqualPassword();
              }}
              className={style.input_form}
              type="password"
              value={user.repeatNewPassword}
              name="repeatNewPassword"
              onChange={(e) => handleInput(e)}
            ></input>
          </div>

          {isEqualsPassword && (
            <p className={style.alert_mensaje}>Las contraseñas son distintas</p>
          )}
          <div className={style.button_form_usuario}>
            <button className={style.button_f} type="submit">
              Enviar
            </button>
            <button
              className={style.button_f}
              onClick={() => {
                navigate("/");
              }}
            >
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
