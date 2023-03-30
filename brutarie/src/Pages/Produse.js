import React from "react";
import Produs from "./Produs";
import axios from "axios";
import { useEffect, useState } from "react";

const Produse = () => {
  const [Setproduse, setData] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3500/produse")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (Setproduse === undefined) {
    return <div>Loading...</div>;
  }

  const produse = Setproduse.map((produs) => (
    <Produs
      key={produs.id}
      nume={produs.nume}
      descriere={produs.descriere}
      pret={produs.pret}
      gramaj={produs.gramaj}
      img={"http://localhost:3500/" + produs.nume + ".jpg"}
      alt={produs.alt}
    />
  ));

  return <div>{produse}</div>;
};

export default Produse;
