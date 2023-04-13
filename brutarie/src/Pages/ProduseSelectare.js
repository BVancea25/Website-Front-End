import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";

const ProduseSelectare = (props) => {
  const [orderProducts, setProducts] = useState([]);

  const handleQuantityChange = (productId, productName, quantity) => {
    const index = orderProducts.findIndex(
      (produs) => produs.productId === productId
    );

    if (index === -1) {
      const newProduct = {
        productId: productId,
        productName: productName,
        quantity: quantity,
      };
      setProducts([...orderProducts, newProduct]);
      console.log(orderProducts);
    } else {
      const updatedProducts = [...orderProducts];

      updatedProducts[index] = {
        ...updatedProducts[index],
        quantity: quantity,
      };
      setProducts(updatedProducts);
    }
  };

  const produse = props.products.map((produs) => {
    return (
      <div key={produs._id}>
        <h2>{produs.nume}</h2>
        <h1>{produs.pret}</h1>
        <input
          type="number"
          defaultValue={0}
          onChange={(e) =>
            handleQuantityChange(produs._id, produs.nume, e.target.value)
          }
        />
      </div>
    );
  });

  return (
    <div>
      {produse}
      <Button
        onClick={() => {
          props.onReturnToOrder();
          props.onProductsChange(orderProducts);
        }}
      >
        Reveniti la comanda
      </Button>
    </div>
  );
};

export default ProduseSelectare;
