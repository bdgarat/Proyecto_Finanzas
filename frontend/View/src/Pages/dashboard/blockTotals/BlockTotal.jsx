import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../../../Auth/AuthProvider";
import style from "./blockTotals.module.css";
import {
  getTotalIngresos,
  getTotalsGasto,
} from "../../../utils/requests/getFuncionalidades";
import { FilterContext } from "../../../utils/context/FilterProvider";
import { CardsContext } from "../../../utils/context/CardsProvider";

function BlockTotal() {
  const [totals, setTotals] = useState({
    gastos: 0,
    ingresos: 0,
  });
  const auth = useAuth();
  const context = useContext(CardsContext);
  const filter = useContext(FilterContext);
  async function getTotals() {
    try {
      let access = await auth.getAccess();
      if (access == "") {
        access = await auth.updateToken();
      }
      let gastos = await getTotalsGasto(
        access,
        filter.coinSelected,
        filter.otherCoins
      );
      let ingresos = await getTotalIngresos(
        access,
        filter.coinSelected,
        filter.otherCoins
      );
      if (gastos.status == 401 || ingresos.status == 401) {
        access = await auth.updateToken();
        gastos = await getTotalsGasto(
          access,
          filter.coinSelected,
          filter.otherCoins
        );
        ingresos = await getTotalIngresos(
          access,
          filter.coinSelected,
          filter.otherCoins
        );
      }
      setTotals({
        ...totals,
        gastos: gastos.data.total,
        ingresos: ingresos.data.total,
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getTotals();
    context.setIsUpdate(false);
  }, [context.isUpdate]);
  return (
    <div className={style.cotainer_container_totals}>
      {totals.gastos != 0 && totals.ingresos != 0 ? (
        <div className={style.container_totals}>
          <p className={style.gastos_totales}>Total Gastado: {totals.gastos}</p>
          <p className={style.ingresos_totales}>
            Total Ingresado: {totals.ingresos}
          </p>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default BlockTotal;
