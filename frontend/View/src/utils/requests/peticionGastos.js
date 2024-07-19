import axios from 'axios'

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