import React, { useEffect, useState } from "react";
import axios from "axios";

const ProduseSelectare = (props) => {
  // const [products, setProducts] = useState([]);

  const handleQuantityChange = (productId, name, quantity) => {
    const updatedProducts = props.products.map((produs) => {
      if (produs._id === productId) {
        return {
          id: productId,
          name: name,
          quantity: quantity,
        };
      }
      //return produs;
    });
    //setProducts(updatedProducts);
    props.onProductsChange(updatedProducts);
  };

  const produse = props.products.map((produs) => {
    // const product = props.products.find((p) => p.id === produs._id) || {
    //   id: produs._id,
    //   name: produs.nume,
    //   quantity: 0,
    // };
    return (
      <div key={produs._id}>
        <h2>{produs.nume}</h2>
        <h1>{produs.pret}</h1>
        <input
          type="number"
          min="0"
          value={produs.quantity}
          onChange={(e) =>
            handleQuantityChange(produs._id, produs.nume, e.target.value)
          }
        />
      </div>
    );
  });

  return <div>{produse}</div>;
};

export default ProduseSelectare;
