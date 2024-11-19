import React, { useContext, useEffect } from "react";
import { FilterContext } from "../../utils/context/FilterProvider";
import style from "./filterMenu.module.css";
import { CardsContext } from "../../utils/context/CardsProvider";
function FilterMenu() {
  const filter = useContext(FilterContext);
  const context = useContext(CardsContext);
  function handleInputs(event) {
    let { name, value } = event.target;
    filter.setDataFilter({
      ...filter.getDataFilter(),
      [name]: value,
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (
      !(
        filter.getDataFilter().fecha_inicio != "" &&
        filter.getDataFilter().fecha_final == ""
      )
    ) {
      filter.setIsFilter(true);
    }
  }
  useEffect(() => {
    filter.setDataFilter({
      ...filter.getDataFilter(),
      monto_inicial: "",
      monto_final: "",
      tipo: "",
      fecha_inicio: "",
      fecha_fin: "",
    });
  },[]);
  return (
    <div className={style.filterMenu}>
      <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
        <label>Monto inicial</label>
        <input
          type="number"
          className={style.input_filter}
          min="0"
          name="monto_inicial"
          placeholder=""
          value={filter.getDataFilter().monto_inicial}
          onChange={(event) => {
            handleInputs(event);
          }}
        />
        <label>Monto final</label>
        <input
          type="number"
          min="1"
          className={style.input_filter}
          name="monto_final"
          placeholder=""
          value={filter.getDataFilter().monto_final}
          onChange={(event) => {
            handleInputs(event);
          }}
        />
        <label>Tipo</label>
        <select
         className={style.input_select_filter}
          onChange={(event) => {
            handleInputs(event);
          }}
          name="tipo"
          value={filter.getDataFilter().tipo}
        >
          <option value="">Buscar por tipo</option>
          {context.listTypes != null &&
          context.listTypes.length != 0 &&
          Array.isArray(context.listTypes)
            ? context.listTypes.map((element) => (
                <option key={element}>{element}</option>
              ))
            : null}
        </select>
        <label>Fecha inicial</label>
        <input
         className={style.input_filter}
          type="date"
          name="fecha_inicio"
          value={filter.getDataFilter().fecha_inicio}
          onChange={(event) => {
            handleInputs(event);
          }}
        />
        <label>Fecha final</label>
        <input
         className={style.input_filter}
          type="date"
          name="fecha_fin"
          value={filter.getDataFilter().fecha_final}
          onChange={(event) => {
            handleInputs(event);
          }}
        />
        <button tpye="submit" className={style.search_button}>
          Buscar
        </button>
      </form>
    </div>
  );
}

export default FilterMenu;
