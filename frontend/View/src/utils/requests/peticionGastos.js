import axios from "axios";
export async function obtenerGastos(access, data,page) {
  let respuesta = null;
  try {
    if (data.monto_final != ""|| data.tipo != '' || data.fecha_inicio !='' || data.fecha_fin !='') {
      respuesta = await axios({
        method: "get",
        headers: { "x-access-token": access },
        url: "http://127.0.0.1:5000/gastos/get_all",
        params: {
          monto_min: data.monto_inicial,
          monto_max: data.monto_final,
          tipo: data.tipo,
          fecha_inicio: data.fecha_inicio,
          fecha_fin: data.fecha_fin,
        },
      });
    } else {
      respuesta = await axios({
        method: "get",
        headers: { "x-access-token": access },
        url: "http://127.0.0.1:5000/gastos/get_all",
        params: {
          page: page,
          page_size: 5,
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
      url: "http://127.0.0.1:5000/gastos/add",
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
      url: "http://127.0.0.1:5000/gastos/update",
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
      url: "http://127.0.0.1:5000/gastos/delete",
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
