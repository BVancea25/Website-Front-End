import React from "react";
import Button from "react-bootstrap/esm/Button";
import useAxiosPrivate from "../hooks/axiosPrivate";

const Adresa = (props) => {
  const id = props.id;
  const axiosPrivate = useAxiosPrivate();

  const handleDelete = (id) => {
    axiosPrivate
      .delete(`/locatii/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(props);
  return (
    <div id={id}>
      <p>{props.adresa}</p>
      <Button className="badge bg-danger" onClick={() => handleDelete(id)}>
        Delete
      </Button>
    </div>
  );
};

export default Adresa;
