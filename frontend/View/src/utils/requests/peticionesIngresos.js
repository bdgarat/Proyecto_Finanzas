import axios from "axios";
export async function getIngresos(access, data,page) {
   let respuesta = null;
   try {
     if (data.monto != -1 || data.tipo != '' || data.fecha_inicio !='' || data.fecha_fin !='') {
       respuesta = await axios({
         method: "get",
         headers: { "x-access-token": access },
         url: "http://127.0.0.1:5000/ingresos/get_all",
         params: {
           page: page,
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
         url: "http://127.0.0.1:5000/ingresos/get_all",
         params: {
           page: page,
           page_size: 10,
         },
       });
     }
     return respuesta;
   } catch (error) {
     console.log('Este error es de la petición de ingresos',error);
     return error.response;
   }
 }
export async function setIngreso(data,access){
    try{
       const respuesta = await axios({
          method:'post',
          url:'http://127.0.0.1:5000/ingresos/add',
          headers:{'x-access-token':access},
          data:{
            "monto":data.monto,
            "descripcion":data.descripcion,
            "tipo":data.tipo
          }
         })
         return respuesta.status;
    }catch(error)
    {
       console.log(error);
       return error.response.status;
    }
    
 }
 export async function editIngreso(data,access){
    try{
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
       return error.response.status;
    }
 }
 export async function removeIngreso(id,access){
    try{
       const response = await axios({
          method:"delete",
          url:"http://127.0.0.1:5000/ingresos/delete",
          headers:{'x-access-token':access},
          params:{
             id
          }
       })
       return response.status;
    }catch(error)
    {
       console.log(error);
       return error.response.status;
    }
 }