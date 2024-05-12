import React,{useState} from 'react'
import './Register.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Register() {
  const navigate = new useNavigate();
  const [values,setValues]=useState({
    username:"",
    email:"",
    password:"",
    repeatPassword:""
  })
  const [conditions,setConditions]=useState({
    igualEmail:false,
    igualPassword:false,
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
        email:values.email,
        password:values.password,
      }
    }).then(()=>goToLogin())
    .catch((err)=>console.log(err))
  }
  function goToLogin()
  {
    console.log("estoy en goToLogin");
    navigate('/'); 
  } 
  function equalsEmails(e){
    if(e.target.value != values.email)
      {
        setConditions({
          igualEmail:true
        })
      }
      else{
        setConditions({
          igualEmail:false
        })
      }
  }

  function equalsPassword(e){
    if(e.target.value != values.password)
      {
        setConditions({
          igualPassword:true
        })
      }
      else{
        setConditions({
          igualPassword:false
        })
      }
  }
  return (
    <div className="container">
     <div className="container-formulario">
     <h1 className="title-formulario">Crear usuario</h1>
      <form className="formulario" onSubmit={handleRegister}>
       
       <div className='entrada'>
          <label className='label-form' > Name  </label>
          <input className='input-form' name="username" type="text" required value={values.username} 
          placeholder="ingrese su nombre" onChange={handleInputChange}/>
       </div>
        
        <div className='entrada'>
          <label className='label-form'>email</label>
          <input className='input-form' type="email" name="email" value={values.email} required 
          onChange={handleInputChange}/>
        </div>

        <div className='entrada'>
          <label className='label-form'>repeat email</label>
          <input className='input-form' type="email" name="repeat-email" required 
          onChange={equalsEmails}/>
        </div>
        {conditions.igualEmail && <p className="alert-mensaje">Los emails ingresados no son iguales</p>}
        <div className='entrada'> 
          <label className='label-form'>password</label>
          <input className='input-form' type="password" name="password" value={values.password} required
          onChange={handleInputChange}/>
        </div>
        <div className='entrada'>
          <label className='label-from'>repeat password</label>
          <input className='input-form' type="password" required
        name='repeatPassword' onChange={equalsPassword}/>
        </div>
        {conditions.igualPassword && <p className="alert-mensaje">Las contraseñas ingresadas no son iguales</p>}
        
      <div className='button-form-usuario'>
         <button className='button-f' type="submit">Registrarse</button>
         <button className='button-f' onClick={goToLogin}>Cancelar</button>
      </div>
      </form>
     </div>
    </div>
  )
}

export default Register