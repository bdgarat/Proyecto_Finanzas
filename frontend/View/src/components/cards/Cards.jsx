import React from "react";
import style from "./cards.module.css";
import Card from "../card/Card";
function Cards({ data, handleEdit, handleRemove,requestEdit }) {
  return (
    <ul>
      {data.map((element) => (
        <Card key={element.id} element={element} handleEdit={handleEdit} handleRemove={handleRemove} requestEdit={requestEdit}/>
      ))}
    </ul>
  );
}

export default Cards;
