import React, {useContext} from 'react'
import { FilterContext } from '../../utils/context/FilterProvider';
import style from './filterMenu.module.css'
function FilterMenu() {
    const filter = useContext(FilterContext);
    function handleInputs(event){
        let {name,value} = event.target;
        filter.setDataFilter({
            ...filter.getDataFilter(),
            [name]:value
        })
        filter.setIsFilter(true);
    }
    return (
    <div className={style.filterMenu}>
        <form className={style.form}>
            <label>Monto</label>
            <input type="number" name="monto" placeholder='' value={filter.getDataFilter().monto} onChange={(event)=>{handleInputs(event)}} />
            <label>Tipo</label>
            <input type="text" name="tipo" value={filter.getDataFilter().tipo} onChange={(event)=>{handleInputs(event)}}/>
            <label>Fecha inicial</label>
            <input type="date" name="fecha_inicio" value={filter.getDataFilter().fecha_inicio} onChange={(event)=>{handleInputs(event)}}/>
            <label>Fecha final</label>
            <input type="date" name="fecha_fin" value={filter.getDataFilter().fecha_final} onChange={(event)=>{handleInputs(event)}}/>
        </form>
    </div>
  )
}

export default FilterMenu