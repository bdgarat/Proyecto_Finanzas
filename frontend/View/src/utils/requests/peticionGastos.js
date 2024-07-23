import axios from 'axios'
export async function obtenerGastos(access)
{
   try{
      const respuesta = await axios({
         method:'get',
         headers:{'x-access-token':access},
         url:"http://127.0.0.1:5000/gastos/list",
         params:{
            "page":1,
            "page_size":10
         }
      })
      return respuesta;
   }catch(error)
   {
      console.log(error);
   }
}
export async function obtenerGastoPorMonto(monto,access)
{
   try{
      const respuesta = await axios({
         method:'get',
         headers:{'x-access-token':access},
         url:"http://127.0.0.1:5000/gastos/get_all_by_monto",
         params:{
            "monto":monto,
            "page":1,
            "page_size":10
         }
      })
      return respuesta;
   }catch(error)
   {
      console.log(error);
   }
}
export async function obtenerGastoPorTipo(tipo,access)
{
   try{
      const response = await axios({
         method:"get",
         headers:{'x-access-token':access},
         params:{
            "page":1,
            "page_size":10,
            "tipo":tipo,
         },
         url:"http://127.0.0.1:5000/gastos/get_all_by_tipo",
      })
      return response;
   }catch(error){
      console.error(error);
   }
}
export async function setGasto(data,access){
   try{
      const respuesta = await axios({
         method:'post',
         url:'http://127.0.0.1:5000/gastos/add',
         headers:{'x-access-token':access},
         data:{
           "monto":data.gasto,
           "descripcion":data.descripcion,
           "tipo":data.tipo
         }
        })
        return respuesta.status;
   }catch(error)
   {
      console.log(error);
   }
   
}
export async function editGasto(data,access){
   try{
      const respuesta = await axios({
        method: "put",
        url: "http://127.0.0.1:5000/gastos/update",
        headers: { "x-access-token": access },
        data: {
          id: data.id,
          monto: data.gasto,
          descripcion: data.descripcion,
          tipo: data.tipo,
        },
      });
        return respuesta.status;
   }catch(error)
   {
      console.log(error);
   }
}
export async function removeGasto(id,access){
   try{
      const response = await axios({
         method:"delete",
         url:"http://127.0.0.1:5000/gastos/delete",
         headers:{'x-access-token':access},
         data:{
            id
         }
      })
      return response.status;
   }catch(error)
   {
      console.log(error);
   }
}