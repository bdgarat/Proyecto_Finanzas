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

