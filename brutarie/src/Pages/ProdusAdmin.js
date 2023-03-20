import React from "react";
import "../CSS/Produs.css";

const Produs = (props) => {
  return (
    <div id={props.key} className="produs-container">
      <img className="produs-img" src={props.img} alt={props.alt}></img>
      <div className="produs-info">
        <h2 className="produs-titlu">{props.nume}</h2>
        <p>{props.descriere}</p>
        <p>{props.pret}</p>
        <p>{props.gramaj}</p>
      </div>
      <button>-</button>
    </div>
  );
};

export default Produs;
