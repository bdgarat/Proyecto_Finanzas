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
  const [isSelected, setIsSelected] = useState([
    {
      tipo: "Dia",
      isSelec: false,
    },
    {
      tipo: "Semana",
      isSelec: true,
    },
    {
      tipo: "Mes",
      isSelec: false,
    },
    {
      tipo: "Año",
      isSelec: false,
    },
  ]);
  async function obtenerDatos() {
    let access = await auth.updateToken();
    let fechasAux = generarFechaAnterior();
    let auxData = [];
    let auxFecha = [];
    for (let j = 0; j < fechasAux.length - 1; j++) {
      let response = await getAvaragesGastos(
        access,
        fechasAux[j].fecha_string,
        fechasAux[j + 1].fecha_string,
        filter.getDataFilter(),
        filter.otherCoins
      );
      (auxData[j] = response.data.total),
        (auxFecha[j] = fechasAux[j].fecha_string);
    }
    setGastos(auxData);
    setFechas(auxFecha);
  }
  useEffect(() => {
    obtenerDatos();
    context.setIsUpdate(false);
  }, [context.isUpdate]);
  async function handleButtonsFilter(textButton) {
    for (let i = 0; i < isSelected.length; i++) {
      if (textButton == isSelected[i].tipo && !isSelected[i].isSelec) {
        isSelected[i].isSelec = true;
        setIsSelected(isSelected);
      } else {
        isSelected[i].isSelec = false;
        setIsSelected(isSelected);
      }
    }
    context.setIsUpdate(true)
  }
  return (
    <div className={style.avarages}>
      <h3>Filtrar por: </h3>
      <div className={style.container_button_filter}>
        <a
          className={
            isSelected[0].isSelec
              ? style.button_filter_activo
              : style.button_filter
          }
          onClick={(event) => handleButtonsFilter(event.target.innerText)}
        >
          Dia
        </a>
        <a
          className={
            isSelected[1].isSelec
              ? style.button_filter_activo
              : style.button_filter
          }
          onClick={(event) => handleButtonsFilter(event.target.innerText)}
        >
          Semana
        </a>
        <a
          className={
            isSelected[2].isSelec
              ? style.button_filter_activo
              : style.button_filter
          }
          onClick={(event) => handleButtonsFilter(event.target.innerText)}
        >
          Mes
        </a>
        <a
          className={
            isSelected[3].isSelec
              ? style.button_filter_activo
              : style.button_filter
          }
          onClick={(event) => handleButtonsFilter(event.target.innerText)}
        >
          Año
        </a>
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
