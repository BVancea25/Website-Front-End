import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/axiosPrivate";
import ComandaAdmin from "./ComandaAdmin";

const ComenziAdmin = () => {
  const [orders, setOrders] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [show, setShowOrder] = useState(false);
  const [orderToShow, setOrderToShow] = useState();

  useEffect(() => {
    axiosPrivate.get("/comanda").then((res) => {
      setOrders(res.data);
    });
  }, []);

  function showOrder(id) {
    const order = orders.find((p) => p._id === id);
    setOrderToShow(order);
    setShowOrder(true);
  }

  const orderLabel = orders.map((order) => {
    return (
      <button
        key={order._id}
        onClick={() => {
          showOrder(order._id);
        }}
        style={{ marginTop: "2%", marginLeft: "25%", marginRight: "25%" }}
      >
        <div style={{ border: "2px solid black" }} id={order._id}>
          <h6>{"Data plasarii: " + order.orderDate + " "}</h6>
          <text>{"Nume: " + order.userID.name + " " + order.userID.fname}</text>

          <text>{"   Total: " + order.totalPrice}</text>
        </div>
      </button>
    );
  });

  return (
    <div>
      {show === false ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {orderLabel}
        </div>
      ) : (
        <ComandaAdmin order={orderToShow} />
      )}
    </div>
  );
};

export default ComenziAdmin;
