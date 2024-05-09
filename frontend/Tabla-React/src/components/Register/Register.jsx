import React from 'react'
import './Register.css'
function Register() {
  return (
    <div>
      <a href="/">Login</a>
      <h1>Formulario</h1>
      <form>
        <label> name <input/></label>
        <label> Saldo Actual <input/></label>
        <label> email <input/></label>
        <label> password <input/></label>
        <label> repeat password <input/></label>
        <button>register</button>
        <button>atras</button>
      </form>
    </div>
  )
}

export default Register