import React, { useContext, useEffect } from "react";
import DefaultPage from "../../components/defaultPage/DefaultPage";
import {
  obtenerGastos,
  editGasto,
  removeGasto,
  setGasto,
  obtenerTypesGastos
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
    context.setData(response.data);
    pagContext.setPage(response.data.page);
    pagContext.setNextPage(response.data.next_page);
    pagContext.setLastPage(response.data.total_pages);
  }
  async function obtenerTipos()
  {
    let access = auth.getAccess();
    let response = await obtenerTypesGastos(access);
    if(response.status == 401)
    {
      access = auth.updateToken();
      response = await obtenerTypesGastos(access);
    }
    context.setListTypes(response.data);
  }
  useEffect(()=>{
    pagContext.setPage(1);
    obtenerTipos();
    context.setUpdateTypes(false);
  },[context.updateTypes])
  useEffect(() => {
    context.setType(true);
    filter.setIsFilter(false);
    context.setIsUpdate(false);
    obtenerLosGastos();
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
          data={invertirOrden(context.data.gastos)}
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
