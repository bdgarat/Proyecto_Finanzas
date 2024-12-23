import React,{useState,useEffect} from 'react'
import style from './Register.module.css'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import Swall from 'sweetalert2'
import { useAuth } from '../../Auth/AuthProvider'
import {url} from './../../global'
function Register() {
  const auth = useAuth();
  const navigate = new useNavigate();
  const [values,setValues]=useState({
    username:"",
    email:"",
    repeatEmail:"",
    password:"",
    repeatPassword:""
  })
  useEffect(()=>{
    if(localStorage.getItem('access') && localStorage.getItem('user'))
    {
      auth.setIsAuth(true);
      navigate('/dashboard')
    }
  },[])
  const [igualEmail,setIgualEmail]=useState(false);
  
  const [igualPassword, setIgualPassword] = useState(false);

  const handleInputChange = (event)=>{
    const {name,value}= event.target;
    setValues({
      ...values,
      [name]:value,
    });
  }
  const handleRepeat = (event)=>{
    if(event.target.name==="password" || event.target.name==="repeatPassword")
      {
        equalsPassword();
      }
    if(event.target.name == "email" || event.target.name=="repeatEmail")
      {
        equalsEmails();
      }
  }
  const handleRegister=(event)=>{
    event.preventDefault();
    if(!igualEmail && !igualPassword)
      {
        axios({
          method:"post",
          url:`${url}auth/register`,
          data:{
            name:values.username,
            email:values.email,
            password:values.password,
          }
        }).then((res)=>{
          console.log(res);
          if(res.status !=200){
            Swall.fire({
              title:"No se envio el formulario",
              text: "Intente nuevamente",
              icon:"error",
              background:"#282828",
              confirmButtonText:"OK",
              confirmButtonColor:"#274227",
              color:"white"
            })
          }else{
           Swall.fire({
            title:"Envio exitoso",
            text:"El envío de los datos se realizo con exito",
            icon:"success",
            background:"#282828",
            confirmButtonText:"OK",
            confirmButtonColor:"#274227",
            color:"white"
           
        }).
        then(response=>{
          if(response.isConfirmed){
            goToLogin()
          }
        })}})
        .catch((err)=>Swall.fire({
          title:"No se envio el formulario",
          text: "Intente nuevamente",
          icon:"error",
          background:"#282828",
          confirmButtonText:"OK",
          confirmButtonColor:"#274227",
          color:"white"
        }))
      }
      else{console.log("no estoy en el registro")}
  }
  function goToLogin()
  {
    
    navigate('/'); 
  } 
  function equalsEmails(){

    if(values.repeatEmail != values.email)
      {
        setIgualEmail(true);
      }
      else{
        setIgualEmail(false);
      }
  }

  function equalsPassword(){
    if(values.repeatPassword != values.password)
      {
        setIgualPassword(true);
      }
      else{
        setIgualPassword(false);
      }
  }
  
  if(auth.isAuth)
  {
    return <Navigate to='/dashboard'/>
  }
  else
  {
    return (
      <div className={style.container}>
        <div className={style.container_formulario}>
          <h1 className={style.title_formulario}>Crear usuario</h1>
          <form className={style.formulario} onSubmit={handleRegister}>
            <div className={style.entrada}>
              <label className={style.label_form}> Nombre </label>
              <input
                className={style.input_form}
                name="username"
                type="text"
                required
                value={values.username}
                maxLength={30}
                minLength={5}
                placeholder="ingrese su nombre"
                onChange={handleInputChange}
              />
            </div>

            <div className={style.entrada}>
              <label className={style.label_form}>Email</label>
              <input
                className={style.input_form}
                placeholder='example@gmail.com'
                type="email"
                name="email"
                value={values.email}
                required
                onChange={handleInputChange}
                onBlur={handleRepeat}
              />
            </div>

            <div className={style.entrada}>
              <label className={style.label_form}>Repetir email</label>
              <input
                className={style.input_form}
                type="email"
                placeholder='repeat example@gmail.com'
                name="repeatEmail"
                required
                value={values.repeatEmail}
                onChange={handleInputChange}
                onBlur={handleRepeat}
              />
            </div>
            {igualEmail && (
              <p className={style.alert_mensaje}>
                Los emails ingresados no son iguales
              </p>
            )}
            <div className={style.entrada}>
              <label className={style.label_form}>Contraseña</label>
              <input
                className={style.input_form}
                type="password"
                name="password"
                placeholder='*********'
                value={values.password}
                required
                onChange={handleInputChange}
                onBlur={handleRepeat}
              />
            </div>
            <div className={style.entrada}>
              <label className={style.label_form}>Repetir contraseña</label>
              <input
                className={style.input_form}
                type="password"
                required
                placeholder='*********'
                value={values.repeatPassword}
                name="repeatPassword"
                onChange={handleInputChange}
                onBlur={handleRepeat}
              />
            </div>
            {igualPassword && (
              <p className={style.alert_mensaje}>
                Las contraseñas ingresadas no son iguales
              </p>
            )}

            <div className={style.button_form_usuario}>
              <button className={style.button_f} type="submit">
                Registrarse
              </button>
              <button className={style.button_f} onClick={goToLogin}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register