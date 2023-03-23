import React from "react";
import ProdusAdmin from "./ProdusAdmin";
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const ProduseAdmin = () => {
  const [Setproduse, setData] = useState();
  const { auth } = useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:3500/produse", {
        headers: { Authorization: "Bearer " + auth.accessToken },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [auth.accessToken, Setproduse]);

  if (Setproduse === undefined) {
    return <div>Loading...</div>;
  }
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

  return <div>{produse}</div>;
};

export default ProduseAdmin;
