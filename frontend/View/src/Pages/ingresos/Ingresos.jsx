import React, { useEffect, useContext } from "react";
import DefaultPage from "../../components/defaultPage/DefaultPage";
import { CardsContext } from "../../utils/context/CardsProvider";
import {
  getIngresos,
  removeIngreso,
  setIngreso,
  editIngreso,
  obtenerTypesIngresos,
} from "../../utils/requests/peticionesIngresos";
import { messageInfo } from "./../../utils/functions/Message";
import { useAuth } from "./../../Auth/AuthProvider";
import FilterMenu from "../../components/filterMenu/FilterMenu";
import { FilterContext } from "../../utils/context/FilterProvider";
import Cards from "../../components/cards/Cards";
import { PaginadoContext } from "../../utils/context/PaginadoProvider";
function Ingresos() {
  const context = useContext(CardsContext);
  const auth = useAuth();
  const filter = useContext(FilterContext);
  const pageContext = useContext(PaginadoContext);
  useEffect(() => {
    context.setType(false);
    filter.setIsFilter(false);
    context.setIsUpdate(false);
    pageContext.setPage(1);
    obtenerIngresos();
  }, [context.isUpdate, filter.getIsFilter()]);
  useEffect(() => {
    obtenerTiposIngresos();
    context.setUpdateTypes(false);
  }, [context.updateTypes]);
  async function obtenerTiposIngresos() {
    let access = auth.getAccess();
    console.log('Token viejo', access);
    let response = await obtenerTypesIngresos(access);
    if (response.status == 401) {
      access = await auth.updateToken();
      console.log('Token nuevo', access);
      response = await obtenerTypesIngresos(access);
    }
    context.setListTypes(response.data);
  }
  async function obtenerIngresos() {
    let response = null;
    response = await getIngresos(
      auth.getAccess(),
      filter.getDataFilter(),
      pageContext.getPage(),
      filter.otherCoins,
    );
    if (response.status == 401) {
      let access = await auth.updateToken();
      response = await getIngresos(
        access,
        filter.getDataFilter(),
        pageContext.getPage(),
        filter.otherCoins,
      );
    }
    context.setData(response.data);
    pageContext.setPage(response.data.page);
    pageContext.setNextPage(response.data.next_page);
    pageContext.setLastPage(response.data.total_pages);
  }
  async function handleRemove(id) {
    let response = await removeIngreso(id, auth.getAccess());
    if (response == 401) {
      let access = await auth.updateToken();
      response = await removeIngreso(id, access);
    }
    if (response == 200) {
      messageInfo(
        "Se elimino correctamente",
        "Se elimino su gasto correctamente",
        "success"
      );
      context.setIsUpdate(true);
      context.setUpdateTypes(true);
    } else {
      messageInfo(
        "No se pudo eliminar",
        "No se pudo conectar al servidor. Espere mientras trabajamos en una solución",
        "error"
      );
    }
  }
  return (
    <DefaultPage>
      <FilterMenu></FilterMenu>
      <Cards
        data={context.data.ingresos}
        handleRemove={handleRemove}
        requestEdit={editIngreso}
        requestAdd={setIngreso}
        obtenerDatos={obtenerIngresos}
      />
    </DefaultPage>
  );
}

export default Ingresos;
