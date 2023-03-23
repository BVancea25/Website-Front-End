import React from "react";
import "../CSS/Produs.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
const ProdusAdmin = (props) => {
  const handleDelete = async () => {
    //const id = props.id;
    //console.log(props.id);
    await axios
      .delete(`/produse/${props.id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id={props.id} className="produs-container">
      <img className="produs-img" src={props.img} alt={props.alt}></img>
      <div className="produs-info">
        <h2 className="produs-titlu">{props.nume}</h2>
        <p>{props.descriere}</p>
        <p>{props.pret}</p>
        <p>{props.gramaj}</p>
      </div>
      <Button onClick={handleDelete}>-</Button>
    </div>
  );
};

export default ProdusAdmin;
