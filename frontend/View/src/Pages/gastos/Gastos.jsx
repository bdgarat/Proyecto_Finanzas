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
function Gastos() {
  const context = useContext(CardsContext);
  const auth = useAuth();
  const filter = useContext(FilterContext);
  async function obtenerLosGastos() {
    let response = null;
    response = await obtenerGastos(auth.getAccess(), filter.getDataFilter(), context.page);
    if (response.status == 401) {
      auth.updateToken();
      response = await obtenerGastos(auth.getAccess(), filter.getDataFilter(),context.page,context.nextPage);
    }
    context.setData(response.data.gastos);
    context.setPage(response.data.page);
    context.setNextPage(response.data.next_page);
    context.setLastPage(response.data.total_pages);
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
        <Cards
          data={context.data}
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
