import React, { useEffect, useState } from "react";
import style from "./blockCoins.module.css";
function BlockCoinsValue({ request }) {
  //Sirve para guardar los datos de las monedas y formar el contenido del select
  const [coins, setCoins] = useState([]);
  //Sirve para mostrar la moneada seleccionada del select en pantalla, por defecto se va a mostrar el valor del dólar blue
  const [indexSelec, setIndexSelec] = useState(2);
  async function getData() {
    let response = null;
    try {
      response = await request();
      setCoins(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  function handleCoin(event) {
    console.log(event.target.value);
    if (event.target.value != "") {
      setIndexSelec(event.target.selectedIndex);
    } else {
      setIndexSelec(-1);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={style.coins_container}>
      <h3>Valores de las monedas</h3>
      <div className={style.coin_info}>
        {indexSelec != -1 && Array.isArray(coins) && coins.length != 0 ? (
          <div className={style.coin_container}>
            <span>Moneda : {coins[indexSelec - 1].moneda}</span>
            {coins[indexSelec - 1].moneda == "USD" ? (
              <p>Tipo USD : {coins[indexSelec - 1].nombre}</p>
            ) : null}
            <p>Valor para la compra : {coins[indexSelec - 1].compra}</p>
            <p>Valor para la venta : {coins[indexSelec - 1].venta}</p>
          </div>
        ) : null}
        {Array.isArray(coins) ? (
          <select
            className={style.select_coins}
            onChange={(event) => {
              handleCoin(event);
            }}
            value={coins.length != 0 && indexSelec>0 ? coins[indexSelec - 1].nombre : ""}
          >
            <option value="">Seleccione la moneda de interes</option>
            {coins.map((element) => (
              <option key={element.nombre} value={element.nombre}>
                {element.nombre} {element.moneda}
              </option>
            ))}
          </select>
        ) : null}
      </div>
    </div>
  );
}

export default BlockCoinsValue;
