import style from "./loginPage.module.css";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Auth/AuthProvider";
import {url} from '../../global'
function LoginPage() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    let data = localStorage.getItem("refresh");
    if (data != null) {
      auth.setIsAuth(true);
      auth.updateToken();
      navigate("/dashboard");
    }
  }, []);
  function obtenerPermiso() {
    axios({
      method: "post",
      url: `${url}auth/login`,
      data: {
        email: name,
        password: pass,
      },
    })
      .then((resp) => {
        login(resp);
      })
      .catch((err) => {
        setError(true);
        console.error(err);
      });
  }

  function login(response) {
    if (response.status == 200) {
      setError(false);
      auth.setIsAuth(true);
      auth.setAccess(response.data.access_token);
      localStorage.setItem("refresh", response.data.refresh_token);
      localStorage.setItem("user", name);
      navigate("/dashboard");
    } else {
      setError(true);
      navigate("/");
    }
  }
  function handleName(e) {
    setName(e.target.value);
  }
  function handlePass(e) {
    setPass(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }
  function llevarARegistros() {
    navigate("/register");
  }
  if (auth.isAuth) {
    return <Navigate to="/dashboard" />;
  } else {
    return (
      <div className={style.content_loginPage}>
        <div className={style.loginPage}>
          <div className={style.content_form}>
            <div className={style.content_title}>
              <h1 className={style.loginPage_title}>User Login</h1>
            </div>
            <form className={style.form} onSubmit={handleSubmit}>
              <input
                className={style.input_login}
                type="text"
                name="username"
                onChange={(e) => handleName(e)}
                placeholder="username"
              ></input>
              <input
                className={style.input_login}
                type="password"
                name="password"
                onChange={(e) => handlePass(e)}
                placeholder="password"
              ></input>
              <div className={style.contenedor_botones}>
                <button
                  className={style.boton_login}
                  type="submit"
                  variant="primary"
                  onClick={obtenerPermiso}
                >
                  Login
                </button>
                <button
                  onClick={llevarARegistros}
                  className={style.boton_login}
                >
                  Sign Up
                </button>
              </div>
            </form>
            {error && (
              <p className={style.login_mensaje}>
                Los datos ingresados no son validos
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default LoginPage;
