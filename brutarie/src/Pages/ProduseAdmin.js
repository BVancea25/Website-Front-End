import React from "react";
import ProdusAdmin from "./ProdusAdmin";
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../CSS/ProduseForm.css";

const ProduseAdmin = () => {
  const [Setproduse, setData] = useState();
  const { auth } = useAuth();
  // const [msg, setMsg] = useState();
  // const msgRef = useRef();

  const [formData, setFormData] = useState({
    nume: "",
    gramaj: "",
    pret: "",
    descriere: "",
  });

  const [imageData, setImage] = useState("");

  useEffect(() => {
    axios
      .get("/produseAdmin", {
        headers: { Authorization: "Bearer " + auth.accessToken },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
    //setMsg("");
  }, [Setproduse, auth.accessToken]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  if (Setproduse === undefined) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();

    const { nume, gramaj, pret, descriere } = formData;

    setFormData({
      nume: "",
      gramaj: "",
      pret: "",
      descriere: "",
    });

    data.append("nume", nume);
    data.append("gramaj", gramaj);
    data.append("pret", pret);
    data.append("descriere", descriere);
    data.append("image", imageData);

    setImage("");

    await axios
      .post("/produse", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    // msgRef.current.focus();
  };

  const produse = Setproduse.map((produs) => {
    return (
      <ProdusAdmin
        id={produs._id}
        nume={produs.nume}
        descriere={produs.descriere}
        pret={produs.pret}
        gramaj={produs.gramaj}
        img={"http://localhost:3500/" + produs.nume + ".jpg"}
        alt={produs.alt}
      />
    );
  });

  return (
    <div className="container">
      <div className="produse">{produse}</div>

      <div className="form">
        {/* <p
          ref={msgRef}
          className={msg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        ></p> */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb3" controlId="formNume">
            <Form.Label>Nume produs:</Form.Label>
            <Form.Control
              name="nume"
              value={formData.nume}
              onChange={handleChange}
              type="text"
              placeholder="nume"
            />
          </Form.Group>

          <Form.Group className="mb3" controlId="formGramaj">
            <Form.Label>Gramaj:</Form.Label>
            <Form.Control
              name="gramaj"
              value={formData.gramaj}
              onChange={handleChange}
              type="text"
              placeholder="gramaj"
            />
          </Form.Group>

          <Form.Group className="mb3" controlId="formPret">
            <Form.Label>Pret:</Form.Label>
            <Form.Control
              name="pret"
              value={formData.pret}
              onChange={handleChange}
              type="text"
              placeholder="pret"
            />
          </Form.Group>

          <Form.Group className="mb3" controlId="formDescriere">
            <Form.Label>Descriere:</Form.Label>
            <Form.Control
              name="descriere"
              value={formData.descriere}
              as="textarea"
              onChange={handleChange}
              rows={5}
              placeholder="Introduceti o descriere a produsului ..."
            />
          </Form.Group>

          <Form.Group className="mb3" controlId="formImage">
            <Form.Label>Imagine</Form.Label>
            <Form.Control
              onChange={handleImageChange}
              type="file"
              label="Alege o imagine jpg"
              accept="image/jpeg"
            />
          </Form.Group>
          <Button className="button" variant="secondary" type="submit">
            Adauga produs
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ProduseAdmin;
