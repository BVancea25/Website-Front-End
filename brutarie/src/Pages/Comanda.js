import Button from "react-bootstrap/esm/Button";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import useAxiosPrivate from "../hooks/axiosPrivate";
import ProduseSelectare from "./ProduseSelectare";
import "../CSS/Comanda.css";
import useAuth from "../hooks/useAuth";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

const Comanda = () => {
  const [choosing, setChoose] = useState(false);
  const [products, setProducts] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [shippingDetails, setDetails] = useState({
    state: "",
    postalCode: "",
    address: "",
  });

  const { auth } = useAuth();

  const axiosPrivate = useAxiosPrivate();

  const handleDetailsChange = (event) => {
    const { name, value } = event.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleProductsChange = (selectedProducts) => {
    setOrderProducts(selectedProducts);
  };

  const handleChoose = () => {
    setChoose(true);
  };

  const handleReturnToOrder = () => {
    setChoose(false);
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const id = auth.id;
    const total = getTotal();
    const date = getDate();
    const data = {
      userID: id,
      items: orderProducts,
      orderDate: date,
      totalPrice: total,
      shippingInfo: shippingDetails,
    };
    axiosPrivate
      .post("/comanda", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3500/produse")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function getTotal() {
    var total = 0;
    if (orderProducts.length > 0) {
      orderProducts.map((produs) => {
        var aux = products.find((p) => p._id === produs.productId);
        total += produs.quantity * aux.pret;
      });
    }

    return total;
  }

  function getDate() {
    const now = new Date();
    const year = now.getFullYear().toString().substr(-2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const day = ("0" + now.getDate()).slice(-2);
    const hours = ("0" + now.getHours()).slice(-2);
    const minutes = ("0" + now.getMinutes()).slice(-2);
    const seconds = ("0" + now.getSeconds()).slice(-2);
    const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return dateTimeString;
  }

  return (
    <div>
      {choosing === false ? (
        <div className="table-div">
          <Button className="table-button" onClick={handleChoose}>
            Alegeti produsele
          </Button>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nume</th>
                <th>Cantitate</th>
              </tr>
            </thead>
            <tbody>
              {orderProducts.map((row) => (
                <tr key={row.productId}>
                  <td>{row.productName}</td>
                  <td>{row.quantity}</td>
                </tr>
              ))}
              <tr>
                <td>Total : </td>
                <td>{getTotal() + " lei"}</td>
              </tr>
            </tbody>
          </Table>
          <Form onSubmit={handlePlaceOrder}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Judet</InputGroup.Text>
              <Form.Control
                name="state"
                required
                value={shippingDetails.state}
                onChange={handleDetailsChange}
                placeholder="judet..."
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Cod postal</InputGroup.Text>
              <Form.Control
                name="postalCode"
                required
                value={shippingDetails.postalCode}
                onChange={handleDetailsChange}
                type="text"
                placeholder="cod postal..."
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                Adresa de livrare
              </InputGroup.Text>
              <Form.Control
                name="address"
                required
                value={shippingDetails.address}
                onChange={handleDetailsChange}
                placeholder="adresa..."
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            <Button type="submit" className="table-button">
              Plasati comanda
            </Button>
          </Form>
        </div>
      ) : (
        <div>
          <ProduseSelectare
            products={products}
            onProductsChange={handleProductsChange}
            onReturnToOrder={handleReturnToOrder}
          />
        </div>
      )}
    </div>
  );
};

export default Comanda;
