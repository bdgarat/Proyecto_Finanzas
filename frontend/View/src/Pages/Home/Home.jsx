import React from 'react'
import BarraNavegacion from '../../components/Navegacion/BarraNavegacion'
function Home() {
  return (
    <div>
      <BarraNavegacion/>
      <a href="/">Deslogearse</a>
      <br/>
      <a href="/register">Registrarse</a>
    </div>
  )
}

export default Home