import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/axiosPrivate";
import Adresa from "./Adresa";
import "../CSS/Locatie.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LocatieAdmin = () => {
  const [addresses, setAddress] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [formData, setForm] = useState({ adresa: "" });

  useEffect(() => {
    axiosPrivate
      .get("/adrese")
      .then((res) => {
        setAddress(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (addresses === undefined) {
    return <div>Loading...</div>;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const address = new FormData();
    address.append("address", formData.adresa);

    await axiosPrivate
      .post("/locatii", address)
      .then((res) => {
        console.log(res);
        axiosPrivate
          .get("/adrese")
          .then((res) => {
            setAddress(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    setForm({ adresa: "" });
  };

  const handleDelete = async (id) => {
    await axiosPrivate
      .delete(`/locatii/${id}`)
      .then((res) => {
        console.log(res);
        axiosPrivate
          .get("/adrese")
          .then((res) => {
            setAddress(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const adrese = addresses.map((adresa) => {
    console.log(adresa._id);
    return (
      <Adresa
        key={adresa._id}
        id={adresa._id}
        adresa={adresa.addres}
        handleDelete={handleDelete}
      />
    );
  });

  return (
    <div className="admin-container">
      <div className="adresa-container">{adrese}</div>

      <div className="form">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Introduceti o noua adresa:</Form.Label>
            <Form.Control
              name="adresa"
              value={formData.adresa}
              onChange={handleChange}
              type="text"
            ></Form.Control>
          </Form.Group>
          <Button className="button" variant="secondary" type="submit">
            Adauga adresa
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LocatieAdmin;
