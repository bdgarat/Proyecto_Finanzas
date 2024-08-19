import React, { useContext, useEffect, useState } from "react";
import { getAvaragesGastos } from "../../../utils/requests/peticionGastos";
import { FilterContext } from "../../../utils/context/FilterProvider";
import { useAuth } from "../../../Auth/AuthProvider";
import { generarFechaAnterior } from "../../../utils/functions/manipularFechas";
import style from "./averages.module.css";
import { CardsContext } from "../../../utils/context/CardsProvider";
import { Bar } from "react-chartjs-2";
import {
  Chart as Chartjs,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
Chartjs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
function AvaragesGraphics() {
  const filter = useContext(FilterContext);
  const context = useContext(CardsContext);
  const auth = useAuth();
  const [gastos, setGastos] = useState([]);
  const [fechas, setFechas] = useState([]);
  async function obtenerDatos(paso) {
    let access = await auth.updateToken();
    let fechasAux =  generarFechaAnterior(paso);
    let auxData = [];
    let auxFecha = [];
    for (let j = 0; j < fechasAux.length-1; j++) {
      let response = await getAvaragesGastos(
        access,
        fechasAux[j].fecha_string,
        fechasAux[j + 1].fecha_string,
        filter.getDataFilter(),
        filter.otherCoins
      );
      (auxData[j] = response.data.total),
        (auxFecha[j] = fechasAux[j].fecha_string);
        console.log(response)
    }
    setGastos(auxData);
    setFechas(auxFecha);
  }
  useEffect(() => {
    obtenerDatos();
    context.setIsUpdate(false);
  }, [context.isUpdate]);
  return (
    <div className={style.avarages}>
      
      <h3>Filtrar por: </h3>
      <div className={style.container_button_filter}>
        <a className={style.button_filter} onClick={(event)=>obtenerDatos(event.target.innerText)}>Dia</a>
        <a className={style.button_filter} onClick={(event)=>obtenerDatos(event.target.innerText)}>Semana</a>
        <a className={style.button_filter} onClick={(event)=>obtenerDatos(event.target.innerText)}>Mes</a>
        <a className={style.button_filter} onClick={(event)=>obtenerDatos(event.target.innerText)}>Año</a>
      </div>
      <div className={style.graphics}>
        <Bar
          className={style.canvas_bar}
          data={{
            labels: fechas,
            datasets: [
              {
                label: "Gastos totales",
                data: gastos,
                backgroundColor: "#0d6efd",
                borderColor: "black",
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

export default AvaragesGraphics;
