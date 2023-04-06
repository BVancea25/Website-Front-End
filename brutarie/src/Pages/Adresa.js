import React from "react";
import Button from "react-bootstrap/esm/Button";
import "../CSS/Locatie.css";

const Adresa = (props) => {
  const id = props.id;

  return (
    <div className="child-adresa-container" id={id}>
      <p className="child-adresa-text">{props.adresa}</p>
      <Button
        className="badge bg-danger"
        onClick={() => props.handleDelete(id)}
      >
        Delete
      </Button>
    </div>
  );
};

export default Adresa;
