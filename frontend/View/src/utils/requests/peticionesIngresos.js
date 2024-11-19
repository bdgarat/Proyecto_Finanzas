import axios from "axios";
import {url} from './../../global'
export async function getIngresos(access, data, page, otherCoins) {
  let respuesta = null;
  try {
    if (otherCoins) {
      respuesta = await axios({
        method: "get",
        headers: { "x-access-token": access },
        url: `${url}ingresos/get_all`,
        params: {
          page: page,
          page_size: 5,
          monto_min: data.monto_inicial != "" ? data.monto_inicial : null,
          monto_max: data.monto_final != "" ? data.monto_final : null,
          tipo: data.tipo != "" ? data.tipo : null,
          fecha_inicio: data.fecha_inicio != "" ? data.fecha_inicio : null,
          fecha_fin: data.fecha_fin != "" ? data.fecha_fin : null,
          currency: data.currency != "" ? data.currency : null,
          currency_type: data.currency_type != "" ? data.currency_type : null,
          criterion: "last_updated_on_max",
        },
      });
    } else {
      respuesta = await axios({
        method: "get",
        headers: { "x-access-token": access },
        url: `${url}ingresos/get_all`,
        params: {
          page: page,
          page_size: 5,
          criterion: "last_updated_on_max",
        },
      });
    }
    return respuesta;
  } catch (error) {
    return error.response;
  }
}
export async function setIngreso(data, access) {
  try {
    const respuesta = await axios({
      method: "post",
      url: `${url}ingresos/add`,
      headers: { "x-access-token": access },
      data: {
        monto: data.monto,
        descripcion: data.descripcion,
        tipo: data.tipo,
      },
    });
    return respuesta.status;
  } catch (error) {
    console.log(error);
    return error.response.status;
  }
}
export async function editIngreso(data, access) {
  try {
    const respuesta = await axios({
      method: "put",
      url: `${url}ingresos/update`,
      headers: { "x-access-token": access },
      data: {
        id: data.id,
        monto: data.monto,
        descripcion: data.descripcion,
        tipo: data.tipo,
      },
    });
    return respuesta.status;
  } catch (error) {
    console.log(error);
    return error.response.status;
  }
}
export async function removeIngreso(id, access) {
  try {
    const response = await axios({
      method: "delete",
      url: `${url}ingresos/delete`,
      headers: { "x-access-token": access },
      params: {
        id,
      },
    });
    return response.status;
  } catch (error) {
    console.log(error);
    return error.response.status;
  }
}
export async function obtenerTypesIngresos(access) {
  try {
    const response = await axios({
      method: "get",
      url: `${url}ingresos/tipos`,
      headers: { "x-access-token": access },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
export async function getTotalIngresos(access, filter, otherCoins) {
  let responseIngresos = null;
  try {
    if (filter.currency != "" && filter.currency_type != "" && otherCoins) {
      responseIngresos = await axios({
        method: "get",
        headers: { "x-access-token": access },
        url: `${url}ingresos/total`,
        params: {
          currency: filter.currency,
          currency_type: filter.currency_type,
        },
      });
    } else {
      responseIngresos = await axios({
        method: "get",
        headers: { "x-access-token": access },
        url: `${url}ingresos/total`,
      });
    }
    return responseIngresos;
  } catch (error) {
    console.log(
      "Este error ocurre dentro de la petición getTotalIngresos",
      error
    );
    return error.response;
  }
}
export async function getAvaragesIngresos(
  access,
  fecha_inicio,
  fecha_fin,
  filter,
  otherCoins
) {
  try {
    var response = null;
    if (otherCoins && filter.currency != "" && filter.currency_type != "") {
      response = await axios({
        method: "GET",
        url: `${url}ingresos/total`,
        headers: { "x-access-token": access },
        params: {
          fecha_inicio: fecha_inicio,
          fecha_fin: fecha_fin,
          currency: filter.currency,
          currency_type: filter.currency_type,
        },
      });
    } else {
      response = await axios({
        method: "GET",
        url: `${url}ingresos/total`,
        headers: { "x-access-token": access },
        params: {
          fecha_inicio: fecha_inicio,
          fecha_fin: fecha_fin,
        },
      });
    }
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}
