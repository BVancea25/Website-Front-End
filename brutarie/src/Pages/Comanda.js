import Button from "react-bootstrap/esm/Button";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import ProduseSelectare from "./ProduseSelectare";

const Comanda = () => {
  const [choosing, setChoose] = useState(false);
  const [products, setProducts] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);

  const handleProductsChange = (updatedProducts) => {
    setOrderProducts((prevOrderProducts) => [
      ...prevOrderProducts,
      updatedProducts,
    ]);
  };

  const handleChoose = (button) => {
    if (button === "1") {
      setChoose(true);
    } else {
      setChoose(false);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3500/produse")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (orderProducts.length > 0) {
    console.log(orderProducts);
  }

  return (
    <div>
      {choosing === false ? (
        <Form>
          <Button onClick={() => handleChoose("1")}>Alegeti produsele</Button>
        </Form>
      ) : (
        <div>
          <ProduseSelectare
            products={products}
            onProductsChange={handleProductsChange}
          />
          <Button onClick={() => handleChoose("2")}>Reveniti la comanda</Button>
        </div>
      )}
    </div>
  );
};

export default Comanda;
