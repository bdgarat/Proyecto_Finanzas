import React from 'react'
import {useNavigate} from 'react-router-dom'
function EditProfile() {
  const navigate  = useNavigate()
  return (
    <div>
        <form>
            <h1>Editar Usuario</h1>
            <label>Nombre</label>
            <input type="text"></input>
            <label>Email</label>
            <input type="emial"></input>
            <label>Contraseña vieja</label>
            <input type="password"></input>
            <label>Nueva contraseña </label>
            <input type="password"></input>
            <label>Repetir nueva contraseña</label>
            <input type="password"></input>
            <button onClick={()=>{navigate('/')}}>Volver</button>
        </form>
    </div>
  )
}

export default EditProfile