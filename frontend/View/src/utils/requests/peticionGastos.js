import axios from "axios";
export async function obtenerGastos(access, data) {
  let respuesta = null;
  try {
    if (data.monto != -1 || data.tipo != '' || data.fecha_inicio !='' || data.fecha_fin !='') {
      respuesta = await axios({
        method: "get",
        headers: { "x-access-token": access },
        url: "http://127.0.0.1:5000/gastos/get_all",
        params: {
          page: 1,
          page_size: 10,
          monto: data.monto,
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
          page: 1,
          page_size: 10,
        },
      });
    }
    return respuesta;
  } catch (error) {
    console.log(error);
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
  }
}
