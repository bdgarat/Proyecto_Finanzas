import React, { useContext, useEffect, useState } from "react";
import { getAvaragesGastos } from "../../../utils/requests/peticionGastos";
import { FilterContext } from "../../../utils/context/FilterProvider";
import { useAuth } from "../../../Auth/AuthProvider";
import {
  generarFechaAnteriorPorSemana,
  generarFechaPorAño,
  generarFechaPorMes,
  generarFechasAnteriorPorDia,
} from "../../../utils/functions/manipularFechas";
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
import { getAvaragesIngresos } from "../../../utils/requests/peticionesIngresos";
Chartjs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
function AvaragesGraphics() {
  const filter = useContext(FilterContext);
  const context = useContext(CardsContext);
  const auth = useAuth();
  const [datos, setDatos] = useState({
    gastos: [],
    ingresos: [],
  });
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
  const [filtradoActual, setFiltradoActual] = useState("Semana");
  function filtrarFunction(textButton) {
    if (textButton == "Dia") {
      return generarFechasAnteriorPorDia();
    }
    if (textButton == "Semana") {
      return generarFechaAnteriorPorSemana();
    }
    if (textButton == "Mes") {
      return generarFechaPorMes();
    }
    if (textButton == "Año") {
      return generarFechaPorAño();
    }
  }
  async function obtenerDatos(textButton) {
    let access = await auth.updateToken();
    let fechasAux = filtrarFunction(textButton);
    let auxGastos = [];
    let auxIngresos = [];
    let auxFecha = [];
    for (let j = 0; j < fechasAux.length - 1; j++) {
      let response = await getAvaragesGastos(
        access,
        fechasAux[j].fecha_string,
        fechasAux[j + 1].fecha_string,
        filter.getDataFilter(),
        filter.otherCoins
      );
      let responseI = await getAvaragesIngresos(
        access,
        fechasAux[j].fecha_string,
        fechasAux[j + 1].fecha_string,
        filter.getDataFilter(),
        filter.otherCoins
      );
      auxGastos[j] = response.data.total
      auxIngresos[j] = responseI.data.total
      auxFecha[j] = fechasAux[j].fecha_string;
    }
    setDatos({
      ...datos,
      gastos: auxGastos,
      ingresos:auxIngresos
    });
    setFechas(auxFecha);
  }

  useEffect(() => {
    generarFechaPorAño();
    obtenerDatos(filtradoActual);
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
    setFiltradoActual(textButton);
    context.setIsUpdate(true);
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
                data: datos.gastos,
                backgroundColor: "#e8033e",
                borderColor: "black",
                borderWidth: 1,
              },
              {
                label:"Ingresos totales",
                data:datos.ingresos,
                backgroundColor:"#0d6efd",
                borderColor:"black",
                borderWidth:1,
              }
            ],
          }}
        />
      </div>
    </div>
  );
}

export default AvaragesGraphics;
