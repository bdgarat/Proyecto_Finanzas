import axios from "axios";
import {url} from './../../global'
export async function obtenerGastos(access, data, page, otherCoins) {
  let respuesta = null;
  try {
    if ( otherCoins ) {
      respuesta = await axios({
        method: "get",
        headers: { "x-access-token": access },
        url: `${url}gastos/get_all`,
        params: {
          page:page,
          monto_min: data.monto_inicial !=""? data.monto_inicial:null,
          monto_max: data.monto_final!=""? data.monto_final:null,
          tipo: data.tipo!=""? data.tipo:null,
          fecha_inicio: data.fecha_inicio!=""? data.fecha_inicio:null,
          fecha_fin: data.fecha_fin!=""? data.fecha_fin:null,
          currency: data.currency!=""? data.currency:null,
          currency_type: data.currency_type!=""? data.currency_type:null,
          criterion: "last_updated_on_max",
          page_size: 5,
        },
      });
    } else {
      respuesta = await axios({
        method: "get",
        headers: { "x-access-token": access },
        url: `${url}gastos/get_all`,
        params: {
          page: page,
          monto_min: data.monto_inicial !=""? data.monto_inicial:null,
          monto_max: data.monto_final!=""? data.monto_final:null,
          tipo: data.tipo!=""? data.tipo:null,
          fecha_inicio: data.fecha_inicio!=""? data.fecha_inicio:null,
          fecha_fin: data.fecha_fin!=""? data.fecha_fin:null,
          page_size: 5,
          criterion: "last_updated_on_max",
        },
      });
    }
    return respuesta;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}
export async function setGasto(data, access) {
  try {
    console.log(data);
    const respuesta = await axios({
      method: "post",
      url: `${url}gastos/add`,
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
export async function editGasto(data, access) {
  try {
    const respuesta = await axios({
      method: "put",
      url: `${url}gastos/update`,
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
    return error.response.status;
    console.log(error);
  }
}
export async function removeGasto(id, access) {
  console.log(id, access);
  try {
    const response = await axios({
      method: "delete",
      url: `${url}gastos/delete`,
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
export async function obtenerTypesGastos(access) {
  try {
    const response = await axios({
      method: "get",
      url: `${url}gastos/tipos`,
      headers: { "x-access-token": access },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
export async function getTotalsGasto(access, filter, otherCoins) {
  let responseGastos = null;
  try {
    if (filter.currency != "" && filter.currency_type != "" && otherCoins) {
      responseGastos = await axios({
        method: "get",
        headers: { "x-access-token": access },
        url: `${url}gastos/total`,
        params: {
          currency: filter.currency,
          currency_type: filter.currency_type,
        },
      });
    } else {
      responseGastos = await axios({
        method: "get",
        headers: { "x-access-token": access },
        url: `${url}gastos/total`,
      });
    }
    return responseGastos;
  } catch (error) {
    console.log("Este error ocurre dentro de la petición getTotalGasto", error);
    return error.response;
  }
}
export async function getAvaragesGastos(
  access,
  fecha_inicio,
  fecha_fin,
  filter,
  otherCoins
) {
  let response = null;
  try {
    if (otherCoins && filter.currency != "" && filter.currency_type != "") {
      response = await axios({
        method: "GET",
        headers: { "x-access-token": access },
        url: `${url}gastos/total`,
        params: {
          fecha_inicio: fecha_inicio,
          fecha_fin: fecha_fin,
          currency:filter.currency,
          currency_type:filter.currency_type
        },
      });
    } else {
      response = await axios({
        method: "GET",
        headers: { "x-access-token": access },
        url: `${url}gastos/total`,
        params: {
          fecha_inicio: fecha_inicio,
          fecha_fin: fecha_fin,
        },
      });
    }
    return response;
  } catch (error) {
    console.log(error);
  }
}
