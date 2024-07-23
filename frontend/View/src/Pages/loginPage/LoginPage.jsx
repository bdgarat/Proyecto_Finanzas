import './loginPage.css';
import {useState,useEffect} from 'react';
import {Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Auth/AuthProvider';
function LoginPage(){
    const [name,setName] = useState('');
    const [pass,setPass] = useState('');
    const [error,setError] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(()=>{
      let data =localStorage.getItem('refresh');
      if( data !=null)
      {
        auth.setIsAuth(true);
        auth.updateToken();
        navigate('/dashboard');
      }
    },[]);
    function obtenerPermiso (){
          axios({
            method:"post",
            url:"http://127.0.0.1:5000/auth/login",
            data:{
                username:name,
                password:pass
            }
         })
         .then((resp)=> {login(resp)}
        )
         .catch((err)=>{
            setError(true);
            console.error(err);
         }
        )
    };
     
      function login(response){
        if( response.status ==200)
            {
                setError(false);
                auth.setIsAuth(true);
                auth.setAccess(response.data.access_token);
                localStorage.setItem("refresh",response.data.refresh_token);
                localStorage.setItem("user",name);
                navigate('/dashboard');
            }
            else  
            {
                setError(true);
                navigate('/');
            }
    }
    function handleName(e)
    {
        setName(e.target.value)
    }
    function handlePass(e)
    {
        setPass(e.target.value)
    }

    function handleSubmit(e)
    {
        e.preventDefault();
    }
    function llevarARegistros()
    {
      navigate("/register");
    }
    if(auth.isAuth){
        return <Navigate to='/dashboard'/>;
    }   
    else
    {
        return (
          <div className="content-loginPage">
            <div className="loginPage">
              <div className="content-form">
                <div className="content-title">
                  <h1 className="loginPage-title">User Login</h1>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                  <input
                    className="input-login"
                    type="text"
                    name="username"
                    onChange={(e) => handleName(e)}
                    placeholder="username"
                  ></input>
                  <input
                    className="input-login"
                    type="password"
                    name="password"
                    onChange={(e) => handlePass(e)}
                    placeholder="password"
                  ></input>
                  <div className="contenedor-botones">
                    <button
                      className="boton-login"
                      type="submit"
                      variant="primary"
                      onClick={obtenerPermiso}
                    >
                      Login
                    </button>
                    <button onClick={llevarARegistros} className="boton-login">
                      Sing Up
                    </button>
                  </div>
                </form>
                {error && (
                  <p id="login-mensaje">Los datos ingresados no son validos</p>
                )}
              </div>
            </div>
          </div>
        );
    }
    
}
export default LoginPage;