import axios from "axios";
export async function getIngresos()
{
   try{
      let access = localStorage.getItem("access")
      const respuesta = await axios({
         method:'get',
         headers:{'x-access-token':access},
         url:"http://127.0.0.1:5000/ingresos/list"
      })
      return respuesta.data.ingresos;
   }catch(error)
   {
      console.log(error);
   }
}
export async function setIngreso(data,access){
    try{
       const respuesta = await axios({
          method:'post',
          url:'http://127.0.0.1:5000/ingresos/add',
          headers:{'x-access-token':access},
          data:{
            "monto":data.ingreso,
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
 export async function editIngreso(data,access){
    try{
        console.log(data);
       const respuesta = await axios({
          method:'put',
          url:'http://127.0.0.1:5000/ingresos/update',
          headers:{'x-access-token':access},
          data:{
            "id":data.id,
            "monto":data.monto,
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
 export async function removeIngreso(id){
    try{
       const access = localStorage.getItem("access")
       const response = await axios({
          method:"delete",
          url:"http://127.0.0.1:5000/ingresos/delete",
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