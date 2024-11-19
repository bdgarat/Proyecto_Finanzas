import React, { useContext, useEffect, useState } from "react";
import style from "./blockCoins.module.css";
import { FilterContext } from "../../../utils/context/FilterProvider";
import { CardsContext } from "../../../utils/context/CardsProvider";
function BlockCoinsValue({ request }) {
  //Sirve para guardar los datos de las monedas y formar el contenido del select
  const [coins, setCoins] = useState([]);
  //Guardo en este filtero general el nombre y tipo de la moneda seleccionada
  const filter = useContext(FilterContext);
  const context = useContext(CardsContext);
  async function getData() {
    let response = null;
    try {
      response = await request();
      setCoins(response);
    } catch (error) {
      console.log(error);
    }
  }
  function handleCoin(event) {
    let index = event.target.selectedIndex;
    if (event.target.value != "") {
      filter.setIndexSelec(index);
      filter.setDataFilter({
        ...filter.getDataFilter(),
        currency: coins[index - 1].moneda.toLowerCase(),
        currency_type: coins[index - 1].casa,
      });
      context.setIsUpdate(true);
    } else {
      filter.setIndexSelec(0);
      filter.setDataFilter({
        ...filter.getDataFilter(),
        currency: "",
        currency_type: "",
      });
      context.setIsUpdate(true);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={style.coins_container}>
      <div className={style.title_text_selec}>
      <h3 className={style.title_coins}>Tipo de moneda</h3>
      <div className={style.text_coins}>
        {" "}
        <input
          type="checkbox"
          checked={filter.otherCoins ? "checked" : ""}
          className={style.check_coins}
          onChange={() => {
            context.setIsUpdate(true);
            filter.setOtherCoins((previus) => !previus);
          }}
        />
        <span className={style.text_info}>Mostrar los valores en la moneda seleccionada</span>
      </div>
      {Array.isArray(coins) ? (
        <div className={style.select_container}>
          <select
            className={style.select_coins}
            onChange={(event) => {
              handleCoin(event);
            }}
            value={
              coins.length != 0 && filter.indexSelec > 0
                ? coins[filter.indexSelec - 1].nombre
                : ""
            }
          >
            <option value="">Seleccione la moneda de interes</option>
            {coins.map((element) => (
              <option key={element.nombre} value={element.nombre}>
                {element.nombre} {element.moneda}
              </option>
            ))}
          </select>
        </div>) : null}
      </div>
      {filter.indexSelec > 0 && Array.isArray(coins) && coins.length != 0 ? (
        <div className={style.info_coin_container}>
           <p>
            Fecha en la cuál se obtuvo el valor :{" "}
            {new Date(
              coins[filter.indexSelec - 1].fechaActualizacion
            ).toLocaleDateString()}
          </p>
          <p>Valor para la compra : {coins[filter.indexSelec - 1].compra}</p>
          <p>Valor para la venta : {coins[filter.indexSelec - 1].venta}</p>
        </div>
      ) : <h3 className={style.message_no_select_coin}>No hay ninguna moneda seleccionada</h3>}
    </div>
  );
}

export default BlockCoinsValue;
