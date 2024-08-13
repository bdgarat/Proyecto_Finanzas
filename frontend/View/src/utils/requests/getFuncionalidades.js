import axios from "axios";
export async function getValueCoins() {
  try {
    let dollars = await axios({
      method: "get",
      url: "https://dolarapi.com/v1/dolares",
    });
    let otherCoins = await axios({
      method: "get",
      url: "http://dolarapi.com/v1/cotizaciones",
    });
    let response = dollars.data.concat(otherCoins.data.filter(coins=> coins.moneda !='USD'));
    return response;
  } catch (error) {
    console.log("Este error ocurre en la petición a la api dolar", error);
    return error.response;
  }
}
export async function getTotalsGasto(access, filter,otherCoins){
  let responseGastos= null;
  try{
     if(filter.currency !="" && filter.currency_type !="" && otherCoins )
     {
      responseGastos = await axios({
        method:"get",
        headers:{"x-access-token":access}, 
        url:"http://127.0.0.1:5000/gastos/total",
        params:{
          currency:filter.currency,
          currency_type:filter.currency_type
        }
      })
     }else
     {
      responseGastos = await axios({
        method:"get",
        headers:{"x-access-token":access}, 
        url:"http://127.0.0.1:5000/gastos/total",
      })
     }
    return responseGastos;
  }catch(error)
  {
    console.log('Este error ocurre dentro de la petición getTotalGasto',error);
    return error.response;
  }
}
export async function getTotalIngresos(access,filter,otherCoins){
  let responseIngresos= null;
  console.log(filter,otherCoins);
  try{
    if(filter.currency !="" && filter.currency_type !="" && otherCoins )
      {
       responseIngresos = await axios({
         method:"get",
         headers:{"x-access-token":access}, 
         url:"http://127.0.0.1:5000/ingresos/total",
         params:{
           currency:filter.currency,
           currency_type:filter.currency_type
         }
       })
      }else
      {
       responseIngresos = await axios({
         method:"get",
         headers:{"x-access-token":access}, 
         url:"http://127.0.0.1:5000/ingresos/total",
       })
      }
    return responseIngresos;
  }catch(error)
  {
    console.log('Este error ocurre dentro de la petición getTotalIngresos',error);
    return error.response;
  }
  
}