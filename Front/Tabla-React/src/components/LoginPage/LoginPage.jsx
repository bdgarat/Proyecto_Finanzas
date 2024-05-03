import './loginPage.css';
import {useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
function LoginPage(){
    const [name,setName] = useState('');
    const [pass,setPass] = useState('');
    const [error,setError] = useState(false);
    const navigate = useNavigate();
    function handleName(e)
    {
        setName(e.target.value)
    }
    function handlePass(e)
    {
        setPass(e.target.value)
    }
    function login(){
        if(name =='' || pass =='')
        {
            setError(true);
            navigate('/');
        }
        else  
        {
            setError(false);
            navigate('/home');
        }
    }
    function handleSubmit(e)
    {
        e.preventDefault();
    }
    return (
        <div className="loginPage">
            <a href="/register">Registros</a>
            <br/>
            <a href="/home">Home</a>
            <div className="content-title"><h1 className="loginPage-title">User Login</h1></div>
            <form 
            className="form"
            onSubmit={handleSubmit}
            >
                <input type="text" name="username" onChange={e=>handleName(e) }></input>
                <input type="password" name="password" onChange={e=>handlePass(e)}></input>
                <div className="contenedor-botones">
                <button type="submit" variant="primary" onClick={login} >Login</button>
                <button type="">Reset Password</button>
                </div>
            </form>
            {error && <p id="login-mensaje">Todos los campos son obligatorios</p>}
        </div>
    );
}
export default LoginPage;