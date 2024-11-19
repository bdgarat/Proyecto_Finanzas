import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../../../Auth/AuthProvider";
import style from "./blockTotals.module.css";
import { getTotalsGasto } from "../../../utils/requests/peticionGastos";
import { getTotalIngresos } from "../../../utils/requests/peticionesIngresos";
import { FilterContext } from "../../../utils/context/FilterProvider";
import { CardsContext } from "../../../utils/context/CardsProvider";
import asterisco from "./../../../assets/asterisco.png";
function BlockTotal() {
  const [totals, setTotals] = useState({
    gastos: 0,
    ingresos: 0,
    cotizacion: "",
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
        filter.getDataFilter(),
        filter.otherCoins
      );
      let ingresos = await getTotalIngresos(
        access,
        filter.getDataFilter(),
        filter.otherCoins
      );
      if (gastos.status == 401 || ingresos.status == 401) {
        access = await auth.updateToken();
        gastos = await getTotalsGasto(
          access,
          filter.getDataFilter(),
          filter.otherCoins
        );
        ingresos = await getTotalIngresos(
          access,
          filter.getDataFilter(),
          filter.otherCoins
        );
      }
      setTotals({
        ...totals,
        gastos: gastos.data.total,
        ingresos: ingresos.data.total,
        cotizacion: gastos.data.additional_info.cotizacion,
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
    <div className={style.container_value_totals}>
        <div className={style.container_totals}>
          <span className={style.text_total_gastado}>Total Gastado: </span>
          {context.isViewSaldo ? (
            <p className={style.valor_total_gastado}>
              {totals.gastos} {totals.cotizacion}
            </p>
          ) : (
            <div className={style.container_asterisco}>
              <img className={style.icons_saldo} src={asterisco} />
              <img className={style.icons_saldo} src={asterisco} />
              <img className={style.icons_saldo} src={asterisco} />
            </div>
          )}
          <span className={style.text_total_ingresado}>Total Ingresado: </span>
          {context.isViewSaldo ? (
            <p className={style.valor_total_ingresado}>
              {totals.ingresos} {totals.cotizacion}
            </p>
          ) : (
            <div className={style.container_asterisco}>
              <img className={style.icons_saldo} src={asterisco} />
              <img className={style.icons_saldo} src={asterisco} />
              <img className={style.icons_saldo} src={asterisco} />
            </div>
          )}
        </div>
    </div>
  );
}

export default BlockTotal;
