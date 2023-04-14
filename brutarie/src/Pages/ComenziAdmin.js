import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/axiosPrivate";
import { Button } from "react-bootstrap";

const ComenziAdmin = () => {
  const [orders, setOrders] = useState();
  const axiosPrivate = useAxiosPrivate();

  const showState = () => {
    console.log(orders);
  };
  useEffect(() => {
    axiosPrivate.get("/comanda").then((res) => {
      setOrders(res.data[10]);
    });
  }, []);

  return (
    <div>
      <Button onClick={showState}>Afiseaza</Button>
    </div>
  );
};

export default ComenziAdmin;
