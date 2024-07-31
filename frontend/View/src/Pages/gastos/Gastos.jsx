import React, { useContext, useEffect } from "react";
import DefaultPage from "../../components/defaultPage/DefaultPage";
import {
  obtenerGastos,
  editGasto,
  removeGasto,
  setGasto,
} from "../../utils/requests/peticionGastos";
import { CardsContext } from "../../utils/context/CardsProvider";
import Swal from "sweetalert2";
import FilterMenu from "../../components/filterMenu/FilterMenu";
import { useAuth } from "../../Auth/AuthProvider";
import { FilterContext } from "../../utils/context/FilterProvider";
import Cards from "../../components/cards/Cards";
import { invertirOrden } from "../../utils/functions/manipularArray";
import { PaginadoContext } from "../../utils/context/PaginadoProvider";
function Gastos() {
  const context = useContext(CardsContext);
  const auth = useAuth();
  const filter = useContext(FilterContext);
  var pagContext = useContext(PaginadoContext);
  async function obtenerLosGastos() {
    let response = null;
    response = await obtenerGastos(auth.getAccess(), filter.getDataFilter(), pagContext.getPage());
    if (response.status == 401) {
      let access = await auth.updateToken();
      response = await obtenerGastos(access, filter.getDataFilter(),pagContext.getPage());
    }
    context.setData(response.data.gastos);
    pagContext.setPage(response.data.page);
    pagContext.setNextPage(response.data.next_page);
    pagContext.setLastPage(response.data.total_pages);
  }
  useEffect(() => {
    pagContext.setPage(1);
    context.setType(true);
    obtenerLosGastos();
    filter.setIsFilter(false);
    context.setIsUpdate(false);
  }, [context.isUpdate, filter.getIsFilter()]);
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
        <Cards
          data={invertirOrden(context.data)}
          handleRemove={handleRemove}
          requestEdit={editGasto}
          requestAdd={setGasto}
          obtenerDatos={obtenerLosGastos}
        />
        
      </DefaultPage>
    </div>
  );
}
export default Gastos;
