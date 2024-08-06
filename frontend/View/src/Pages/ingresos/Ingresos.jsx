import React, { useEffect, useContext } from "react";
import DefaultPage from "../../components/defaultPage/DefaultPage";
import { CardsContext } from "../../utils/context/CardsProvider";
import {
  getIngresos,
  removeIngreso,
  setIngreso,
  editIngreso,} 
  from "../../utils/requests/peticionesIngresos";
import Swal from "sweetalert2";
import { useAuth } from "./../../Auth/AuthProvider";
import FilterMenu from "../../components/filterMenu/FilterMenu";
import { FilterContext } from "../../utils/context/FilterProvider";
import Cards from "../../components/cards/Cards";
import { invertirOrden } from "../../utils/functions/manipularArray";
import { PaginadoContext } from "../../utils/context/PaginadoProvider";
function Ingresos() {
  const context = useContext(CardsContext);
  const auth = useAuth();
  const filter = useContext(FilterContext);
  const pageContext = useContext(PaginadoContext);
  useEffect(() => {
    pageContext.setPage(1);
    context.setType(false);
    obtenerIngresos();
    filter.setIsFilter(false);
    context.setIsUpdate(false);
  }, [context.isUpdate, filter.getIsFilter()]);
  async function obtenerIngresos() {
    let response = await getIngresos(auth.getAccess(), filter.getDataFilter(),pageContext.getPage());
    if (response.status == 401) {
      let access = await auth.updateToken();
      console.log(access);
      response = await getIngresos(access, filter.getDataFilter(),pageContext.getPage());
    }
    context.setData(response.data);
    pageContext.setPage(response.data.page);
    pageContext.setNextPage(response.data.next_page);
    pageContext.setLastPage(response.data.total_page);
  }
  async function handleRemove(id) {
    let response = await removeIngreso(id, auth.getAccess());
    if (response == 401) {
      let access = auth.updateToken();
      response = await removeIngreso(id, access);
    }
    if (response == 200) {
      Swal.fire({
        title: "Se elimino correctamente",
        text: "Se elimino su gasto correctamente",
        icon: "success",
        cancelButtonText: "Cancelar",
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
      <DefaultPage>
        <FilterMenu></FilterMenu>
        <Cards
          data={invertirOrden(context.data.ingresos)}
          handleRemove={handleRemove}
          requestEdit={editIngreso}
          requestAdd={setIngreso}
          obtenerDatos={obtenerIngresos}
        />
      </DefaultPage>
  );
}

export default Ingresos;
