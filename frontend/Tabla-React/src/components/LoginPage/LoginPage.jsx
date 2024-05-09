import './loginPage.css';
import {useState, useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
function LoginPage(){
    const [name,setName] = useState('');
    const [pass,setPass] = useState('');
    const [error,setError] = useState(false);
    const navigate = useNavigate();
    function obtenerPermiso (){
          axios({
            method:"post",
            url:"http://127.0.0.1:5000/auth/login",
            data:{
                username:name,
                password:pass
            }
         })
         .then((resp)=> {login(resp.status)}
        )
         .catch((err)=>{
            setError(true);
         }
        )
    };
     
      function login(response){
        if(response == 201 || response ==200)
            {
                setError(false);
                navigate('/home');
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
        navigate('/register');
    }
    return (
       <div className='content-loginPage'>
             <div className="loginPage">
            <div className="content-form">
                <div className="content-title"><h1 className="loginPage-title">User Login</h1></div>
                <form 
                className="form"
                onSubmit={handleSubmit}
                >
                    <input type="text" name="username" onChange={e=>handleName(e) }></input>
                    <input type="password" name="password" onChange={e=>handlePass(e)}></input>
                    <div className="contenedor-botones">
                    <button className="boton-login" type="submit" variant="primary" onClick={obtenerPermiso} >Login</button>
                    <button type="" className="boton-login">Sing Up</button>
                    </div>
                </form>
                {error && <p id="login-mensaje">Los datos ingresados no son validos</p>}
            </div>
        </div>
       </div>
    );
}
export default LoginPage;