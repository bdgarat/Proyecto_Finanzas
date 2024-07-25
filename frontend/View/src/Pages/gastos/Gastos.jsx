import React, { useContext, useEffect, useState } from "react";
import DefaultPage from "../../components/defaultPage/DefaultPage";
import {
  obtenerGastos,
  editGasto,
  removeGasto,
  setGasto,
} from "../../utils/requests/peticionGastos";
import { GastosContext } from "../../utils/context/GastosContextP";
import Swal from "sweetalert2";
import FilterMenu from "../../components/filterMenu/FilterMenu";
import { useAuth } from "../../Auth/AuthProvider";
import { FilterContext } from "../../utils/context/FilterProvider";
import Cards from "../../components/cards/Cards";
import NewComponent from "../../components/inComponent/NewComponent";
function Gastos() {
  const context = useContext(GastosContext);
  const auth = useAuth();
  const filter = useContext(FilterContext);
  async function obtenerLosGastos() {
    let response = null;
    response = await obtenerGastos(auth.getAccess(), filter.getDataFilter());
    if (response.status == 401) {
      auth.updateToken();
      response = await obtenerGastos(auth.getAccess(), filter.getDataFilter());
    }
    context.setData(response.data.gastos);
  }
  useEffect(() => {
    obtenerLosGastos();
    filter.setIsFilter(false);
    context.setIsUpdate(false);
  }, [context.isUpdate, filter.getIsFilter()]);
  function handleEdit(element) {
    context.setDataEditable(element);
  }
  async function handleRemove(id) {
    let response = await removeGasto(id, auth.getAccess());
    if (response == 401) {
      auth.updateToken();
      response = await removeGasto(id, auth.getAccess());
    }
    if (response == 200) {
      Swal.fire({
        title: "Se elimino correctamente",
        text: "Se elimino su gasto correctamente",
        icon: "success",
      });
      context.setIsUpdate(true);
    } else {
      Swal.fire({
        title: "No se pudo eliminar",
        text: "No se pudo conectar al servidor. Espere mientras trabajamos en una solución",
        icon: "error",
      });
    }
  }

  return (
    <div>
      <DefaultPage>
        <FilterMenu />
        <button
          onClick={() =>
            context.isNew ? context.setIsNew(false) : context.setIsNew(true)
          }
        >
          Agregar un nuevo gasto
        </button>
        {context.isNew ? <NewComponent newRequest={setGasto} /> : null}
        <Cards
          data={context.data}
          handleEdit={handleEdit}
          handleRemove={handleRemove}
          requestEdit={editGasto}
        />
        
      </DefaultPage>
    </div>
  );
}
export default Gastos;
