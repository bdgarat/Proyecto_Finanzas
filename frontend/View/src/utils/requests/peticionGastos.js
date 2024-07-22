import axios from 'axios'
export async function obtenerGastos()
{
   try{
      let access = localStorage.getItem("access")
      const respuesta = await axios({
         method:'get',
         headers:{'x-access-token':access},
         url:"http://127.0.0.1:5000/gastos/list"
      })
      return respuesta.data.gastos;
   }catch(error)
   {
      console.log(error);
   }
}
export async function obtenerGastoPorTipo(tipo)
{
   try{
      let access = localStorage.getItem("access");
      const response = await axios({
         method:"get",
         headers:{'x-access-token':access},
         url:"127.0.0.1:5000/ingresos/get_all_by_tipo",
         data:{
            "value":tipo
         }

      })
      console.log(response);
      response.data;
   }catch(error){
      console.log(error);
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
         method:'put',
         url:'http://127.0.0.1:5000/gastos/update',
         headers:{'x-access-token':access},
         data:{
            "id":data.id,
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
export async function removeGasto(id){
   try{
      const access = localStorage.getItem("access")
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