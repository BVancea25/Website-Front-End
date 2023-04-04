import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/axiosPrivate";
import Adresa from "./Adresa";

const LocatieAdmin = () => {
  const [addresses, setAddress] = useState();
  const axiosPrivate = useAxiosPrivate();

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

  const adrese = addresses.map((adresa) => {
    console.log(adresa._id);
    return <Adresa key={adresa._id} id={adresa._id} adresa={adresa.addres} />;
  });

  return <div>{adrese}</div>;
};

export default LocatieAdmin;
