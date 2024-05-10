import React,{useState} from 'react'
import './Register.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Register() {
  const navigate = new useNavigate();
  const [values,setValues]=useState({
    username:"",
    saldoActual:0,
    email:"",
    password:"",
    repeatPassword:""
  })
  const handleInputChange = (event)=>{
    const {name,value}= event.target;
    setValues({
      ...values,
      [name]:value,
    });
  }
  const handleRegister=(event)=>{
    event.preventDefault();
    console.log(values);
    axios({
      method:"post",
      url:"http://127.0.0.1:5000/auth/signup",
      data:{
        username:values.username,
        saldo_actual:values.saldoActual,
        email:values.email,
        password:values.password,
      }
    }).then(()=>goToLogin)
    .catch((err)=>console.log(err))
  }
  function goToLogin()
  {
    navigate('/') 
  }
  return (
    <div>
      <h1>Formulario</h1>
      <form onSubmit={handleRegister}>
        <label> name <input name="username" type="text" required value={values.username} 
        placeholder="ingrese su nombre" onChange={handleInputChange}/></label>
        
        <label> Saldo Actual <input name="saldoActual" type="number" value={values.saldoActual} 
        placeholder='ingrese su saldo actual ' onChange={handleInputChange}/></label>
        
        <label>email<input type="email" name="email" value={values.email} required 
        onChange={handleInputChange}/></label>
        
        <label>password<input type="password" name="password" value={values.password} required
         onChange={handleInputChange}/></label>
        
        <label>repeat password<input type="password" value={values.repeatPassword} required
        name='repeatPassword' onChange={handleInputChange}/></label>
        
        <button type="submit">register</button>
        
        <button onClick={goToLogin}>atras</button>
      </form>
    </div>
  )
}

export default Register