import React from "react";
import "../CSS/ProdusAdmin.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
const ProdusAdmin = (props) => {
  const handleDelete = async () => {
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
      <Button className="badge bg-danger" onClick={handleDelete}>
        Delete
      </Button>

      <img className="produs-img" src={props.img} alt={props.alt}></img>

      <div className="produs-info">
        <h2 className="produs-titlu">{props.nume}</h2>
        <p>{props.descriere}</p>
        <p>{props.pret}</p>
        <p>{props.gramaj}</p>
      </div>
    </div>
  );
};

export default ProdusAdmin;
