import React, { useEffect, useContext } from "react";
import DefaultPage from "../../components/defaultPage/DefaultPage";
import { GastosContext } from "../../utils/context/GastosContextP";
import {
  getIngresos,
  removeIngreso,
} from "../../utils/requests/peticionesIngresos";
import NuevoIngreso from "./NuevoIngreso";
import EditarIngresos from "./EditarIngresos";
import Swal from "sweetalert2";
import { useAuth } from "./../../Auth/AuthProvider";
import FilterMenu from "../../components/FilterMenu";
import { FilterContext } from "../../utils/context/FilterProvider";
import Target from "./../../components/Target";
function Ingresos() {
  const context = useContext(GastosContext);
  const auth = useAuth();
  const filter = useContext(FilterContext);
  useEffect(() => {
    obtenerIngresos();
    filter.setIsFilter(false);
    context.setIsUpdate(false);
  }, [context.isUpdate, filter.getIsFilter()]);
  async function obtenerIngresos() {
    let response = await getIngresos(auth.getAccess(), filter.getDataFilter());
    if (response.status == 401) {
      auth.updateToken();
      response = await getIngresos(auth.getAccess(), filter.getDataFilter());
    }
    context.setData(response.data.ingresos);
  }
  function handleEdit(element) {
    context.isEdit ? context.setIsEdit(false) : context.setIsEdit(true);
    context.setDataEditable(element);
  }
  async function handleRemove(id) {
    let response = await removeIngreso(id, auth.getAccess());
    if (response == 401) {
      auth.updateToken();
      response = await removeIngreso(id, auth.getAccess());
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
    <div>
      <DefaultPage>
        <FilterMenu></FilterMenu>
        <button
          onClick={() => {
            context.isNew ? context.setIsNew(false) : context.setIsNew(true);
          }}
        >
          Agregar un nuevo ingreso
        </button>
        {context.isNew ? <NuevoIngreso /> : null}
        <ul>
          {context.data.map((element) => (
            <Target
              element={element}
              handleEdit={handleEdit}
              handleRemove={handleRemove}
            />
          ))}
        </ul>
        {context.isEdit ? <EditarIngresos /> : null}
      </DefaultPage>
    </div>
  );
}

export default Ingresos;
