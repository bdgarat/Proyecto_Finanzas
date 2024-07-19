import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import DefaultPage from '../../components/defaultPage/DefaultPage';
import { obtenerGastos } from '../../utils/requests/peticionGastos';
import EditarGastos from './EditarGastos';
import { MyEditContext } from '../../utils/context/contextEditGasto';
function Gastos() {
  const goTo = useNavigate();
  const [data,setData] = useState([]);
  const[mostrarEditar,setMostrarEditar] = useState(false);
  async function obtenerLosGastos(){
    const gastos = await obtenerGastos();
    setData(gastos);
  }
  useEffect(()=>{
    obtenerLosGastos();
  },[])
  return (
    <div>
      <DefaultPage>
        <button onClick={() => goTo("/ingresarGasto")}>
          Agregar un nuevo gasto
        </button>
        <div className="container-gasto">
          <ul>
            {data.map((element) => (
              <div key={element.id}>
                <li>
                  {element.fecha}
                  {element.monto}
                  {element.tipo}
                  {element.descripcion}
                </li>
                <button>Editar</button>
                <button>Eliminar</button>
              </div>
            ))}
          </ul>
          {mostrarEditar ? <div>
            <MyEditContext>
            <EditarGastos value={{mostrarEditar,setMostrarEditar}} />
            </MyEditContext>
          </div>:null}
        </div>
      </DefaultPage>
    </div>
  );
}
export default Gastos